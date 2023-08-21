<script  setup>
import { onMounted } from 'vue';
import { reactive} from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';

const tipos=[];


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3001/types'); // Cambia la URL si es necesario
    tipos.value = response.data;
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const newTipo = reactive({
    name: '',
});



const router = useRouter();

function addNewTipo() {
    axios.post("http://localhost:3001/types", newTipo)
    .then(() =>{
        router.push("/tipos");
    });
}




</script>
<template>
    <div class="container w-50">
        <div class="card">
            <div class="card-header">
                <h4>Registrar tipo movilidad</h4>
            </div>
            <div class="card-body">
                <form @submit.prevent="addNewTipo">
                    <div class="mb-3">
                            <label for="">Tipo movilidad</label>
                            <input type="text" v-model="newTipo.name" class="form-control" id="txtName" required/>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary"> Guardar</button>
                            <RouterLink class="btn btn-info m-2 float-end" to="/tipos">Cancelar</RouterLink>
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