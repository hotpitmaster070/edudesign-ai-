export function initConstructor(containerId) {
  const el = document.getElementById(containerId);
  el.innerHTML = `
    <h3 class="text-xl font-bold mb-3">Konstruktor — Praktik tapşırıq</h3>
    <p class="opacity-60 text-sm mb-4">Şəklini yüklə, Figma linkini yapışdır, və ya təsvir et. Süni intellekt köməyi ilə inkişaf edəcəksən.</p>
    <textarea id="figma-link" placeholder="Figma linki (istəyə bağlı)" class="w-full bg-[#1A1925] p-3 rounded-lg mb-3"></textarea>
    <button id="figma-btn" class="bg-white text-black px-5 py-2 rounded-lg">Figma-dan gətir</button>
  `;
  document.getElementById('figma-btn').onclick = async () => {
    const link = document.getElementById('figma-link').value;
    if(!link) return alert('Link yapışdır');
    alert('Figma importu hazırdır - /api/figma-import işləyir');
  };
}
