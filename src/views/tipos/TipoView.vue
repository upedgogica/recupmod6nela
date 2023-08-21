<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col -md-6 offset-md-0">
                    <div class="row justify-content-between">
                        <div class="col-4">
                            <RouterLink class="btn btn-primary m-2 float-end" to="/add-tipos"><i class="bi bi-car-front"></i> Registrar
                                Tipo movilidad </RouterLink>
                            </div>
                            
                    </div>
                </div>    
             </div>
        </div>   

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>
                        Id
                    </th>
                    <th>
                        Nombre
                    </th>
                    <th>
                        Acción
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(tip, index) in this.tipos" :key="index">
                    <td>{{ tip.id }}</td>
                    <td>{{ tip.name }}</td>
                    <td>
                        <RouterLink class="btn btn-warning" :to="`/edit-tipos/${tip.id}`"><i class="bi bi-pencil"></i>
                        </RouterLink>
                        <button class="btn btn-danger btn-md" @click="showDeleteModal(tip.id)"><i
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
import Modal from './ModalDeleteTipo.vue';
import axios from 'axios';

export default {
    name: 'Tipo-View',
    components: {
        Modal,
    },
    data() {
        return {
            modalTitle: "",
            tipos: [],
            id: 0,
            name: "",
            isLoading: false,
            records: [],
            isModalVisible: false,
            recordToDelete: null

        };
    },
    methods: {
        refreshData() {
            axios.get('http://localhost:3001/types')
                .then((response) => {
                    this.tipos = response.data;
                });
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