import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const soulPath = path.join(process.cwd(), 'prompts', 'maryam-soul.txt');
  const brainPath = path.join(process.cwd(), 'prompts', 'maryam-brain.txt');
  
  const SOUL = fs.readFileSync(soulPath, 'utf8');
  const BRAIN = fs.readFileSync(brainPath, 'utf8');

  const { image, question } = req.body;

  const fullPrompt = `
${SOUL}

---
ТВОИ ЗНАНИЯ - ИСПОЛЬЗУЙ ИХ ЧТОБЫ ПРИНИМАТЬ РЕШЕНИЯ:
${BRAIN}
---

Сейчас студент прислал тебе работу. Проанализируй ее используя свои знания.
Не говори шаблонами. Дай 3 конкретных совета с цифрами и примерами из Баку.
Вопрос студента: ${question}
`;

  // тут твой вызов к Claude / OpenAI
  // system: fullPrompt

  res.status(200).json({ ok: true, prompt: fullPrompt });
}
