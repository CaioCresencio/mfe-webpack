<template>
  <div class="greetings">
    <h1 class="green">TESTE2</h1>      
   
      <button type="button" @click="count()">Add</button>
      <div >
        <ul>
          aqui {{ countNumber }}
       
        </ul>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const countNumber = ref(0);
const count = () => {
  countNumber.value = countNumber.value + 1;
}
</script>

