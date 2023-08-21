<template>
    <div>
      <h1>Buscador en Tiempo Real</h1>
      <input v-model="searchTerm" type="text" placeholder="Buscar...">
      <ul v-if="searchResults.length">
        <li v-for="result in searchResults" :key="result.id">{{ result.name }}</li>
      </ul>
      <p v-else>No se encontraron resultados.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const searchTerm = ref('');
  const searchResults = ref([
    { id: 1, name: 'Resultado 1' },
    { id: 2, name: 'Resultado 2' },
    { id: 3, name: 'Resultado 3' },
    // ... otros resultados ...
  ]);
  
  const filteredResults = computed(() => {
    return searchResults.value.filter(result =>
      result.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
  </script>