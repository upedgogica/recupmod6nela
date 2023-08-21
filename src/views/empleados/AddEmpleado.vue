<script  setup>
import { ref, onMounted, computed } from 'vue';
import { reactive} from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';

const selectedArea = ref(null);
const areas = ref([]);

const selectedTipo = ref(null);
const tipos = ref([]);
onMounted(async () => {
  try {
    const responsea = await axios.get('http://localhost:3001/areas'); // Cambia la URL si es necesario
    areas.value = responsea.data;
    const responset = await axios.get('http://localhost:3001/types'); // Cambia la URL si es necesario
    tipos.value = responset.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const newEmpleado = reactive({
    name: '',
    areasId: selectedArea,
    typesId: selectedTipo,
    color: '',
    placa: ''
});

//const { selectedArea } = toRefs(selectedArea);
const isInvalidSelect= computed(() => selectedArea.value === null);
const isInvalidSelectTipo = computed(() => selectedTipo.value === null);


const router = useRouter();

function addNewEmpleado() {
    
    if (isInvalidSelect.value) {
        return;
    }
   if (isInvalidSelectTipo.value) {
        return;
    }
    axios.post("http://localhost:3001/employees", newEmpleado)
    .then(() =>{
        router.push("/empleados");
    });
}




</script>
<template>
    <div class="container w-50">
        <div class="card">
            <div class="card-header">
                <h4>Registrar empleado</h4>
            </div>
            <div class="card-body">
                <form @submit.prevent="addNewEmpleado">
                    <div class="mb-3">
                            <label for="">Nombre</label>
                            <input type="text" v-model="newEmpleado.name" class="form-control" id="txtName" required/>
                        </div>
                        <div class="mb-3">
                            <label for="">Area</label>
                            <select v-model="selectedArea" class="form-control"  :class="{ 'error': isInvalidSelect }">
                                <option :value='null' disabled>Seleccione área</option>
                                <option v-for="(option, index) in areas" :key="index" :value="option.id">{{option.name}}</option>
                            </select>
                            <p v-if="isInvalidSelect" class="error-message">Este campo área es requerido.</p>
                        </div>
                        <div class="mb-3">
                            <label for="">Tipo</label>
                            <select v-model="selectedTipo" class="form-control" :class="{ 'error': isInvalidSelectTipo }">
                                <option :value="null" disabled>Seleccione tipo vehículo</option>
                                <option v-for="(option, index) in tipos" :key="index" :value="option.id">{{option.name}}</option>
                            </select>
                            <p v-if="isInvalidSelectTipo" class="error-message">Este campo tipo es requerido.</p>
                        </div>
                        <div class="mb-3">
                            <label for="">Color</label>
                            <input type="text" v-model="newEmpleado.color" class="form-control" id="txtColor" required/>
                            <p v-if="isInvalidColor" class="error-message">Este campo color es requerido.</p>
                        </div>
                        <div class="mb-3">
                            <label for="">Placa</label>
                            <input type="text" v-model="newEmpleado.placa" class="form-control" id="txtPlaca" required/>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary"> Guardar</button>
                            <RouterLink class="btn btn-info m-2 float-end" to="/empleados">Cancelar</RouterLink>
                        </div>
                </form>
            </div>
        </div>
        
    </div>
</template>
<style>
    .error {
        border-color: red;
    }
    .error-message {
        color: red;
    }
</style>