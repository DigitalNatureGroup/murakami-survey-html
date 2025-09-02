// SUS（System Usability Scale） 10問・5件法（自然な日本語）
export const susSurvey = {
    id: "sus",
    title: "SUS（システム使用性評価）",
    description: "各項目について、最も近い選択肢を1つ選んでください（1=全くそう思わない〜5=強くそう思う）。",
    questions: [
      { id: "sus1",  type: "radio", label: "1.このシステムをよく使いたいと思う。",                 required: true,
        options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
      { id: "sus2",  type: "radio", label: "2.このシステムは余計に複雑だと感じる。",               required: true,
        options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
      { id: "sus3",  type: "radio", label: "3.このシステムは簡単に使えると感じた。",               required: true,
        options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
      { id: "sus4",  type: "radio", label: "4.このシステムを使うにはサポートが必要だと思う。",       required: true,
        options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
      { id: "sus5",  type: "radio", label: "5.このシステムの機能はうまくまとまっていると感じた。", required: true,
        options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
      { id: "sus6",  type: "radio", label: "6.このシステムには一貫性がないと感じる。",             required: true,
        options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
      { id: "sus7",  type: "radio", label: "7.ほとんどの人がすぐに使いこなせると思う。",           required: true,
        options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
      { id: "sus8",  type: "radio", label: "8.このシステムは使いにくいと感じた。",                 required: true,
        options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
      { id: "sus9",  type: "radio", label: "9.このシステムを使うのに自信が持てた。",               required: true,
        options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
      { id: "sus10", type: "radio", label: "10.このシステムを使う前に、いろいろ学ぶ必要があると感じた。", required: true,
        options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
    ]
  };