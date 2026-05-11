export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!body.messages || !Array.isArray(body.messages)) {
    throw createError({ statusCode: 400, statusMessage: 'Messages array is required' })
  }

  const googleKey = config.googleAiApiKey
  const openaiKey = config.openaiApiKey

  const systemPrompt = `Eres un asistente de ventas de élite para PinFlowser en Latinoamérica. 
Tu trabajo es sugerir respuestas que cierren ventas, manejen objeciones con empatía y muevan la conversación hacia el cierre.
Responde siempre en español. Sé conciso y directo (1-2 oraciones).
Mantén un tono cálido, profesional y proactivo.`

  // 1. Try Gemini (Google) first if configured
  if (googleKey && googleKey !== 'your-google-api-key') {
    try {
      const history = body.messages.map((m: any) => ({
        role: m.sender === 'user' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))

      const response = await $fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${googleKey}`, {
        method: 'POST',
        body: {
          contents: [
            { role: 'user', parts: [{ text: systemPrompt }] },
            { role: 'model', parts: [{ text: "Entendido. Estoy listo para sugerir respuestas de ventas efectivas." }] },
            ...history,
            { role: 'user', parts: [{ text: "Sugiere una respuesta para este cliente que ayude a avanzar hacia la venta o cerrar el trato." }] }
          ],
          generationConfig: {
            maxOutputTokens: 150,
            temperature: 0.7
          }
        }
      })

      return {
        suggestion: (response as any).candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo generar una sugerencia.'
      }
    } catch (err: any) {
      console.error('Gemini API Error:', err.message)
      // Fallback to OpenAI if Gemini fails and OpenAI is available
    }
  }

  // 2. Try OpenAI if Gemini failed or isn't configured
  if (openaiKey && openaiKey !== 'your-openai-api-key') {
    try {
      const response = await $fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json'
        },
        body: {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...body.messages.map((m: any) => ({
              role: m.sender === 'user' ? 'assistant' : 'user',
              content: m.content
            })),
            { role: 'user', content: 'Sugiere una respuesta profesional para avanzar hacia la venta.' }
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
        statusMessage: 'Error calling AI API'
      })
    }
  }

  throw createError({ statusCode: 500, statusMessage: 'No AI API keys configured' })
})
