import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не разрешен' });
    }

    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email обязателен' });
    }

    // Сервер автоматически и безопасно берет ключи из настроек Vercel
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        return res.status(500).json({ error: 'Ошибка конфигурации: ключи сервера не найдены' });
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        const { error } = await supabase
            .from('waitlist')
            .insert([{ email: email }]);

        if (error) {
            return res.status(500).json({ error: 'База данных отклонила запрос', details: error.message });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: 'Внутренний сбой бэкенда' });
    }
}
    
