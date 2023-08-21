<script setup>
import {reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const tipos = [];

let updateTipo = reactive({
    name: ""
});

const router = useRouter();
const route = useRoute();

onMounted(async() => {
    axios.get(`http://localhost:3001/types/${route.params.id}`)
    .then((response) => {
        updateTipo.name = response.data.name;
    });
    const responset = await axios.get('http://localhost:3001/types'); // Cambia la URL si es necesario
    tipos.value = responset.data;
})

const editTipo = () =>{
    axios.put(`http://localhost:3001/types/${route.params.id}`, updateTipo)
    .then(() => {
       router.push("/tipos");
    });
};
</script>
<template>
    <div class="container w-50">
        <div class="card">
            <div class="card-header">
                <h4>Editar tipo movilidad</h4>
            </div>
            <div class="card-body">
                <form @submit.prevent="editTipo">
                    <div class="mb-3">
                            <label for="">Tipo movilidad</label>
                            <input type="text" v-model="updateTipo.name" class="form-control" id="txtName" required/>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary"> Actualizar</button>
                            <RouterLink class="btn btn-info m-2 float-end" to="/tipos">Cancelar</RouterLink>
                        </div>
                </form>
            </div>
        </div>
        
    </div>
</template>
<style>
</style>
