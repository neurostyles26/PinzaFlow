<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-6">
    <div class="w-full max-w-2xl text-center space-y-8">
      <!-- 404 Visual -->
      <div class="relative">
        <h1 class="text-[12rem] font-black text-white/5 select-none leading-none">404</h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="p-8 rounded-[3rem] bg-surface border border-white/10 shadow-2xl relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Ghost class="w-20 h-20 text-primary animate-bounce" />
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-4">
        <h2 class="text-4xl font-black text-white tracking-tight">¡Vaya! Página no encontrada</h2>
        <p class="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
          Parece que te has perdido en el flujo. La página que buscas no existe o ha sido movida.
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button @click="handleError" class="btn-primary flex items-center gap-2 px-8 py-4 w-full sm:w-auto">
          <Home class="w-5 h-5" />
          <span class="font-bold">Ir al Inicio</span>
        </button>
        <button @click="$router.back()" class="px-8 py-4 font-bold text-text-secondary hover:text-white transition-all w-full sm:w-auto flex items-center justify-center gap-2">
          <ArrowLeft class="w-5 h-5" />
          Volver atrás
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Ghost, Home, ArrowLeft } from 'lucide-vue-next'

const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.animate-bounce {
  animation: bounce 3s infinite ease-in-out;
}
</style>
