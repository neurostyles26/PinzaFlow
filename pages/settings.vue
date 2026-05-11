<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-20">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
          Ajustes de Cuenta
        </div>
        <h1 class="text-4xl font-black tracking-tight">Tu Perfil</h1>
        <p class="text-text-secondary mt-2 text-lg">Gestiona tu información personal y preferencias de la plataforma.</p>
      </div>
      <div v-if="saved" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold animate-fade-in">
        <CheckCircle class="w-4 h-4" />
        Cambios guardados con éxito
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Sidebar Info -->
      <div class="space-y-8">
        <div class="p-8 rounded-[2.5rem] bg-surface/50 border border-white/5 text-center relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div class="relative inline-block mb-6">
            <div class="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-accent flex items-center justify-center text-4xl font-black text-background shadow-2xl shadow-primary/20 group-hover:scale-105 transition-transform duration-500">
              {{ profileInitial }}
            </div>
            <button class="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-surface border border-white/10 text-text-secondary hover:text-primary transition-all shadow-xl">
              <Camera class="w-5 h-5" />
            </button>
          </div>
          
          <h3 class="text-xl font-bold">{{ form.full_name || 'Usuario' }}</h3>
          <p class="text-sm text-text-secondary mt-1">{{ user?.email }}</p>
          
          <div class="mt-8 pt-8 border-t border-white/5 flex justify-center gap-8">
            <div>
              <p class="text-xs font-black text-text-secondary uppercase tracking-widest mb-1">Rol</p>
              <p class="text-sm font-bold text-white">Administrador</p>
            </div>
            <div>
              <p class="text-xs font-black text-text-secondary uppercase tracking-widest mb-1">Miembro desde</p>
              <p class="text-sm font-bold text-white">{{ memberSince }}</p>
            </div>
          </div>
        </div>

        <nav class="p-4 rounded-[2rem] bg-surface/30 border border-white/5 space-y-1">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all font-bold text-sm"
            :class="activeTab === tab.id ? 'bg-white/10 text-white shadow-xl' : 'text-text-secondary hover:text-white hover:bg-white/5'"
          >
            <component :is="tab.icon" class="w-5 h-5" />
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Main Form -->
      <div class="lg:col-span-2">
        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'profile'" class="space-y-8">
            <div class="p-10 rounded-[3rem] bg-surface/50 border border-white/5 shadow-2xl relative overflow-hidden">
              <div class="flex items-center gap-4 mb-10">
                <div class="w-1.5 h-8 bg-primary rounded-full"></div>
                <h3 class="text-2xl font-black">Información Personal</h3>
              </div>
              
              <form @submit.prevent="saveProfile" class="space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-2">
                    <label class="text-xs font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Nombre Completo</label>
                    <div class="relative group">
                      <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                      <input 
                        v-model="form.full_name" 
                        type="text" 
                        class="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all font-medium" 
                        placeholder="ej. Juan Pérez" 
                      />
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    <label class="text-xs font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Nombre de la Empresa</label>
                    <div class="relative group">
                      <Briefcase class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                      <input 
                        v-model="form.company_name" 
                        type="text" 
                        class="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all font-medium" 
                        placeholder="ej. PinFlowser Inc." 
                      />
                    </div>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-xs font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Correo Electrónico</label>
                  <div class="relative opacity-60">
                    <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input 
                      :value="user?.email" 
                      type="email" 
                      disabled 
                      class="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white cursor-not-allowed font-medium" 
                    />
                  </div>
                  <p class="text-[10px] text-text-secondary mt-2 italic">* El correo electrónico no puede cambiarse por razones de seguridad.</p>
                </div>

                <div v-if="error" class="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-3">
                  <AlertCircle class="w-5 h-5" />
                  {{ error }}
                </div>

                <div class="pt-4">
                  <button type="submit" :disabled="saving" class="btn-primary px-10 py-4 rounded-2xl flex items-center justify-center gap-3 min-w-[200px] shadow-xl shadow-primary/20">
                    <div v-if="saving" class="animate-spin w-5 h-5 border-2 border-background border-t-transparent rounded-full"></div>
                    <Save v-else class="w-5 h-5" />
                    <span class="font-bold">{{ saving ? 'Guardando...' : 'Guardar Cambios' }}</span>
                  </button>
                </div>
              </form>
            </div>

            <div class="p-10 rounded-[3rem] bg-red-500/5 border border-red-500/10 shadow-2xl relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                <Trash2 class="w-32 h-32 text-red-500" />
              </div>
              <div class="relative z-10">
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-1.5 h-8 bg-red-500 rounded-full"></div>
                  <h3 class="text-2xl font-black text-white">Zona de Peligro</h3>
                </div>
                <p class="text-text-secondary mb-8 leading-relaxed">Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate.</p>
                <button @click="showDeleteConfirm = true" class="px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-bold">
                  Eliminar Cuenta Permanentemente
                </button>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'whatsapp'" class="space-y-8">
            <div class="p-10 rounded-[3rem] bg-surface/50 border border-white/5 shadow-2xl relative overflow-hidden">
              <div class="flex items-center gap-4 mb-10">
                <div class="w-1.5 h-8 bg-primary rounded-full"></div>
                <h3 class="text-2xl font-black">WhatsApp Cloud API</h3>
              </div>
              
              <div class="mb-10 space-y-6">
                <div class="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <p class="text-sm text-primary font-bold mb-4 flex items-center gap-2">
                    <Zap class="w-4 h-4" />
                    Guía de Configuración Paso a Paso
                  </p>
                  <div class="space-y-4 text-xs text-text-secondary">
                    <div class="flex gap-3">
                      <span class="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">1</span>
                      <p>Crea una aplicación tipo "Business" en el portal de <a href="https://developers.facebook.com/" target="_blank" class="text-primary hover:underline font-bold">Meta for Developers</a>.</p>
                    </div>
                    <div class="flex gap-3">
                      <span class="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">2</span>
                      <p>Añade el producto "WhatsApp" a tu aplicación.</p>
                    </div>
                    <div class="flex gap-3">
                      <span class="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">3</span>
                      <p>En "Configuración de API", copia el <strong>ID de identificador de número de teléfono</strong>.</p>
                    </div>
                    <div class="flex gap-3">
                      <span class="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">4</span>
                      <p>Genera un <strong>Token de Acceso Permanente</strong> (o usa el temporal para pruebas).</p>
                    </div>
                    <div class="flex gap-3">
                      <span class="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">5</span>
                      <p>Configura el Webhook usando tu <strong>Verify Token</strong> personalizado para recibir mensajes.</p>
                    </div>
                  </div>
                </div>
              </div>

              <form @submit.prevent="saveProfile" class="space-y-8">
                <div class="space-y-6">
                  <div class="space-y-2">
                    <label class="text-xs font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Phone Number ID</label>
                    <input 
                      v-model="form.whatsapp_phone_number_id" 
                      type="text" 
                      class="input-field w-full" 
                      placeholder="ej. 102938475610293" 
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="text-xs font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Token de Acceso (Access Token)</label>
                    <textarea 
                      v-model="form.whatsapp_access_token" 
                      rows="3"
                      class="input-field w-full resize-none py-4" 
                      placeholder="EAAG..." 
                    ></textarea>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-2">
                      <label class="text-xs font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Token de Verificación (Webhooks)</label>
                      <input 
                        v-model="form.whatsapp_verify_token" 
                        type="text" 
                        class="input-field w-full" 
                        placeholder="ej. mi_token_seguro_123" 
                      />
                    </div>
                    <div class="space-y-2">
                      <label class="text-xs font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Business Account ID</label>
                      <input 
                        v-model="form.whatsapp_business_account_id" 
                        type="text" 
                        class="input-field w-full" 
                        placeholder="ej. 987654321012345" 
                      />
                    </div>
                  </div>
                </div>

                <div class="pt-4 flex flex-wrap gap-4">
                  <button type="submit" :disabled="saving" class="btn-primary px-10 py-4 rounded-2xl flex items-center justify-center gap-3 min-w-[200px] shadow-xl shadow-primary/20">
                    <div v-if="saving" class="animate-spin w-5 h-5 border-2 border-background border-t-transparent rounded-full"></div>
                    <Save v-else class="w-5 h-5" />
                    <span class="font-bold">{{ saving ? 'Guardando...' : 'Guardar Configuración' }}</span>
                  </button>
                </div>
              </form>

              <!-- Test Connection Section -->
              <div class="mt-12 pt-12 border-t border-white/5 space-y-6">
                <h4 class="text-xl font-bold flex items-center gap-3">
                  <Sparkles class="w-5 h-5 text-primary" />
                  Probar Conexión
                </h4>
                <p class="text-sm text-text-secondary">Envía un mensaje de prueba a tu teléfono para verificar que todo esté bien configurado.</p>
                
                <div class="flex flex-col md:flex-row gap-4">
                  <input 
                    v-model="testPhone" 
                    type="text" 
                    class="input-field flex-1" 
                    placeholder="Número con código de país (ej. 521234567890)" 
                  />
                  <button 
                    @click="testConnection" 
                    :disabled="testing || !testPhone || !form.whatsapp_phone_number_id"
                    class="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-bold flex items-center justify-center gap-3 min-w-[200px]"
                  >
                    <div v-if="testing" class="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div>
                    <Zap v-else class="w-5 h-5 text-primary" />
                    <span>{{ testing ? 'Probando...' : 'Enviar Prueba' }}</span>
                  </button>
                </div>

                <div v-if="testResult.message" class="p-4 rounded-2xl border flex items-center gap-3 animate-fade-in" :class="testResult.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'">
                  <CheckCircle v-if="testResult.success" class="w-5 h-5" />
                  <AlertCircle v-else class="w-5 h-5" />
                  <span class="text-sm font-medium">{{ testResult.message }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'notifications'" class="space-y-8">
            <div class="p-10 rounded-[3rem] bg-surface/50 border border-white/5 shadow-2xl">
              <div class="flex items-center gap-4 mb-10">
                <div class="w-1.5 h-8 bg-primary rounded-full"></div>
                <h3 class="text-2xl font-black">Preferencias</h3>
              </div>

              <div class="space-y-4">
                <div 
                  v-for="notif in notificationSettings" 
                  :key="notif.id" 
                  class="flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                >
                  <div class="flex items-center gap-4">
                    <div class="p-3 rounded-2xl bg-white/5 group-hover:bg-primary/10 transition-all">
                      <component :is="notif.icon" class="w-5 h-5 text-text-secondary group-hover:text-primary transition-all" />
                    </div>
                    <div>
                      <p class="text-base font-bold">{{ notif.label }}</p>
                      <p class="text-xs text-text-secondary mt-1">{{ notif.description }}</p>
                    </div>
                  </div>
                  <button 
                    @click="notif.enabled = !notif.enabled"
                    class="relative w-14 h-8 rounded-full transition-all duration-500 flex items-center px-1"
                    :class="notif.enabled ? 'bg-primary' : 'bg-white/10'"
                  >
                    <div 
                      class="w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500 transform"
                      :class="notif.enabled ? 'translate-x-6' : 'translate-x-0'"
                    ></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Delete Account Confirm -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" @click="showDeleteConfirm = false"></div>
        <div class="relative w-full max-w-md bg-[#0A0A0B] border border-white/10 rounded-[3rem] shadow-2xl p-10 space-y-8 z-10 overflow-hidden animate-zoom-in">
          <div class="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
          
          <div class="text-center relative">
            <div class="w-20 h-20 rounded-[2rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle class="w-10 h-10 text-red-500" />
            </div>
            <h3 class="text-3xl font-black">¿Estás seguro?</h3>
            <p class="text-text-secondary mt-4 leading-relaxed">Esta acción es permanente y eliminará todos tus datos, incluyendo clientes, conversaciones y mensajes. No se puede deshacer.</p>
          </div>
          
          <div class="flex gap-4">
            <button @click="showDeleteConfirm = false" class="flex-1 px-6 py-4 border border-white/10 rounded-2xl hover:bg-white/5 transition-all font-bold text-white">
              Cancelar
            </button>
            <button @click="deleteAccount" class="flex-1 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-all font-bold shadow-xl shadow-red-500/20">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Briefcase, 
  Mail, 
  Bell, 
  Shield, 
  Camera, 
  Save, 
  AlertCircle,
  Trash2,
  Lock,
  Zap,
  MessageSquare,
  Globe
} from 'lucide-vue-next'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { profile, fetchProfile, updateProfile, error } = usePinza()

const saving = ref(false)
const saved = ref(false)
const showDeleteConfirm = ref(false)
const activeTab = ref('profile')
const testing = ref(false)
const testResult = ref({ success: null, message: '' })
const testPhone = ref('')

const tabs = [
  { id: 'profile', label: 'Mi Perfil', icon: User },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'notifications', label: 'Notificaciones', icon: Bell },
  { id: 'security', label: 'Seguridad', icon: Shield },
]

const form = reactive({
  full_name: '',
  company_name: '',
  whatsapp_phone_number_id: '',
  whatsapp_access_token: '',
  whatsapp_verify_token: '',
  whatsapp_business_account_id: ''
})

const profileInitial = computed(() => {
  return (form.full_name || user.value?.email || 'U').charAt(0).toUpperCase()
})

const memberSince = computed(() => {
  if (!user.value?.created_at) return '—'
  const date = new Date(user.value.created_at)
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
})

const notificationSettings = ref([
  { id: 1, label: 'Alertas de Mensajes', icon: MessageSquare, description: 'Recibe notificaciones cuando un cliente envíe un mensaje.', enabled: true },
  { id: 2, label: 'Captura de Leads', icon: Zap, description: 'Recibe alertas cuando se capturen nuevos leads.', enabled: true },
  { id: 3, label: 'Actualizaciones', icon: Globe, description: 'Mantente informado sobre nuevas funciones de PinFlowser.', enabled: true },
  { id: 4, label: 'Alertas de Seguridad', icon: Lock, description: 'Avisos importantes sobre la seguridad de tu cuenta.', enabled: true },
])

const testConnection = async () => {
  if (!testPhone.value) return
  testing.value = true
  testResult.value = { success: null, message: '' }
  
  try {
    const res = await $fetch('/api/whatsapp/test', {
      method: 'POST',
      body: { test_phone: testPhone.value }
    })
    testResult.value = { success: true, message: res.message }
  } catch (err: any) {
    testResult.value = { success: false, message: err.statusMessage || 'Error al conectar con WhatsApp' }
  } finally {
    testing.value = false
  }
}

const saveProfile = async () => {
  saving.value = true
  saved.value = false
  
  await updateProfile({
    full_name: form.full_name,
    company_name: form.company_name,
    whatsapp_phone_number_id: form.whatsapp_phone_number_id,
    whatsapp_access_token: form.whatsapp_access_token,
    whatsapp_verify_token: form.whatsapp_verify_token,
    whatsapp_business_account_id: form.whatsapp_business_account_id
  })

  // Also update user metadata in auth
  await supabase.auth.updateUser({
    data: { full_name: form.full_name }
  })

  saving.value = false
  if (!error.value) {
    saved.value = true
    setTimeout(() => { saved.value = false }, 3000)
  }
}

const deleteAccount = async () => {
  // Logic for account deletion would go here
  await supabase.auth.signOut()
  navigateTo('/login')
  showDeleteConfirm.value = false
}

onMounted(async () => {
  await fetchProfile()
  if (profile.value) {
    form.full_name = profile.value.full_name || user.value?.user_metadata?.full_name || ''
    form.company_name = profile.value.company_name || ''
    form.whatsapp_phone_number_id = profile.value.whatsapp_phone_number_id || ''
    form.whatsapp_access_token = profile.value.whatsapp_access_token || ''
    form.whatsapp_verify_token = profile.value.whatsapp_verify_token || ''
    form.whatsapp_business_account_id = profile.value.whatsapp_business_account_id || ''
  } else {
    form.full_name = user.value?.user_metadata?.full_name || ''
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.4s ease forwards;
}

@keyframes zoom-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-zoom-in {
  animation: zoom-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
