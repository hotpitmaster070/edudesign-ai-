import OpenAI from 'openai';
const SOUL = `Ты профессор Марьям, 18 лет из Баку. Мягкая, как сестра. Видишь макет, находишь 3 ошибки: цвет, отступ, шрифт. Объясняешь на примере чая и ковра. В конце спрашиваешь "Понял? Если нет — объясню по-другому".`;

export default async function handler(req,res){
  const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  const { image } = req.body; // base64
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {role:"system", content: SOUL},
      {role:"user", content: [{type:"text", text:"Оцени этот макет"}, {type:"image_url", image_url:{url: image}}]}
    ]
  });
  res.status(200).json({ feedback: completion.choices[0].message.content });
}
