<template>
  <div class="min-h-screen bg-background text-white selection:bg-primary/30">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 glass border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-10 h-10 rounded-xl shadow-xl shadow-primary/30" />
          <h1 class="text-2xl font-bold tracking-tight">PinFlowser</h1>
        </div>
        
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Features</a>
          <a href="#pricing" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Pricing</a>
          <NuxtLink to="/login" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Login</NuxtLink>
          <NuxtLink to="/signup" class="btn-primary py-2 px-6 text-sm">Get Started</NuxtLink>
        </div>

        <button class="md:hidden text-text-secondary">
          <Menu class="w-6 h-6" />
        </button>
      </div>
    </nav>

    <!-- Hero -->
    <section class="pt-40 pb-20 px-6 relative overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
          <Zap class="w-3 h-3" />
          Tu clouser inteligente siempre activo
        </div>
        <h2 class="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Automate your sales via <span class="text-primary">WhatsApp</span>
        </h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform for small businesses in Latin America to manage conversations, track clients, and increase sales with AI.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <NuxtLink to="/signup" class="btn-primary py-4 px-8 text-lg w-full sm:w-auto">Start Free Trial</NuxtLink>
          <a href="#demo" class="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2">
            <Play class="w-5 h-5" />
            Watch Demo
          </a>
        </div>
      </div>

      <!-- Dashboard Preview -->
      <div class="max-w-6xl mx-auto mt-24 relative perspective-1000">
        <!-- Decorative Glows -->
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]"></div>

        <div class="relative group">
          <!-- Glass effect behind the image -->
          <div class="absolute inset-0 bg-primary/5 rounded-[2.5rem] -rotate-2 group-hover:rotate-0 transition-transform duration-700"></div>
          
          <div class="relative bg-surface/50 backdrop-blur-sm rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_-20px_rgba(34,197,94,0.3)] overflow-hidden transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2">
            <!-- Actual Image -->
            <img 
              src="/Portada-software.png" 
              alt="PinFlowser Dashboard Preview" 
              class="w-full h-auto object-contain block"
            />
            
            <!-- Shimmer effect -->
            <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-20 border-t border-white/5 px-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-white">
            <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-8 h-8 rounded-lg" />
            <span class="font-bold text-xl">PinFlowser</span>
          </div>
          <p class="text-sm text-text-secondary">AI-powered sales clouser for Latin America.</p>
        </div>
        <div v-for="i in 3" :key="i" class="space-y-4">
          <h4 class="font-bold text-sm uppercase tracking-widest text-text-secondary">Column {{ i }}</h4>
          <ul class="space-y-2 text-sm text-text-secondary">
            <li><a href="#" class="hover:text-primary transition-colors">Link 1</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Link 2</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Link 3</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-text-secondary">
        &copy; 2026 PinFlowser. All rights reserved. Made for LatAm small businesses.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Menu, Zap, Play } from 'lucide-vue-next'

definePageMeta({
  layout: false
})
</script>
