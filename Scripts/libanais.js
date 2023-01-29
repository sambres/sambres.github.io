import { createApp } from "vue"
import { quizzApp } from "/scripts/quizz.js"

// lb;fr;phonetic;tags
const raw = `emm;mere,maman;;
bayy;pere,papa;;`
createApp(quizzApp(raw)).mount('#app')