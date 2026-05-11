<template>
  <Transition name="fade">
    <div v-if="loading" class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F172A]">
      <!-- Background Decorative Glows -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
      
      <div class="relative flex flex-col items-center">
        <!-- Logo Animation -->
        <div class="relative w-24 h-24 mb-8">
          <!-- Outer Rotating Ring -->
          <div class="absolute inset-0 border-4 border-primary/20 rounded-[2rem] rotate-45"></div>
          <div class="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-[2rem] rotate-45 animate-spin-slow"></div>
          
          <!-- Inner Glowing Core -->
          <div class="absolute inset-4 bg-gradient-to-br from-primary to-emerald-400 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] flex items-center justify-center overflow-hidden group">
            <span class="text-background text-4xl font-black italic">P</span>
            <!-- Scanning Light Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-scan"></div>
          </div>
        </div>

        <!-- Text Animation -->
        <div class="flex flex-col items-center gap-2">
          <h2 class="text-3xl font-black tracking-tighter text-white">
            Pin<span class="text-primary">Flowser</span>
          </h2>
          <div class="flex gap-1">
            <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      <!-- Loading Progress Line -->
      <div class="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-blue-500 transition-all duration-1000 ease-out" :style="{ width: progress + '%' }"></div>
    </div>
  </Transition>
</template>

<script setup>
const loading = ref(true)
const progress = ref(0)

onMounted(() => {
  // Simulate loading progress
  const interval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 30
    }
  }, 200)

  // Ensure it stays for at least 1.5s for impact
  setTimeout(() => {
    progress.value = 100
    setTimeout(() => {
      loading.value = false
    }, 400)
  }, 1800)
})
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-scan {
  animation: scan 1.5s infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
