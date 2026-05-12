<template>
  <div class="space-y-12 pb-16">
    <div class="space-y-4">
      <h2 class="text-sm font-black text-primary uppercase tracking-[0.3em]">Suscripción</h2>
      <h3 class="text-4xl md:text-5xl font-black text-white tracking-tighter">Gestiona tu <span class="text-primary">Plan</span></h3>
      <p class="text-text-secondary text-lg max-w-2xl font-medium">
        Tu plan actual es <span class="text-white font-bold">{{ currentPlanName }}</span>. Actualiza tu suscripción para desbloquear funciones avanzadas.
      </p>
    </div>

    <!-- Current Plan Banner -->
    <div class="p-8 rounded-[3rem] bg-gradient-to-br from-primary/20 to-surface border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="flex items-center gap-6">
        <div class="w-20 h-20 rounded-[2rem] bg-primary/20 flex items-center justify-center border border-primary/30">
          <Zap class="w-10 h-10 text-primary" />
        </div>
        <div>
          <h4 class="text-2xl font-black text-white">{{ currentPlanName }}</h4>
          <p class="text-text-secondary font-medium">Estado: <span class="text-emerald-400">Activo</span></p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right hidden md:block">
          <p class="text-xs text-text-secondary uppercase tracking-widest font-black">Próximo cobro</p>
          <p class="text-white font-bold">Junio 12, 2026</p>
        </div>
        <button class="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm">
          Descargar Factura
        </button>
      </div>
    </div>

    <!-- Plans Comparison -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="plan in plans" :key="plan.id" 
        class="p-8 rounded-[3rem] bg-surface/40 border transition-all duration-500 flex flex-col"
        :class="profile?.subscription_plan === plan.id ? 'border-primary border-2 shadow-[0_0_50px_-10px_rgba(34,197,94,0.3)]' : 'border-white/5 hover:border-white/20'"
      >
        <div class="space-y-6 flex-1">
          <div class="flex justify-between items-start">
            <h3 class="text-2xl font-black text-white">{{ plan.name }}</h3>
            <div v-if="profile?.subscription_plan === plan.id" class="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-black text-primary uppercase tracking-widest">
              Tu Plan
            </div>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-4xl font-black text-white">{{ plan.price }}</span>
            <span class="text-text-secondary font-bold">/mes</span>
          </div>
          <p class="text-sm text-text-secondary font-medium">{{ plan.description }}</p>
          
          <ul class="space-y-4 pt-6 border-t border-white/5">
            <li v-for="feat in plan.features" :key="feat" class="flex items-center gap-3 text-sm text-text-secondary font-medium">
              <Check class="w-5 h-5 text-primary" /> {{ feat }}
            </li>
          </ul>
        </div>

        <button 
          v-if="profile?.subscription_plan !== plan.id"
          @click="updateUserPlan(plan.id)"
          :disabled="updating === plan.id"
          class="mt-10 w-full py-5 rounded-2xl font-black text-center transition-all"
          :class="plan.recommended ? 'bg-primary text-background shadow-xl shadow-primary/20 hover:scale-105' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'"
        >
          {{ updating === plan.id ? 'Procesando...' : 'Cambiar a ' + plan.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Zap, Check } from 'lucide-vue-next'

const { profile, updateProfile, fetchProfile } = usePinza()
const updating = ref(null)

const plans = [
  { 
    id: 'Emprendedor', 
    name: 'Emprendedor', 
    price: '$50k', 
    description: 'Perfecto para empezar a automatizar.',
    features: ['500 Mensajes IA / mes', 'CRM Básico', '1 Número de WhatsApp', 'Soporte Estándar']
  },
  { 
    id: 'Pro', 
    name: 'Plan Pro', 
    price: '$120k', 
    description: 'Para negocios que buscan escalar rápido.',
    recommended: true,
    features: ['Mensajes IA Ilimitados', 'Entrenamiento IA (Catálogos/PDF)', 'Dashboard de Analíticas', 'Soporte Prioritario']
  },
  { 
    id: 'Enterprise', 
    name: 'Enterprise', 
    price: '$250k', 
    description: 'Solución a medida para grandes equipos.',
    features: ['Agentes Ilimitados', 'API Personalizada', 'Automatización Avanzada', 'Account Manager Dedicado']
  }
]

const currentPlanName = computed(() => {
  const plan = plans.find(p => p.id === profile.value?.subscription_plan)
  return plan ? plan.name : 'Emprendedor'
})

const updateUserPlan = async (planId) => {
  updating.value = planId
  try {
    await updateProfile({ subscription_plan: planId })
    alert(`¡Felicidades! Tu plan ha sido actualizado a ${planId}`)
  } catch (e) {
    alert('Error al actualizar el plan. Por favor contacta a soporte.')
  } finally {
    updating.value = null
  }
}

onMounted(() => {
  fetchProfile()
})
</script>

<style scoped>
.btn-upgrade {
  @apply bg-primary text-background font-black;
}
</style>
