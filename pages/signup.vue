<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-6">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <div class="mx-auto flex justify-center mb-4">
          <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-12 h-12 rounded-xl shadow-xl shadow-primary/30" />
        </div>
        <h1 class="text-3xl font-bold text-white tracking-tight">Create an account</h1>
        <p class="mt-2 text-text-secondary">Start automating your WhatsApp sales today</p>
      </div>

      <div class="card space-y-6">
        <form @submit.prevent="handleSignup" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1.5">Full Name</label>
            <input 
              v-model="name" 
              type="text" 
              required 
              class="input-field w-full" 
              placeholder="John Doe"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1.5">Email address</label>
            <input 
              v-model="email" 
              type="email" 
              required 
              class="input-field w-full" 
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
            <input 
              v-model="password" 
              type="password" 
              required 
              class="input-field w-full" 
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {{ error }}
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="btn-primary w-full flex items-center justify-center gap-2"
          >
            <span v-if="loading" class="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full"></span>
            {{ loading ? 'Creating account...' : 'Get Started' }}
          </button>
        </form>
      </div>

      <p class="text-center text-sm text-text-secondary">
        Already have an account? 
        <NuxtLink to="/login" class="text-primary hover:text-primary-accent font-semibold transition-colors">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'guest'
})

const supabase = useSupabaseClient()
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const handleSignup = async () => {
  loading.value = true
  error.value = null
  
  const { error: authError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        full_name: name.value
      }
    }
  })

  if (authError) {
    error.value = authError.message
  } else {
    // Show success or navigate
    alert('Signup successful! Please check your email to verify.')
    navigateTo('/login')
  }
  
  loading.value = false
}
</script>
