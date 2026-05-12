<template>
  <div class="w-80 border-l border-white/5 bg-surface/50 flex flex-col h-full overflow-y-auto">
    <!-- Header -->
    <div class="p-4 border-b border-white/5 bg-surface sticky top-0 z-10">
      <div class="flex items-center gap-2 text-primary font-bold">
        <Bot class="w-5 h-5" />
        <h2>Cierre de Ventas IA</h2>
      </div>
      <p class="text-xs text-text-secondary mt-1">Analizando conversación en tiempo real</p>
    </div>

    <div class="p-4 space-y-6 flex-1">
      <!-- Lead Temperature -->
      <div class="space-y-3">
        <h3 class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Temperatura del Lead</h3>
        <div class="flex gap-2">
          <button 
            @click="qualifyLead('cold')"
            class="flex-1 py-1.5 text-xs rounded-md font-medium transition-colors border"
            :class="leadTemperature === 'cold' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10 text-text-secondary'"
          >
            Frío
          </button>
          <button 
            @click="qualifyLead('warm')"
            class="flex-1 py-1.5 text-xs rounded-md font-medium transition-colors border"
            :class="leadTemperature === 'warm' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10 text-text-secondary'"
          >
            Tibio
          </button>
          <button 
            @click="qualifyLead('hot')"
            class="flex-1 py-1.5 text-xs rounded-md font-medium transition-colors border"
            :class="leadTemperature === 'hot' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10 text-text-secondary'"
          >
            Caliente
          </button>
        </div>
      </div>

      <!-- Suggested Replies -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Respuestas Sugeridas</h3>
          <button class="text-primary hover:text-primary-accent p-1" title="Refrescar sugerencias">
            <RefreshCw class="w-3 h-3" />
          </button>
        </div>
        <div class="space-y-2">
          <div 
            v-for="reply in suggestedReplies" 
            :key="reply.id"
            class="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl cursor-pointer transition-all group"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-[10px] font-medium px-2 py-0.5 rounded-full"
                :class="{
                  'bg-blue-500/20 text-blue-400': reply.type === 'follow-up',
                  'bg-yellow-500/20 text-yellow-400': reply.type === 'objection',
                  'bg-green-500/20 text-green-400': reply.type === 'closing'
                }"
              >
                {{ reply.type === 'follow-up' ? 'Seguimiento' : (reply.type === 'objection' ? 'Objeción' : 'Cierre') }}
              </span>
              <Send class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
            </div>
            <p class="text-sm line-clamp-3">{{ reply.text }}</p>
          </div>
        </div>
      </div>

      <!-- Objection Insights -->
      <div class="space-y-3">
        <h3 class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Análisis de Objeciones</h3>
        <div class="space-y-2">
          <div v-for="insight in objectionInsights" :key="insight.id" class="p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-red-400">{{ insight.topic }}</span>
              <span class="text-[10px] text-text-secondary">{{ insight.confidence }}% conf.</span>
            </div>
            <p class="text-xs text-text-secondary">{{ insight.recommendation }}</p>
          </div>
        </div>
      </div>

      <!-- Lead Data Extraction -->
      <div class="p-4 bg-primary/10 border border-primary/20 rounded-2xl space-y-4">
        <div class="flex items-center gap-2">
          <Database class="w-4 h-4 text-primary" />
          <h3 class="text-xs font-black text-primary uppercase tracking-widest">Extracción de Leads</h3>
        </div>
        <div class="space-y-3">
          <div class="space-y-1">
            <span class="text-[10px] text-text-secondary uppercase font-bold">Nombre Completo</span>
            <div class="text-sm font-bold bg-background/50 p-2 rounded-lg border border-white/5 min-h-[32px]">
              {{ extractedData.name || 'Buscando...' }}
            </div>
          </div>
          <div class="space-y-1">
            <span class="text-[10px] text-text-secondary uppercase font-bold">Celular</span>
            <div class="text-sm font-bold bg-background/50 p-2 rounded-lg border border-white/5 min-h-[32px]">
              {{ extractedData.phone || 'Buscando...' }}
            </div>
          </div>
          <div class="space-y-1">
            <span class="text-[10px] text-text-secondary uppercase font-bold">Correo Electrónico</span>
            <div class="text-sm font-bold bg-background/50 p-2 rounded-lg border border-white/5 min-h-[32px]">
              {{ extractedData.email || 'Buscando...' }}
            </div>
          </div>
        </div>
        <button @click="activateExtraction" class="w-full py-2 bg-primary text-background text-xs font-black rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/20">
          ACTIVAR EXTRACCIÓN
        </button>
      </div>

      <!-- Next Actions -->
      <div class="space-y-3">
        <h3 class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Acciones Recomendadas</h3>
        <ul class="space-y-2">
          <li v-for="action in recommendedActions" :key="action.id" class="flex items-center gap-2 text-sm text-text-secondary">
            <CheckCircle2 class="w-4 h-4 text-primary" />
            <span>{{ action.action }}</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup>
import { Bot, Send, RefreshCw, CheckCircle2, Database } from 'lucide-vue-next'

const { 
  suggestedReplies, 
  leadTemperature, 
  recommendedActions, 
  objectionInsights,
  qualifyLead
} = useClouser()

const extractedData = reactive({
  name: '',
  phone: '',
  email: ''
})

const activateExtraction = () => {
  // Simulación de extracción IA
  setTimeout(() => {
    extractedData.name = 'Juan Carlos Rodríguez'
    extractedData.phone = '+57 321 456 7890'
    extractedData.email = 'juan.rodriguez@email.com'
  }, 1500)
}
</script>
