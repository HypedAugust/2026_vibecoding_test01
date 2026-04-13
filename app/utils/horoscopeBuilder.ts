export interface UserInfo {
  name: string;
  gender: string;
  year: string;
  month: string;
  day: string;
  time: string;
}

// 텍스트 풀 (사주 경우의 수를 위한 템플릿)
const quotes = [
  { text: "천리 길도 한 걸음부터 시작된다", author: "노자" },
  { text: "군자는 화합하되 부화뇌동하지 않는다", author: "공자" },
  { text: "사물이 극에 달하면 반드시 뒤집힌다", author: "주역" },
  { text: "지혜로운 자는 물을 좋아하고, 어진 자는 산을 좋아한다", author: "논어" },
  { text: "가장 부드러운 것이 가장 단단한 것을 이긴다", author: "노자" },
  { text: "스스로를 아는 자가 진정 밝은 자이다", author: "노자" }
];

const elements = [
  { name: "나무(木)", desc: "활동력이 솟구치며 성장의 에너지가 강한 상입니다. 머릿속 구상을 밖으로 꺼내어 행동하기 좋습니다." },
  { name: "불(火)", desc: "열정과 확산의 기운이 왕성합니다. 자신의 재능을 드러내고 사람들과 활발히 교류하면 길합니다." },
  { name: "흙(土)", desc: "포용력과 안정감이 깃드는 시기입니다. 섣불리 움직이기보다 자리를 지키며 주변을 챙길 때 큰 이로움이 따릅니다." },
  { name: "쇠(金)", desc: "결단력과 냉철함이 빛나는 상입니다. 맺고 끊음이 확실해야 다가올 흉을 막고 이익을 취할 수 있습니다." },
  { name: "물(水)", desc: "유연함과 깊은 지혜가 샘솟는 기운입니다. 장애물을 만나면 억지로 부딪히지 말고 부드럽게 돌아가는 것이 정답입니다." }
];

const todayFortunes = [
  "마음은 급하나 오늘은 작은 실천 한 가지에 집중하세요.",
  "뜻밖의 소식이 들려올 수 있으니, 열린 마음을 유지하십시오.",
  "욕심을 버리고 현재 가진 것에 만족하면 의외의 귀인이 돕습니다.",
  "바람이 불면 흔들리는 것이 순리입니다. 변화를 너무 두려워 마세요.",
  "재물이 한 번에 모이지 않으니 티끌을 모으는 마음이 필요합니다."
];

const todayGoodBad = [
  { good: "새로운 인맥 형성\n따뜻한 차 마시기", bad: "감정적인 언쟁\n충동적인 소비" },
  { good: "청소 및 정리정돈\n오전 중의 짧은 산책", bad: "저녁 늦은 폭식\n무모한 약속 잡기" },
  { good: "오랜 친구에게 연락\n밝은 색상의 옷 입기", bad: "투자 관련 결정\n날카로운 물건 주의" },
  { good: "독서 및 명상\n가족과의 깊은 대화", bad: "타인의 험담 동조\n계획 없는 지출" },
  { good: "꼼꼼한 업무 점검\n부드러운 미소", bad: "급제동 및 과속\n무리한 계약 추진" }
];

const weekWealth = [
  "생각지도 못했던 작고 소소한 이익이 생겨나는 시기입니다. 안정과 수성에 집중하면 통장의 흐름이 원만하게 유지될 것입니다.",
  "금전적 지출이 커질 우려가 있으니 지갑을 열기 전 두 번 생각하십시오. 유혹을 참아내면 주말쯤 작은 보상이 따릅니다.",
  "재물운의 흐름이 남쪽에서 강하게 불어옵니다. 작게 투자하고 크게 거둘 여지가 있으나, 절제가 가장 중요합니다."
];

const weekRelation = [
  "그동안 연락이 끊겼던 오랜 벗이나 동료에게서 반가운 소식이 들려올 수 있습니다. 다툼이 있었다면 먼저 화해를 건네기 좋은 주간입니다.",
  "오해가 생기기 쉬운 주간입니다. 말을 아끼고 타인의 비밀을 지켜주세요. 묵묵한 태도가 오히려 당신의 신뢰도를 급상승시킵니다.",
  "귀인과 소인이 혼재하여 다가옵니다. 밝고 긍정적인 사람을 가까이하면 큰 이득을 취할 것입니다."
];

const weekCareer = [
  "직장 내에서 중요한 업무를 맡거나 팀 내의 핵심 역할을 요구받는 주간입니다. 지금의 노력이 향후 승진에 큰 불씨가 됩니다.",
  "반복되는 업무에 지칠 수 있습니다. 하지만 기초를 튼튼히 다지면 곧 윗사람의 눈에 띄어 특별한 제안을 받게 됩니다.",
  "새로운 발상과 아이디어가 샘솟습니다. 적극적으로 기획안을 제출하거나 의견을 피력하면 좋은 반응을 얻습니다."
];

const weekLove = [
  "애정운이 잔잔히 흐릅니다. 화려한 이벤트보다는 진심이 담긴 짧은 편지나 말 한마디가 상대의 마음을 크게 울릴 것입니다.",
  "싱글이라면 뜻밖의 장소에서 이상형을 마주칠 가능성이 높습니다. 커플은 서로의 다름을 인정할 때 사랑이 깊어집니다.",
  "자존심을 내세우면 소중한 사람을 잃을 수 있습니다. 무조건 한 번 져주면, 오히려 두 배의 큰 사랑을 돌려받게 됩니다."
];

const monthSummaries = [
  "이번 달 당신의 인생 극장에 띄워진 파동은 '비워냄과 수확의 혼조'입니다. 오랫동안 준비해온 일들이 조용히 결실을 맺기 시작합니다.",
  "이번 달은 '새로운 도약과 확장의 시기'입니다. 망설였던 일이 있다면 지금이 바로 돛을 올릴 때입니다. 기운이 당신을 돕고 있습니다.",
  "이달의 핵심 파동은 '은인자중(隱忍自重)'입니다. 한 번 더 참고 인내하면 구설수도 복으로 바뀝니다. 숨을 고르는 달로 삼으십시오."
];

const monthDetails = [
  "재성과 관성의 기운이 함께 요동치므로 수입과 지출의 폭발적인 변화폭이 엿보입니다. 자기 계발에 투자하는 돈은 아끼지 마십시오.",
  "학업이나 기술 습득에서 엄청난 성취가 따릅니다. 문서운이 특히 좋아 계약이나 매매를 진행하기에 무리가 없습니다.",
  "대인관계에서 작은 오해가 눈덩이처럼 불어날 수 있으니, 양보와 배려의 미덕을 최대한 발휘해야 평안을 유지할 수 있습니다."
];

const colors = ["다크 그린", "네이비", "버건디", "로즈 골드", "차콜 그레이", "스카이 블루", "화이트", "옐로우"];
const directions = ["동쪽", "서쪽", "남쪽", "북쪽", "남동쪽", "서북쪽"];
const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

// 간단한 문자열 해시 함수 (seed 생성)
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// 사용자 정보를 기반으로 고정된(결정론적) 사주 풀이를 조립하여 반환!
export function buildHoroscope(userInfo: UserInfo, type: string) {
  // 정보가 부족할 때 기본값 안정을 위해 타임스탬프 등 사용(실제로는 필수입력이므로 다 들어옴)
  const baseString = `${userInfo.name}-${userInfo.gender}-${userInfo.year}-${userInfo.month}-${userInfo.day}-${userInfo.time}`;
  const seed = hashString(baseString);
  
  // 난수 발생기 대용기법 (인덱스를 뽑기 위함)
  const getIndex = (seed: number, arrTotal: number, salt: number = 0) => (seed + salt) % arrTotal;

  // 공통 요소
  const quote = quotes[getIndex(seed, quotes.length, 1)];
  const element = elements[getIndex(seed, elements.length, 2)];

  if (type === "today") {
    return {
      type: "today",
      quote,
      fortune: todayFortunes[getIndex(seed, todayFortunes.length, 3)],
      element,
      goodBad: todayGoodBad[getIndex(seed, todayGoodBad.length, 4)]
    };
  }
  
  if (type === "weekly") {
    return {
      type: "weekly",
      quote,
      summary: "이번 주는 주변 기운이 급격히 섞이는 주간이 될 것입니다. 중심을 잡으세요.",
      luckyDay: days[getIndex(seed, days.length, 5)],
      wealth: weekWealth[getIndex(seed, weekWealth.length, 6)],
      relation: weekRelation[getIndex(seed, weekRelation.length, 7)],
      career: weekCareer[getIndex(seed, weekCareer.length, 8)],
      love: weekLove[getIndex(seed, weekLove.length, 9)]
    };
  }

  // Monthly
  const d1 = (seed % 9) + 1;
  const d2 = d1 + 10;
  const d3 = d2 + 8;
  return {
    type: "monthly",
    quote,
    summary: monthSummaries[getIndex(seed, monthSummaries.length, 10)],
    detail1: monthDetails[getIndex(seed, monthDetails.length, 11)],
    luckyDays: `${d1}일, ${d2}일, ${d3}일`,
    direction: directions[getIndex(seed, directions.length, 12)],
    luckyColor: colors[getIndex(seed, colors.length, 13)]
  };
}
