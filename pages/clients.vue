<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Clients</h1>
        <p class="text-text-secondary mt-1">Manage and organize your customer database.</p>
      </div>
      <button @click="openAddModal" class="btn-primary flex items-center gap-2">
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
        <select v-model="tagFilter" class="bg-background border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none">
          <option value="">All Tags</option>
          <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="card p-12 text-center">
      <div class="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-text-secondary">Loading clients...</p>
    </div>

    <!-- Clients Table -->
    <div v-else class="card p-0 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-white/5 text-xs uppercase text-text-secondary font-bold tracking-wider">
              <th class="px-6 py-4">Client</th>
              <th class="px-6 py-4">Contact</th>
              <th class="px-6 py-4">Tags</th>
              <th class="px-6 py-4">Added</th>
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
                    <div v-if="client.notes" class="text-[10px] text-text-secondary truncate max-w-[120px]">{{ client.notes }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">{{ client.phone }}</div>
                <div class="text-xs text-text-secondary">{{ client.email || '—' }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="tag in (client.tags || [])" 
                    :key="tag" 
                    class="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-[10px] font-bold"
                  >
                    {{ tag }}
                  </span>
                  <span v-if="!client.tags?.length" class="text-xs text-text-secondary">—</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-text-secondary">
                {{ formatDate(client.created_at) }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="startConversation(client)" class="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Message">
                    <MessageSquare class="w-4 h-4" />
                  </button>
                  <button @click="openEditModal(client)" class="p-2 text-text-secondary hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Edit">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="confirmDelete(client)" class="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredClients.length === 0 && !loading" class="p-12 text-center">
        <Users class="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p class="text-text-secondary">No clients found.</p>
        <button @click="openAddModal" class="btn-primary mt-4 text-sm">Add your first client</button>
      </div>

      <!-- Pagination Info -->
      <div v-if="filteredClients.length > 0" class="p-4 border-t border-white/5 flex items-center justify-between">
        <p class="text-xs text-text-secondary">Showing {{ filteredClients.length }} of {{ clients.length }} clients</p>
      </div>
    </div>

    <!-- ═══════════ ADD/EDIT MODAL ═══════════ -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showModal = false"></div>
        <div class="relative w-full max-w-md bg-surface border border-white/10 rounded-2xl shadow-2xl p-6 space-y-5 z-10">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold">{{ editingClient ? 'Edit Client' : 'Add Client' }}</h3>
            <button @click="showModal = false" class="p-1 text-text-secondary hover:text-white transition-colors">
              <X class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="saveClient" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Name *</label>
              <input v-model="form.name" type="text" required class="input-field w-full" placeholder="John Doe" />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Phone *</label>
              <input v-model="form.phone" type="tel" required class="input-field w-full" placeholder="+57 300 123 4567" />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <input v-model="form.email" type="email" class="input-field w-full" placeholder="client@example.com" />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Tags (comma separated)</label>
              <input v-model="form.tagsStr" type="text" class="input-field w-full" placeholder="VIP, Lead, New Customer" />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Notes</label>
              <textarea v-model="form.notes" rows="2" class="input-field w-full resize-none" placeholder="Any notes about this client..."></textarea>
            </div>

            <div v-if="error" class="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {{ error }}
            </div>

            <div class="flex gap-3 pt-2">
              <button type="button" @click="showModal = false" class="flex-1 px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-medium">
                Cancel
              </button>
              <button type="submit" :disabled="saving" class="flex-1 btn-primary flex items-center justify-center gap-2">
                <span v-if="saving" class="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full"></span>
                {{ saving ? 'Saving...' : (editingClient ? 'Update' : 'Add Client') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ═══════════ DELETE CONFIRM MODAL ═══════════ -->
    <Teleport to="body">
      <div v-if="showDeleteModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showDeleteModal = false"></div>
        <div class="relative w-full max-w-sm bg-surface border border-white/10 rounded-2xl shadow-2xl p-6 space-y-5 z-10">
          <div class="text-center">
            <div class="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 class="w-6 h-6 text-red-400" />
            </div>
            <h3 class="text-lg font-bold">Delete Client</h3>
            <p class="text-sm text-text-secondary mt-2">
              Are you sure you want to delete <strong class="text-white">{{ deletingClient?.name }}</strong>? This action cannot be undone.
            </p>
          </div>
          <div class="flex gap-3">
            <button @click="showDeleteModal = false" class="flex-1 px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-medium">
              Cancel
            </button>
            <button @click="handleDelete" :disabled="saving" class="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2">
              <span v-if="saving" class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              {{ saving ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { 
  UserPlus, 
  Search, 
  Filter, 
  MessageSquare, 
  Edit2, 
  Trash2,
  Users,
  X
} from 'lucide-vue-next'

const { clients, loading, error, fetchClients, addClient, updateClient, deleteClient, createConversation } = usePinza()

const searchQuery = ref('')
const tagFilter = ref('')
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingClient = ref(null)
const deletingClient = ref(null)
const saving = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  tagsStr: '',
  notes: ''
})

const allTags = computed(() => {
  const tags = new Set()
  clients.value.forEach(c => (c.tags || []).forEach(t => tags.add(t)))
  return Array.from(tags).sort()
})

const filteredClients = computed(() => {
  let result = clients.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.email || '').toLowerCase().includes(q) ||
      (c.tags || []).some(t => t.toLowerCase().includes(q))
    )
  }
  if (tagFilter.value) {
    result = result.filter(c => (c.tags || []).includes(tagFilter.value))
  }
  return result
})

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const resetForm = () => {
  form.name = ''
  form.phone = ''
  form.email = ''
  form.tagsStr = ''
  form.notes = ''
}

const openAddModal = () => {
  editingClient.value = null
  resetForm()
  showModal.value = true
}

const openEditModal = (client) => {
  editingClient.value = client
  form.name = client.name
  form.phone = client.phone
  form.email = client.email || ''
  form.tagsStr = (client.tags || []).join(', ')
  form.notes = client.notes || ''
  showModal.value = true
}

const confirmDelete = (client) => {
  deletingClient.value = client
  showDeleteModal.value = true
}

const saveClient = async () => {
  saving.value = true
  const tags = form.tagsStr
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0)

  const payload = {
    name: form.name,
    phone: form.phone,
    email: form.email || null,
    tags,
    notes: form.notes || null
  }

  if (editingClient.value) {
    await updateClient(editingClient.value.id, payload)
  } else {
    await addClient(payload)
  }

  saving.value = false
  showModal.value = false
}

const handleDelete = async () => {
  if (!deletingClient.value) return
  saving.value = true
  await deleteClient(deletingClient.value.id)
  saving.value = false
  showDeleteModal.value = false
  deletingClient.value = null
}

const startConversation = async (client) => {
  const conv = await createConversation(client.id)
  if (conv) {
    navigateTo('/conversations')
  }
}

onMounted(() => {
  fetchClients()
})
</script>
