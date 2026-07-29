
export const COMMON_WORDS: string[] = [
  "the","be","to","of","and","a","in","that","have","it","for","not","on","with","he",
  "as","you","do","at","this","but","his","by","from","they","we","say","her","she","or",
  "an","will","my","one","all","would","there","their","what","so","up","out","if","about","who",
  "get","which","go","me","when","make","can","like","time","no","just","him","know","take","people",
  "into","year","your","good","some","could","them","see","other","than","then","now","look","only","come",
  "its","over","think","also","back","after","use","two","how","our","work","first","well","way","even",
  "new","want","because","any","these","give","day","most","us","is","water","long","find","here","thing",
  "great","little","own","under","last","never","world","life","form","report","open","seem","together","next",
  "government","system","program","question","during","without","again","place","around","however","home","small",
  "found","thought","went","study","still","learn","should","america","between","large","name","really","few","north",
  "measure","paper","too","mean","before","move","right","boy","old","too","same","tell","does","set","three",
  "want","air","well","also","play","small","end","put","home","read","hand","port","large","spell","add",
  "even","land","here","must","big","high","such","follow","act","why","ask","men","change","went","light",
  "kind","need","house","picture","try","again","animal","point","mother","world","near","build","self","earth",
  "father","head","stand","own","page","should","country","found","answer","school","grow","study","still","learn",
  "plant","cover","food","sun","four","between","state","keep","eye","never","last","let","thought","city","tree",
  "cross","farm","hard","start","might","story","saw","far","sea","draw","left","late","run","dont","while",
  "press","close","night","real","life","few","north","open","seem","together","next","white","children","begin",
  "got","walk","example","ease","paper","group","always","music","those","both","mark","often","letter","until",
  "mile","river","car","feet","care","second","enough","plain","girl","usual","young","ready","above","ever",
  "red","list","though","feel","talk","bird","soon","body","dog","family","direct","pose","leave","song","measure",
  "door","product","black","short","numeral","class","wind","question","happen","complete","ship","area","half","rock",
  "order","fire","south","problem","piece","told","knew","pass","since","top","whole","king","space","heard","best",
  "hour","better","during","hundred","five","remember","step","early","hold","west","ground","interest","reach","fast",
  "verb","sing","listen","six","table","travel","less","morning","ten","simple","several","vowel","toward","war",
];

export function generateWords(count: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)]);
  }
  return out;
}

export function generateWordText(count: number): string {
  return generateWords(count).join(" ");
}
