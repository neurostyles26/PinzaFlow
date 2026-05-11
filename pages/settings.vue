<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-20">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
          Account Settings
        </div>
        <h1 class="text-4xl font-black tracking-tight">Your Profile</h1>
        <p class="text-text-secondary mt-2 text-lg">Manage your personal information and preferences.</p>
      </div>
      <div v-if="saved" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold animate-fade-in">
        <CheckCircle class="w-4 h-4" />
        Changes saved successfully
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
          
          <h3 class="text-xl font-bold">{{ form.full_name || 'User' }}</h3>
          <p class="text-sm text-text-secondary mt-1">{{ user?.email }}</p>
          
          <div class="mt-8 pt-8 border-t border-white/5 flex justify-center gap-8">
            <div>
              <p class="text-xs font-black text-text-secondary uppercase tracking-widest mb-1">Role</p>
              <p class="text-sm font-bold text-white">Administrator</p>
            </div>
            <div>
              <p class="text-xs font-black text-text-secondary uppercase tracking-widest mb-1">Joined</p>
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
                <h3 class="text-2xl font-black">Personal Information</h3>
              </div>
              
              <form @submit.prevent="saveProfile" class="space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-2">
                    <label class="text-xs font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <div class="relative group">
                      <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                      <input 
                        v-model="form.full_name" 
                        type="text" 
                        class="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all font-medium" 
                        placeholder="e.g. John Doe" 
                      />
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    <label class="text-xs font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Company Name</label>
                    <div class="relative group">
                      <Briefcase class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                      <input 
                        v-model="form.company_name" 
                        type="text" 
                        class="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all font-medium" 
                        placeholder="e.g. PinFlowser Inc." 
                      />
                    </div>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-xs font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <div class="relative opacity-60">
                    <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input 
                      :value="user?.email" 
                      type="email" 
                      disabled 
                      class="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white cursor-not-allowed font-medium" 
                    />
                  </div>
                  <p class="text-[10px] text-text-secondary mt-2 italic">* Email cannot be changed for security reasons.</p>
                </div>

                <div v-if="error" class="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-3">
                  <AlertCircle class="w-5 h-5" />
                  {{ error }}
                </div>

                <div class="pt-4">
                  <button type="submit" :disabled="saving" class="btn-primary px-10 py-4 rounded-2xl flex items-center justify-center gap-3 min-w-[200px] shadow-xl shadow-primary/20">
                    <div v-if="saving" class="animate-spin w-5 h-5 border-2 border-background border-t-transparent rounded-full"></div>
                    <Save v-else class="w-5 h-5" />
                    <span class="font-bold">{{ saving ? 'Saving Changes...' : 'Save Changes' }}</span>
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
                  <h3 class="text-2xl font-black text-white">Danger Zone</h3>
                </div>
                <p class="text-text-secondary mb-8 leading-relaxed">Once you delete your account, there is no going back. Please be certain.</p>
                <button @click="showDeleteConfirm = true" class="px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-bold">
                  Delete Account Forever
                </button>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'notifications'" class="space-y-8">
            <div class="p-10 rounded-[3rem] bg-surface/50 border border-white/5 shadow-2xl">
              <div class="flex items-center gap-4 mb-10">
                <div class="w-1.5 h-8 bg-primary rounded-full"></div>
                <h3 class="text-2xl font-black">Preferences</h3>
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
            <h3 class="text-3xl font-black">Are you sure?</h3>
            <p class="text-text-secondary mt-4 leading-relaxed">This action is permanent and will delete all your data including clients, conversations, and messages. This cannot be undone.</p>
          </div>
          
          <div class="flex gap-4">
            <button @click="showDeleteConfirm = false" class="flex-1 px-6 py-4 border border-white/10 rounded-2xl hover:bg-white/5 transition-all font-bold">
              Cancel
            </button>
            <button @click="deleteAccount" class="flex-1 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-all font-bold shadow-xl shadow-red-500/20">
              Delete
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

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
]

const form = reactive({
  full_name: '',
  company_name: ''
})

const profileInitial = computed(() => {
  return (form.full_name || user.value?.email || 'U').charAt(0).toUpperCase()
})

const memberSince = computed(() => {
  if (!user.value?.created_at) return '—'
  return new Date(user.value.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const notificationSettings = ref([
  { id: 1, label: 'Message Alerts', icon: MessageSquare, description: 'Get notified when a client sends a message.', enabled: true },
  { id: 2, label: 'Lead Capture', icon: Zap, description: 'Receive alerts when new leads are captured.', enabled: true },
  { id: 3, label: 'Platform Updates', icon: Globe, description: 'Stay informed about new PinFlowser features.', enabled: true },
  { id: 4, label: 'Security Alerts', icon: Lock, description: 'Important notices about your account security.', enabled: true },
])

const saveProfile = async () => {
  saving.value = true
  saved.value = false
  
  await updateProfile({
    full_name: form.full_name,
    company_name: form.company_name
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
