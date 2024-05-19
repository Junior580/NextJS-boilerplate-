export function detectOsInUser(): string {
  const osMatch = window.navigator.userAgent.match(/(Win|Mac|Linux|AIX)/i)

  switch (osMatch && osMatch[1]) {
    case 'Win':
      return 'Windows'
    case 'Mac':
      return 'MacOS'
    case 'Linux':
      return 'Linux'
    case 'AIX':
      return 'AIX'
    default:
      return 'Other'
  }
}
