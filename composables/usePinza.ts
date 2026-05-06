interface Client {
  id?: string
  user_id?: string
  name: string
  phone: string
  email?: string
  tags?: string[]
  notes?: string
  created_at?: string
}

interface Conversation {
  id?: string
  user_id?: string
  client_id: string
  last_message?: string
  unread_count?: number
  status?: string
  updated_at?: string
  created_at?: string
  client?: { name: string; phone: string }
}

interface Message {
  id?: string
  conversation_id: string
  user_id?: string
  sender: 'user' | 'client'
  content: string
  type?: string
  is_read?: boolean
  created_at?: string
}

export const usePinza = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // ─── State ──────────────────────────────
  const clients = useState<Client[]>('pinza_clients', () => [])
  const conversations = useState<Conversation[]>('pinza_conversations', () => [])
  const messages = useState<Message[]>('pinza_messages', () => [])
  const loading = useState('pinza_loading', () => false)
  const error = useState<string | null>('pinza_error', () => null)

  // ─── Dashboard Stats ────────────────────
  const dashboardStats = useState('pinza_stats', () => ({
    totalClients: 0,
    totalConversations: 0,
    activeConversations: 0,
    totalMessages: 0
  }))

  const fetchDashboardStats = async () => {
    if (!user.value) return

    const [clientsRes, convsRes, activeConvsRes, msgsRes] = await Promise.all([
      supabase.from('clients').select('id', { count: 'exact', head: true }),
      supabase.from('conversations').select('id', { count: 'exact', head: true }),
      supabase.from('conversations').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('messages').select('id', { count: 'exact', head: true })
    ])

    dashboardStats.value = {
      totalClients: clientsRes.count || 0,
      totalConversations: convsRes.count || 0,
      activeConversations: activeConvsRes.count || 0,
      totalMessages: msgsRes.count || 0
    }
  }

  // ─── Clients CRUD ───────────────────────
  const fetchClients = async () => {
    if (!user.value) return
    loading.value = true
    error.value = null

    const { data, error: err } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (err) {
      error.value = err.message
    } else {
      clients.value = data || []
    }
    loading.value = false
  }

  const addClient = async (client: Omit<Client, 'id' | 'user_id' | 'created_at'>) => {
    if (!user.value) return null
    loading.value = true
    error.value = null

    const { data, error: err } = await supabase
      .from('clients')
      .insert({
        ...client,
        user_id: user.value.id,
        tags: client.tags || []
      })
      .select()
      .single()

    if (err) {
      error.value = err.message
      loading.value = false
      return null
    }

    clients.value.unshift(data)
    loading.value = false
    return data
  }

  const updateClient = async (id: string, updates: Partial<Client>) => {
    loading.value = true
    error.value = null

    const { data, error: err } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (err) {
      error.value = err.message
      loading.value = false
      return null
    }

    const idx = clients.value.findIndex(c => c.id === id)
    if (idx !== -1) clients.value[idx] = data
    loading.value = false
    return data
  }

  const deleteClient = async (id: string) => {
    loading.value = true
    error.value = null

    const { error: err } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)

    if (err) {
      error.value = err.message
    } else {
      clients.value = clients.value.filter(c => c.id !== id)
    }
    loading.value = false
    return !err
  }

  // ─── Conversations CRUD ─────────────────
  const fetchConversations = async () => {
    if (!user.value) return
    loading.value = true
    error.value = null

    const { data, error: err } = await supabase
      .from('conversations')
      .select(`
        *,
        client:client_id (name, phone)
      `)
      .order('updated_at', { ascending: false })

    if (err) {
      error.value = err.message
    } else {
      conversations.value = data || []
    }
    loading.value = false
  }

  const createConversation = async (clientId: string) => {
    if (!user.value) return null
    error.value = null

    // Check if active conversation already exists
    const existing = conversations.value.find(
      c => c.client_id === clientId && c.status === 'active'
    )
    if (existing) return existing

    const { data, error: err } = await supabase
      .from('conversations')
      .insert({
        user_id: user.value.id,
        client_id: clientId,
        status: 'active',
        unread_count: 0
      })
      .select(`
        *,
        client:client_id (name, phone)
      `)
      .single()

    if (err) {
      error.value = err.message
      return null
    }

    conversations.value.unshift(data)
    return data
  }

  // ─── Messages CRUD ──────────────────────
  const fetchMessages = async (conversationId: string) => {
    if (!user.value) return
    error.value = null

    const { data, error: err } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (err) {
      error.value = err.message
    } else {
      messages.value = data || []
    }
  }

  const sendMessage = async (conversationId: string, content: string, sender: 'user' | 'client' = 'user') => {
    if (!user.value) return null
    error.value = null

    const { data, error: err } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        user_id: user.value.id,
        sender,
        content,
        type: 'text'
      })
      .select()
      .single()

    if (err) {
      error.value = err.message
      return null
    }

    messages.value.push(data)

    // Update conversation last_message
    await supabase
      .from('conversations')
      .update({
        last_message: content,
        updated_at: new Date().toISOString()
      })
      .eq('id', conversationId)

    // Update local conversation cache
    const convIdx = conversations.value.findIndex(c => c.id === conversationId)
    if (convIdx !== -1) {
      conversations.value[convIdx].last_message = content
      conversations.value[convIdx].updated_at = new Date().toISOString()
    }

    return data
  }

  // ─── Profile ────────────────────────────
  const profile = useState<any>('pinza_profile', () => null)

  const fetchProfile = async () => {
    if (!user.value) return
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()

    profile.value = data
  }

  const updateProfile = async (updates: Record<string, any>) => {
    if (!user.value) return null
    error.value = null

    const { data, error: err } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.value.id)
      .select()
      .single()

    if (err) {
      error.value = err.message
      return null
    }

    profile.value = data
    return data
  }

  return {
    // State
    clients,
    conversations,
    messages,
    loading,
    error,
    dashboardStats,
    profile,
    // Dashboard
    fetchDashboardStats,
    // Clients
    fetchClients,
    addClient,
    updateClient,
    deleteClient,
    // Conversations
    fetchConversations,
    createConversation,
    // Messages
    fetchMessages,
    sendMessage,
    // Profile
    fetchProfile,
    updateProfile
  }
}
