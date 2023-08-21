<script setup>
import {ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const selectedAreaId = ref(null);
const selectedTipoId = ref(null);
const areas = ref([]);
const tipos = ref([]);

let updateEmpleado = reactive({
    name: "",
    areasId: selectedAreaId,
    typesId: selectedTipoId,
    color: "",
    placa: ''
});

const router = useRouter();
const route = useRoute();

onMounted(async() => {
    axios.get(`http://localhost:3001/employees/${route.params.id}`)
    .then((response) => {
        updateEmpleado.name = response.data.name;
        updateEmpleado.areasId = response.data.areasId;
        updateEmpleado.typesId = response.data.typesId;
        updateEmpleado.color = response.data.color;
        updateEmpleado.placa = response.data.placa;
    });
    const responsea = await axios.get('http://localhost:3001/areas'); // Cambia la URL si es necesario
    areas.value = responsea.data;
    const responset = await axios.get('http://localhost:3001/types'); // Cambia la URL si es necesario
    tipos.value = responset.data;
    const selectedArea = areas.value.find(area => area.id === updateEmpleado.areasId);
    const selectedTipo = tipos.value.find(tipo => tipo.id === updateEmpleado.typesId);
    if (selectedArea) {
      selectedAreaId.value = selectedArea.id;
    }
    if (selectedTipo) {
      selectedTipoId.value = selectedTipo.id;
    }
})

const editEmpleado = () =>{
    axios.put(`http://localhost:3001/employees/${route.params.id}`, updateEmpleado)
    .then(() => {
       router.push("/empleados");
    });
};
</script>
<template>
    <div class="container w-50">
        <div class="card">
            <div class="card-header">
                <h4>Editar empleado</h4>
                <p>Este es un icono de Bootstrap: <i class="bi bi-alarm"></i></p>
            </div>
            <div class="card-body">
                <form @submit.prevent="editEmpleado">
                    <div class="mb-3">
                            <label for="">Nombre</label>
                            <input type="text" v-model="updateEmpleado.name" class="form-control" id="txtName"/>
                        </div>
                        
                        <div class="mb-3">
                            <label for="">Area</label>
                            <select v-model="selectedAreaId" id="user-select" class="form-control">
                                <option v-for="(area, index) in areas" :key="index" :value="area.id">{{area.name}}</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="">Tipo</label>
                            <select v-model="selectedTipoId" id="tipo-select" class="form-control">
                                <option v-for="(tipo, index) in tipos" :key="index" :value="tipo.id">{{tipo.name}}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="">Color</label>
                            <input type="text" v-model="updateEmpleado.color" class="form-control" id="txtColor" />
                        </div>
                        <div class="mb-3">
                            <label for="">Placa</label>
                            <input type="text" v-model="updateEmpleado.placa" class="form-control" id="txtPlaca" />
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary"> Actualizar</button>
                            <RouterLink class="btn btn-info m-2 float-end" to="/empleados">Cancelar</RouterLink>
                        </div>
                </form>
            </div>
        </div>
        
    </div>
</template>
<style>
</style>
