<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Clients</h1>
        <p class="text-text-secondary mt-1">Manage and organize your customer database.</p>
      </div>
      <button class="btn-primary flex items-center gap-2">
        <UserPlus class="w-4 h-4" />
        Add Client
      </button>
    </div>

    <!-- Filters & Search -->
    <div class="card flex flex-col md:flex-row gap-4 md:items-center">
      <div class="relative flex-1">
        <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by name, phone or tag..." 
          class="input-field w-full pl-10"
        />
      </div>
      <div class="flex gap-2">
        <select class="bg-background border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none">
          <option>All Tags</option>
          <option>VIP</option>
          <option>Lead</option>
          <option>Support</option>
        </select>
        <button class="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
          <Filter class="w-5 h-5 text-text-secondary" />
        </button>
      </div>
    </div>

    <!-- Clients Table -->
    <div class="card p-0 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-white/5 text-xs uppercase text-text-secondary font-bold tracking-wider">
              <th class="px-6 py-4">Client</th>
              <th class="px-6 py-4">Contact</th>
              <th class="px-6 py-4">Tags</th>
              <th class="px-6 py-4">Last Activity</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="client in filteredClients" :key="client.id" class="hover:bg-white/5 transition-all group">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
                    {{ client.name.charAt(0) }}
                  </div>
                  <div>
                    <div class="font-semibold text-sm">{{ client.name }}</div>
                    <div class="text-[10px] text-text-secondary uppercase">ID: {{ client.id.slice(0,8) }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">{{ client.phone }}</div>
                <div class="text-xs text-text-secondary">{{ client.email }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="tag in client.tags" 
                    :key="tag" 
                    class="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-[10px] font-bold"
                  >
                    {{ tag }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-text-secondary">
                {{ client.lastActivity }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="p-2 text-text-secondary hover:text-white hover:bg-white/10 rounded-lg">
                    <MessageSquare class="w-4 h-4" />
                  </button>
                  <button class="p-2 text-text-secondary hover:text-white hover:bg-white/10 rounded-lg">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button class="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="p-4 border-t border-white/5 flex items-center justify-between">
        <p class="text-xs text-text-secondary">Showing 1 to {{ filteredClients.length }} of {{ filteredClients.length }} clients</p>
        <div class="flex gap-2">
          <button disabled class="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs disabled:opacity-50">Previous</button>
          <button class="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10 transition-all">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  UserPlus, 
  Search, 
  Filter, 
  MessageSquare, 
  Edit2, 
  Trash2 
} from 'lucide-vue-next'

const searchQuery = ref('')

const clients = ref([
  { id: '1a2b3c4d', name: 'Carlos Rodriguez', phone: '+57 300 123 4567', email: 'carlos@example.com', tags: ['VIP', 'Lead'], lastActivity: '2 hours ago' },
  { id: '2b3c4d5e', name: 'Maria Garcia', phone: '+52 55 1234 5678', email: 'maria@example.com', tags: ['Support'], lastActivity: '1 day ago' },
  { id: '3c4d5e6f', name: 'Juan Perez', phone: '+34 600 000 000', email: 'juan@example.com', tags: ['New Customer'], lastActivity: '3 days ago' },
  { id: '4d5e6f7g', name: 'Elena Gomez', phone: '+54 11 1234 5678', email: 'elena@example.com', tags: ['Lead'], lastActivity: '1 week ago' },
  { id: '5e6f7g8h', name: 'Roberto Diaz', phone: '+56 9 1234 5678', email: 'roberto@example.com', tags: ['Wholesale'], lastActivity: '2 weeks ago' },
])

const filteredClients = computed(() => {
  if (!searchQuery.value) return clients.value
  const query = searchQuery.value.toLowerCase()
  return clients.value.filter(c => 
    c.name.toLowerCase().includes(query) || 
    c.phone.includes(query) || 
    c.tags.some(t => t.toLowerCase().includes(query))
  )
})
</script>
