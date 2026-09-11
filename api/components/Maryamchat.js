export function initMaryamChat(containerId) {
  const el = document.getElementById(containerId);
  el.innerHTML = `
    <div class="flex gap-3 mb-4">
      <img src="https://i.pravatar.cc/100?img=5" class="w-10 h-10 rounded-full">
      <div class="bg-[#2A2936] p-4 rounded-xl">
        <p class="font-bold">Məryəm</p>
        <p class="text-sm opacity-80">Salam! Mən universitetdə oxumuram, öz yolumu seçdim. Şəklini göndər, birlikdə baxaq. Mən hələ öyrənirəm, amma bacardığım qədər kömək edəcəm.</p>
      </div>
    </div>
    <input id="maryam-file" type="file" class="mb-3"/>
    <button id="maryam-btn" class="bg-[#7C5DFF] px-5 py-2 rounded-lg">Göndər və rəy al</button>
    <div id="maryam-result" class="mt-4 text-sm opacity-80"></div>
  `;

  document.getElementById('maryam-btn').onclick = async () => {
    const file = document.getElementById('maryam-file').files[0];
    if(!file) return alert('Zəhmət olmasa şəkil seç');
    document.getElementById('maryam-result').innerText = 'Baxıram... ⏳';

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/maryam-analyze', { method: 'POST', body: formData });
    const data = await res.json();
    document.getElementById('maryam-result').innerText = data.feedback || 'Xəta oldu, yenidən cəhd et';
  };
}
