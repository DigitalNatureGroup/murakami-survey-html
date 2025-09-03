// SUS（System Usability Scale） 10問・5件法（自然な日本語）
export const susSurvey = {
    id: "sus",
    title: "SUS（システム使用性評価）",
    title_en: "SUS (System Usability Scale)",
    description: "各項目について、最も近い選択肢を1つ選んでください（1=全くそう思わない〜5=強くそう思う）。",
    description_en: "For each item, please select the option that most closely matches your opinion (1=Strongly disagree to 5=Strongly agree).",
    questions: [
      { 
        id: "sus1",  
        type: "radio", 
        ui: "likert", 
        label: "1.このシステムをよく使いたいと思う。",
        label_en: "1. I think that I would like to use this system frequently.",
        required: true,
        options: [1,2,3,4,5].map(v => ({ 
          value: String(v), 
          label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
          label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
        })) 
      },
      { 
        id: "sus2",  
        type: "radio", 
        ui: "likert", 
        label: "2.このシステムは余計に複雑だと感じる。",
        label_en: "2. I found the system unnecessarily complex.",
        required: true,
        options: [1,2,3,4,5].map(v => ({ 
          value: String(v), 
          label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
          label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
        })) 
      },
      { 
        id: "sus3",  
        type: "radio", 
        ui: "likert", 
        label: "3.このシステムは簡単に使えると感じた。",
        label_en: "3. I thought the system was easy to use.",
        required: true,
        options: [1,2,3,4,5].map(v => ({ 
          value: String(v), 
          label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
          label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
        })) 
      },
      { 
        id: "sus4",  
        type: "radio", 
        ui: "likert", 
        label: "4.このシステムを使うにはサポートが必要だと思う。",
        label_en: "4. I think that I would need the support of a technical person to be able to use this system.",
        required: true,
        options: [1,2,3,4,5].map(v => ({ 
          value: String(v), 
          label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
          label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
        })) 
      },
      { 
        id: "sus5",  
        type: "radio", 
        ui: "likert", 
        label: "5.このシステムの機能はうまくまとまっていると感じた。",
        label_en: "5. I found the various functions in this system were well integrated.",
        required: true,
        options: [1,2,3,4,5].map(v => ({ 
          value: String(v), 
          label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
          label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
        })) 
      },
      { 
        id: "sus6",  
        type: "radio", 
        ui: "likert", 
        label: "6.このシステムには一貫性がないと感じる。",
        label_en: "6. I thought there was too much inconsistency in this system.",
        required: true,
        options: [1,2,3,4,5].map(v => ({ 
          value: String(v), 
          label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
          label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
        })) 
      },
      { 
        id: "sus7",  
        type: "radio", 
        ui: "likert", 
        label: "7.ほとんどの人がすぐに使いこなせると思う。",
        label_en: "7. I would imagine that most people would learn to use this system very quickly.",
        required: true,
        options: [1,2,3,4,5].map(v => ({ 
          value: String(v), 
          label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
          label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
        })) 
      },
      { 
        id: "sus8",  
        type: "radio", 
        ui: "likert", 
        label: "8.このシステムは使いにくいと感じた。",
        label_en: "8. I found the system very cumbersome to use.",
        required: true,
        options: [1,2,3,4,5].map(v => ({ 
          value: String(v), 
          label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
          label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
        })) 
      },
      { 
        id: "sus9",  
        type: "radio", 
        ui: "likert", 
        label: "9.このシステムを使うのに自信が持てた。",
        label_en: "9. I felt very confident using the system.",
        required: true,
        options: [1,2,3,4,5].map(v => ({ 
          value: String(v), 
          label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
          label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
        })) 
      },
      { 
        id: "sus10", 
        type: "radio", 
        ui: "likert", 
        label: "10.このシステムを使う前に、いろいろ学ぶ必要があると感じた。",
        label_en: "10. I needed to learn a lot of things before I could get going with this system.",
        required: true,
        options: [1,2,3,4,5].map(v => ({ 
          value: String(v), 
          label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
          label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
        })) 
      },
    ]
  };