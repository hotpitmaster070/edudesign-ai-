// Этот код выполняется на защищенном сервере Vercel, а не в телефоне пользователя
export default async function handler(req, res) {
    // Разрешаем запросы только методом POST (для безопасности)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не разрешен' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email обязателен' });
    }

    // Секретные ключи лежат на сервере, их никто и никогда не сможет украсть из браузера
    const SUPABASE_URL = "https://supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqZnByZHBjaHdoc2NmdWRrcHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTM4MDUsImV4cCI6MjEwNDI2OTgwNX0.RhYwQwJQywP6rz5w0DCdpyEe6q6Ckzt475UXt_sRpMQ";

    try {
        // Сервер безопасно отправляет данные в Supabase. Операторы связи это не заблокируют.
        const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            const errText = await response.text();
            return res.status(500).json({ error: 'Ошибка базы данных', details: errText });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
    }
                              
