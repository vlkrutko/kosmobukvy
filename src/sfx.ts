// Короткие звуки-отклики, синтезируются на лету — аудиофайлы не нужны.
let ctx: AudioContext | null = null

// 15.10: на iPad звук мог молчать, хотя в Chrome все проверки проходили. У iOS три
// отличия: (1) жестом для звука считается только отпускание пальца (touchend/click),
// а не касание (pointerdown, на котором была разблокировка); (2) после блокировки экрана
// контекст становится 'interrupted', а не 'suspended', — его не будили; (3) Web Audio
// по умолчанию глушится беззвучным режимом, в отличие от прежнего синтезатора речи.
type WithAudioSession = Navigator & { audioSession?: { type: string } }

function playbackSession() {
  // iOS 17+: звук как у плеера — играет и в беззвучном режиме
  const session = (navigator as WithAudioSession).audioSession
  if (session && session.type !== 'playback') session.type = 'playback'
}

/** Общий аудиоконтекст (отклики и озвучка). */
export function audioContext(): AudioContext | null {
  if (typeof AudioContext === 'undefined') return null
  playbackSession()
  ctx ??= new AudioContext()
  if (ctx.state !== 'running') void ctx.resume().catch(() => undefined)
  return ctx
}

/** Вызывать из жеста пользователя: будит контекст, а старым iOS ещё нужен звук внутри жеста. */
export function unlockAudio() {
  const ac = audioContext()
  if (!ac || ac.state === 'running') return
  const silence = ac.createBufferSource()
  silence.buffer = ac.createBuffer(1, 1, 22050)
  silence.connect(ac.destination)
  silence.start()
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.15) {
  const ac = audioContext()
  if (!ac) return
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  const t = ac.currentTime + start
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur)
  osc.connect(gain).connect(ac.destination)
  osc.start(t)
  osc.stop(t + dur)
}

export function good() {
  tone(660, 0, 0.15)
  tone(990, 0.12, 0.25)
}

// ошибка — тихий мягкий звук, без «наказания»
export function bad() {
  tone(220, 0, 0.2, 'triangle', 0.1)
}

export function win() {
  ;[523, 659, 784, 1047].forEach((f, k) => tone(f, k * 0.13, 0.3))
}
