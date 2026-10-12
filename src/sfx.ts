// Короткие звуки-отклики, синтезируются на лету — аудиофайлы не нужны.
let ctx: AudioContext | null = null

/** Общий аудиоконтекст (отклики и озвучка). iOS держит его приостановленным до первого касания. */
export function audioContext(): AudioContext | null {
  if (typeof AudioContext === 'undefined') return null
  ctx ??= new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
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
