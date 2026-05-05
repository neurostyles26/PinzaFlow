export const usePinza = () => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  
  // State
  const clients = useState('pinza_clients', () => [])
  const conversations = useState('pinza_conversations', () => [])
  const loading = useState('pinza_loading', () => false)

  // Actions
  const fetchClients = async () => {
    loading.value = true
    const { data, error } = await client
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) clients.value = data
    loading.value = false
  }

  const fetchConversations = async () => {
    loading.value = true
    const { data, error } = await client
      .from('conversations')
      .select(`
        *,
        client:client_id (name, phone)
      `)
      .order('updated_at', { ascending: false })
    
    if (!error) conversations.value = data
    loading.value = false
  }

  return {
    clients,
    conversations,
    loading,
    fetchClients,
    fetchConversations
  }
}
