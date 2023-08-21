<template>
    <div>
        <RouterLink class="btn btn-primary m-2 float-end" to="/add-empleados">Registrar area</RouterLink>
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
                <tr v-for="(are, index) in this.areas" :key="index">
                    <td>{{ are.id }}</td>
                    <td>{{ are.name }}</td>
                    <td>
                        <RouterLink class="btn btn-warning" :to="`/edit-areas/${are.id}`">Edit</RouterLink>
                        <button type="button" @click="openDeleteModal" class="btn btn-danger">delete</button>
                    </td>
                </tr>
            </tbody>

        </table>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="d-flex flex-row bd-highlight mb-3">
                            <div class="p-2 w-50 bd-highlight">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Name</span>
                                    <input type="text" class="form-control" v-model="nombre">
                                </div>
                            </div>
                        </div>
                        <button type="button" @click="createClick()" v-if="id == 0" class="btn btn-primary">
                            Create
                        </button>
                        <button type="button" @click="updateClick()" v-if="id != 0" class="btn btn-primary">
                            Update
                        </button>

                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AreaView',
    data() {
        return {
            modalTitle: "",
            areas: [],
            id: 0,
            name: "",
            isLoading: false
        };
    },
    methods: {
        refreshData() {
            axios.get('http://localhost:3001/areas')
                .then((response) => {
                    this.areas = response.data;
                });
        },

        addClick() {
            this.modalTitle = "Registrar areas";
            this.id = 0;
            this.name = "";
        },
        editClick(are) {
            this.modalTitle = "Edit Area";
            this.id = are.id;
            this.name = are.name;
        },
        createClick() {
            axios.post("area", {
                PersonaNombre: this.PersonaNombre,
                PersonaPaterno: this.PersonaPaterno,
                PersonaMaterno: this.PersonaMaterno,
                PersonaTelefono: this.PersonaTelefono
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        updateClick() {
            axios.put("area", {
                id: this.id,
                name: this.name,
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        deleteClick(id) {
            if (!confirm("Está seguro de eliminar?")) {
                return;
            }
            axios.delete("area/" + id)
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        }
    },
    mounted() {
        //      this.isLoading= true;
        this.refreshData();
    }
    //   components: { ConfirmDeleteModal }
};
</script>