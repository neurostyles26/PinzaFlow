<template>
  <div class="min-h-screen bg-background text-white p-8 md:p-20">
    <div class="max-w-4xl mx-auto space-y-12">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-primary hover:underline mb-8">
        <ArrowLeft class="w-4 h-4" />
        Back to Home
      </NuxtLink>

      <header class="space-y-4">
        <h1 class="text-4xl md:text-6xl font-black">Privacy Policy</h1>
        <p class="text-text-secondary">Last updated: May 2026</p>
      </header>

      <section class="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-white">1. Introduction</h2>
          <p>At PinFlowser, we take your privacy seriously. This policy explains how we collect, use, and protect your personal data and the data of your clients when you use our WhatsApp CRM and AI Sales Clouser platform.</p>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-white">2. Data We Collect</h2>
          <p>We collect information necessary to provide our services, including:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Account Information (Name, Email, Phone Number).</li>
            <li>WhatsApp Business Data (Messages, Contacts, Statuses) strictly for AI analysis and CRM organization.</li>
            <li>Usage Data (Interactions with AI suggestions, conversion rates).</li>
          </ul>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-white">3. How We Use AI</h2>
          <p>Our AI Sales Clouser processes conversation data to provide real-time suggestions and lead qualification. We do not use your private business data to train global AI models without explicit consent.</p>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-white">4. Data Protection</h2>
          <p>We implement industry-standard security measures, including end-to-end encryption for sensitive communications and secure database storage in Supabase.</p>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-white">5. Contact Us</h2>
          <p>If you have any questions about this policy, please contact us at <span class="text-primary">pinzasoporte@gmail.com</span>.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
definePageMeta({ layout: false })
</script>
