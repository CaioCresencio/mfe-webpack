<script setup lang="ts">

import { defineAsyncComponent, ref, type VNode, h } from 'vue';



// const mfePost = defineAsyncComponent({
// 	loader: () => import("mfePost/Button"),
// 	errorComponent: (): VNode => h("p", "Erro ao importar componente remoto"),
// });


  // const todoList = ref<string[]>([]);

  // const inputTodo = ref("");

  // const addTodo = () => {
  //   todoList.value.push(inputTodo.value);
  //   // clearInputTodo()
  // }
  // const clearInputTodo = () => {
  //   inputTodo.value = "";
  // }
</script>

<template>
  <div class="greetings">
    <h1 class="green"></h1>     
    <h2>HOST</h2> 
      <Todo/>
   
  </div>
</template>

<style scoped>

</style>
