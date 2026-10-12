import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { audioContext } from './sfx'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// iOS разрешает звук только после касания: будим аудиоконтекст на первом же нажатии,
// иначе реплика, произносимая с задержкой после ответа, осталась бы немой
window.addEventListener('pointerdown', () => void audioContext())

// офлайн-кэш только в собранной версии: в dev он мешал бы видеть свежие правки
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('sw.js')
  })
}
