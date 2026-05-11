import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'No autorizado' })

  const body = await readBody(event)
  const { phone, message } = body

  if (!phone || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Teléfono y mensaje son requeridos' })
  }

  const supabase = await serverSupabaseClient(event)
  
  // Fetch user's WhatsApp credentials from profile
  const { data: profile, error: profileError } = await (supabase.from('profiles') as any)
    .select('whatsapp_phone_number_id, whatsapp_access_token')
    .eq('id', user.id)
    .single()

  if (profileError || !profile?.whatsapp_phone_number_id || !profile?.whatsapp_access_token) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'WhatsApp no configurado. Ve a Ajustes > WhatsApp para conectar tu cuenta.' 
    })
  }

  try {
    // Send message via Meta WhatsApp Cloud API
    const response = await $fetch(`https://graph.facebook.com/v17.0/${profile.whatsapp_phone_number_id}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${profile.whatsapp_access_token}`,
        'Content-Type': 'application/json'
      },
      body: {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phone.replace(/\D/g, ''), // Clean phone number
        type: 'text',
        text: { body: message }
      }
    })

    return { success: true, data: response }
  } catch (err) {
    console.error('WhatsApp API Error:', err.data || err.message)
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.data?.error?.message || 'Error al enviar mensaje por WhatsApp'
    })
  }
})
