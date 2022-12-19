export function getName(str) {
  const regex = /^--username=/;
  return regex.test(str) ? str.replace(regex, '') : 'Anonymous';
}
