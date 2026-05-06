<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Automations</h1>
        <p class="text-text-secondary mt-1">Set up AI-powered auto-responses and workflows for your WhatsApp business.</p>
      </div>
      <div class="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
        <Sparkles class="w-4 h-4 text-primary" />
        <span class="text-xs font-bold text-primary">{{ activeCount }} Active</span>
      </div>
    </div>

    <!-- Automation Templates -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="automation in automations" 
        :key="automation.id"
        class="card group hover:border-white/10 transition-all duration-300 relative overflow-hidden"
      >
        <!-- Glow effect when active -->
        <div v-if="automation.active" class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

        <div class="flex items-start justify-between mb-4">
          <div class="p-2.5 rounded-xl" :style="{ backgroundColor: automation.color + '1a', color: automation.color }">
            <component :is="automation.icon" class="w-5 h-5" />
          </div>
          <button 
            @click="toggleAutomation(automation)"
            class="relative w-11 h-6 rounded-full transition-all duration-300"
            :class="automation.active ? 'bg-primary' : 'bg-white/10'"
          >
            <div 
              class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300"
              :class="automation.active ? 'left-[22px]' : 'left-0.5'"
            ></div>
          </button>
        </div>

        <h3 class="font-bold text-lg">{{ automation.name }}</h3>
        <p class="text-sm text-text-secondary mt-2 leading-relaxed">{{ automation.description }}</p>

        <div class="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <div class="flex items-center gap-4 text-xs text-text-secondary">
            <div class="flex items-center gap-1.5">
              <Activity class="w-3 h-3" />
              <span>{{ automation.triggered }} triggered</span>
            </div>
          </div>
          <button @click="openConfig(automation)" class="text-xs text-primary font-bold hover:underline">
            Configure
          </button>
        </div>
      </div>
    </div>

    <!-- Info Banner -->
    <div class="card bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-primary/10">
      <div class="flex items-start gap-4">
        <div class="p-3 bg-primary/10 rounded-xl flex-shrink-0">
          <Bot class="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 class="font-bold">How Automations Work</h3>
          <p class="text-sm text-text-secondary mt-2 leading-relaxed">
            Automations use AI to process incoming WhatsApp messages and respond automatically based on your configured rules. 
            They work 24/7, even when you're offline, to ensure your customers always get a response. 
            Toggle them on or off anytime.
          </p>
          <div class="flex gap-3 mt-4">
            <div class="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-xs text-text-secondary">
              <Zap class="w-3 h-3 text-primary" />
              Instant replies
            </div>
            <div class="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-xs text-text-secondary">
              <Clock class="w-3 h-3 text-primary" />
              24/7 availability
            </div>
            <div class="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-xs text-text-secondary">
              <Shield class="w-3 h-3 text-primary" />
              Human oversight
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════ CONFIG MODAL ═══════════ -->
    <Teleport to="body">
      <div v-if="showConfigModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showConfigModal = false"></div>
        <div class="relative w-full max-w-md bg-surface border border-white/10 rounded-2xl shadow-2xl p-6 space-y-5 z-10">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold">{{ configAutomation?.name }}</h3>
            <button @click="showConfigModal = false" class="p-1 text-text-secondary hover:text-white">
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Custom Message</label>
              <textarea 
                v-model="configAutomation.customMessage"
                rows="3" 
                class="input-field w-full resize-none text-sm"
                placeholder="Enter your custom auto-reply message..."
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Trigger Conditions</label>
              <select class="input-field w-full text-sm">
                <option>All incoming messages</option>
                <option>First message from new contacts</option>
                <option>Messages outside business hours</option>
                <option>Messages containing specific keywords</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Response Delay</label>
              <select class="input-field w-full text-sm">
                <option>Instant</option>
                <option>After 30 seconds</option>
                <option>After 1 minute</option>
                <option>After 5 minutes</option>
              </select>
            </div>
          </div>

          <div class="flex gap-3 pt-2">
            <button @click="showConfigModal = false" class="flex-1 px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-medium">
              Cancel
            </button>
            <button @click="saveConfig" class="flex-1 btn-primary">
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { 
  Sparkles,
  MessageCircle,
  UserCheck,
  Bell,
  Clock,
  CalendarCheck,
  ShoppingBag,
  Activity,
  Bot,
  Zap,
  Shield,
  X
} from 'lucide-vue-next'

const showConfigModal = ref(false)
const configAutomation = ref(null)

const automations = ref([
  {
    id: 1,
    name: 'Welcome Message',
    description: 'Automatically greet new contacts with a personalized welcome message when they first reach out.',
    icon: MessageCircle,
    color: '#22C55E',
    active: true,
    triggered: 128,
    customMessage: '¡Hola! 👋 Gracias por contactarnos. Un asesor te atenderá en breve. ¿En qué podemos ayudarte?'
  },
  {
    id: 2,
    name: 'Away Auto-Reply',
    description: 'Send automatic responses when you\'re offline or outside business hours to keep customers engaged.',
    icon: Clock,
    color: '#3B82F6',
    active: true,
    triggered: 342,
    customMessage: 'Estamos fuera de horario. Te responderemos a primera hora. ¡Gracias por tu paciencia!'
  },
  {
    id: 3,
    name: 'Follow-Up Reminder',
    description: 'Automatically remind you to follow up with clients who haven\'t responded in 24 hours.',
    icon: Bell,
    color: '#F59E0B',
    active: false,
    triggered: 56,
    customMessage: ''
  },
  {
    id: 4,
    name: 'Lead Qualification',
    description: 'Use AI to ask qualifying questions and tag leads based on their responses automatically.',
    icon: UserCheck,
    color: '#8B5CF6',
    active: false,
    triggered: 0,
    customMessage: ''
  },
  {
    id: 5,
    name: 'Appointment Booking',
    description: 'Let customers book appointments through WhatsApp with automated scheduling responses.',
    icon: CalendarCheck,
    color: '#EC4899',
    active: false,
    triggered: 0,
    customMessage: ''
  },
  {
    id: 6,
    name: 'Order Status',
    description: 'Automatically respond to order status inquiries with real-time tracking information.',
    icon: ShoppingBag,
    color: '#14B8A6',
    active: false,
    triggered: 0,
    customMessage: ''
  }
])

const activeCount = computed(() => automations.value.filter(a => a.active).length)

const toggleAutomation = (automation) => {
  automation.active = !automation.active
}

const openConfig = (automation) => {
  configAutomation.value = { ...automation }
  showConfigModal.value = true
}

const saveConfig = () => {
  const idx = automations.value.findIndex(a => a.id === configAutomation.value.id)
  if (idx !== -1) {
    automations.value[idx].customMessage = configAutomation.value.customMessage
  }
  showConfigModal.value = false
}
</script>
