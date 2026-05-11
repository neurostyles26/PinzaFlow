export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  is_read: boolean
  created_at: string
}

export const useNotifications = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const notifications = useState<Notification[]>('notifications', () => [])
  const loading = ref(false)

  const unreadCount = computed(() => notifications.value.filter(n => !n.is_read).length)

  const fetchNotifications = async () => {
    if (!user.value) return
    loading.value = true
    const { data, error } = await (supabase.from('notifications') as any)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (!error && data) {
      notifications.value = data
    }
    loading.value = false
  }

  const addNotification = async (notif: Omit<Notification, 'id' | 'is_read' | 'created_at'>) => {
    if (!user.value) return
    const { data, error } = await (supabase.from('notifications') as any)
      .insert({
        ...notif,
        user_id: user.value.id
      })
      .select()
      .single()

    if (!error && data) {
      notifications.value.unshift(data)
    }
  }

  const markAsRead = async (id: string) => {
    const { error } = await (supabase.from('notifications') as any)
      .update({ is_read: true })
      .eq('id', id)

    if (!error) {
      const notif = notifications.value.find(n => n.id === id)
      if (notif) notif.is_read = true
    }
  }

  const markAllAsRead = async () => {
    if (!user.value) return
    const { error } = await (supabase.from('notifications') as any)
      .update({ is_read: true })
      .eq('user_id', user.value.id)

    if (!error) {
      notifications.value.forEach(n => n.is_read = true)
    }
  }

  const removeNotification = async (id: string) => {
    const { error } = await (supabase.from('notifications') as any)
      .delete()
      .eq('id', id)

    if (!error) {
      notifications.value = notifications.value.filter(n => n.id !== id)
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification
  }
}
