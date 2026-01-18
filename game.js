// ======================================================
// Musou Crop. x Topaz (HSR VN) - ULTRA LONG STORY
// - GOOD END ONLY
// - ตอน "เซ็น" Topaz ไม่ได้อยู่
// - มีขอแต่งงาน + หลายปีต่อมามีลูก
// - ใส่รูปเอง: topaz.png, jade.png, aventurine.png
// ======================================================

const CHAR = {
  narrator: { name: "ผู้บรรยาย", tag: "—", img: "" },
  you: { name: "ประธาน Musou Crop.", tag: "CEO / ผู้สร้างเกม", img: "" },
  topaz: { name: "Topaz", tag: "IPC - Strategic Investment / Debt Collector", img: "topaz.png" },
  jade: { name: "Jade", tag: "IPC - Senior Executive / The Serpent", img: "jade.png" },
  aventurine: { name: "Aventurine", tag: "IPC - Risk Manager / Gambler", img: "aventurine.png" }
};

const state = {
  sceneId: "s000_title",
  rel: 0,
  mem: 0,
  risk: 0,
  day: 1,
  year: 0, // ปีที่ผ่านไปหลังเหตุการณ์หลัก
  history: []
};

// ===== UI safe =====
const $ = (id) => document.getElementById(id);

const elRel = $("rel");
const elMem = $("mem");
const elRisk = $("risk");
const elDay = $("day");

const elSpeaker = $("speaker");
const elSceneName = $("sceneName");
const elText = $("text");
const elChoices = $("choices");

const elBg = $("bg");
const elCharImg = $("charImg");
const elCharName = $("charName");
const elCharTag = $("charTag");

const btnNext = $("btnNext");
const btnBack = $("btnBack");
const btnSave = $("btnSave");
const btnLoad = $("btnLoad");
const btnReset = $("btnReset");

btnSave && btnSave.addEventListener("click", saveGame);
btnLoad && btnLoad.addEventListener("click", loadGame);
btnReset && btnReset.addEventListener("click", resetGame);
btnNext && btnNext.addEventListener("click", goNext);
btnBack && btnBack.addEventListener("click", goBack);

const BG = {
  title: `radial-gradient(900px 500px at 20% 20%, rgba(255,255,255,.16), transparent 60%),
          radial-gradient(900px 500px at 80% 30%, rgba(255,180,120,.12), transparent 55%),
          linear-gradient(135deg, rgba(120,120,255,.16), rgba(0,0,0,.70))`,
  hill: `radial-gradient(900px 500px at 20% 20%, rgba(120,255,220,.10), transparent 60%),
         radial-gradient(900px 500px at 80% 30%, rgba(255,255,255,.08), transparent 55%),
         linear-gradient(135deg, rgba(60,140,120,.18), rgba(0,0,0,.70))`,
  rain: `radial-gradient(900px 500px at 30% 20%, rgba(120,120,255,.14), transparent 60%),
         radial-gradient(900px 500px at 70% 30%, rgba(255,255,255,.06), transparent 55%),
         linear-gradient(135deg, rgba(40,70,160,.18), rgba(0,0,0,.78))`,
  office: `radial-gradient(900px 500px at 30% 25%, rgba(255,255,255,.12), transparent 60%),
           radial-gradient(900px 500px at 80% 30%, rgba(255,200,120,.08), transparent 55%),
           linear-gradient(135deg, rgba(120,160,255,.16), rgba(0,0,0,.65))`,
  meeting: `radial-gradient(900px 500px at 30% 25%, rgba(255,255,255,.10), transparent 60%),
            radial-gradient(900px 500px at 80% 30%, rgba(255,120,160,.08), transparent 55%),
            linear-gradient(135deg, rgba(180,120,255,.14), rgba(0,0,0,.72))`,
  night: `radial-gradient(900px 500px at 30% 25%, rgba(140,120,255,.14), transparent 60%),
          radial-gradient(900px 500px at 80% 30%, rgba(255,255,255,.06), transparent 55%),
          linear-gradient(135deg, rgba(60,90,200,.16), rgba(0,0,0,.80))`,
  ipc: `radial-gradient(900px 500px at 30% 25%, rgba(255,255,255,.08), transparent 60%),
        radial-gradient(900px 500px at 80% 30%, rgba(120,255,220,.06), transparent 55%),
        linear-gradient(135deg, rgba(120,255,220,.08), rgba(0,0,0,.82))`,
  home: `radial-gradient(900px 500px at 30% 25%, rgba(255,255,255,.12), transparent 60%),
         radial-gradient(900px 500px at 80% 30%, rgba(255,200,120,.10), transparent 55%),
         linear-gradient(135deg, rgba(255,160,120,.10), rgba(0,0,0,.72))`,
  wedding: `radial-gradient(900px 500px at 30% 25%, rgba(255,255,255,.18), transparent 60%),
            radial-gradient(900px 500px at 80% 30%, rgba(255,200,255,.12), transparent 55%),
            linear-gradient(135deg, rgba(255,255,255,.06), rgba(0,0,0,.72))`
};

// ======================================================
// SCENES (ULTRA LONG)
// ======================================================
const scenes = {
  // ---------------- TITLE ----------------
  s000_title: {
    sceneName: "Prologue",
    bg: "title",
    who: CHAR.narrator,
    text:
`โลกนี้เต็มไปด้วย "หนี้" และ "สัญญา"
บางสัญญาถูกเขียนลงกระดาษ…
แต่บางสัญญาถูกวาดไว้บนเนินเขา

Musou Crop. — บริษัทผู้สร้างเกมที่โด่งดังไปทั่วจักรวาล
และคุณ… คือประธานบริษัทคนนั้น

แต่ในหัวใจคุณ…
ยังมีชื่อคนหนึ่งที่ไม่เคยหายไป

Topaz`,
    next: "s010_past_intro"
  },

  // ---------------- PAST ----------------
  s010_past_intro: {
    sceneName: "13 ปีก่อน",
    bg: "rain",
    who: CHAR.narrator,
    text:
`13 ปีก่อน…

ฝนตกไม่หยุดราวกับจะลบทุกความทรงจำให้หายไป

คุณอายุ 12 ปี
ไม่มีบ้าน ไม่มีครอบครัว
มีแค่กระเป๋าเก่าๆ กับสมุดวาดรูปขาดๆ`,
    next: "s011_past_meet_topaz"
  },

  s011_past_meet_topaz: {
    sceneName: "เด็กไร้บ้านสองคน",
    bg: "rain",
    who: CHAR.topaz,
    text:
`เด็กผู้หญิงคนหนึ่งยืนอยู่ตรงหน้าคุณ
ดวงตาเธอคม แต่ไม่แข็ง

"นาย… หนาวไหม?"
เธอยื่นผ้าผืนเล็กให้`,
    choices: [
      { label: "รับผ้าไว้ แล้วขอบคุณเธอ", to: "s012_past_first_talk", rel:+1, mem:+1 },
      { label: "ปฏิเสธ (ไม่อยากเป็นภาระ)", to: "s012_past_first_talk", mem:+1, risk:+1 },
    ]
  },

  s012_past_first_talk: {
    sceneName: "ชื่อของเธอ",
    bg: "rain",
    who: CHAR.narrator,
    text:
`เธอนั่งลงข้างๆ แบบไม่กลัวเปียก
แล้วบอกชื่อ… "Topaz"

คุณไม่รู้ว่าทำไม
แต่แค่ชื่อของเธอ… กลับทำให้โลกที่เย็นเฉียบอุ่นขึ้นนิดหนึ่ง`,
    next: "s013_past_hill"
  },

  s013_past_hill: {
    sceneName: "เนินเขา",
    bg: "hill",
    who: CHAR.narrator,
    text:
`Topaz พาคุณขึ้นเนินเขาที่เงียบสงบ
ด้านบนมีเศษไม้ ผ้าเก่า และกระดาษลัง

"เราทำบ้านกันไหม… บ้านของเราสองคน"

มันไม่ใช่บ้านที่สวย
แต่มันเป็นบ้านที่ "มีเรา"`,
    choices: [
      { label: "ช่วยเธอสร้างบ้านเล็กๆ ด้วยกัน", to: "s014_past_build_house", rel:+2, mem:+1 },
      { label: "ถามเธอว่าทำไมต้องช่วยเรา", to: "s014_past_build_house", rel:+1, mem:+1 },
    ]
  },

  s014_past_build_house: {
    sceneName: "บ้านเล็กบนเนินเขา",
    bg: "hill",
    who: CHAR.narrator,
    text:
`คุณกับ Topaz ใช้เวลาเป็นวันๆ
ตอกไม้ เก็บเศษผ้า ทำหลังคา
ทำหน้าต่างเล็กๆ ที่มองเห็นเมืองไกลๆ

คืนหนึ่ง Topaz เอาเศษกระดาษมาวาง
"เราตั้งกฎบ้านกันไหม?"

1) ห้ามโกหกกัน
2) ถ้ากลัว ให้บอก
3) ถ้าเจ็บ ให้จับมือ

คุณหัวเราะ
บ้านเล็กๆ แต่กฎใหญ่เหมือนโลกทั้งใบ`,
    next: "s015_past_games"
  },

  s015_past_games: {
    sceneName: "เกมของเด็กสองคน",
    bg: "hill",
    who: CHAR.narrator,
    text:
`พวกคุณเริ่มสร้าง "เกม" ของตัวเอง

เกมที่ชื่อว่า "Hill Promise"
ภารกิจคือหาเศษของเล่นในเมือง
เอากลับมาทำเป็นรางวัล
แล้วเขียนคะแนนลงในสมุด

Topaz ทำหน้าจริงจังเกินเด็ก
"ถ้านายชนะ นายได้ขนมปังครึ่งชิ้นเพิ่ม"
"ถ้าฉันชนะ นายต้องเล่าเรื่องตลกให้ฟัง"

คุณแพ้ตั้งใจหลายครั้ง
เพราะอยากเห็นเธอหัวเราะ`,
    choices: [
      { label: "บอกเธอว่า: 'ฉันอยากทำเกมจริงๆ ในอนาคต'", to: "s016_past_future", rel:+2, mem:+2 },
      { label: "แซวเธอว่า: 'เธอเหมือนหัวหน้าบริษัทเลยนะ'", to: "s016_past_future", rel:+1, mem:+2 },
    ]
  },

  s016_past_future: {
    sceneName: "ความฝัน",
    bg: "night",
    who: CHAR.topaz,
    text:
`Topaz มองดาวบนฟ้า
เหมือนมองอนาคตไกลเกินวัย

"ถ้านายสร้างเกมจริงๆ…"
"ฉันจะเป็นคนแรกที่เล่น"

เธอหยิบสมุดวาดรูปของคุณ
วาดบ้านบนเนินเขา
วาดเด็กสองคนจับมือกัน
แล้ววาดดาว 1 ดวง

"สัญญานะ ถ้าเจอกันอีกครั้ง… เราจะจำกันได้"`,
    choices: [
      { label: "วาดดาวเพิ่มอีกดวง + เขียนชื่อเธอ", to: "s017_past_2months", rel:+2, mem:+2 },
      { label: "วาดหัวใจเล็กๆ แล้วรีบปิดสมุด (เขิน)", to: "s017_past_2months", rel:+3, mem:+2 },
    ]
  },

  s017_past_2months: {
    sceneName: "2 เดือนแห่งบ้าน",
    bg: "hill",
    who: CHAR.narrator,
    text:
`ตลอด 2 เดือน…
บ้านบนเนินเขากลายเป็นโลกทั้งใบของคุณ

พวกคุณแบ่งขนมปัง
แบ่งผ้าห่ม
แบ่งความกลัว

บางคืน Topaz จะพูดคำว่า "IPC"
เหมือนมันเป็นเงาที่ไล่ล่าเธอมา

คุณไม่เข้าใจ
แต่คุณสัญญาในใจว่า…
ถ้ามีวันหนึ่งคุณแข็งแกร่งพอ
คุณจะปกป้องเธอให้ได้`,
    next: "s018_past_disappear"
  },

  s018_past_disappear: {
    sceneName: "วันที่เธอหายไป",
    bg: "rain",
    who: CHAR.narrator,
    text:
`แล้ววันหนึ่ง…

คุณกลับมาที่บ้านบนเนินเขา
พบแค่ความเงียบ

ไม่มี Topaz
ไม่มีคำลา

มีเพียงเศษกระดาษเปียกฝน…

"ขอโทษ… ถ้าฉันอยู่ต่อ นายจะเจ็บมากกว่าเดิม"`,
    next: "s020_present_ceo"
  },

  // ---------------- PRESENT ----------------
  s020_present_ceo: {
    sceneName: "ปัจจุบัน",
    bg: "office",
    who: CHAR.narrator,
    text:
`13 ปีต่อมา…

คุณกลายเป็นประธาน Musou Crop.
บริษัทแห่งการสร้างเกมและความรุ่งโรจน์

แต่คุณยังเก็บสมุดวาดรูปเล่มเดิมไว้
ดาวสองดวงยังอยู่
สัญญายังอยู่`,
    next: "s021_ipc_request"
  },

  s021_ipc_request: {
    sceneName: "คำขอจาก IPC",
    bg: "office",
    who: CHAR.narrator,
    text:
`เลขาเคาะประตูเบาๆ

"ท่านประธานคะ วันนี้ IPC ขอเข้าพบ"
"ผู้แทนคือ Jade และ Aventurine"
"และเขาขอให้ท่านเซ็นเอกสารด่วนค่ะ"

คุณรู้สึกเหมือนฝนวันนั้นกลับมาอีกครั้ง`,
    next: "s022_sign_meeting_no_topaz"
  },

  // IMPORTANT: signing without Topaz
  s022_sign_meeting_no_topaz: {
    sceneName: "ประชุมเซ็น (ไม่มี Topaz)",
    bg: "meeting",
    who: CHAR.narrator,
    text:
`ในห้องประชุม…
มีแค่ Jade กับ Aventurine

Topaz ไม่ได้อยู่

Jade วางแฟ้มเอกสารหนา
"การลงทุน + โอนหุ้นบางส่วนให้ IPC"

Aventurine โยนเหรียญเล่น
"เซ็นเถอะครับประธาน—นี่คือทางลัดสู่ความยิ่งใหญ่"`,
    choices: [
      { label: "ถาม: 'ทำไม Topaz ไม่อยู่?'", to: "s023_where_topaz", mem:+1, risk:+1 },
      { label: "เปิดเอกสารดูละเอียด", to: "s024_document_wrong", mem:+1 },
      { label: "พยายามคุมอารมณ์ แต่รู้สึกไม่ดี", to: "s024_document_wrong", mem:+1, risk:+1 },
    ]
  },

  s023_where_topaz: {
    sceneName: "เธอถูกกันออก",
    bg: "meeting",
    who: CHAR.jade,
    text:
`Jade ยิ้มแบบสุภาพเกินจริง
"Topaz มีภารกิจอื่นค่ะ และเรื่องนี้ไม่จำเป็นต้องมีเธอ"

Aventurine หัวเราะเบาๆ
"คนที่เกี่ยวข้องมากเกินไป… ทำให้เซ็นยากครับ"

คุณกำมือแน่น
เหมือนโลกกำลังพยายามแยกคุณกับเธออีกครั้ง`,
    next: "s024_document_wrong"
  },

  s024_document_wrong: {
    sceneName: "เอกสารที่โกหก",
    bg: "ipc",
    who: CHAR.narrator,
    text:
`คุณเห็นบรรทัดหนึ่งในเอกสาร:

"Hill Promise ถูกยกเลิก ไม่มีผู้ร่วมสร้าง"

หัวคุณชา

Hill Promise คือชื่อเกมแรกในชีวิต
เกมที่เกิดจากบ้านบนเนินเขา
จากความฝันของคุณกับ Topaz

แต่เอกสารทำเหมือนเธอไม่เคยมีตัวตน`,
    choices: [
      { label: "หยุดเซ็นทันที: 'ผมไม่เซ็น'", to: "s025_cancel_sign", risk:+2, mem:+1 },
      { label: "ขอเวลา 1 สัปดาห์ตรวจสอบ", to: "s026_one_week", risk:+1, mem:+1 },
    ]
  },

  s025_cancel_sign: {
    sceneName: "ยกเลิกการเซ็น",
    bg: "meeting",
    who: CHAR.you,
    text:
`คุณวางปากกาแรงจนดัง

"ผมไม่เซ็น"
"เอกสารนี้โกหก"

Jade ยังยิ้ม
แต่สายตาเย็นลง

Aventurine โยนเหรียญอีกครั้ง
"โอเค… งั้นเกมเริ่มจริงแล้ว"`,
    next: "s030_breakdown"
  },

  s026_one_week: {
    sceneName: "ขอเวลา 1 สัปดาห์",
    bg: "meeting",
    who: CHAR.you,
    text:
`"ผมขอเวลา 1 สัปดาห์"
"ถ้าเอกสารนี้สะอาด… เราคุยกันใหม่"

Jade พยักหน้า
"แน่นอนค่ะ ประธาน"

Aventurine ยิ้ม
"หนึ่งสัปดาห์… พอดีสำหรับให้หุ้นร่วงนะครับ"`,
    next: "s030_breakdown"
  },

  // breakdown + secretary
  s030_breakdown: {
    sceneName: "แตกสลาย",
    bg: "night",
    who: CHAR.narrator,
    text:
`คืนนั้น…

คุณกลับห้องทำงานคนเดียว
แล้วทรุดตัวลงใต้โต๊ะประธาน
กอดเข่าเหมือนเด็กอายุ 12 ปี

เลขาเปิดประตูเข้ามา
เห็นคุณอยู่แบบนั้น… แล้วเธอเงียบไปนาน

ก่อนจะวางผ้าห่มไว้ข้างๆ

"ไม่เป็นไรนะคะท่านประธาน…"`,
    choices: [
      { label: "เล่าอดีตทั้งหมดให้เลขาฟัง", to: "s031_confess_secretary", mem:+2, rel:+1 },
      { label: "ไม่เล่า แต่ขอให้เลขาช่วยนัด Topaz ส่วนตัว", to: "s032_request_meet", mem:+1, risk:+1 },
    ]
  },

  s031_confess_secretary: {
    sceneName: "ความจริงในใจ",
    bg: "office",
    who: CHAR.you,
    text:
`คุณเล่าเรื่องบ้านบนเนินเขา
เล่าเรื่องสัญญา
เล่าเรื่องเด็กผู้หญิงที่หายไป

เลขาฟังจนจบ
แล้วพูดเบาๆ

"ถ้าเอกสารบอกว่าเธอไม่เคยมีอยู่จริง…"
"งั้นเราจะทำให้ความจริงกลับมาอยู่บนโต๊ะค่ะ"`,
    next: "s033_investigate"
  },

  s032_request_meet: {
    sceneName: "ขอนัด Topaz",
    bg: "office",
    who: CHAR.narrator,
    text:
`คุณไม่อยากเล่าอดีตให้ใครฟัง
แต่คุณอยากเจอเธอ

เลขาพยักหน้า
"ฉันจะนัดให้ค่ะ…"

แล้วเธอกระซิบ
"แต่ IPC จะไม่ยอมให้ท่านเจอเธอง่ายๆ แน่"`,
    next: "s033_investigate"
  },

  s033_investigate: {
    sceneName: "Project Recollection",
    bg: "ipc",
    who: CHAR.narrator,
    text:
`ทีมเทคนิคกู้ข้อมูลเก่า
พบชื่อโครงการใน IPC:

Project Recollection
หน้าที่: ทำให้คน "ลืม" เรื่องที่ขัดกับผลประโยชน์

คุณนึกถึงข้อความเปียกฝน
บางที Topaz ไม่ได้ทิ้งคุณ…
เธอถูกบังคับให้หายไป`,
    choices: [
      { label: "นัด Topaz ที่คาเฟ่ (คุยแบบมนุษย์)", to: "s040_cafe", rel:+2, mem:+1 },
      { label: "ไปเจอเธอที่โถง IPC (เสี่ยง)", to: "s041_ipc_lobby", risk:+2, mem:+1 },
    ]
  },

  s041_ipc_lobby: {
    sceneName: "โถง IPC",
    bg: "ipc",
    who: CHAR.narrator,
    text:
`ตึก IPC เย็นเหมือนเครื่องจักร
ทุกอย่างขาว สะอาด และไร้หัวใจ

Aventurine โผล่มาเหมือนรออยู่แล้ว
"ประธาน… คุณกำลังวิ่งเข้าหาห้องบอสโดยไม่มีปาร์ตี้นะครับ"

คุณไม่สนใจ
เพราะคุณเห็น Topaz เดินผ่านไปไกลๆ`,
    choices: [
      { label: "เรียกชื่อเธอทันที", to: "s040_cafe", rel:+2, mem:+1, risk:+1 },
      { label: "ตามเธอไปเงียบๆ แล้วค่อยคุย", to: "s040_cafe", rel:+1, mem:+2, risk:+1 },
    ]
  },

  s040_cafe: {
    sceneName: "คาเฟ่ (ตามลำพัง)",
    bg: "office",
    who: CHAR.topaz,
    text:
`Topaz มาตามนัด… คนเดียว
ไม่มี Jade ไม่มี Aventurine

"ประธาน… คุณต้องการอะไร"
เธอพยายามพูดทางการ แต่เสียงสั่น

คุณรู้สึกเหมือนย้อนกลับไปบนเนินเขา
แค่ครั้งนี้… ทั้งคู่โตแล้ว และมีบาดแผล`,
    choices: [
      { label: "บอกว่า: 'ตอนเขาให้ฉันเซ็น เธอไม่อยู่เลย'", to: "s042_signing_truth", rel:+2, mem:+2 },
      { label: "วางสมุดวาดรูปเก่าบนโต๊ะ", to: "s043_sketchbook", rel:+2, mem:+3 },
      { label: "พูดเบาๆ: 'ฉันไม่อยากเสียเธออีก'", to: "s044_soft", rel:+3, mem:+1 },
    ]
  },

  s042_signing_truth: {
    sceneName: "ทำไมเธอไม่อยู่ตอนเซ็น",
    bg: "office",
    who: CHAR.topaz,
    text:
`Topaz ก้มหน้า

"เขาจงใจ…"
"บางดีล เขาไม่ให้ฉันเข้าห้อง"
"เพราะฉัน… อาจทำให้ทุกอย่างไม่เรียบร้อย"

เธอกัดริมฝีปาก
เหมือนเก็บคำว่า 'ขอโทษ' ไว้ในคอ`,
    next: "s043_sketchbook"
  },

  s044_soft: {
    sceneName: "คำพูดที่เธอรอ",
    bg: "night",
    who: CHAR.you,
    text:
`"ฉันไม่สนว่าเธอเป็น IPC หรืออะไร"
"ฉันแค่อยากให้เธอปลอดภัย"

Topaz เงียบไปนาน
ก่อนจะพูดเบาๆ

"…ถ้านายพูดแบบนี้เมื่อ 13 ปีก่อน"
"ฉันอาจไม่หายไป"`,
    next: "s043_sketchbook"
  },

  s043_sketchbook: {
    sceneName: "ดาวสองดวง",
    bg: "night",
    who: CHAR.narrator,
    text:
`คุณวางสมุดวาดรูปเก่าลงบนโต๊ะ
Topaz พลิกหน้าไปทีละแผ่น

บ้านบนเนินเขา…
เด็กสองคน…
ดาวสองดวง…

เธอกดมือกับขมับ
เหมือนหมอกในหัวแตกเป็นเสี่ยง

"ฉัน… จำได้…"
"ฉันจำได้จริงๆ…"`,
    choices: [
      { label: "จับมือเธอ: 'กลับมาหาฉันแล้วนะ'", to: "s050_truth_ipc", rel:+3, mem:+3 },
      { label: "ให้พื้นที่: 'ค่อยๆ จำก็ได้ ฉันอยู่ตรงนี้'", to: "s050_truth_ipc", rel:+2, mem:+2 },
      { label: "ถาม: 'ใครทำให้เธอลืม?'", to: "s049_recollection", rel:+1, mem:+2, risk:+2 },
    ]
  },

  s049_recollection: {
    sceneName: "ความจริงที่เธอแบก",
    bg: "ipc",
    who: CHAR.topaz,
    text:
`Topaz หลับตาแน่น

"IPC มีโครงการ… ทำให้คนลืม"
"ฉันถูกบังคับให้เข้าร่วม"
"ถ้าฉันไม่ทำ… นายจะถูกลบจากทุกสัญญา"
"ถูกทำให้ไม่มีตัวตนในโลกธุรกิจ"

"ฉันเลือกหายไป… เพื่อให้นายมีชีวิต"

น้ำตาเธอไหล
แต่ครั้งนี้เธอไม่หนี`,
    next: "s050_truth_ipc"
  },

  // ---------------- LONG ARC: counterattack ----------------
  s050_truth_ipc: {
    sceneName: "การตอบโต้ของ IPC",
    bg: "ipc",
    who: CHAR.narrator,
    text:
`คืนนั้นเอง…

Musou Crop. ถูกโจมตีทางธุรกิจ
ข่าวปลอมแพร่
หุ้นสั่น
นักลงทุนตื่นตระหนก

Aventurine ส่งข้อความ:
"เดิมพันครั้งนี้… คุณพร้อมเสียทุกอย่างไหม?"

Topaz มองคุณแล้วพูดเบาๆ
"ฉันจะไม่ให้เขาพรากทุกอย่างจากนายอีก"`,
    choices: [
      { label: "ให้ Topaz ช่วยจากฝั่ง IPC (ไว้ใจเธอ)", to: "s051_teamup", rel:+3, mem:+1, risk:+1 },
      { label: "สู้ด้วยทีมบริษัท + เลขา", to: "s052_company_war", rel:+1, mem:+1, risk:+2 },
    ]
  },

  s051_teamup: {
    sceneName: "ร่วมมือกันจริงๆ",
    bg: "office",
    who: CHAR.narrator,
    text:
`Topaz ส่งข้อมูลลับให้คุณแบบเสี่ยงชีวิตการงาน

ไฟล์ที่ยืนยันว่าเอกสารหุ้นถูกแก้ย้อนหลัง
มีคำสั่ง "ตัดชื่อผู้ร่วมสร้าง"
และมีรายชื่อคนที่อยู่เบื้องหลัง

เลขากับทีมเทคนิคทำงานทั้งคืน
เหมือนกำลังแข่งสปีดรันเกมก่อนเดดไลน์`,
    next: "s053_night_call"
  },

  s052_company_war: {
    sceneName: "สงครามบริษัท",
    bg: "office",
    who: CHAR.narrator,
    text:
`คุณเรียกประชุมทีมฉุกเฉิน
นักกฎหมาย ทีม PR ทีมเทคนิค
ทุกคนทำงานแบบไม่หลับไม่นอน

Topaz ยืนเงียบๆ อยู่มุมห้อง
เหมือนคนที่ไม่ชินกับคำว่า "บ้าน"

คุณเดินไปหาเธอแล้วพูด
"อยู่ตรงนี้นะ… เราจะผ่านไปด้วยกัน"`,
    next: "s053_night_call"
  },

  s053_night_call: {
    sceneName: "สายโทรศัพท์ตอนดึก",
    bg: "night",
    who: CHAR.narrator,
    text:
`ตี 2…

Topaz โทรหาคุณ
เสียงเธอสั่น

"Jade รู้แล้วว่าฉันช่วยนาย"
"เขาจะลงโทษฉัน"

คุณลุกขึ้นทันที
เหมือนเด็ก 12 ปีที่เคยสัญญาว่าจะปกป้องเธอ`,
    choices: [
      { label: "ไปหา Topaz ทันที", to: "s054_rescue", rel:+3, risk:+2, mem:+1 },
      { label: "ให้เธอหนีมาที่ Musou Crop. (ปลอดภัยกว่า)", to: "s055_safehouse", rel:+2, risk:+1, mem:+1 },
    ]
  },

  s054_rescue: {
    sceneName: "ไปหาเธอ",
    bg: "ipc",
    who: CHAR.narrator,
    text:
`คุณไปที่จุดนัด
ท่ามกลางไฟเมืองและความเงียบ

Topaz ยืนรอเหมือนตอนฝนตกวันนั้น
แต่ครั้งนี้เธอไม่ใช่เด็กไร้บ้าน
เธอเป็นคนที่ถูกบังคับให้เป็นเครื่องมือ

คุณยื่นมือให้
"กลับบ้านกัน"

Topaz น้ำตาคลอ
แล้วจับมือคุณแน่น`,
    next: "s056_after_rescue"
  },

  s055_safehouse: {
    sceneName: "บ้านปลอดภัย",
    bg: "office",
    who: CHAR.narrator,
    text:
`คุณบอกให้เธอหนีมาที่ Musou Crop.
ทีมรักษาความปลอดภัยเปิดทาง

Topaz เข้ามาในห้องประธาน
มองโซฟา มองผ้าห่ม
เหมือนคนที่ไม่เชื่อว่าตัวเองมีที่อยู่

คุณพูดเบาๆ
"ที่นี่ปลอดภัย"

Topaz พยักหน้า
เหมือนกำลังหายใจได้เป็นครั้งแรกในรอบหลายปี`,
    next: "s056_after_rescue"
  },

  s056_after_rescue: {
    sceneName: "คืนที่ไม่หนี",
    bg: "night",
    who: CHAR.topaz,
    text:
`Topaz นั่งเงียบๆ อยู่ข้างคุณ
เหมือนกำลังกลัวว่าถ้าหลับตา…
ทุกอย่างจะหายไปอีก

"ฉันขอโทษ…"
"ฉันอยากอยู่กับนายตั้งแต่วันนั้น"
"แต่ IPC ไม่เคยให้ฉันเลือก"

คุณตอบ
"ตอนนี้เธอเลือกได้แล้ว"

Topaz เงียบไปนาน
ก่อนจะพูด

"งั้น… ฉันขออยู่ข้างนายได้ไหม"
"ไม่ใช่เพราะหน้าที่… แต่เพราะหัวใจ"`,
    choices: [
      { label: "ตอบ: 'ได้สิ… อยู่ข้างฉันตลอดไป'", to: "s060_final_meeting", rel:+4, mem:+2 },
      { label: "ตอบ: 'อยู่ด้วยกัน แต่ต้องปลอดภัยก่อน'", to: "s060_final_meeting", rel:+3, mem:+2, risk:-1 },
    ]
  },

  // ---------------- FINAL MEETING ----------------
  s060_final_meeting: {
    sceneName: "โต๊ะตัดสิน",
    bg: "meeting",
    who: CHAR.jade,
    text:
`การประชุมครั้งสุดท้ายเริ่มขึ้น

Jade นั่งเหมือนราชินี
Aventurine ยิ้มเหมือนคนดูละคร
และ Topaz… อยู่ข้างคุณ

Jade พูดเรียบๆ
"Topaz เธอไม่ควรอยู่ที่นี่"

Topaz ตอบ
"ฉันควรอยู่กับความจริง"

คุณเปิดหลักฐานทั้งหมดขึ้นจอใหญ่`,
    next: "s061_expose"
  },

  s061_expose: {
    sceneName: "ความจริงชนะ",
    bg: "ipc",
    who: CHAR.narrator,
    text:
`คุณเปิดโปงเอกสารที่ถูกแก้ย้อนหลัง
และคำสั่งตัดชื่อผู้ร่วมสร้าง

บอร์ดเริ่มตั้งคำถามกับ IPC
นักลงทุนเริ่มถอย
ข่าวปลอมถูกล้าง

Aventurine หัวเราะเบาๆ
"โอเค… สนุกดี คุณชนะรอบนี้"

Jade ยิ้มบางๆ
"ประธาน… อย่าคิดว่าชัยชนะครั้งเดียวคือจุดจบ"

Topaz จับมือคุณใต้โต๊ะ
เหมือนบอกว่า "ไม่กลัวแล้ว"`,
    next: "s070_rebuild"
  },

  // ---------------- LONG ROMANCE ARC ----------------
  s070_rebuild: {
    sceneName: "สร้างใหม่",
    bg: "office",
    who: CHAR.narrator,
    text:
`หลังจากนั้น…

Musou Crop. ฟื้นกลับมา
คุณประกาศโปรเจกต์ใหม่:
"Hill Promise Remake"

ไม่ใช่เพื่อธุรกิจ
แต่เพื่อคืนความจริงให้เด็กสองคนในอดีต

Topaz เริ่มทำงานกับคุณ
ไม่ใช่ในฐานะ IPC
แต่ในฐานะ "ผู้ร่วมสร้าง"`,
    choices: [
      { label: "ชวนเธอไปเนินเขาอีกครั้ง", to: "s071_hill_return", rel:+2, mem:+2 },
      { label: "ทำงานหนักก่อน แล้วค่อยพาไป", to: "s071_hill_return", rel:+1, mem:+1 },
    ]
  },

  s071_hill_return: {
    sceneName: "กลับสู่เนินเขา",
    bg: "hill",
    who: CHAR.narrator,
    text:
`คุณพา Topaz ไปที่เนินเขาเดิม

ไม่มีบ้านแล้ว
มีแต่หญ้าสูง และลมเย็น

Topaz ยืนเงียบ
แล้วพูดเบาๆ

"ฉันคิดว่าฉันจะไม่มีวันได้กลับมา"
"แต่
