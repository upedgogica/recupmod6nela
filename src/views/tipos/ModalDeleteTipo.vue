<template>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <p>¿Estás seguro de que deseas eliminar este registro?</p>
        <p>{{ recordToDelete }}</p>
        <button @click="deleteRecord">Eliminar</button>
        <button @click="closeModal">Cancelar</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      showModal: Boolean,
      recordToDelete: Object,
    },
    methods: {
      deleteRecord() {
        axios
          .delete(`http://localhost:3001/types/${this.recordToDelete}`)
          .then(() => {
            this.$emit('recordDeleted');
            this.closeModal();
          })
          .catch(error => {
            console.error('Error al eliminar el registro', error);
          });
      },
      closeModal() {
        this.$emit('closeModal');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos del modal */
  .modal {
    position: fixed;
    top: 0;
    left: 50;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 640px;
      width: 80%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      
      button {
        padding: 20px 30px;
        border: none;
        font-size: 16px;
        background-color: crimson;
        color: #fff;
        cursor: pointer;
      }
  }
  </style>
  