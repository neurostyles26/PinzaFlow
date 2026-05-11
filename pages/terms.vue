<template>
  <div class="min-h-screen bg-background text-white p-8 md:p-20">
    <div class="max-w-4xl mx-auto space-y-12">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-primary hover:underline mb-8">
        <ArrowLeft class="w-4 h-4" />
        Back to Home
      </NuxtLink>

      <header class="space-y-4">
        <h1 class="text-4xl md:text-6xl font-black">Terms of Service</h1>
        <p class="text-text-secondary">Last updated: May 2026</p>
      </header>

      <section class="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
          <p>By accessing and using PinFlowser, you agree to comply with these Terms of Service. This platform is owned and operated by Edisson Pinza.</p>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-white">2. Description of Service</h2>
          <p>PinFlowser is an AI-powered CRM designed to optimize sales conversations on WhatsApp. We provide tools for lead qualification, suggested replies, and sales analysis.</p>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-white">3. User Responsibilities</h2>
          <p>You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to use the service in compliance with all applicable laws in your jurisdiction.</p>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-white">4. Intellectual Property</h2>
          <p>The PinFlowser platform, including its AI models, code, design, and branding, is the exclusive property of Edisson Pinza. Any unauthorized reproduction or distribution is strictly prohibited.</p>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-white">5. Limitation of Liability</h2>
          <p>PinFlowser is provided "as is". We are not liable for any direct or indirect damages resulting from the use of our services or any AI-generated suggestions.</p>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-white">6. Contact</h2>
          <p>For legal inquiries, contact <span class="text-primary">pinzasoporte@gmail.com</span>.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
definePageMeta({ layout: false })
</script>
