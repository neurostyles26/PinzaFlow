<template>
  <div class="h-full flex gap-6 -m-6 p-6">
    <!-- Chat List -->
    <div class="w-80 flex-shrink-0 flex flex-col glass rounded-2xl overflow-hidden border border-white/5">
      <div class="p-4 border-b border-white/5 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-sm">Conversaciones</h3>
          <button @click="showNewConvModal = true" class="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all" title="Nueva conversación">
            <Plus class="w-4 h-4" />
          </button>
        </div>
        <div class="relative">
          <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input 
            v-model="chatSearch"
            type="text" 
            placeholder="Buscar chats..." 
            class="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex-1 flex items-center justify-center">
        <div class="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>

      <div v-else class="flex-1 overflow-y-auto divide-y divide-white/5">
        <div 
          v-for="conv in filteredConversations" 
          :key="conv.id"
          @click="selectChat(conv)"
          class="p-4 hover:bg-white/5 cursor-pointer transition-all flex items-center gap-3 relative"
          :class="{ 'bg-white/10': selectedChat?.id === conv.id }"
        >
          <div class="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center font-bold relative flex-shrink-0">
            {{ conv.client?.name?.charAt(0) || '?' }}
            <div v-if="conv.status === 'active'" class="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-surface"></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-semibold truncate">{{ conv.client?.name || 'Desconocido' }}</h4>
              <span class="text-[10px] text-text-secondary uppercase flex-shrink-0">{{ formatTime(conv.updated_at) }}</span>
            </div>
            <p class="text-xs text-text-secondary truncate mt-1">{{ conv.last_message || 'Sin mensajes' }}</p>
          </div>
          <div v-if="conv.unread_count > 0" class="absolute right-4 bottom-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-background flex-shrink-0">
            {{ conv.unread_count }}
          </div>
        </div>

        <div v-if="filteredConversations.length === 0" class="p-8 text-center text-text-secondary text-sm">
          No se encontraron conversaciones.
        </div>
      </div>
    </div>

    <!-- Active Chat -->
    <div v-if="selectedChat" class="flex-1 flex flex-col glass rounded-2xl overflow-hidden border border-white/5">
      <!-- Chat Header -->
      <header class="p-4 border-b border-white/5 flex items-center justify-between bg-white/5 flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
            {{ selectedChat.client?.name?.charAt(0) || '?' }}
          </div>
          <div>
            <h3 class="font-semibold text-sm">{{ selectedChat.client?.name }}</h3>
            <div class="flex items-center gap-1.5 mt-0.5">
              <span class="w-1.5 h-1.5 bg-primary rounded-full" :class="{ 'animate-pulse': selectedChat.status === 'active' }"></span>
              <span class="text-[10px] uppercase font-bold tracking-wider" :class="selectedChat.status === 'active' ? 'text-primary' : 'text-text-secondary'">
                {{ selectedChat.status === 'active' ? 'Activo' : 'Archivado' }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button @click="getAiSuggestion" :disabled="aiLoading" class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all flex items-center gap-1.5" title="Sugerencia IA">
            <Sparkles class="w-4 h-4" />
            <span class="text-xs font-medium hidden sm:inline">IA</span>
          </button>
          <button class="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Phone class="w-4 h-4" />
          </button>
          <button class="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <MoreVertical class="w-4 h-4" />
          </button>
        </div>
      </header>

      <!-- AI Suggestion Banner -->
      <div v-if="aiSuggestion" class="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-start gap-3">
        <Sparkles class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <p class="text-xs text-primary font-bold mb-1">Sugerencia de IA</p>
          <p class="text-sm">{{ aiSuggestion }}</p>
        </div>
        <div class="flex gap-2 flex-shrink-0">
          <button @click="useAiSuggestion" class="px-3 py-1 bg-primary text-background rounded-lg text-xs font-bold hover:bg-primary-accent transition-all">Usar</button>
          <button @click="aiSuggestion = ''" class="p-1 text-text-secondary hover:text-white transition-all">
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Messages Area -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-4">
        <div v-if="messagesLoading" class="flex items-center justify-center h-full">
          <div class="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
        <template v-else>
          <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-text-secondary">
            <MessageSquare class="w-10 h-10 mb-3 opacity-30" />
            <p>Sin mensajes aún. ¡Inicia la conversación!</p>
          </div>
          <div 
            v-for="msg in messages" 
            :key="msg.id" 
            class="flex"
            :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div 
              class="max-w-[70%] p-3 rounded-2xl text-sm shadow-sm"
              :class="msg.sender === 'user' ? 'bg-primary text-background rounded-tr-none' : 'bg-surface border border-white/5 text-white rounded-tl-none'"
            >
              {{ msg.content }}
              <div 
                class="text-[10px] mt-1 flex items-center justify-end gap-1"
                :class="msg.sender === 'user' ? 'text-background/60' : 'text-text-secondary'"
              >
                {{ formatMsgTime(msg.created_at) }}
                <Check v-if="msg.sender === 'user'" class="w-3 h-3" />
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Input Area -->
      <footer class="p-4 bg-white/5 border-t border-white/5 flex-shrink-0">
        <form @submit.prevent="handleSend" class="flex items-center gap-3">
          <input 
            v-model="newMessage"
            type="text" 
            placeholder="Escribe un mensaje..." 
            class="flex-1 bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
            @keydown.enter.prevent="handleSend"
          />
          <button 
            type="submit"
            :disabled="!newMessage.trim() || sendingMsg"
            class="p-2.5 bg-primary text-background rounded-xl hover:bg-primary-accent transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            <Send class="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>

    <!-- AI Clouser Panel -->
    <div v-if="selectedChat" class="flex-shrink-0 border border-white/5 rounded-2xl overflow-hidden">
      <ClouserPanel />
    </div>

    <!-- Empty State -->
    <div v-else class="flex-1 flex flex-col items-center justify-center glass rounded-2xl border border-white/5">
      <div class="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
        <MessageSquare class="w-10 h-10 text-white/20" />
      </div>
      <h3 class="text-xl font-bold">Selecciona una conversación</h3>
      <p class="text-text-secondary mt-2">Elige un chat de la izquierda para empezar a mensajear.</p>
      <button @click="showNewConvModal = true" class="btn-primary mt-8">Nueva Conversación</button>
    </div>

    <!-- ═══════════ NEW CONVERSATION MODAL ═══════════ -->
    <Teleport to="body">
      <div v-if="showNewConvModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showNewConvModal = false"></div>
        <div class="relative w-full max-w-sm bg-surface border border-white/10 rounded-2xl shadow-2xl p-6 space-y-5 z-10">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold">Nueva Conversación</h3>
            <button @click="showNewConvModal = false" class="p-1 text-text-secondary hover:text-white">
              <X class="w-5 h-5" />
            </button>
          </div>

          <p class="text-sm text-text-secondary">Selecciona un cliente para iniciar una conversación:</p>

          <div class="relative mb-2">
            <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input v-model="clientSearch" type="text" placeholder="Buscar clientes..." class="input-field w-full pl-10 text-sm" />
          </div>

          <div class="max-h-60 overflow-y-auto space-y-1">
            <div v-if="availableClients.length === 0" class="py-4 text-center text-text-secondary text-sm">
              No se encontraron clientes. <NuxtLink to="/clients" class="text-primary hover:underline">Añade uno primero</NuxtLink>
            </div>
            <button 
              v-for="c in availableClients" 
              :key="c.id"
              @click="startNewConversation(c)"
              class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-left"
            >
              <div class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm flex-shrink-0">
                {{ c.name.charAt(0) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{{ c.name }}</p>
                <p class="text-[10px] text-text-secondary">{{ c.phone }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Check, 
  Paperclip, 
  Smile, 
  Send,
  MessageSquare,
  Plus,
  X,
  Sparkles
} from 'lucide-vue-next'

import ClouserPanel from '~/components/clouser/ClouserPanel.vue'

const { 
  conversations, 
  messages, 
  clients,
  loading, 
  error,
  fetchConversations, 
  fetchMessages, 
  sendMessage, 
  fetchClients,
  createConversation 
} = usePinza()

const selectedChat = ref(null)
const newMessage = ref('')
const chatSearch = ref('')
const clientSearch = ref('')
const sendingMsg = ref(false)
const messagesLoading = ref(false)
const showNewConvModal = ref(false)
const aiSuggestion = ref('')
const aiLoading = ref(false)

const messagesContainer = ref(null)

const filteredConversations = computed(() => {
  if (!chatSearch.value) return conversations.value
  const q = chatSearch.value.toLowerCase()
  return conversations.value.filter(c =>
    c.client?.name?.toLowerCase().includes(q) ||
    (c.last_message || '').toLowerCase().includes(q)
  )
})

const availableClients = computed(() => {
  if (!clientSearch.value) return clients.value
  const q = clientSearch.value.toLowerCase()
  return clients.value.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q))
})

const formatTime = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Ahora'
  if (mins < 60) return `${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
}

const formatMsgTime = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const selectChat = async (conv) => {
  selectedChat.value = conv
  messagesLoading.value = true
  aiSuggestion.value = ''
  await fetchMessages(conv.id)
  messagesLoading.value = false
  scrollToBottom()
}

const handleSend = async () => {
  if (!newMessage.value.trim() || !selectedChat.value || sendingMsg.value) return
  sendingMsg.value = true
  const content = newMessage.value
  newMessage.value = ''
  
  await sendMessage(selectedChat.value.id, content, 'user')
  scrollToBottom()
  sendingMsg.value = false
}

const startNewConversation = async (client) => {
  showNewConvModal.value = false
  const conv = await createConversation(client.id)
  if (conv) {
    await fetchConversations()
    selectChat(conv)
  }
}

const getAiSuggestion = async () => {
  if (!selectedChat.value || aiLoading.value) return
  aiLoading.value = true
  aiSuggestion.value = ''
  
  try {
    const { data } = await useFetch('/api/ai-suggest', {
      method: 'POST',
      body: {
        messages: messages.value.slice(-6).map(m => ({
          sender: m.sender,
          content: m.content
        }))
      }
    })
    aiSuggestion.value = data.value?.suggestion || 'Could not generate suggestion.'
  } catch {
    aiSuggestion.value = 'AI service unavailable. Check your OpenAI API key.'
  }
  aiLoading.value = false
}

const useAiSuggestion = () => {
  newMessage.value = aiSuggestion.value
  aiSuggestion.value = ''
}

onMounted(async () => {
  await Promise.all([
    fetchConversations(),
    fetchClients()
  ])
})
</script>
