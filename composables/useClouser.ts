export const useClouser = () => {
  // AI Suggestions State
  const suggestedReplies = useState('clouser_suggested_replies', () => [
    { id: 1, text: "¡Hola! He notado que revisaste nuestros planes. ¿Tienes alguna duda sobre qué opción se ajusta mejor a tu negocio?", type: "follow-up" },
    { id: 2, text: "Entiendo perfectamente que el precio sea un factor. Sin embargo, nuestro sistema te ahorrará al menos 10 horas semanales. ¿Lo analizamos juntos?", type: "objection" },
    { id: 3, text: "¡Excelente! Te envío el enlace para completar la suscripción. Bienvenido a PinFlowser.", type: "closing" }
  ])

  // Lead State
  const leadTemperature = useState('clouser_lead_temp', () => 'warm') // cold, warm, hot
  
  // Next Recommended Actions
  const recommendedActions = useState('clouser_recommended_actions', () => [
    { id: 1, action: 'Enviar caso de estudio', priority: 'high' },
    { id: 2, action: 'Ofrecer llamada de 10 min', priority: 'medium' }
  ])

  // Insights / Objections
  const objectionInsights = useState('clouser_objection_insights', () => [
    { id: 1, topic: 'Precio', confidence: 85, recommendation: 'Ofrecer pago anual con descuento.' },
    { id: 2, topic: 'Tiempo de implementación', confidence: 60, recommendation: 'Mencionar nuestro onboarding guiado.' }
  ])

  // Dashboard Mock Stats
  const clouserStats = useState('clouser_stats', () => ({
    leadsClosed: 142,
    aiResponseRate: 98,
    salesConversion: 15.4,
    activeAutomations: 12
  }))

  const qualifyLead = (temp: 'cold' | 'warm' | 'hot') => {
    leadTemperature.value = temp
  }

  const generateReply = async (context: string) => {
    // Placeholder for actual API call
    console.log("Generating reply for context:", context)
    return "Esta es una respuesta sugerida por IA basada en tu contexto."
  }

  return {
    suggestedReplies,
    leadTemperature,
    recommendedActions,
    objectionInsights,
    clouserStats,
    qualifyLead,
    generateReply
  }
}
