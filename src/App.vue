<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-secondary">
      <router-link to="/" class="navbar-brand">USIP-M6: </router-link>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Empleados
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item"> <router-link to="/empleados" class="nav-link">Ver Empleados</router-link></a>
        </div>
      </div>
      
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Movilidad
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item"> <router-link to="/tipos" class="nav-link">Ver Movilidades</router-link></a>
        </div>
      </div>

      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Area personal
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item"> <router-link to="/areas" class="nav-link">Ver areas</router-link></a>
        </div>
      </div>

      <router-link to="/" class="navbar-brand">Acerca de</router-link>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

