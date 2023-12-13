import TurboConsole from 'vite-plugin-turbo-console'

export function enhanceLog(): any {
  return TurboConsole({
    disableLaunchEditor: false,
    prefix: '🦕',
  })
}
