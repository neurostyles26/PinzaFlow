<template>
  <div class="min-h-screen bg-background text-white p-8 md:p-20 relative overflow-hidden">
    <!-- Ambient Glows -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>

    <div class="max-w-4xl mx-auto space-y-12 relative z-10">
      <!-- Back Button -->
      <NuxtLink to="/" class="inline-flex items-center gap-3 text-text-secondary hover:text-white transition-all group mb-8">
        <div class="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
          <ArrowLeft class="w-5 h-5" />
        </div>
        <span class="font-bold text-sm">Regresar al Inicio</span>
      </NuxtLink>

      <header class="space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
          Legal
        </div>
        <h1 class="text-4xl md:text-7xl font-black tracking-tighter">Términos de <span class="text-primary">Servicio</span></h1>
        <p class="text-text-secondary font-medium">Última actualización: Mayo 2026</p>
      </header>

      <section class="space-y-12 text-text-secondary leading-relaxed font-medium">
        <div class="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">01</span>
            Aceptación de Términos
          </h2>
          <p>Al acceder y utilizar PinFlowser, aceptas cumplir con estos Términos de Servicio. Esta plataforma es propiedad y está operada por <span class="text-white font-bold">Edisson Pinza</span>.</p>
        </div>

        <div class="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">02</span>
            Descripción del Servicio
          </h2>
          <p>PinFlowser es un CRM impulsado por IA diseñado para optimizar las conversaciones de ventas en WhatsApp. Proporcionamos herramientas para la calificación de leads, respuestas sugeridas y análisis de ventas avanzado.</p>
        </div>

        <div class="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">03</span>
            Responsabilidades del Usuario
          </h2>
          <p>Eres responsable de mantener la confidencialidad de tu cuenta y de todas las actividades que ocurran bajo ella. Aceptas usar el servicio cumpliendo con todas las leyes aplicables en tu jurisdicción.</p>
        </div>

        <div class="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">04</span>
            Propiedad Intelectual
          </h2>
          <p>La plataforma PinFlowser, incluyendo sus modelos de IA, código, diseño y marca, es propiedad exclusiva de Edisson Pinza. Cualquier reproducción o distribución no autorizada está estrictamente prohibida.</p>
        </div>

        <div class="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">05</span>
            Limitación de Responsabilidad
          </h2>
          <p>PinFlowser se proporciona "tal cual". No somos responsables de ningún daño directo o indirecto resultante del uso de nuestros servicios o de cualquier sugerencia generada por la IA.</p>
        </div>

        <div class="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-4">
          <h2 class="text-2xl font-bold text-white">Consultas Legales</h2>
          <p>Para cualquier consulta legal, contáctanos en <a href="mailto:pinzasoporte@gmail.com" class="text-primary font-bold hover:underline">pinzasoporte@gmail.com</a>.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
definePageMeta({ layout: false })
</script>
