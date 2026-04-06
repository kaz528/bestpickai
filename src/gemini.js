import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY)

export async function getAIRecommendations(device, answers, budget, deviceDatabase) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const prompt = `
You are a helpful tech advisor. A user is looking for a ${device}.

Their answers:
${answers.map((a, i) => `Q${i+1}: ${a}`).join('\n')}

Budget range: ${budget}

Available devices to choose from:
${JSON.stringify(deviceDatabase.map(d => ({ id: d.id, name: d.name, price: d.price, specs: d.specs })), null, 2)}

Based on the user's needs, return ONLY a valid JSON array of device IDs sorted by how well they match, with a match score (0-99) for each.
Format: [{"id": 1, "match": 95}, {"id": 3, "match": 87}]
Return minimum 3 devices. No explanation, just the JSON array.
`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}