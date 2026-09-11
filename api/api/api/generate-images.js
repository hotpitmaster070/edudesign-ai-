import OpenAI from 'openai';
export default async function handler(req,res){
  const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  const { prompt } = req.body;
  const img = await openai.images.generate({ model:"dall-e-3", prompt: `UI icon, ${prompt}, Baku style, minimal` });
  res.status(200).json({ url: img.data[0].url });
}
