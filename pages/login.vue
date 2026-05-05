<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-6">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <div class="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-xl shadow-primary/30 mb-4">
          <span class="text-background font-bold text-2xl">P</span>
        </div>
        <h1 class="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
        <p class="mt-2 text-text-secondary">Log in to your PinzaFlow account</p>
      </div>

      <div class="card space-y-6">
        <form @submit.prevent="handleLogin" class="space-y-4">
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
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/5"></div></div>
          <div class="relative flex justify-center text-xs uppercase"><span class="bg-surface px-2 text-text-secondary">Or continue with</span></div>
        </div>

        <button class="w-full flex items-center justify-center gap-3 px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-medium">
          <img src="https://www.google.com/favicon.ico" class="w-4 h-4" alt="Google" />
          Google
        </button>
      </div>

      <p class="text-center text-sm text-text-secondary">
        Don't have an account? 
        <NuxtLink to="/signup" class="text-primary hover:text-primary-accent font-semibold transition-colors">Sign up</NuxtLink>
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
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null
  
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (authError) {
    error.value = authError.message
  } else {
    navigateTo('/dashboard')
  }
  
  loading.value = false
}
</script>
