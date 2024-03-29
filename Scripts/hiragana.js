import { createApp } from 'vue'
import { quizzApp } from "/scripts/quizz.js"

// hiragana;fr;phonetic;tags
const raw = `
あ;a;a;main,
か;ka;ka;main,
さ;sa;sa;main,
た;ta;ta;main,
な;na;na;main,
は;ha;ha;main,
ま;ma;ma;main,
や;ya;ja;main,
ら;ra;ɺa;main,
わ;wa;ɰa;main,
え;e;e;main,
け;ke;ke;main,
せ;se;se;main,
て;te;te;main,
ね;ne;ne;main,
へ;he;he;main,
め;me;me;main,
れ;re;ɺe;main,
い;i;i;main,
き;ki;ki;main,
し;shi;ɕi;main,
ち;chi;cɕi;main,
に;ni;ni;main,
ひ;hi;çi;main,
み;mi;mi;main,
ゆ;yu;jɯ;main,
り;ri;ɺi;main,
お;o;o;main,
こ;ko;ko;main,
そ;so;so;main,
と;to;to;main,
の;no;no;main,
ほ;ho;ho;main,
も;mo;mo;main,
ろ;ro;ɺo;main,
を;wo;ɰo;main,
う;u;ɯ;main,
く;ku;kɯ;main,
す;su;sɯ;main,
つ;tsu;tsɯ;main,
ぬ;nu;nɯ;main,
ふ;fu;ɸɯ;main,
む;mu;mɯ;main,
ゆ;yu;jɯ;main,
る;ru;ɺɯ;main,
ん;n;n;main
が;ga;ga;dakuten
ざ;za;za;dakuten
だ;da;da;dakuten
ば;ba;ba;dakuten
ぱ;pa;pa;dakuten
ぎ;gi;gi;dakuten
じ;ji;ʑi;dakuten
ぢ;ji,di;ɟʑi;dakuten
び;bi;bi;dakuten
ぴ;pi;pi;dakuten
ぐ;gu;gɯ;dakuten
ず;zu;zɯ;dakuten
づ;zu,du;zɯ;dakuten
ぶ;bu;bɯ;dakuten
ぷ;pu;pɯ;dakuten
げ;ge;ge;dakuten
ぜ;ze;ze;dakuten
で;de;de;dakuten
べ;be;be;dakuten
ぺ;pe;pe;dakuten
ご;go;go;dakuten
ぞ;zo;zo;dakuten
ど;do;do;dakuten
ぼ;bo;bo;dakuten
ぽ;po;po;dakuten
きゃ;kya;kʲa;combination
ぎゃ;gya;ɡʲa;combination
しゃ;sha;ɕa;combination
じゃ;ja;ɟʑa;combination
ちゃ;cha;cɕa;combination
にゃ;nya;ȵa;combination
ひゃ;hya;ça;combination
びゃ;bya;bʲa;combination
ぴゃ;pya;pʲa;combination
みゃ;mya;mʲa;combination
りゃ;rya;ɺʲa;combination
きゅ;kyu;kʲɯ;combination
ぎゅ;gyu;ɡʲɯ;combination
しゅ;shu;ɕɯ;combination
じゅ;ju;ɟʑɯ;combination
ちゅ;chu;cɕɯ;combination
にゅ;nyu;ȵɯ;combination
ひゅ;hyu;çɯ;combination
びゅ;byu;bʲɯ;combination
ぴゅ;pyu;pʲɯ;combination
みゅ;myu;mʲɯ;combination
りゅ;ryu;ɺʲɯ;combination
きょ;kyo;kʲo;combination
ぎょ;gyo;ɡʲo;combination
しょ;sho;ɕo;combination
じょ;jo;ɟʑo;combination
ちょ;cho;cɕo;combination
にょ;nyo;ȵo;combination
ひょ;hyo;ço;combination
びょ;byo;bʲo;combination
ぴょ;pyo;pʲo;combination
みょ;myo;mʲo;combination
りょ;ryo;ɺʲo;combination
`



createApp(quizzApp(raw)).mount('#app')