// Учебный материал и сборка заданий. Чтобы добавить слово или уровень — правьте
// списки ниже, код игр трогать не нужно.

export type StageId = 'sounds' | 'syllables' | 'words' | 'phrases' | 'stories'

export interface Stage {
  id: StageId
  title: string
  pic: string
  /** подписи уровней; пустой список — этап ещё не готов */
  levels: string[]
}

export const VOWELS = 'АЕЁИОУЫЭЮЯ'

// ── Этап 1: слово на слух → первая буква ─────────────────────────────────────
// Берутся слова, где первый звук слышен однозначно (без безударной «о» → «а»).
const FIRST_LETTER: { word: string; pic: string }[][] = [
  [
    { word: 'арбуз', pic: '🍉' },
    { word: 'утка', pic: '🦆' },
    { word: 'облако', pic: '☁️' },
    { word: 'индюк', pic: '🦃' },
    { word: 'луна', pic: '🌙' },
    { word: 'мышка', pic: '🐭' },
    { word: 'носки', pic: '🧦' },
    { word: 'ракета', pic: '🚀' },
  ],
  [
    { word: 'собака', pic: '🐕' },
    { word: 'кот', pic: '🐈' },
    { word: 'тигр', pic: '🐅' },
    { word: 'пингвин', pic: '🐧' },
    { word: 'банан', pic: '🍌' },
    { word: 'дом', pic: '🏠' },
    { word: 'гриб', pic: '🍄' },
    { word: 'волк', pic: '🐺' },
    { word: 'зебра', pic: '🦓' },
  ],
  [
    { word: 'шар', pic: '🎈' },
    { word: 'жираф', pic: '🦒' },
    { word: 'хлеб', pic: '🍞' },
    { word: 'флаг', pic: '🚩' },
    { word: 'цветок', pic: '🌸' },
    { word: 'черепаха', pic: '🐢' },
    { word: 'яблоко', pic: '🍎' },
    { word: 'ёжик', pic: '🦔' },
  ],
]

// ── Этап 2: слоги «согласная + гласная» ──────────────────────────────────────
const SYLLABLES: { cons: string; vowels: string }[] = [
  { cons: 'МНЛР', vowels: 'АОУЫИ' },
  { cons: 'СКТП', vowels: 'АОУЫИ' },
  { cons: 'БДГВЗ', vowels: 'АОУЫИ' },
  { cons: 'ШЖХФ', vowels: 'АОУИ' },
  { cons: 'МНЛРСТ', vowels: 'ЯЕЁЮ' },
]
// сочетания, которых в русских словах почти нет
const NO_SUCH_SYLLABLE = ['КЫ', 'ГЫ', 'ХЫ']

// ── Этап 3: слова по слогам + картинка ───────────────────────────────────────
// Уровни: два открытых слога → три открытых → закрытые слоги и стечения согласных.
const WORDS: { syl: string[]; pic: string }[][] = [
  [
    { syl: ['ЛУ', 'НА'], pic: '🌙' },
    { syl: ['МА', 'МА'], pic: '👩' },
    { syl: ['РЫ', 'БА'], pic: '🐟' },
    { syl: ['КО', 'ЗА'], pic: '🐐' },
    { syl: ['ЛИ', 'СА'], pic: '🦊' },
    { syl: ['СО', 'ВА'], pic: '🦉' },
    { syl: ['РО', 'ЗА'], pic: '🌹' },
    { syl: ['ГО', 'РА'], pic: '⛰️' },
  ],
  [
    { syl: ['РА', 'КЕ', 'ТА'], pic: '🚀' },
    { syl: ['КО', 'МЕ', 'ТА'], pic: '☄️' },
    { syl: ['СО', 'БА', 'КА'], pic: '🐕' },
    { syl: ['МА', 'ШИ', 'НА'], pic: '🚗' },
    { syl: ['КО', 'РО', 'ВА'], pic: '🐄' },
    { syl: ['РА', 'ДУ', 'ГА'], pic: '🌈' },
    { syl: ['ГИ', 'ТА', 'РА'], pic: '🎸' },
    { syl: ['ДЕ', 'РЕ', 'ВО'], pic: '🌳' },
  ],
  [
    { syl: ['КОС', 'МОС'], pic: '🌌' },
    { syl: ['РО', 'БОТ'], pic: '🤖' },
    { syl: ['ЗВЕЗ', 'ДА'], pic: '⭐' },
    { syl: ['ПЛА', 'НЕ', 'ТА'], pic: '🪐' },
    { syl: ['СПУТ', 'НИК'], pic: '🛰️' },
    { syl: ['СОЛН', 'ЦЕ'], pic: '☀️' },
    { syl: ['ЛИ', 'МОН'], pic: '🍋' },
    { syl: ['БА', 'НАН'], pic: '🍌' },
  ],
]

// ── Этап 4: фразы ────────────────────────────────────────────────────────────
// Картинка-ответ составлена из тех же предметов, что и фраза; неверные варианты
// (wrong) отличаются одним предметом — чтобы выбрать, надо прочитать все слова.
// Без wrong неверные картинки берутся случайно из остальных фраз уровня.
const PHRASES: { text: string; pic: string; wrong?: string[] }[][] = [
  [
    { text: 'ВОТ ЛУНА', pic: '🌙' },
    { text: 'ВОТ РАКЕТА', pic: '🚀' },
    { text: 'ЭТО РОБОТ', pic: '🤖' },
    { text: 'ТАМ КОМЕТА', pic: '☄️' },
    { text: 'ВОТ СОВА', pic: '🦉' },
    { text: 'ЭТО РЫБА', pic: '🐟' },
    { text: 'ТУТ ЛИСА', pic: '🦊' },
    { text: 'ВОТ МАШИНА', pic: '🚗' },
  ],
  [
    { text: 'РОБОТ ВИДИТ ЗВЕЗДУ', pic: '🤖⭐', wrong: ['🤖🌙', '🐕⭐'] },
    { text: 'СОБАКА В РАКЕТЕ', pic: '🐕🚀', wrong: ['🐈🚀', '🐕🚗'] },
    { text: 'КОТ НА ЛУНЕ', pic: '🐈🌙', wrong: ['🐈⛰️', '🦊🌙'] },
    { text: 'МАМА В МАШИНЕ', pic: '👩🚗', wrong: ['👩🚀', '🤖🚗'] },
    { text: 'СОВА НА ГОРЕ', pic: '🦉⛰️', wrong: ['🦉🌳', '🐐⛰️'] },
    { text: 'ЛИСА У ДЕРЕВА', pic: '🦊🌳', wrong: ['🦊🏠', '🐺🌳'] },
    { text: 'РОБОТ ЕСТ БАНАН', pic: '🤖🍌', wrong: ['🤖🍋', '🐕🍌'] },
    { text: 'РЫБА ВИДИТ ЛУНУ', pic: '🐟🌙', wrong: ['🐟☀️', '🦉🌙'] },
  ],
  [
    { text: 'РАКЕТА ЛЕТИТ НА ЛУНУ', pic: '🚀🌙', wrong: ['🚀☀️', '🚗🌙'] },
    { text: 'РОБОТ ДАЛ СОБАКЕ БАНАН', pic: '🤖🐕🍌', wrong: ['🤖🐈🍌', '🤖🐕🍋'] },
    { text: 'МАМА И КОТ ДОМА', pic: '👩🐈🏠', wrong: ['👩🐕🏠', '👩🐈🚗'] },
    { text: 'КОМЕТА ЛЕТИТ К ПЛАНЕТЕ', pic: '☄️🪐', wrong: ['☄️🌙', '🚀🪐'] },
    { text: 'СПУТНИК ЛЕТИТ НАД ГОРОЙ', pic: '🛰️⛰️', wrong: ['🛰️🏠', '🚀⛰️'] },
    { text: 'НА ПЛАНЕТЕ РАСТЁТ ДЕРЕВО', pic: '🪐🌳', wrong: ['🪐🌹', '🌙🌳'] },
    { text: 'ЛИСА И СОВА В РАКЕТЕ', pic: '🦊🦉🚀', wrong: ['🦊🐺🚀', '🦊🦉🚗'] },
    { text: 'СОБАКА ВИДИТ В НЕБЕ КОМЕТУ', pic: '🐕☄️', wrong: ['🐈☄️', '🐕🌈'] },
  ],
]

// ── Этап 5: короткие истории ─────────────────────────────────────────────────
// По предложению на экран; в конце один вопрос на понимание (ask — как его
// произнести и показать, answer/wrong — картинки).
interface Story {
  title: string
  pic: string
  pages: { text: string; pic: string }[]
  ask: string
  answer: string
  wrong: string[]
}

const STORIES: Story[] = [
  {
    title: 'РОБОТ И ЛУНА',
    pic: '🤖',
    pages: [
      { text: 'ЭТО РОБОТ РОМА.', pic: '🤖' },
      { text: 'У РОМЫ РАКЕТА.', pic: '🤖🚀' },
      { text: 'РОМА ЛЕТИТ НА ЛУНУ.', pic: '🚀🌙' },
      { text: 'НА ЛУНЕ ТИХО.', pic: '🌙✨' },
    ],
    ask: 'Куда летит Рома?',
    answer: '🌙',
    wrong: ['☀️', '🏠'],
  },
  {
    title: 'КОТ В КОСМОСЕ',
    pic: '🐈',
    pages: [
      { text: 'У МАШИ КОТ ТИМ.', pic: '👧🐈' },
      { text: 'ТИМ СЕЛ В РАКЕТУ.', pic: '🐈🚀' },
      { text: 'РАКЕТА ЛЕТИТ К ЗВЁЗДАМ.', pic: '🚀⭐' },
      { text: 'ТИМ ВИДИТ КОМЕТУ.', pic: '🐈☄️' },
      { text: 'МАША ЖДЁТ ТИМА ДОМА.', pic: '👧🏠' },
    ],
    ask: 'Кто сел в ракету?',
    answer: '🐈',
    wrong: ['🐕', '🤖'],
  },
  {
    title: 'НОВАЯ ПЛАНЕТА',
    pic: '🪐',
    pages: [
      { text: 'РАКЕТА СЕЛА НА ПЛАНЕТУ.', pic: '🚀🪐' },
      { text: 'ТАМ РАСТУТ РОЗЫ.', pic: '🌹🌹' },
      { text: 'У РОЗЫ СИДИТ ЛИСА.', pic: '🌹🦊' },
      { text: 'ЛИСА ДАЛА РОБОТУ ЛИМОН.', pic: '🦊🤖🍋' },
      { text: 'РОБОТ РАД.', pic: '🤖😊' },
    ],
    ask: 'Что лиса дала роботу?',
    answer: '🍋',
    wrong: ['🍌', '🍎'],
  },
]

export const STAGES: Stage[] = [
  { id: 'sounds', title: 'Звуки', pic: '🌙', levels: ['А О У И М Н Л Р', 'С К Т П Б Д Г В З', 'Ш Ж Х Ф Ц Ч Я Ё'] },
  { id: 'syllables', title: 'Слоги', pic: '🪐', levels: ['М Н Л Р', 'С К Т П', 'Б Д Г В З', 'Ш Ж Х Ф', 'Я Е Ё Ю'] },
  { id: 'words', title: 'Слова', pic: '🌍', levels: ['ЛУ-НА', 'РА-КЕ-ТА', 'КОС-МОС'] },
  { id: 'phrases', title: 'Фразы', pic: '☀️', levels: ['ВОТ ЛУНА', 'КОТ НА ЛУНЕ', 'РАКЕТА ЛЕТИТ НА ЛУНУ'] },
  { id: 'stories', title: 'Истории', pic: '🌌', levels: STORIES.map((s) => `${s.pic} ${s.title}`) },
]

/**
 * Деление слова на слоги для подсказки по нажатию. Правило простое: одна
 * согласная между гласными уходит вправо (РА-КЕ-ТА), из двух и более первая
 * остаётся слева (КОС-МОС, ЗВЕЗ-ДА); й, ь, ъ не отрываются от своего слога.
 * Знак препинания остаётся при последнем слоге.
 */
export function syllabify(word: string): string[] {
  const tail = word.match(/[.,!?…]+$/)?.[0] ?? ''
  const chars = [...word.slice(0, word.length - tail.length)]
  const vowelAt = chars.flatMap((ch, i) => (VOWELS.includes(ch.toUpperCase()) ? [i] : []))
  const parts: string[] = []
  let start = 0
  for (let k = 0; k + 1 < vowelAt.length; k++) {
    const next = vowelAt[k + 1]
    let cut = next - vowelAt[k] - 1 >= 2 ? vowelAt[k] + 2 : vowelAt[k] + 1
    while (cut < next && 'ЙЬЪ'.includes(chars[cut].toUpperCase())) cut++
    parts.push(chars.slice(start, cut).join(''))
    start = cut
  }
  parts.push(chars.slice(start).join('') + tail)
  return parts
}

// ── Тексты для озвучки ───────────────────────────────────────────────────────
export const PRAISE = 'Молодец!'

export const firstLetterPrompt = (word: string) => `${word}. Какая первая буква?`

/** Слово из фразы без знаков препинания — так оно произносится по нажатию. */
export const spoken = (word: string) => word.toLowerCase().replace(/[.,!?…]/g, '')

/**
 * Всё, что приложение может произнести. По этому списку tools/make_audio.py
 * записывает файлы озвучки, поэтому любой новый текст для say() добавлять сюда.
 */
export function allUtterances(): string[] {
  const out = new Set<string>()
  const add = (text: string) => out.add(text.toLowerCase())
  const addSentence = (text: string) => {
    add(text)
    text.split(' ').forEach((w) => add(spoken(w)))
  }
  FIRST_LETTER.flat().forEach((x) => add(firstLetterPrompt(x.word)))
  for (const { cons, vowels } of SYLLABLES) {
    for (const v of vowels) add(v)
    for (const c of cons) for (const v of vowels) if (!NO_SUCH_SYLLABLE.includes(c + v)) add(c + v)
  }
  WORDS.flat().forEach((w) => {
    w.syl.forEach(add)
    add(w.syl.join(''))
  })
  PHRASES.flat().forEach((p) => addSentence(p.text))
  STORIES.forEach((s) => {
    s.pages.forEach((p) => addSentence(p.text))
    add(s.ask)
  })
  add(PRAISE)
  return [...out]
}

// ── Задания ──────────────────────────────────────────────────────────────────
export type Task =
  | { kind: 'first'; word: string; pic: string; answer: string; options: string[] }
  | { kind: 'dock'; c: string; v: string }
  | { kind: 'pickSyl'; answer: string; options: string[] }
  | { kind: 'word'; syl: string[]; answer: string; options: string[] }
  | { kind: 'phrase'; words: string[]; answer: string; options: string[] }
  | { kind: 'page'; words: string[]; pic: string }
  | { kind: 'question'; text: string; answer: string; options: string[] }

// занятие короткое: 8 заданий ≈ 5 минут
const SESSION = 8

function shuffle<T>(items: T[]): T[] {
  const r = [...items]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

function withDistractors(answer: string, pool: string[], count = 2): string[] {
  const others = shuffle([...new Set(pool)].filter((x) => x !== answer)).slice(0, count)
  return shuffle([answer, ...others])
}

function soundTasks(level: number): Task[] {
  const items = FIRST_LETTER[level]
  const letters = items.map((x) => x.word[0].toUpperCase())
  return shuffle(items)
    .slice(0, SESSION)
    .map((x) => {
      const answer = x.word[0].toUpperCase()
      return { kind: 'first', word: x.word, pic: x.pic, answer, options: withDistractors(answer, letters) }
    })
}

function syllableTasks(level: number): Task[] {
  const { cons, vowels } = SYLLABLES[level]
  const all: string[] = []
  for (const c of cons) for (const v of vowels) if (!NO_SUCH_SYLLABLE.includes(c + v)) all.push(c + v)
  const picked = shuffle(all).slice(0, SESSION)
  // сначала три «стыковки» (буква + буква = слог), потом поиск слога на слух
  const docks: Task[] = picked.slice(0, 3).map((s) => ({ kind: 'dock', c: s[0], v: s[1] }))
  const quizzes: Task[] = picked.slice(3).map((answer) => {
    // соседи отличаются одной буквой — иначе слог угадывается по первой букве
    const sameCons = shuffle(all.filter((s) => s[0] === answer[0] && s !== answer))[0]
    const sameVowel = shuffle(all.filter((s) => s[1] === answer[1] && s !== answer))[0]
    return { kind: 'pickSyl', answer, options: shuffle([answer, sameCons, sameVowel]) }
  })
  return [...docks, ...quizzes]
}

function wordTasks(level: number): Task[] {
  const pics = WORDS.flat().map((w) => w.pic)
  return shuffle(WORDS[level])
    .slice(0, SESSION)
    .map((w) => ({ kind: 'word', syl: w.syl, answer: w.pic, options: withDistractors(w.pic, pics) }))
}

function phraseTasks(level: number): Task[] {
  const pics = PHRASES[level].map((p) => p.pic)
  return shuffle(PHRASES[level])
    .slice(0, SESSION)
    .map((p) => ({
      kind: 'phrase',
      words: p.text.split(' '),
      answer: p.pic,
      options: p.wrong ? shuffle([p.pic, ...p.wrong]) : withDistractors(p.pic, pics),
    }))
}

// история читается по порядку, без перемешивания
function storyTasks(level: number): Task[] {
  const s = STORIES[level]
  return [
    ...s.pages.map((p): Task => ({ kind: 'page', words: p.text.split(' '), pic: p.pic })),
    { kind: 'question', text: s.ask, answer: s.answer, options: shuffle([s.answer, ...s.wrong]) },
  ]
}

export function buildTasks(stage: StageId, level: number): Task[] {
  if (stage === 'sounds') return soundTasks(level)
  if (stage === 'syllables') return syllableTasks(level)
  if (stage === 'words') return wordTasks(level)
  if (stage === 'phrases') return phraseTasks(level)
  return storyTasks(level)
}
