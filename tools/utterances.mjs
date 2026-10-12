// Печатает JSON-список всех текстов озвучки из src/content.ts (для make_audio.py).
// esbuild приходит вместе с vite, отдельной зависимости не нужно.
import { build } from 'esbuild'

const result = await build({
  entryPoints: ['src/content.ts'],
  bundle: true,
  format: 'esm',
  write: false,
  logLevel: 'silent',
})
const code = Buffer.from(result.outputFiles[0].text).toString('base64')
const content = await import(`data:text/javascript;base64,${code}`)
process.stdout.write(JSON.stringify(content.allUtterances()))
