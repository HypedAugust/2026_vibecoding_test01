export interface UserInfo {
  name: string;
  gender: string;
  year: string;
  month: string;
  day: string;
  time: string;
}

// 명언 풀
const quotes = [
  { text: "천리 길도 한 걸음부터 시작된다", author: "노자" },
  { text: "군자는 화합하되 부화뇌동하지 않는다", author: "공자" },
  { text: "사물이 극에 달하면 반드시 뒤집힌다", author: "주역" },
  { text: "지혜로운 자는 물을 좋아하고, 어진 자는 산을 좋아한다", author: "논어" },
  { text: "가장 부드러운 것이 가장 단단한 것을 이긴다", author: "노자" },
  { text: "스스로를 아는 자가 진정 밝은 자이다", author: "노자" }
];

// 오행 (일간 기운 등용)
const elements = [
  { name: "나무(木)", desc: "활동력이 솟구치며 성장의 에너지가 강한 상입니다. 머릿속 구상을 밖으로 꺼내어 행동하기 좋습니다." },
  { name: "불(火)", desc: "열정과 확산의 기운이 왕성합니다. 자신의 재능을 드러내고 사람들과 활발히 교류하면 길합니다." },
  { name: "흙(土)", desc: "포용력과 안정감이 깃드는 시기입니다. 섣불리 움직이기보다 자리를 지키며 주변을 챙길 때 큰 이로움이 따릅니다." },
  { name: "쇠(金)", desc: "결단력과 냉철함이 빛나는 상입니다. 맺고 끊음이 확실해야 다가올 흉을 막고 이익을 취할 수 있습니다." },
  { name: "물(水)", desc: "유연함과 깊은 지혜가 샘솟는 기운입니다. 장애물을 만나면 억지로 부딪히지 말고 부드럽게 돌아가는 것이 정답입니다." }
];

// 십성 (육친) 풀
const tenGods = [
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
];

// 신살 풀
const shinsals = [
  { name: "도화살(桃花殺)", desc: "복숭아꽃처럼 만인의 시선을 끄는 매력의 별. 톡톡 튀는 존재감으로 엄청난 인기를 얻으나, 지나친 색정이나 오해를 주의해야 합니다." },
  { name: "역마살(驛馬殺)", desc: "말을 타고 달리는 역동적인 별. 이동수, 이직, 출장 등 자리의 변화가 잦으며, 한곳에 머물지 않고 바쁘게 움직일수록 대길합니다." },
  { name: "화개살(華蓋殺)", desc: "화려함을 덮고 고독하게 나아가는 철학의 별. 뛰어난 예술적 영감과 영성이 폭발하며 자신만의 깊은 연구에서 대성합니다." },
  { name: "천을귀인(天乙貴人)", desc: "하늘이 내린 최고의 길신. 어떠한 큰 어려움이나 액운이 다가와도 반드시 숨은 귀인이나 조력자가 나타나 위험을 전화위복 시켜줍니다." },
  { name: "백호대살(白虎大殺)", desc: "흰 호랑이처럼 피를 보는 강렬한 파괴력의 별. 폭발적인 한 방의 추진력이 있으나, 사고나 욱하는 감정 폭발을 극도로 조심해야 합니다." },
  { name: "망신살(亡身殺)", desc: "치부가 세상에 드러나는 별. 망신을 당하기 쉬우니 언행을 삼가야 하지만, 반대로 무대에 오르거나 대중의 폭발적인 시선을 받는 무기로 쓰일 수도 있습니다." },
  { name: "홍염살(紅艶殺)", desc: "붉고 매혹적인 웃음의 별. 다정다감하고 매력적인 기운으로 주변 사람들의 넋을 쏙 빼놓지만, 맺고 끊음이 확실하지 않으면 감정의 수렁에 빠집니다." }
];

// 개운법 (Remedies - 월간 운세용)
const remedies = [
  "자주 머무는 공간을 맑게 환기하고, 오래되어 쓰지 않는 물건 3가지를 버려 정체된 탁한 기운을 뚫어내십시오.",
  "바닷가나 호수 등 맑은 물(水)이 있는 곳으로 반나절 정도 드라이브를 다녀오면, 꽉 막혔던 기혈과 재물운이 크게 열립니다.",
  "가진 재물의 아주 작은 일부라도 조건 없이 타인에게 베푸십시오. 작은 금전적 손실을 선행으로 일으켜 다가올 큰 액운을 떼우는 '적선(積善)'의 비방입니다.",
  "휴대폰과 전자기기를 멀리한 채, 맨발로 산속 흙길(土)을 걷거나 작은 식물을 새로 가꾸어 보십시오. 고갈된 생명력이 급속 충전됩니다.",
  "현관 입구를 유난히 깨끗하게 청소하고 쓰레기를 치우십시오. 귀인은 가장 먼저 문 앞의 맑고 밝은 조명을 따라 들어옵니다.",
  "거울을 닦고 당신의 얼굴을 보며 매일 아침 자기 암시를 하십시오. 거울 속 자신의 이마(명궁)를 밝히는 것만으로도 나쁜 탁기가 사라집니다."
];


// 일간/오늘/주간 문자열
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
  "생각지도 못했던 작고 소소한 이익이 생겨나는 시기입니다. 안정과 수성에 집중하면 일주일 내내 통장의 흐름이 원만하게 유지될 것입니다.",
  "금전적 지출이 커질 우려가 있으니 지갑을 열기 전 두 번 생각하십시오. 유혹을 참아내면 주말쯤 작은 보상이 따릅니다.",
  "재물운의 흐름이 남쪽에서 강하게 불어옵니다. 작게 투자하고 크게 거둘 여지가 있으나, 초심의 절제가 가장 중요합니다."
];

const weekRelation = [
  "그동안 연락이 끊겼던 오랜 벗이나 동료에게서 반가운 소식이 들려올 수 있습니다. 다툼이 있었다면 먼저 화해를 건네기 참 좋은 주간입니다.",
  "오해가 생기기 쉬운 주간입니다. 말을 아끼고 타인의 비밀을 무겁게 지켜주세요. 묵묵한 태도가 오히려 당신의 신뢰도를 급상승시킵니다.",
  "귀인과 소인이 혼재하여 다가옵니다. 밝고 긍정적인 말씨를 가진 사람을 가까이하면 큰 이득을 취할 것입니다."
];

const weekCareer = [
  "직장 내에서 중요한 업무를 맡거나 팀 내의 핵심 역할을 구체적으로 요구받는 주간입니다. 지금의 고된 노력이 향후 승진에 큰 불씨가 됩니다.",
  "반복되는 업무 흐름에 다소 지칠 수 있습니다. 하지만 기초를 다시 튼튼히 다지면 곧 윗사람의 눈에 띄어 특별한 제안을 받게 됩니다.",
  "새로운 발상과 아이디어가 샘솟습니다. 적극적으로 기획안을 제출하거나 회의에서 의견을 피력하면 아주 좋은 반응을 얻습니다."
];

const weekLove = [
  "애정운이 잔잔히 흐릅니다. 화려한 이벤트와 비용 지출보다는 진심이 담긴 짧은 편지나 말 한마디가 상대의 마음을 크게 울릴 것입니다.",
  "싱글이라면 뜻밖의 장소나 일상적 공간에서 이상형을 마주칠 가능성이 높습니다. 커플은 서로의 다름을 담담히 인정할 때 사랑이 한층 깊어집니다.",
  "불필요한 자존심을 내세우면 소중한 사람을 허무하게 잃을 수 있습니다. 무조건 한 번 져주면, 오히려 두 배의 큰 사랑을 돌려받게 됩니다."
];

const monthSummaries = [
  "이번 달 당신의 인생 극장에 띄워진 파동은 비워냄과 수확의 혼조입니다. 주변의 시기를 질양분 삼아 오랫동안 준비해온 일들이 비로소 세상 밖으로 결실을 맺기 시작합니다.",
  "이번 달은 완전히 새로운 도약과 확장이 보장되는 시기입니다. 혹시 실패를 두려워하여 망설였던 일이나 프로젝트가 있다면 지금이 바로 과감히 돛을 올릴 때입니다. 천운이 당신을 호위합니다.",
  "이달의 핵심 파동 속성은 은인자중(隱忍自重)입니다. 조급하게 내달리기보다는 한 번 더 참고 인내하면 구설수도 역전되어 흉이 복으로 바뀝니다. 숨을 고르는 뜻깊은 달로 삼으십시오."
];

const monthDetails = [
  "오행의 기운이 극적으로 교차하면서 수입과 지출의 폭발적인 변화폭이 엿보입니다. 일시적인 지출이 생기더라도, 본인의 미래 기술이나 경험을 쌓는 자기 계발 목적의 돈이라면 결코 아끼지 마십시오.",
  "답보 상태에 머물던 자격증 취득 과업이나 문서상의 성취에서 기쁜 소식이 따릅니다. 문서운이 특히 강하게 뒷받침되어 부동산 계약이나 이직 면접을 진행하기에 일절 무리가 없는 안전한 달입니다.",
  "친밀한 대인관계 속에서 사소한 자존심 싸움이 눈덩이처럼 불어나 큰 파국을 초래할 수 있으니, 매사 양보와 경청의 미덕을 최대한 발휘해야만 귀인들의 이탈을 막고 평안을 오롯이 다잡을 수 있습니다."
];

const colors = ["다크 그린", "미드나이트 네이비", "딥 버건디", "로즈 골드", "차콜 그레이", "오션 블루", "스노우 화이트", "골든 옐로우"];
const directions = ["동쪽", "서쪽", "남쪽", "북쪽", "남동쪽", "서북쪽"];
const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

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
export function buildHoroscope(userInfo: UserInfo, type: string) {
  const baseString = `${userInfo.name}-${userInfo.gender}-${userInfo.year}-${userInfo.month}-${userInfo.day}-${userInfo.time}`;
  const seed = hashString(baseString);
  const getIndex = (seedKey: number, arrTotal: number, salt: number = 0) => (seedKey + salt) % arrTotal;

  // 공통 요소
  const quote = quotes[getIndex(seed, quotes.length, 1)];
  const element = elements[getIndex(seed, elements.length, 2)];
  
  // 십성 & 신살 (주간, 월간에 쓰임)
  const tenGod = tenGods[getIndex(seed, tenGods.length, 15)];
  const shinsal = shinsals[getIndex(seed, shinsals.length, 16)];

  if (type === "today") {
    return {
      type: "today",
      quote,
      element,
      fortune: todayFortunes[getIndex(seed, todayFortunes.length, 3)],
      goodBad: todayGoodBad[getIndex(seed, todayGoodBad.length, 4)]
    };
  }
  
  if (type === "weekly") {
    return {
      type: "weekly",
      quote,
      element,
      tenGod,
      shinsal,
      summary: "이번 주는 주변 기운이 급격히 섞이는 주간이 될 것입니다. 중심을 잡고 본인의 자리를 지키세요.",
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
  const remedy = remedies[getIndex(seed, remedies.length, 17)];

  return {
    type: "monthly",
    quote,
    element,
    tenGod,
    shinsal,
    remedy,
    summary: monthSummaries[getIndex(seed, monthSummaries.length, 10)],
    detail1: monthDetails[getIndex(seed, monthDetails.length, 11)],
    luckyDays: `${d1}일, ${d2}일, ${d3}일`,
    direction: directions[getIndex(seed, directions.length, 12)],
    luckyColor: colors[getIndex(seed, colors.length, 13)]
  };
}
