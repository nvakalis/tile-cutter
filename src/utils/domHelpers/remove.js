export function remove(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.parentNode.removeChild(el);
}