export function tf(item, field, lang) {
  if (!item) return '';
  if (lang === 'en' && item[`${field}_en`]) {
    return item[`${field}_en`];
  }
  return item[field];
}