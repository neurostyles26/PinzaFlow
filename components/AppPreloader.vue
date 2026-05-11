<template>
  <Transition name="fade">
    <div v-if="loading" class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F172A]">
      <!-- Background Decorative Glows -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
      
      <div class="relative flex flex-col items-center">
        <!-- Logo Animation -->
        <div class="relative w-32 h-32 mb-8 flex items-center justify-center">
          <!-- Outer Rotating Rings -->
          <div class="absolute inset-0 border-2 border-primary/10 rounded-[2.5rem] rotate-45 animate-pulse"></div>
          <div class="absolute inset-2 border-b-2 border-primary rounded-[2rem] animate-spin-slow"></div>
          <div class="absolute inset-4 border-t-2 border-blue-500 rounded-[1.5rem] animate-spin-slow-reverse"></div>
          
          <!-- Logo Core -->
          <div class="relative w-20 h-20 bg-gradient-to-br from-white/5 to-white/10 rounded-[1.5rem] p-0.5 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden group">
            <img 
              src="/PinFlowSer-PWA.png" 
              alt="PinFlowser Logo" 
              class="w-full h-full object-contain p-2 animate-float-mini"
            />
            <!-- Scanning Light Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-scan"></div>
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
  animation: spin 3s linear infinite;
}

.animate-spin-slow-reverse {
  animation: spin-reverse 4s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes float-mini {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-float-mini {
  animation: float-mini 3s ease-in-out infinite;
}

.animate-scan {
  animation: scan 2s infinite;
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
