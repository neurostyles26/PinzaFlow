export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!body.messages || !Array.isArray(body.messages)) {
    throw createError({ statusCode: 400, statusMessage: 'Messages array is required' })
  }

  const apiKey = config.openaiApiKey
  if (!apiKey || apiKey === 'your-openai-api-key') {
    throw createError({ statusCode: 500, statusMessage: 'OpenAI API key not configured' })
  }

  try {
    const response = await $fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente de ventas para un negocio en Latinoamérica. 
Tu trabajo es sugerir respuestas profesionales, amigables y orientadas a cerrar ventas.
Responde siempre en español. Sé conciso (1-2 oraciones máximo).
Mantén un tono cálido y profesional.`
          },
          ...body.messages.map((m: any) => ({
            role: m.sender === 'user' ? 'assistant' : 'user',
            content: m.content
          })),
          {
            role: 'user',
            content: 'Sugiere una respuesta profesional para continuar esta conversación y avanzar hacia una venta.'
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      }
    })

    return {
      suggestion: (response as any).choices?.[0]?.message?.content || 'No se pudo generar una sugerencia.'
    }
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Error calling OpenAI API'
    })
  }
})
