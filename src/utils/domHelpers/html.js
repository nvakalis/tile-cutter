export function html(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  if (value === undefined) {
    return el.innerHTML;
  } else {
    el.innerHTML = value;
  }
}