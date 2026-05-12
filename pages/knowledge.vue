<template>
  <div class="relative space-y-8 pb-12">
    <!-- Plan Restriction Overlay -->
    <div v-if="!isPro" class="absolute inset-0 z-40 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md rounded-[3rem] text-center p-12">
      <div class="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/30">
        <Lock class="w-10 h-10 text-primary" />
      </div>
      <h3 class="text-3xl font-black text-white mb-4 tracking-tighter">Función Exclusiva <span class="text-primary">PRO</span></h3>
      <p class="text-text-secondary max-w-md mx-auto mb-10 text-lg font-medium">
        El entrenamiento personalizado de la IA con documentos y PDF solo está disponible para usuarios del **Plan Pro** en adelante.
      </p>
      <NuxtLink to="/plans" class="btn-primary px-12 py-5 text-lg shadow-2xl shadow-primary/40 hover:scale-105 transition-all">
        Ver Planes y Actualizar
      </NuxtLink>
    </div>

    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight">Base de Conocimientos</h1>
        <p class="text-text-secondary mt-1">Entrena a tu Clouser AI con información específica de tu negocio.</p>
      </div>
      <button @click="openAddModal" class="btn-primary flex items-center gap-2 px-6 py-3">
        <Plus class="w-5 h-5" />
        <span class="font-bold">Añadir Información</span>
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="card p-6 flex items-center gap-4 group hover:border-primary/30 transition-all cursor-default">
        <div :class="`p-3 rounded-2xl ${stat.bg} ${stat.color}`">
          <component :is="stat.icon" class="w-6 h-6" />
        </div>
        <div>
          <p class="text-2xl font-black text-white">{{ stat.value }}</p>
          <p class="text-xs text-text-secondary uppercase tracking-widest font-bold">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <!-- Content List -->
    <div class="card overflow-hidden">
      <div class="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div class="flex items-center gap-4">
          <h3 class="font-bold text-white">Documentos y Textos</h3>
          <span class="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
            {{ knowledgeItems.length }} Total
          </span>
        </div>
        <div class="relative">
          <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar en la base..." 
            class="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all w-64"
          />
        </div>
      </div>

      <div v-if="loading" class="p-20 text-center">
        <div class="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-text-secondary animate-pulse">Cargando base de conocimientos...</p>
      </div>

      <div v-else-if="filteredItems.length === 0" class="p-20 text-center">
        <div class="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen class="w-10 h-10 text-text-secondary/20" />
        </div>
        <h4 class="text-xl font-bold text-white">No hay información todavía</h4>
        <p class="text-text-secondary mt-2 max-w-xs mx-auto">Sube documentos o pega textos para que tu IA aprenda sobre tus productos y servicios.</p>
        <button @click="openAddModal" class="btn-primary mt-8 px-8">Añadir primer registro</button>
      </div>

      <div v-else class="divide-y divide-white/5">
        <div v-for="item in filteredItems" :key="item.id" class="p-6 hover:bg-white/[0.02] transition-colors group">
          <div class="flex items-start justify-between gap-4">
            <div class="flex gap-4">
              <div class="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/30 transition-all">
                <FileText v-if="item.type === 'text'" class="w-5 h-5 text-blue-400" />
                <FileCode v-else class="w-5 h-5 text-purple-400" />
              </div>
              <div class="space-y-1">
                <h4 class="font-bold text-white group-hover:text-primary transition-colors">{{ item.title }}</h4>
                <p class="text-sm text-text-secondary line-clamp-2 leading-relaxed">{{ item.content }}</p>
                <div class="flex items-center gap-4 mt-3">
                  <span class="text-[10px] font-bold text-text-secondary/50 uppercase tracking-widest flex items-center gap-1">
                    <Clock class="w-3 h-3" /> {{ formatDate(item.created_at) }}
                  </span>
                  <span :class="`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${item.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`">
                    {{ item.status === 'active' ? 'Aprendido' : 'Procesando' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
              <button @click="editItem(item)" class="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-all">
                <Edit2 class="w-4 h-4" />
              </button>
              <button @click="deleteItem(item.id)" class="p-2 rounded-lg hover:bg-red-500/10 text-text-secondary hover:text-red-400 transition-all">
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para añadir/editar -->
    <Transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
        <div class="w-full max-w-2xl bg-surface border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden animate-scale-in">
          <div class="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h3 class="text-2xl font-black text-white tracking-tight">{{ isEditing ? 'Editar Información' : 'Añadir a la Base' }}</h3>
            <button @click="closeModal" class="p-2 rounded-xl hover:bg-white/5 text-text-secondary transition-all">
              <X class="w-6 h-6" />
            </button>
          </div>
          
          <form @submit.prevent="saveItem" class="p-8 space-y-6">
            <div class="grid grid-cols-1 gap-6">
              <div>
                <label class="block text-xs font-black text-text-secondary uppercase tracking-widest mb-2 ml-1">Título o Nombre</label>
                <input 
                  v-model="form.title" 
                  type="text" 
                  required 
                  placeholder="Ej: Catálogo de Servicios 2024"
                  class="input-field w-full"
                />
              </div>
              <div>
                <label class="block text-xs font-black text-text-secondary uppercase tracking-widest mb-2 ml-1">Contenido (Texto)</label>
                <textarea 
                  v-model="form.content" 
                  required 
                  rows="6"
                  placeholder="Pega aquí la información que quieres que la IA aprenda..."
                  class="input-field w-full resize-none py-4"
                ></textarea>
                <p class="mt-2 text-[10px] text-text-secondary italic">La IA usará este texto para responder dudas específicas de tus clientes.</p>
              </div>
            </div>

            <div class="flex items-center justify-end gap-4 pt-4">
              <button type="button" @click="closeModal" class="px-6 py-3 font-bold text-text-secondary hover:text-white transition-colors">Cancelar</button>
              <button type="submit" :disabled="saving" class="btn-primary px-10 py-3 flex items-center gap-3">
                <span v-if="saving" class="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full"></span>
                <span class="font-bold">{{ saving ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar Información') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { 
  Plus, 
  Search, 
  BookOpen, 
  FileText, 
  FileCode, 
  Clock, 
  Trash2, 
  Edit2, 
  X,
  Database,
  BrainCircuit,
  FileSearch,
  Lock
} from 'lucide-vue-next'

const { isPro } = usePinza()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(true)
const saving = ref(false)
const searchQuery = ref('')
const knowledgeItems = ref([])
const isModalOpen = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const form = reactive({
  title: '',
  content: '',
  type: 'text'
})

const stats = computed(() => [
  { label: 'Documentos', value: knowledgeItems.value.length, icon: Database, bg: 'bg-blue-500/10', color: 'text-blue-400' },
  { label: 'IA Entrenada', value: '100%', icon: BrainCircuit, bg: 'bg-primary/10', color: 'text-primary' },
  { label: 'Consultas IA', value: '1,284', icon: FileSearch, bg: 'bg-purple-500/10', color: 'text-purple-400' },
])

const filteredItems = computed(() => {
  if (!searchQuery.value) return knowledgeItems.value
  const query = searchQuery.value.toLowerCase()
  return knowledgeItems.value.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.content.toLowerCase().includes(query)
  )
})

const fetchKnowledge = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    knowledgeItems.value = data || []
  } catch (err) {
    console.error('Error fetching knowledge:', err)
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  isEditing.value = false
  editingId.value = null
  form.title = ''
  form.content = ''
  isModalOpen.value = true
}

const editItem = (item) => {
  isEditing.value = true
  editingId.value = item.id
  form.title = item.title
  form.content = item.content
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveItem = async () => {
  saving.value = true
  try {
    if (isEditing.value) {
      const { error } = await supabase
        .from('knowledge_base')
        .update({
          title: form.title,
          content: form.content
        })
        .eq('id', editingId.value)
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('knowledge_base')
        .insert({
          user_id: user.value.id,
          title: form.title,
          content: form.content,
          type: 'text',
          status: 'active'
        })
      if (error) throw error
    }
    await fetchKnowledge()
    closeModal()
  } catch (err) {
    console.error('Error saving knowledge item:', err)
    alert('Error al guardar la información')
  } finally {
    saving.value = false
  }
}

const deleteItem = async (id) => {
  if (!confirm('¿Estás seguro de eliminar esta información? La IA dejará de usarla para responder.')) return
  try {
    const { error } = await supabase
      .from('knowledge_base')
      .delete()
      .eq('id', id)
    if (error) throw error
    await fetchKnowledge()
  } catch (err) {
    console.error('Error deleting knowledge item:', err)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(() => {
  fetchKnowledge()
})
</script>

<style scoped>
.animate-scale-in {
  animation: scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
