export function append(id, content) {
  const el = document.getElementById(id);
  if (!el) return;
  el.insertAdjacentHTML('beforeend', content);
}