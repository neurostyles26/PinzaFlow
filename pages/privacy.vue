<template>
  <div class="min-h-screen bg-background text-white p-8 md:p-20 relative overflow-hidden">
    <!-- Ambient Glows -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

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
        <h1 class="text-4xl md:text-7xl font-black tracking-tighter">Política de <span class="text-primary">Privacidad</span></h1>
        <p class="text-text-secondary font-medium">Última actualización: Mayo 2026</p>
      </header>

      <section class="space-y-12 text-text-secondary leading-relaxed font-medium">
        <div class="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">01</span>
            Introducción
          </h2>
          <p>En PinFlowser, nos tomamos muy en serio tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tus datos personales y los datos de tus clientes al utilizar nuestra plataforma de CRM y Automatización de Ventas con IA para WhatsApp.</p>
        </div>

        <div class="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">02</span>
            Datos que Recopilamos
          </h2>
          <p>Recopilamos la información necesaria para proporcionar nuestros servicios, incluyendo:</p>
          <ul class="space-y-3 pl-4 border-l-2 border-primary/20">
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
              <span>Información de cuenta (Nombre, Correo Electrónico, Teléfono).</span>
            </li>
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
              <span>Datos de WhatsApp Business (Mensajes, Contactos) estrictamente para análisis de IA y organización de CRM.</span>
            </li>
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
              <span>Datos de uso e interacciones con las sugerencias de la IA.</span>
            </li>
          </ul>
        </div>

        <div class="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">03</span>
            Uso de Inteligencia Artificial
          </h2>
          <p>Nuestra IA procesa los datos de las conversaciones para proporcionar sugerencias en tiempo real y calificación de leads. <span class="text-white font-bold">No utilizamos tus datos comerciales privados para entrenar modelos globales de IA sin tu consentimiento explícito.</span></p>
        </div>

        <div class="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">04</span>
            Protección de Datos
          </h2>
          <p>Implementamos medidas de seguridad estándar de la industria, incluyendo cifrado de extremo a extremo para comunicaciones sensibles y almacenamiento seguro en bases de datos a través de Supabase.</p>
        </div>

        <div class="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-4">
          <h2 class="text-2xl font-bold text-white">¿Tienes preguntas?</h2>
          <p>Si tienes alguna duda sobre esta política, contáctanos en <a href="mailto:pinzasoporte@gmail.com" class="text-primary font-bold hover:underline">pinzasoporte@gmail.com</a>.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
definePageMeta({ layout: false })
</script>
