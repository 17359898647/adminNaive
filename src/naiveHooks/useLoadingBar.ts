import { loadingBar } from '@/naiveHooks/useMessage'

export function loadingStart() {
  loadingBar.start()
}
export function loadingFinish() {
  loadingBar.finish()
}
export function loadingError() {
  loadingBar.error()
}
