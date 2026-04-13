import type { Lang } from "../context/LanguageContext";

export interface UserInfo {
  name: string;
  gender: string;
  year: string;
  month: string;
  day: string;
  time: string;
}

// 명언 풀
const quotes = {
  ko: [
    { text: "천리 길도 한 걸음부터 시작된다", author: "노자" },
    { text: "군자는 화합하되 부화뇌동하지 않는다", author: "공자" },
    { text: "사물이 극에 달하면 반드시 뒤집힌다", author: "주역" },
    { text: "지혜로운 자는 물을 좋아하고, 어진 자는 산을 좋아한다", author: "논어" },
    { text: "가장 부드러운 것이 가장 단단한 것을 이긴다", author: "노자" },
    { text: "스스로를 아는 자가 진정 밝은 자이다", author: "노자" }
  ],
  en: [
    { text: "A journey of a thousand miles begins with a single step", author: "Laozi" },
    { text: "The noble person seeks harmony, not conformity", author: "Confucius" },
    { text: "When things reach their extreme, they inevitably reverse", author: "I Ching" },
    { text: "The wise find joy in water; the virtuous find joy in mountains", author: "The Analects" },
    { text: "The softest thing in the world overcomes the hardest", author: "Laozi" },
    { text: "One who knows oneself is truly enlightened", author: "Laozi" }
  ]
};

// 오행 (일간 기운 등용)
const elements = {
  ko: [
    { name: "나무(木)", desc: "활동력이 솟구치며 성장의 에너지가 강한 상입니다. 머릿속 구상을 밖으로 꺼내어 행동하기 좋습니다." },
    { name: "불(火)", desc: "열정과 확산의 기운이 왕성합니다. 자신의 재능을 드러내고 사람들과 활발히 교류하면 길합니다." },
    { name: "흙(土)", desc: "포용력과 안정감이 깃드는 시기입니다. 섣불리 움직이기보다 자리를 지키며 주변을 챙길 때 큰 이로움이 따릅니다." },
    { name: "쇠(金)", desc: "결단력과 냉철함이 빛나는 상입니다. 맺고 끊음이 확실해야 다가올 흉을 막고 이익을 취할 수 있습니다." },
    { name: "물(水)", desc: "유연함과 깊은 지혜가 샘솟는 기운입니다. 장애물을 만나면 억지로 부딪히지 말고 부드럽게 돌아가는 것이 정답입니다." }
  ],
  en: [
    { name: "Wood (木)", desc: "Vitality surges and the energy of growth is strong. It is an ideal time to turn your ideas into action." },
    { name: "Fire (火)", desc: "The energy of passion and expansion is vigorous. Showcase your talents and actively engage with others for good fortune." },
    { name: "Earth (土)", desc: "A period imbued with tolerance and stability. Rather than rushing, holding your ground and caring for those around you brings great benefit." },
    { name: "Metal (金)", desc: "Decisiveness and clarity of mind shine brightly. Being firm in your commitments will help you avoid misfortune and seize opportunities." },
    { name: "Water (水)", desc: "Flexibility and deep wisdom spring forth. When facing obstacles, the right answer is to flow around them gently rather than forcing through." }
  ]
};

// 십성 (육친) 풀
const tenGods = {
  ko: [
    { name: "비견(比肩)", desc: "나와 동등한 기운. 나와 비슷한 동료나 경쟁자가 나타나 주관이 강해지고 독립심이 커지는 작용을 합니다." },
    { name: "겁재(劫財)", desc: "탈재(脫財)의 기운. 승부욕이 강해지며 뜻밖의 지출이나 경쟁이 생길 수 있으니 내 것을 지키는 데 주의해야 합니다." },
    { name: "식신(食神)", desc: "창의와 여유의 기운. 말과 표현력이 풍부해지고 먹을 복이 생기며, 내 재주를 마음껏 펼칠 수 있는 길성입니다." },
    { name: "상관(傷官)", desc: "관습을 깨는 개혁의 기운. 기존의 틀을 벗어난 기발한 아이디어가 돋보이나 윗사람과의 구설 충돌을 경계해야 합니다." },
    { name: "편재(偏財)", desc: "역동적인 큰 재물의 기운. 예상치 못한 스케일의 큰 수익이나 넓은 인맥이 형성되며, 외부 활동이 몹시 잦아집니다." },
    { name: "정재(正財)", desc: "안정적 수익의 기운. 땀 흘려 번 돈이 차곡차곡 쌓이고 알뜰살뜰한 안정감이 깃들어 생활이 편안해집니다." },
    { name: "편관(偏官)", desc: "카리스마와 압박의 기운. 다소 제어하기 힘든 막중한 책임이 주어지나, 이를 돌파하면 명예와 권력이 크게 상승합니다." },
    { name: "정관(正官)", desc: "규칙과 질서의 길성. 직장이나 속한 단체에서 바른 평가를 받고 승진하거나, 귀한 인연이 닿는 매우 안정적인 시기입니다." },
    { name: "편인(偏印)", desc: "특수 학문과 직관의 기운. 한 가지 분야에 깊이 파고드는 예술적/철학적 기질이 생기며 눈치가 매우 날카로워집니다." },
    { name: "정인(正印)", desc: "문서와 후원자의 길성. 학업, 자격증, 계약에 대단히 유리하며 윗사람이나 보호자로부터 큰 사랑과 도움을 받게 됩니다." }
  ],
  en: [
    { name: "Companion (比肩)", desc: "Energy of equals. Peers and competitors similar to you appear, strengthening your independence and personal convictions." },
    { name: "Rob Wealth (劫財)", desc: "Energy of rivalry. Competitiveness intensifies and unexpected expenses or competition may arise — guard what is yours." },
    { name: "Eating God (食神)", desc: "Energy of creativity and ease. Expression and eloquence flourish, blessings of abundance appear, and talents can be fully unleashed — a very auspicious star." },
    { name: "Hurting Officer (傷官)", desc: "Energy of reform and innovation. Brilliant ideas that break convention stand out, but beware of verbal clashes with superiors." },
    { name: "Indirect Wealth (偏財)", desc: "Energy of dynamic fortune. Unexpectedly large-scale profits or wide-ranging connections form, and external activities increase dramatically." },
    { name: "Direct Wealth (正財)", desc: "Energy of stable income. Hard-earned money accumulates steadily and a sense of financial security brings comfort to daily life." },
    { name: "Seven Killings (偏官)", desc: "Energy of charisma and pressure. Heavy responsibilities beyond your comfort zone arise, but breaking through leads to great honor and authority." },
    { name: "Direct Officer (正官)", desc: "A star of order and discipline. You receive fair recognition at work, with promotions or valuable connections — a very stable period." },
    { name: "Indirect Seal (偏印)", desc: "Energy of specialized knowledge and intuition. A deep artistic or philosophical drive emerges, and your perceptiveness sharpens remarkably." },
    { name: "Direct Seal (正印)", desc: "A star of documents and benefactors. Extremely favorable for studies, certifications, and contracts — you receive great support from mentors and guardians." }
  ]
};

// 신살 풀
const shinsals = {
  ko: [
    { name: "도화살(桃花殺)", desc: "복숭아꽃처럼 만인의 시선을 끄는 매력의 별. 톡톡 튀는 존재감으로 엄청난 인기를 얻으나, 지나친 색정이나 오해를 주의해야 합니다." },
    { name: "역마살(驛馬殺)", desc: "말을 타고 달리는 역동적인 별. 이동수, 이직, 출장 등 자리의 변화가 잦으며, 한곳에 머물지 않고 바쁘게 움직일수록 대길합니다." },
    { name: "화개살(華蓋殺)", desc: "화려함을 덮고 고독하게 나아가는 철학의 별. 뛰어난 예술적 영감과 영성이 폭발하며 자신만의 깊은 연구에서 대성합니다." },
    { name: "천을귀인(天乙貴人)", desc: "하늘이 내린 최고의 길신. 어떠한 큰 어려움이나 액운이 다가와도 반드시 숨은 귀인이나 조력자가 나타나 위험을 전화위복 시켜줍니다." },
    { name: "백호대살(白虎大殺)", desc: "흰 호랑이처럼 피를 보는 강렬한 파괴력의 별. 폭발적인 한 방의 추진력이 있으나, 사고나 욱하는 감정 폭발을 극도로 조심해야 합니다." },
    { name: "망신살(亡身殺)", desc: "치부가 세상에 드러나는 별. 망신을 당하기 쉬우니 언행을 삼가야 하지만, 반대로 무대에 오르거나 대중의 폭발적인 시선을 받는 무기로 쓰일 수도 있습니다." },
    { name: "홍염살(紅艶殺)", desc: "붉고 매혹적인 웃음의 별. 다정다감하고 매력적인 기운으로 주변 사람들의 넋을 쏙 빼놓지만, 맺고 끊음이 확실하지 않으면 감정의 수렁에 빠집니다." }
  ],
  en: [
    { name: "Peach Blossom (桃花殺)", desc: "A star of charm that draws all eyes like a peach blossom. You gain immense popularity with striking charisma, but beware of romantic entanglements and misunderstandings." },
    { name: "Travelling Horse (驛馬殺)", desc: "A dynamic star of constant motion. Frequent relocations, job changes, and business trips are indicated — the busier you stay on the move, the greater your fortune." },
    { name: "Canopy Star (華蓋殺)", desc: "A star of philosophy that walks a solitary, brilliant path. Exceptional artistic inspiration and spirituality erupt, and great success comes through deep, independent study." },
    { name: "Heavenly Noble (天乙貴人)", desc: "The supreme auspicious star bestowed by heaven. No matter how great the hardship, a hidden benefactor or ally always appears to turn danger into opportunity." },
    { name: "White Tiger (白虎大殺)", desc: "A star of intense, devastating power like a white tiger. It carries explosive momentum, but extreme caution is needed regarding accidents and uncontrolled emotional outbursts." },
    { name: "Disaster Star (亡身殺)", desc: "A star that exposes what is hidden. Embarrassment comes easily, so guard your words and actions — yet it can also be a weapon of fame when stepping onto the public stage." },
    { name: "Crimson Beauty (紅艶殺)", desc: "A star of red, enchanting allure. Your warm and captivating energy mesmerizes those around you, but without clear boundaries, you may sink into emotional turmoil." }
  ]
};

// 개운법 (Remedies - 월간 운세용)
const remedies = {
  ko: [
    "자주 머무는 공간을 맑게 환기하고, 오래되어 쓰지 않는 물건 3가지를 버려 정체된 탁한 기운을 뚫어내십시오.",
    "바닷가나 호수 등 맑은 물(水)이 있는 곳으로 반나절 정도 드라이브를 다녀오면, 꽉 막혔던 기혈과 재물운이 크게 열립니다.",
    "가진 재물의 아주 작은 일부라도 조건 없이 타인에게 베푸십시오. 작은 금전적 손실을 선행으로 일으켜 다가올 큰 액운을 떼우는 '적선(積善)'의 비방입니다.",
    "휴대폰과 전자기기를 멀리한 채, 맨발로 산속 흙길(土)을 걷거나 작은 식물을 새로 가꾸어 보십시오. 고갈된 생명력이 급속 충전됩니다.",
    "현관 입구를 유난히 깨끗하게 청소하고 쓰레기를 치우십시오. 귀인은 가장 먼저 문 앞의 맑고 밝은 조명을 따라 들어옵니다.",
    "거울을 닦고 당신의 얼굴을 보며 매일 아침 자기 암시를 하십시오. 거울 속 자신의 이마(명궁)를 밝히는 것만으로도 나쁜 탁기가 사라집니다."
  ],
  en: [
    "Air out the spaces where you spend the most time and discard three unused items to break through stagnant, murky energy.",
    "Take a half-day drive to a place with clear water — the sea or a lake. This powerfully unblocks stuck energy channels and opens wealth fortune.",
    "Give even a small portion of your wealth unconditionally to others. This is the ancient remedy of 'Accumulated Virtue (積善)' — a small financial sacrifice as a good deed to deflect coming misfortune.",
    "Put away your phone and electronics. Walk barefoot on a mountain earth trail or nurture a new small plant. Your depleted vitality will rapidly recharge.",
    "Clean your front entrance meticulously and remove all clutter. Benefactors are drawn first to doorways with bright, clear energy.",
    "Polish your mirror and practice positive self-affirmation each morning. Simply brightening your forehead (the Palace of Destiny) in the mirror's reflection dispels negative energy."
  ]
};

// 일간/오늘/주간 문자열
const todayFortunes = {
  ko: [
    "마음은 급하나 오늘은 작은 실천 한 가지에 집중하세요.",
    "뜻밖의 소식이 들려올 수 있으니, 열린 마음을 유지하십시오.",
    "욕심을 버리고 현재 가진 것에 만족하면 의외의 귀인이 돕습니다.",
    "바람이 불면 흔들리는 것이 순리입니다. 변화를 너무 두려워 마세요.",
    "재물이 한 번에 모이지 않으니 티끌을 모으는 마음이 필요합니다."
  ],
  en: [
    "Your heart may be impatient, but today focus on one small action at a time.",
    "Unexpected news may arrive — keep an open mind and heart.",
    "Release greed and find contentment in what you have; a surprising benefactor will appear to help.",
    "When the wind blows, it is natural to sway. Do not fear change too much.",
    "Wealth does not gather all at once — cultivate the patience of collecting every small grain."
  ]
};

const todayGoodBad = {
  ko: [
    { good: "새로운 인맥 형성\n따뜻한 차 마시기", bad: "감정적인 언쟁\n충동적인 소비" },
    { good: "청소 및 정리정돈\n오전 중의 짧은 산책", bad: "저녁 늦은 폭식\n무모한 약속 잡기" },
    { good: "오랜 친구에게 연락\n밝은 색상의 옷 입기", bad: "투자 관련 결정\n날카로운 물건 주의" },
    { good: "독서 및 명상\n가족과의 깊은 대화", bad: "타인의 험담 동조\n계획 없는 지출" },
    { good: "꼼꼼한 업무 점검\n부드러운 미소", bad: "급제동 및 과속\n무리한 계약 추진" }
  ],
  en: [
    { good: "Building new connections\nEnjoying warm tea", bad: "Emotional arguments\nImpulsive spending" },
    { good: "Cleaning and organizing\nA short morning walk", bad: "Late-night overeating\nReckless commitments" },
    { good: "Reaching out to an old friend\nWearing bright colors", bad: "Investment decisions\nBeware of sharp objects" },
    { good: "Reading and meditation\nDeep conversation with family", bad: "Joining in gossip\nUnplanned spending" },
    { good: "Thorough work review\nA gentle smile", bad: "Sudden braking or speeding\nForcing a difficult contract" }
  ]
};

const weekWealth = {
  ko: [
    "생각지도 못했던 작고 소소한 이익이 생겨나는 시기입니다. 안정과 수성에 집중하면 일주일 내내 통장의 흐름이 원만하게 유지될 것입니다.",
    "금전적 지출이 커질 우려가 있으니 지갑을 열기 전 두 번 생각하십시오. 유혹을 참아내면 주말쯤 작은 보상이 따릅니다.",
    "재물운의 흐름이 남쪽에서 강하게 불어옵니다. 작게 투자하고 크게 거둘 여지가 있으나, 초심의 절제가 가장 중요합니다."
  ],
  en: [
    "A period of small, unexpected gains. Focus on stability and preservation, and your finances will flow smoothly all week.",
    "Significant expenses may loom — think twice before opening your wallet. If you resist temptation, a small reward awaits by the weekend.",
    "The flow of wealth energy blows strongly from the south. There is room to invest small and reap big, but disciplined restraint matters most."
  ]
};

const weekRelation = {
  ko: [
    "그동안 연락이 끊겼던 오랜 벗이나 동료에게서 반가운 소식이 들려올 수 있습니다. 다툼이 있었다면 먼저 화해를 건네기 참 좋은 주간입니다.",
    "오해가 생기기 쉬운 주간입니다. 말을 아끼고 타인의 비밀을 무겁게 지켜주세요. 묵묵한 태도가 오히려 당신의 신뢰도를 급상승시킵니다.",
    "귀인과 소인이 혼재하여 다가옵니다. 밝고 긍정적인 말씨를 가진 사람을 가까이하면 큰 이득을 취할 것입니다."
  ],
  en: [
    "Welcome news may arrive from an old friend or colleague you've lost touch with. If there was a quarrel, this is an excellent week to extend the olive branch first.",
    "A week prone to misunderstandings. Choose your words carefully and guard others' secrets. Your quiet integrity will rapidly boost your trustworthiness.",
    "Both benefactors and troublemakers approach together. Stay close to those who speak with positivity and brightness, and you will gain greatly."
  ]
};

const weekCareer = {
  ko: [
    "직장 내에서 중요한 업무를 맡거나 팀 내의 핵심 역할을 구체적으로 요구받는 주간입니다. 지금의 고된 노력이 향후 승진에 큰 불씨가 됩니다.",
    "반복되는 업무 흐름에 다소 지칠 수 있습니다. 하지만 기초를 다시 튼튼히 다지면 곧 윗사람의 눈에 띄어 특별한 제안을 받게 됩니다.",
    "새로운 발상과 아이디어가 샘솟습니다. 적극적으로 기획안을 제출하거나 회의에서 의견을 피력하면 아주 좋은 반응을 얻습니다."
  ],
  en: [
    "A week where you are entrusted with important work or asked to play a key role within your team. Today's hard effort will spark future promotions.",
    "Repetitive workflows may leave you feeling drained. But if you solidify the fundamentals, you will soon catch a superior's eye and receive a special offer.",
    "Fresh ideas and creative concepts spring forth. Actively submit proposals or voice your opinions in meetings for a very positive response."
  ]
};

const weekLove = {
  ko: [
    "애정운이 잔잔히 흐릅니다. 화려한 이벤트와 비용 지출보다는 진심이 담긴 짧은 편지나 말 한마디가 상대의 마음을 크게 울릴 것입니다.",
    "싱글이라면 뜻밖의 장소나 일상적 공간에서 이상형을 마주칠 가능성이 높습니다. 커플은 서로의 다름을 담담히 인정할 때 사랑이 한층 깊어집니다.",
    "불필요한 자존심을 내세우면 소중한 사람을 허무하게 잃을 수 있습니다. 무조건 한 번 져주면, 오히려 두 배의 큰 사랑을 돌려받게 됩니다."
  ],
  en: [
    "Love energy flows gently. Rather than grand gestures and extravagant spending, a heartfelt short letter or sincere word will deeply move your partner.",
    "If single, you are likely to encounter your ideal type in an unexpected or everyday place. Couples deepen their love by calmly accepting each other's differences.",
    "Unnecessary pride may cause you to lose someone precious. If you yield just once, you will receive twice the love in return."
  ]
};

const monthSummaries = {
  ko: [
    "이번 달 당신의 인생 극장에 띄워진 파동은 비워냄과 수확의 혼조입니다. 주변의 시기를 질양분 삼아 오랫동안 준비해온 일들이 비로소 세상 밖으로 결실을 맺기 시작합니다.",
    "이번 달은 완전히 새로운 도약과 확장이 보장되는 시기입니다. 혹시 실패를 두려워하여 망설였던 일이나 프로젝트가 있다면 지금이 바로 과감히 돛을 올릴 때입니다. 천운이 당신을 호위합니다.",
    "이달의 핵심 파동 속성은 은인자중(隱忍自重)입니다. 조급하게 내달리기보다는 한 번 더 참고 인내하면 구설수도 역전되어 흉이 복으로 바뀝니다. 숨을 고르는 뜻깊은 달로 삼으십시오."
  ],
  en: [
    "This month, the wave cast upon your life's stage is a mixture of release and harvest. Using the challenges around you as nourishment, long-prepared endeavors finally begin to bear fruit.",
    "This month guarantees a completely new leap and expansion. If there is a project you have been hesitating on out of fear of failure, now is the time to boldly set sail. Heaven's fortune escorts you.",
    "This month's core energy is patience and self-restraint (隱忍自重). Rather than rushing forward, one more moment of endurance will reverse gossip and turn misfortune into blessing. Make this a meaningful month of catching your breath."
  ]
};

const monthDetails = {
  ko: [
    "오행의 기운이 극적으로 교차하면서 수입과 지출의 폭발적인 변화폭이 엿보입니다. 일시적인 지출이 생기더라도, 본인의 미래 기술이나 경험을 쌓는 자기 계발 목적의 돈이라면 결코 아끼지 마십시오.",
    "답보 상태에 머물던 자격증 취득 과업이나 문서상의 성취에서 기쁜 소식이 따릅니다. 문서운이 특히 강하게 뒷받침되어 부동산 계약이나 이직 면접을 진행하기에 일절 무리가 없는 안전한 달입니다.",
    "친밀한 대인관계 속에서 사소한 자존심 싸움이 눈덩이처럼 불어나 큰 파국을 초래할 수 있으니, 매사 양보와 경청의 미덕을 최대한 발휘해야만 귀인들의 이탈을 막고 평안을 오롯이 다잡을 수 있습니다."
  ],
  en: [
    "As the Five Element energies dramatically intersect, explosive changes in income and expenditure are evident. Even if temporary expenses arise, never hesitate to spend on self-development that builds your future skills and experience.",
    "Good news follows regarding stalled certification pursuits or document-related achievements. Document fortune is especially strong this month — it is perfectly safe to proceed with real estate contracts or job interviews.",
    "Within close relationships, minor pride battles can snowball into major crises. You must exercise the utmost virtue of yielding and listening to prevent the departure of benefactors and maintain your peace."
  ]
};

const colors = {
  ko: ["다크 그린", "미드나이트 네이비", "딥 버건디", "로즈 골드", "차콜 그레이", "오션 블루", "스노우 화이트", "골든 옐로우"],
  en: ["Dark Green", "Midnight Navy", "Deep Burgundy", "Rose Gold", "Charcoal Grey", "Ocean Blue", "Snow White", "Golden Yellow"]
};

const directions = {
  ko: ["동쪽", "서쪽", "남쪽", "북쪽", "남동쪽", "서북쪽"],
  en: ["East", "West", "South", "North", "Southeast", "Northwest"]
};

const days = {
  ko: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
};

const weeklySummary = {
  ko: "이번 주는 주변 기운이 급격히 섞이는 주간이 될 것입니다. 중심을 잡고 본인의 자리를 지키세요.",
  en: "This week, surrounding energies will mix rapidly. Hold your center and stand firm in your position."
};

// 간단한 문자열 해시 함수
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// 사용자 정보 조합 (결정론적 로직)
export function buildHoroscope(userInfo: UserInfo, type: string, lang: Lang = "ko") {
  const baseString = `${userInfo.name}-${userInfo.gender}-${userInfo.year}-${userInfo.month}-${userInfo.day}-${userInfo.time}`;
  const seed = hashString(baseString);
  const getIndex = (seedKey: number, arrTotal: number, salt: number = 0) => (seedKey + salt) % arrTotal;

  // 공통 요소
  const quote = quotes[lang][getIndex(seed, quotes[lang].length, 1)];
  const element = elements[lang][getIndex(seed, elements[lang].length, 2)];

  // 십성 & 신살 (주간, 월간에 쓰임)
  const tenGod = tenGods[lang][getIndex(seed, tenGods[lang].length, 15)];
  const shinsal = shinsals[lang][getIndex(seed, shinsals[lang].length, 16)];

  if (type === "today") {
    return {
      type: "today",
      quote,
      element,
      fortune: todayFortunes[lang][getIndex(seed, todayFortunes[lang].length, 3)],
      goodBad: todayGoodBad[lang][getIndex(seed, todayGoodBad[lang].length, 4)]
    };
  }

  if (type === "weekly") {
    return {
      type: "weekly",
      quote,
      element,
      tenGod,
      shinsal,
      summary: weeklySummary[lang],
      luckyDay: days[lang][getIndex(seed, days[lang].length, 5)],
      wealth: weekWealth[lang][getIndex(seed, weekWealth[lang].length, 6)],
      relation: weekRelation[lang][getIndex(seed, weekRelation[lang].length, 7)],
      career: weekCareer[lang][getIndex(seed, weekCareer[lang].length, 8)],
      love: weekLove[lang][getIndex(seed, weekLove[lang].length, 9)]
    };
  }

  // Monthly
  const d1 = (seed % 9) + 1;
  const d2 = d1 + 10;
  const d3 = d2 + 8;
  const remedy = remedies[lang][getIndex(seed, remedies[lang].length, 17)];
  const ordSuffix = ["th", "st", "nd", "rd"];
  const fmtDay = (d: number) => {
    if (lang === "ko") return `${d}일`;
    const v = d % 100;
    return `${d}${ordSuffix[(v - 20) % 10] || ordSuffix[v] || ordSuffix[0]}`;
  };

  return {
    type: "monthly",
    quote,
    element,
    tenGod,
    shinsal,
    remedy,
    summary: monthSummaries[lang][getIndex(seed, monthSummaries[lang].length, 10)],
    detail1: monthDetails[lang][getIndex(seed, monthDetails[lang].length, 11)],
    luckyDays: `${fmtDay(d1)}, ${fmtDay(d2)}, ${fmtDay(d3)}`,
    direction: directions[lang][getIndex(seed, directions[lang].length, 12)],
    luckyColor: colors[lang][getIndex(seed, colors[lang].length, 13)]
  };
}
