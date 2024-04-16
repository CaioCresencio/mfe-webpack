
import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
// const remoteTodo = defineAsyncComponent(() => import("remoteMfe/Todo"));

const app = createApp(App)

// app.component("Todo", remoteTodo);
app.mount('#app')
