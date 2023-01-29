
const randomInt = (x) => Math.floor(Math.random() * x)
const newWordIndex = (array) => randomInt(array.length)
const isCorrectLocal = (word, answer) =>
    word.local == answer.toLowerCase()
    || word.alt.includes(answer.toLowerCase())


const parse = (input) => {
    return input.split("\n").filter(x => x).map(l => l.split(";")).map(a => {
        const alt = a[1].split(',')
        return {
            foreign: a[0],
            local: alt[0],
            alt: alt.slice(1),
            phonetic: a[2],
            tags: a[3].split(',')
        }
    })
}

export const quizzApp = (raw) => {
    const dico = parse(raw)
    return {
        data: () => {
            const firstWordIndex = newWordIndex(dico)
            let data = {
                wordIndex: firstWordIndex,
                word: dico[firstWordIndex],
                answer: undefined,
                previous: undefined,
                result: undefined
            }
            // console.log(data)
            return data
        },
        computed: {
            hasResult() {
                return this.result != undefined
            },
            goodResult() {
                return !this.result
            },
            correctionLocal() {
                return `${this.previous.local}${this.previous.alt?.length ? ", " + this.previous.alt.join(", ") : ""}`
            }
        },
        methods: {
            newWord() {
                this.previous = this.word
                this.wordIndex = newWordIndex(dico)
                this.word = dico[this.wordIndex]
            },
            onEnter() {
                this.result = isCorrectLocal(this.word, this.answer)
                this.newWord()
                this.answer = ""
            }
        }
    }
}