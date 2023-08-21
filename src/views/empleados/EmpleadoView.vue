<template>
    <div>
        <div class="container">
            <div class="row justify-content-between">
                <div class="col-4">
                    <RouterLink class="btn btn-primary m-2 float-end" to="/add-empleados"><i class="bi bi-person-plus"></i> Registrar
                    empleado</RouterLink>
                </div>
                <div class="col-4">
                   <div class="input-group ">
                        <input v-model="searchTerm" type="text" class="form-control m-2 float-end" placeholder="Buscar...">
                        <button class="btn btn-success m-2 float-end " @click="search"><i class="bi bi-search"></i> Buscar empleado</button>
                    </div>
                </div>
            </div>
        </div>    
        <p>Resultados de la búsqueda:</p>
            <ul>
                <li v-for="result in searchResults" :key="result.id">{{ result.name }}</li>
            </ul>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>
                        Nombre
                    </th>
                    <th>
                        Area
                    </th>
                    <th>
                        Tipo
                    </th>
                    <th>
                        Color
                    </th>
                    <th>
                        Placa
                    </th>
                    <th>
                        Acción
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(emp, index) in this.empleados" :key="index">
                    <td>{{ emp.name }}</td>
                    <td>{{ getAreas(emp.areasId) }}</td>
                    <td>{{ getTipos(emp.typesId) }}</td>
                    <td>{{ emp.color }}</td>
                    <td>{{ emp.placa }}</td>
                    <td>
                        <RouterLink class="btn btn-warning" :to="`/edit-empleados/${emp.id}`"><i class="bi bi-pencil"></i>
                        </RouterLink>
                        <button class="btn btn-danger btn-md" @click="showDeleteModal(emp.id)"><i
                                class="bi bi-trash"></i></button>
                    </td>
                </tr>
            </tbody>


        </table>

        <Modal :showModal="isModalVisible" :recordToDelete="recordToDelete" @recordDeleted="handleRecordDeleted"
            @closeModal="closeModal" />

    </div>
</template>

<script>
import Modal from '../../components/ModalComponent.vue';
import axios from 'axios';

export default {
    name: 'Empleado-View',
    components: {
        Modal,
    },
    data() {
        return {
            modalTitle: "",
            empleados: [],
            id: 0,
            name: "",
            areasId: "",
            typesId: "",
            color: "",
            placa: "",
            isLoading: false,

            records: [],
            isModalVisible: false,
            recordToDelete: null,

            areas: {},
            tipos: {}
        };
    },
    methods: {
        refreshData() {
            axios.get('http://localhost:3001/employees')
                .then((response) => {
                    this.empleados = response.data;
                });
            axios.get('http://localhost:3001/areas')
                .then(response => {
                    this.areas = response.data.reduce((acc, areas) => {
                        acc[areas.id] = areas.name;
                        return acc;
                    }, {});
                }).catch(error => {
                    console.error('Error fetching user details:', error);
                });
            axios.get('http://localhost:3001/types')
                .then(response => {
                    this.tipos = response.data.reduce((acc, tipos) => {
                        acc[tipos.id] = tipos.name;
                        return acc;
                    }, {});
                }).catch(error => {
                    console.error('Error fetching user details:', error);
                });
        },
        getAreas(areasId) {
            return this.areas[areasId] || 'Cargando...';
        },
        getTipos(tiposId) {
            return this.tipos[tiposId] || 'Cargando...';
        },
        showDeleteModal(record) {
            this.isModalVisible = true;
            this.recordToDelete = record;
        },
        closeModal() {
            this.isModalVisible = false;
            this.recordToDelete = null;
        },
        handleRecordDeleted() {
            this.refreshData();
        },
    },

    mounted() {
        this.isLoading = true;
        this.refreshData();
    }
};
</script>