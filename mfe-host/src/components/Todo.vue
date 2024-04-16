<script setup lang="ts">

import { defineAsyncComponent, ref, type VNode, h } from 'vue';

const Todo = defineAsyncComponent({
	loader: () => import("remoteMfe/TodoPlus"),
	errorComponent: (): VNode => h("p", "Erro ao importar componente remoto"),
});

</script>

<template>
  <div class="greetings">
    <h1 class="green"></h1>     
    <h2>HOST 1</h2> 
      <Todo/>
  </div>
</template>

<style scoped>

</style>
