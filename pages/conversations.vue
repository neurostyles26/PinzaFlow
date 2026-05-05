<template>
  <div class="h-full flex gap-6 -m-6 p-6">
    <!-- Chat List -->
    <div class="w-80 flex flex-col glass rounded-2xl overflow-hidden border border-white/5">
      <div class="p-4 border-b border-white/5">
        <div class="relative">
          <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search chats..." 
            class="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
      </div>

      <div class="flex-1 overflow-y-auto divide-y divide-white/5">
        <div 
          v-for="chat in chats" 
          :key="chat.id"
          @click="selectChat(chat)"
          class="p-4 hover:bg-white/5 cursor-pointer transition-all flex items-center gap-3 relative"
          :class="{ 'bg-white/10': selectedChat?.id === chat.id }"
        >
          <div class="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center font-bold relative">
            {{ chat.name.charAt(0) }}
            <div v-if="chat.online" class="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-surface"></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-semibold truncate">{{ chat.name }}</h4>
              <span class="text-[10px] text-text-secondary uppercase">{{ chat.time }}</span>
            </div>
            <p class="text-xs text-text-secondary truncate mt-1">{{ chat.lastMessage }}</p>
          </div>
          <div v-if="chat.unread" class="absolute right-4 bottom-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-background">
            {{ chat.unread }}
          </div>
        </div>
      </div>
    </div>

    <!-- Active Chat -->
    <div v-if="selectedChat" class="flex-1 flex flex-col glass rounded-2xl overflow-hidden border border-white/5">
      <!-- Chat Header -->
      <header class="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
            {{ selectedChat.name.charAt(0) }}
          </div>
          <div>
            <h3 class="font-semibold text-sm">{{ selectedChat.name }}</h3>
            <div class="flex items-center gap-1.5 mt-0.5">
              <span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              <span class="text-[10px] text-primary uppercase font-bold tracking-wider">Online</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Phone class="w-4 h-4" />
          </button>
          <button class="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Video class="w-4 h-4" />
          </button>
          <button class="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <MoreVertical class="w-4 h-4" />
          </button>
        </div>
      </header>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-opacity-5">
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
            {{ msg.text }}
            <div 
              class="text-[10px] mt-1 flex items-center justify-end gap-1"
              :class="msg.sender === 'user' ? 'text-background/60' : 'text-text-secondary'"
            >
              {{ msg.time }}
              <Check v-if="msg.sender === 'user'" class="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <footer class="p-4 bg-white/5 border-t border-white/5">
        <form @submit.prevent="sendMessage" class="flex items-center gap-3">
          <button type="button" class="p-2 text-text-secondary hover:text-white transition-all">
            <Paperclip class="w-5 h-5" />
          </button>
          <input 
            v-model="newMessage"
            type="text" 
            placeholder="Type a message..." 
            class="flex-1 bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
          />
          <button type="button" class="p-2 text-text-secondary hover:text-white transition-all">
            <Smile class="w-5 h-5" />
          </button>
          <button 
            type="submit"
            :disabled="!newMessage.trim()"
            class="p-2.5 bg-primary text-background rounded-xl hover:bg-primary-accent transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            <Send class="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>

    <!-- Empty State -->
    <div v-else class="flex-1 flex flex-col items-center justify-center glass rounded-2xl border border-white/5">
      <div class="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
        <MessageSquare class="w-10 h-10 text-white/20" />
      </div>
      <h3 class="text-xl font-bold">Select a conversation</h3>
      <p class="text-text-secondary mt-2">Choose a chat from the left to start messaging.</p>
      <button class="btn-primary mt-8">New Message</button>
    </div>
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
  MessageSquare
} from 'lucide-vue-next'

const selectedChat = ref(null)
const newMessage = ref('')

const chats = ref([
  { id: 1, name: 'Carlos Rodriguez', lastMessage: '¿Tienen disponibilidad?', time: '12:45 PM', unread: 2, online: true },
  { id: 2, name: 'Maria Garcia', lastMessage: 'Gracias por todo', time: '11:20 AM', unread: 0, online: false },
  { id: 3, name: 'Juan Perez', lastMessage: 'Precio del servicio', time: 'Yesterday', unread: 0, online: true },
  { id: 4, name: 'Elena Gomez', lastMessage: 'Quiero agendar cita', time: 'Yesterday', unread: 1, online: false },
])

const messages = ref([
  { id: 1, sender: 'client', text: 'Hola, ¿cómo estás? Me gustaría saber más sobre sus servicios de automatización.', time: '12:40 PM' },
  { id: 2, sender: 'user', text: '¡Hola Carlos! Muy bien, gracias. Con gusto te explico. PinzaFlow te ayuda a gestionar todos tus chats de WhatsApp y automatizar respuestas.', time: '12:42 PM' },
  { id: 3, sender: 'client', text: 'Excelente. ¿Tienen disponibilidad para una demo mañana?', time: '12:45 PM' },
])

const selectChat = (chat) => {
  selectedChat.value = chat
  chat.unread = 0
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  messages.value.push({
    id: Date.now(),
    sender: 'user',
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  
  const currentMsg = newMessage.value
  newMessage.value = ''
  
  // Simulation of AI/Auto-reply
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      sender: 'client',
      text: '¡Entendido! Gracias por responder.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  }, 2000)
}
</script>
