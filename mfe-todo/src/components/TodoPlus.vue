<template>
  <div>
    <div style="color: red;">teste</div>
    <div>Contagem: {{ count }}</div>
    <button @click="incrementCount">Incrementar</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, onMounted } from 'vue';

onMounted(() => {
  count.value = 1;
})
const count = ref(0);
const incrementCount = () => {
  count.value = count.value+1;
}

</script>
