import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'No autorizado' })

  const body = await readBody(event)
  const { test_phone } = body

  if (!test_phone) {
    throw createError({ statusCode: 400, statusMessage: 'Número de teléfono de prueba requerido' })
  }

  const supabase = await serverSupabaseClient(event)
  
  // Fetch current user's WhatsApp credentials
  const { data: profile, error: profileError } = await (supabase.from('profiles') as any)
    .select('whatsapp_phone_number_id, whatsapp_access_token')
    .eq('id', user.id)
    .single()

  if (profileError || !profile?.whatsapp_phone_number_id || !profile?.whatsapp_access_token) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Configuración incompleta. Por favor guarda tus credenciales en Ajustes primero.' 
    })
  }

  try {
    // Send test message
    const response = await $fetch(`https://graph.facebook.com/v17.0/${profile.whatsapp_phone_number_id}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${profile.whatsapp_access_token}`,
        'Content-Type': 'application/json'
      },
      body: {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: test_phone.replace(/\D/g, ''),
        type: 'text',
        text: { body: '¡Hola! Este es un mensaje de prueba de PinFlowser. Tu conexión con WhatsApp Cloud API se ha configurado correctamente. 🚀' }
      }
    })

    return { success: true, message: '¡Mensaje de prueba enviado correctamente!' }
  } catch (err: any) {
    console.error('WhatsApp Test API Error:', err.data || err.message)
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.data?.error?.message || 'Error al enviar mensaje de prueba. Verifica tus credenciales.'
    })
  }
})
