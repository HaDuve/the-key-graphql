export function capitalizeEachWord(username: string): string {
  return username
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
}

export function splitNameFromMail(mail: string): string {
  return mail.split('@')[0]
}

export function isValidString(str: string): boolean {
  return !!(str && typeof str === 'string' && str.length > 0)
}
