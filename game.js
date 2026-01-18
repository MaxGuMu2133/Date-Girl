// ======================================================
// Musou Crop. x Topaz (HSR VN) - GOOD END ONLY
// - ใส่รูปเอง: topaz.png, aventurine.png, jade.png
// - เงื่อนไขสำคัญ:
//   (1) มีแต่ Good Ending
//   (2) ตอน "เซ็นเอกสาร" Topaz ไม่ได้อยู่
// ======================================================

// ====== CHARACTERS ======
const CHAR = {
  narrator: { name: "ผู้บรรยาย", tag: "—", img: "" },
  you: { name: "ประธาน Musou Crop.", tag: "CEO / ผู้สร้างเกม", img: "" },
  topaz: { name: "Topaz", tag: "IPC - Strategic Investment / Debt Collector", img: "topaz.png" },
  jade: { name: "Jade", tag: "IPC - Senior Executive / The Serpent", img: "jade.png" },
  aventurine: { name: "Aventurine", tag: "IPC - Risk Manager / Gambler", img: "aventurine.png" }
};

// ====== STATE ======
const state = {
  sceneId: "s000_title",
  rel: 0,   // ความสัมพันธ์กับ Topaz
  mem: 0,   // ความทรงจำที่กลับคืน
  risk: 0,  // ความเสี่ยงจาก IPC
  day: 1,

  history: [],
  flags: {}
};

// ====== UI ======
const elRel = document.getElementById("rel");
const elMem = document.getElementById("mem");
const elRisk = document.getElementById("risk");
const elDay = document.getElementById("day");

const elSpeaker = document.getElementById("speaker");
const elSceneName = document.getElementById("sceneName");
const elText = document.getElementById("text");
const elChoices = document.getElementById("choices");

const elBg = document.getElementById("bg");
const elCharImg = document.getElementById("charImg");
const elCharName = document.getElementById("charName");
const elCharTag = document.getElementById("charTag");

const btnNext = document.getElementById("btnNext");
const btnBack = document.getElementById("btnBack");

document.getElementById("btnSave").addEventListener("click", saveGame);
document.getElementById("btnLoad").addEventListener("click", loadGame);
document.getElementById("btnReset").addEventListener("click", resetGame);
btnNext.addEventListener("click", () => goNext());
btnBack.addEventListener("click", () => goBack());

// ====== BACKGROUND THEMES ======
const BG = {
  title: `
    radial-gradient(900px 500px at 20% 20%, rgba(255,255,255,.16), transparent 60%),
    radial-gradient(900px 500px at 80% 30%, rgba(255,180,120,.12), transparent 55%),
    linear-gradient(135deg, rgba(120,120,255,.16), rgba(0,0,0,.70))
  `,
  hill: `
    radial-gradient(900px 500px at 20% 20%, rgba(120,255,220,.10), transparent 60%),
    radial-gradient(900px 500px at 80% 30%, rgba(255,255,255,.08), transparent 55%),
    linear-gradient(135deg, rgba(60,140,120,.18), rgba(0,0,0,.70))
  `,
  rain: `
    radial-gradient(900px 500px at 30% 20%, rgba(120,120,255,.14), transparent 60%),
    radial-gradient(900px 500px at 70% 30%, rgba(255,255,255,.06), transparent 55%),
    linear-gradient(135deg, rgba(40,70,160,.18), rgba(0,0,0,.78))
  `,
  office: `
    radial-gradient(900px 500px at 30% 25%, rgba(255,255,255,.12), transparent 60%),
    radial-gradient(900px 500px at 80% 30%, rgba(255,200,120,.08), transparent 55%),
    linear-gradient(135deg, rgba(120,160,255,.16), rgba(0,0,0,.65))
  `,
  meeting: `
    radial-gradient(900px 500px at 30% 25%, rgba(255,255,255,.10), transparent 60%),
    radial-gradient(900px 500px at 80% 30%, rgba(255,120,160,.08), transparent 55%),
    linear-gradient(135deg, rgba(180,120,255,.14), rgba(0,0,0,.72))
  `,
  night: `
    radial-gradient(900px 500px at 30% 25%, rgba(140,120,255,.14), transparent 60%),
    radial-gradient(900px 500px at 80% 30%, rgba(255,255,255,.06), transparent 55%),
    linear-gradient(135deg, rgba(60,90,200,.16), rgba(0,0,0,.80))
  `,
  ipc: `
    radial-gradient(900px 500px at 30% 25%, rgba(255,255,255,.08), transparent 60%),
    radial-gradient(900px 500px at 80% 30%, rgba(120,255,220,.06), transparent 55%),
    linear-gradient(135deg, rgba(120,255,220,.08), rgba(0,0,0,.82))
  `
};

// ======================================================
// SCENES - GOOD END ONLY + TOPAZ NOT PRESENT AT SIGNING
// ======================================================
const scenes = {
  // ------------------------ TITLE ------------------------
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

  // ------------------------ PAST ------------------------
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
    sceneName: "13 ปีก่อน",
    bg: "rain",
    who: CHAR.topaz,
    text:
`เด็กผู้หญิงคนหนึ่งยืนอยู่ตรงหน้าคุณ

ดวงตาเธอคม แต่ไม่แข็ง
เหมือนคนที่ต้องเข้มแข็งเพราะไม่มีทางเลือก

"นาย… หนาวไหม?"

เธอยื่นผ้าผืนเล็กให้`,
    choices: [
      { label: "รับผ้าไว้ แล้วขอบคุณเธอ", to: "s012_past_first_talk", rel:+1, mem:+1 },
      { label: "ปฏิเสธ (ไม่อยากเป็นภาระ)", to: "s012_past_first_talk", rel:0, mem:+1, risk:+1 },
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
ด้านบนมีซากไม้ กระดาษลัง และผ้าเก่าๆ

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

กลางคืน… พวกคุณนั่งดูดาว
แล้วเธอถาม

"ถ้าวันหนึ่งนายมีพลัง… นายจะทำอะไร?"`,
    choices: [
      { label: "ตอบว่า: 'เราจะสร้างเกมให้คนยิ้มได้'", to: "s015_past_promise", rel:+2, mem:+2 },
      { label: "ตอบว่า: 'เราจะสร้างบ้านให้เด็กไร้บ้านทุกคน'", to: "s015_past_promise", rel:+1, mem:+2 },
    ]
  },

  s015_past_promise: {
    sceneName: "สัญญา",
    bg: "night",
    who: CHAR.topaz,
    text:
`Topaz หยิบสมุดวาดรูปของคุณ
แล้ววาดรูปบ้านบนเนินเขา วาดเด็กสองคนจับมือกัน
วาด "สัญญา" เป็นรูปดาวเล็กๆ

"สัญญานะ… ไม่ว่าเราจะโตไปแค่ไหน
ถ้าเจอกันอีกครั้ง…
เราจะจำกันได้"

เธอยื่นดินสอให้คุณ`,
    choices: [
      { label: "วาดดาวเพิ่มอีกดวง และเขียนชื่อเธอ", to: "s016_past_2months", rel:+2, mem:+2 },
      { label: "วาดรูปหัวใจเล็กๆ (เขินแต่ทำ)", to: "s016_past_2months", rel:+3, mem:+2 },
    ]
  },

  s016_past_2months: {
    sceneName: "2 เดือน",
    bg: "hill",
    who: CHAR.narrator,
    text:
`ตลอด 2 เดือน…
บ้านบนเนินเขากลายเป็นโลกทั้งใบของคุณ

พวกคุณเล่นเกมที่คิดเอง
ทำภารกิจปลอมๆ ในเมือง
แบ่งขนมปังครึ่งชิ้น
หัวเราะกับเรื่องไร้สาระ

บางคืน Topaz จะพูดคำว่า "IPC" ด้วยน้ำเสียงที่ระวัง
เหมือนมันเป็นเงาที่ตามเธอมา`,
    next: "s017_past_disappear"
  },

  s017_past_disappear: {
    sceneName: "วันที่เธอหายไป",
    bg: "rain",
    who: CHAR.narrator,
    text:
`วันหนึ่งคุณกลับมาที่บ้านบนเนินเขา
พบแค่ความเงียบ

ไม่มี Topaz
ไม่มีคำลา

มีเศษกระดาษเปียกฝน…
"ขอโทษ… ถ้าฉันอยู่ต่อ นายจะเจ็บมากกว่าเดิม"`,
    next: "s020_present_ceo"
  },

  // ------------------------ PRESENT ------------------------
  s020_present_ceo: {
    sceneName: "ปัจจุบัน",
    bg: "office",
    who: CHAR.narrator,
    text:
`13 ปีต่อมา…

คุณกลายเป็น "ประธาน Musou Crop."
บริษัทสร้างเกมที่โด่งดังที่สุดในโซนนี้

แต่คุณยังเก็บสมุดวาดรูปเล่มเดิมไว้
ถึงมันจะขาด… แต่สัญญายังอยู่`,
    next: "s021_secretary_worry"
  },

  s021_secretary_worry: {
    sceneName: "ห้องประธาน",
    bg: "office",
    who: CHAR.narrator,
    text:
`เลขาเคาะประตูเบาๆ

"ท่านประธานคะ วันนี้ IPC ขอเข้าพบ"
"ผู้แทนคือ Jade และ Aventurine"
"…และเขาขอให้ท่านเซ็นเอกสารด่วน"

คำว่า 'ด่วน' ในโลกธุรกิจ
มักหมายถึง 'กับดัก'`,
    next: "s022_sign_meeting_no_topaz"
  },

  // ====== IMPORTANT: Signing meeting WITHOUT Topaz ======
  s022_sign_meeting_no_topaz: {
    sceneName: "ประชุมเซ็น (ไม่มีเธอ)",
    bg: "meeting",
    who: CHAR.narrator,
    text:
`ห้องประชุมใหญ่เงียบผิดปกติ

มีแค่ Jade และ Aventurine
…Topaz ไม่ได้มา

Jade วางแฟ้มเอกสารหนาไว้บนโต๊ะ
"การลงทุน + โอนหุ้นบางส่วนให้ IPC"

Aventurine โยนเหรียญเล่น แล้วพูดเหมือนล้อเล่น
"เซ็นเถอะครับประธาน—คืนนี้คุณจะนอนหลับสบาย"`,
    choices: [
      { label: "ถามทันที: 'ทำไม Topaz ไม่อยู่?'", to: "s023_where_is_topaz", mem:+1, risk:+1 },
      { label: "เปิดเอกสารดูละเอียด (ระวังตัว)", to: "s024_document_wrong", mem:+1 },
      { label: "พยายามรักษามารยาท แต่รู้สึกไม่ดี", to: "s024_document_wrong", mem:+1, risk:+1 },
    ]
  },

  s023_where_is_topaz: {
    sceneName: "เธอหายไปอีกแล้ว",
    bg: "meeting",
    who: CHAR.jade,
    text:
`Jade ยิ้มแบบสุภาพเกินจริง

"Topaz มีภารกิจอื่นค่ะ"
"และเรื่องนี้… ไม่จำเป็นต้องมีเธอ"

Aventurine พูดเสริม
"บางครั้ง คนที่เกี่ยวข้องมากเกินไป…
ก็ทำให้เซ็นยากขึ้นนะครับ"

ประโยคเดียว
แต่เหมือนมีดกรีดบางอย่างในหัวคุณ`,
    next: "s024_document_wrong"
  },

  s024_document_wrong: {
    sceneName: "ข้อมูลที่ไม่จริง",
    bg: "ipc",
    who: CHAR.narrator,
    text:
`คุณพลิกเอกสารไปเรื่อยๆ
ตัวเลขสวยงาม… สวยเกินจริง

แล้วคุณเห็นบรรทัดหนึ่ง:

"แหล่งกำเนิดทรัพย์สินทางปัญญา:
โครงการ Hill Promise ถูกยกเลิก ไม่มีผู้ร่วมสร้าง"

หัวคุณชา

Hill Promise…
คือชื่อที่คุณตั้งให้ 'เกมแรก' ในชีวิต
เกมที่เกิดจากบ้านบนเนินเขา
เกมที่คุณกับ Topaz เคยฝันด้วยกัน

แต่เอกสารกลับบอกว่า… 'ไม่มีผู้ร่วมสร้าง'`,
    choices: [
      { label: "หยุดเซ็นทันที: 'ผมไม่เซ็น'", to: "s025_cancel_sign", risk:+2, mem:+1 },
      { label: "ขอเวลาหนึ่งสัปดาห์เพื่อตรวจสอบเอกสาร", to: "s026_one_week", risk:+1, mem:+1 },
      { label: "ถาม Jade ตรงๆ ว่าใครลบชื่อผู้ร่วมสร้าง", to: "s027_press_jade", risk:+2, mem:+1 },
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
แต่ดวงตาเธอเย็นลง

Aventurine หัวเราะเบาๆ
"โอเค… งั้นเกมเริ่มจริงแล้วสินะ"`,
    next: "s030_breakdown_week"
  },

  s026_one_week: {
    sceneName: "ขอเวลา 1 สัปดาห์",
    bg: "meeting",
    who: CHAR.you,
    text:
`คุณสูดลมหายใจ

"ผมขอเวลาหนึ่งสัปดาห์"
"ถ้าเอกสารนี้สะอาด เราคุยกันใหม่"

Jade พยักหน้า
"แน่นอนค่ะ ประธาน"

Aventurine โยนเหรียญขึ้นสูง
"หนึ่งสัปดาห์… พอดีสำหรับให้หุ้นร่วงนะครับ"`,
    next: "s030_breakdown_week"
  },

  s027_press_jade: {
    sceneName: "กดดัน Jade",
    bg: "ipc",
    who: CHAR.you,
    text:
`"ใครลบชื่อผู้ร่วมสร้าง?"

Jade ตอบเรียบๆ
"ธุรกิจไม่จำเป็นต้องมีความทรงจำค่ะ"

Aventurine พูดเหมือนปลอบ
"คนเรามีอดีตได้… แต่อย่าให้มันรบกวนการเซ็น"

คำพูดนั้นทำให้คุณมั่นใจทันทีว่า
บางอย่าง 'ถูกจงใจทำให้หายไป'`,
    next: "s025_cancel_sign"
  },

  // ------------------------ BREAKDOWN WEEK ------------------------
  s030_breakdown_week: {
    sceneName: "หนึ่งสัปดาห์ที่เงียบงัน",
    bg: "night",
    who: CHAR.narrator,
    text:
`คืนนั้น…

คุณกลับห้องทำงานคนเดียว
ภาพบ้านบนเนินเขา กับภาพเอกสารบนโต๊ะ
ซ้อนทับกันจนปวดหัว

คุณทรุดตัวลงใต้โต๊ะประธาน
กอดเข่า
ซ่อนตัวเหมือนเด็กอายุ 12 ปีอีกครั้ง

และครั้งนี้…
คนที่หายไปในห้องประชุม
คือคนที่คุณอยากเห็นที่สุด`,
    next: "s031_secretary_find"
  },

  s031_secretary_find: {
    sceneName: "เลขาเป็นห่วง",
    bg: "office",
    who: CHAR.narrator,
    text:
`เลขาเปิดประตูเข้ามาเบาๆ
เห็นคุณอยู่ใต้โต๊ะ กอดเข่า เงียบ

เธอไม่ถาม
แค่วางผ้าห่มลงข้างๆ

"ไม่เป็นไรนะคะท่านประธาน…
วันนี้แค่เหนื่อยก็ได้ พรุ่งนี้ค่อยสู้ใหม่"`,
    choices: [
      { label: "เล่าอดีตให้เลขาฟังทั้งหมด", to: "s032_confess_past", mem:+2 },
      { label: "ไม่เล่า แต่ขอให้เลขาช่วยนัด Topaz แบบส่วนตัว", to: "s033_request_meet_topaz", mem:+1, risk:+1 },
    ]
  },

  s032_confess_past: {
    sceneName: "เล่าอดีต",
    bg: "office",
    who: CHAR.you,
    text:
`"ผมเคยมีเพื่อนคนหนึ่ง…"
"เราไม่มีบ้าน… เราสร้างบ้านเล็กๆ บนเนินเขา"
"เราวาดสัญญาว่าจะจำกันได้"

"แต่เธอหายไป…"
"แล้ววันนี้… เอกสารบอกว่าเธอไม่เคยมีอยู่จริง"

เลขาเงียบไปนาน
ก่อนจะพูด

"งั้นเราต้องทำให้ 'ความจริง' กลับมาอยู่บนโต๊ะค่ะ"`,
    next: "s034_investigate_project"
  },

  s033_request_meet_topaz: {
    sceneName: "ขอนัด Topaz",
    bg: "office",
    who: CHAR.narrator,
    text:
`คุณไม่อยากเล่าอดีตให้ใครฟัง
แต่อยากเจอเธอ

เลขาพยักหน้า
"ฉันจะหาวิธีนัดให้ค่ะ"

แต่ในเวลาเดียวกัน…
เธอกระซิบเหมือนเตือน

"IPC จะไม่ยอมให้ท่านเจอเธอง่ายๆ แน่"`,
    next: "s034_investigate_project"
  },

  // ------------------------ NEW EVENT: Project Recollection ------------------------
  s034_investigate_project: {
    sceneName: "ร่องรอยการลบ",
    bg: "ipc",
    who: CHAR.narrator,
    text:
`เลขากับทีมเทคนิคกู้ข้อมูลเก่า
พบชื่อโครงการหนึ่งใน IPC:

"Project Recollection"

หน้าที่: ปรับประวัติ / ทำให้คนบางคน "ลืม" เรื่องบางเรื่อง
เพื่อให้ดีลธุรกิจเดินหน้าโดยไม่มีพันธะทางใจ

คุณนึกถึงประโยคในกระดาษเปียกฝน:
"ถ้าฉันอยู่ต่อ นายจะเจ็บมากกว่าเดิม"

บางที… เธอไม่ได้ทิ้งคุณ
เธอถูก 'บังคับให้หายไป'`,
    choices: [
      { label: "นัด Topaz ที่คาเฟ่ใกล้ตึก (คุยแบบมนุษย์)", to: "s040_cafe_meet", mem:+2, rel:+1 },
      { label: "ไปดักเจอเธอที่โถง IPC ด้วยตัวเอง (เสี่ยง)", to: "s041_lobby_ipc", risk:+2, mem:+1 },
    ]
  },

  s041_lobby_ipc: {
    sceneName: "โถง IPC",
    bg: "ipc",
    who: CHAR.narrator,
    text:
`คุณไปที่โถงตึก IPC

ไฟขาวเย็นเฉียบเหมือนโรงพยาบาล
พนักงานมองคุณเหมือนกำลังชั่งน้ำหนัก

Aventurine โผล่มาราวกับรออยู่แล้ว
"ประธาน… คุณกำลังวิ่งเข้าหาห้องบอสโดยไม่มีพรรคพวกนะครับ"

คุณไม่ตอบ
เพราะในฝูงชน…
คุณเห็น Topaz เดินผ่านไปไกลๆ`,
    choices: [
      { label: "เรียกชื่อเธอทันที", to: "s040_cafe_meet", rel:+2, mem:+1, risk:+1 },
      { label: "ตามเธอไปเงียบๆ แล้วค่อยคุย", to: "s040_cafe_meet", rel:+1, mem:+2, risk:+1 },
    ]
  },

  // ------------------------ PRIVATE MEET WITH TOPAZ ------------------------
  s040_cafe_meet: {
    sceneName: "คาเฟ่ (เจอกันตามลำพัง)",
    bg: "office",
    who: CHAR.topaz,
    text:
`Topaz มาตามนัด
ครั้งนี้เธอไม่มี Jade ไม่มี Aventurine

มีแค่เธอ… กับคุณ… และความเงียบ

"ประธาน… คุณต้องการอะไร"
เธอพยายามพูดทางการ
แต่เสียงสั่นนิดๆ เหมือนกลัวจะพัง`,
    choices: [
      { label: "วางสมุดวาดรูปเก่าบนโต๊ะ", to: "s042_show_sketchbook", mem:+3, rel:+2 },
      { label: "บอกตรงๆ ว่า 'ตอนเซ็นฉันไม่เห็นเธอเลย'", to: "s043_tell_signing", mem:+2, rel:+2 },
      { label: "พูดเบาๆ: 'ฉันไม่อยากเสียเธออีก'", to: "s044_soft_words", mem:+1, rel:+3 },
    ]
  },

  s043_tell_signing: {
    sceneName: "ทำไมเธอไม่อยู่ตอนเซ็น",
    bg: "office",
    who: CHAR.you,
    text:
`"ในห้องประชุม… ตอนเขาให้ฉันเซ็น"
"มีแค่ Jade กับ Aventurine"
"เธอไม่อยู่เลย"

Topaz ก้มหน้า
เหมือนรู้คำตอบอยู่แล้ว

"…เขาจงใจ"
"บางดีล… เขาไม่ให้ฉันเข้าห้อง"
"เพราะฉัน… อาจทำให้ทุกอย่าง 'ไม่เรียบร้อย'"

ประโยคนี้ทำให้คุณแน่ใจ
เธอยังเป็นเธอ… แค่ถูกบีบให้เป็นเครื่องมือ`,
    next: "s042_show_sketchbook"
  },

  s044_soft_words: {
    sceneName: "คำพูดที่ไม่เคยได้ยิน",
    bg: "night",
    who: CHAR.you,
    text:
`"ฉันไม่สนว่าเธอเป็น IPC หรืออะไร"
"ฉันแค่อยากให้เธอปลอดภัย"

Topaz เงียบไปนาน
ก่อนจะพูดเบาๆ

"…ถ้านายพูดแบบนี้เมื่อ 13 ปีก่อน"
"ฉันอาจไม่หายไป"`,
    next: "s042_show_sketchbook"
  },

  s042_show_sketchbook: {
    sceneName: "สมุดวาดรูป",
    bg: "night",
    who: CHAR.narrator,
    text:
`คุณวางสมุดวาดรูปเก่าบนโต๊ะ

Topaz พลิกหน้าไปทีละแผ่น
เห็นบ้านบนเนินเขา
เห็นดาวสองดวง
เห็นชื่อเธอ… ลายมือเด็ก

เธอกดมือกับขมับ
เหมือนหมอกในหัวเริ่มร้าว

"ฉัน… จำได้…"
"เรา… เคยอยู่บนเนินเขาจริงๆ"`,
    choices: [
      { label: "จับมือเธอ: 'กลับมาหาฉันแล้วนะ'", to: "s050_ipc_counter", rel:+3, mem:+3 },
      { label: "ให้พื้นที่เธอ: 'ค่อยๆ จำก็ได้'", to: "s050_ipc_counter", rel:+2, mem:+2 },
      { label: "ถามเรื่องโครงการลบความทรงจำ", to: "s045_project_truth", risk:+2, mem:+2, rel:+1 },
    ]
  },

  s045_project_truth: {
    sceneName: "ความจริงที่เธอแบก",
    bg: "ipc",
    who: CHAR.topaz,
    text:
`Topaz หลับตาแน่น

"IPC มีโครงการ… ทำให้คนลืม"
"ฉันถูกบังคับให้เข้าร่วม"
"ถ้าฉันไม่ทำ… นายจะถูกลบไปจากโลกธุรกิจ… จากทุกสัญญา"

"ฉันเลือกหายไป…"
"เพื่อให้นายมีชีวิต"

เธอสั่น
เหมือนคนที่อยู่กับคำว่า 'ขอโทษ' มา 13 ปี`,
    next: "s050_ipc_counter"
  },

  // ------------------------ IPC COUNTER MOVE ------------------------
  s050_ipc_counter: {
    sceneName: "การตอบโต้",
    bg: "ipc",
    who: CHAR.narrator,
    text:
`คืนนั้นเอง…

Musou Crop. ถูกโจมตีทางธุรกิจ
ข่าวปลอมแพร่กระจาย
หุ้นร่วง
นักลงทุนตื่นตระหนก

เหมือน IPC กำลังบอกว่า
"อย่าดื้อ"

Aventurine ส่งข้อความ:
"เดิมพันครั้งนี้… คุณพร้อมเสียทุกอย่างไหม?"

Topaz มองคุณ
แล้วพูดเบาๆ

"ฉัน… จะไม่ให้เขาพรากทุกอย่างจากนายอีก"`,
    choices: [
      { label: "ให้ Topaz ช่วยจากฝั่ง IPC (ไว้ใจเธอ)", to: "s051_team_up", rel:+3, mem:+1, risk:+1 },
      { label: "สู้กลับด้วยหลักฐาน (ทีมบริษัท)", to: "s052_fight_back", risk:+2, mem:+1, rel:+1 },
    ]
  },

  s051_team_up: {
    sceneName: "ร่วมมือ",
    bg: "office",
    who: CHAR.narrator,
    text:
`Topaz ตัดสินใจช่วยคุณแบบตรงๆ

เธอแอบส่งข้อมูลบางส่วน
ที่พิสูจน์ว่าเอกสารหุ้นถูกแก้ไขย้อนหลัง
และมีคำสั่ง "ตัดชื่อผู้ร่วมสร้าง" จริง

เลขากับทีมเทคนิคทำงานทั้งคืน
เหมือนกู้เซิร์ฟเวอร์ก่อนเดดไลน์เกม`,
    next: "s060_final_meeting"
  },

  s052_fight_back: {
    sceneName: "สู้กลับ",
    bg: "office",
    who: CHAR.narrator,
    text:
`คุณเลือกสู้ด้วยทีมของ Musou Crop.

กู้ข้อมูลเก่า
รวบรวมสัญญาเดิม
เจาะความไม่ชอบมาพากลในเอกสาร

Topaz มองคุณ
เหมือนเห็นเด็ก 12 ปีที่ไม่ยอมแพ้

สุดท้าย… เธอพูด

"ฉันช่วยด้วย"`,
    next: "s060_final_meeting"
  },

  // ------------------------ FINAL MEETING (GOOD END PATH) ------------------------
  s060_final_meeting: {
    sceneName: "โต๊ะตัดสิน",
    bg: "meeting",
    who: CHAR.jade,
    text:
`การประชุมครั้งสุดท้ายเริ่มขึ้น

Jade วางเอกสารฉบับใหม่
พยายามให้คุณเซ็นแบบเดิม
แต่คราวนี้… คุณมีหลักฐาน

Aventurine ยิ้ม
"ถ้าคุณจะเล่นจริง… ผมก็พร้อม"

และครั้งนี้…
Topaz อยู่กับคุณ (แต่นั่งเงียบ เหมือนรอจังหวะ)

Jade หันไปมองเธอ
"Topaz… เธอไม่ควรอยู่ที่นี่"

Topaz ตอบสั้นๆ
"ฉันควรอยู่กับความจริง"`,
    choices: [
      { label: "เปิดโปงเอกสารต่อหน้าทุกคน", to: "s061_expose", mem:+2, rel:+2, risk:+2 },
      { label: "พูดกับ Topaz ต่อหน้า IPC: 'เธอคือผู้ร่วมสร้าง'", to: "s062_say_creator", mem:+2, rel:+3, risk:+1 },
    ]
  },

  s061_expose: {
    sceneName: "เปิดโปง",
    bg: "ipc",
    who: CHAR.narrator,
    text:
`คุณฉายหลักฐานขึ้นจอใหญ่
ชี้ให้เห็นการแก้ไขประวัติย้อนหลัง
และคำสั่งตัดชื่อผู้ร่วมสร้าง

ห้องประชุมปั่นป่วน
นักลงทุนเริ่มซุบซิบ
บอร์ดเริ่มตั้งคำถามกับ IPC

Aventurine ถอนหายใจเหมือนสนุกไม่สุด
"โอเค… คุณชนะรอบนี้"

Jade ยิ้มบางๆ แต่สายตาแข็ง
"…น่าสนใจค่ะ ประธาน"`,
    next: "s070_good_ending_only"
  },

  s062_say_creator: {
    sceneName: "เธอคือผู้ร่วมสร้าง",
    bg: "meeting",
    who: CHAR.you,
    text:
`คุณหันไปหา Topaz แล้วพูดดังพอให้ทุกคนได้ยิน

"Topaz คือผู้ร่วมสร้าง Hill Promise"
"สัญญาบนเนินเขา… ทำให้ Musou Crop เกิดขึ้น"

Topaz ชะงัก
เหมือนโดนดึงออกจากคุก 13 ปี

เธอลุกขึ้น
วางมือบนโต๊ะ
แล้วพูดด้วยน้ำเสียงที่ไม่สั่นแล้ว

"ฉันยืนยัน"

คำเดียว…
แต่หนักพอจะทำให้ Jade เงียบ`,
    next: "s070_good_ending_only"
  },

  // ------------------------ GOOD ENDING ONLY ------------------------
  s070_good_ending_only: {
    sceneName: "GOOD END",
    bg: "hill",
    who: CHAR.narrator,
    text:
`สองสัปดาห์ต่อมา…

Musou Crop. ฟื้นกลับมา
หุ้นกลับขึ้น
ข่าวปลอมถูกล้างด้วยความจริง
IPC ถอยไปชั่วคราว (อย่างไม่เต็มใจ)

คืนหนึ่ง… คุณพา Topaz ไปที่ "เนินเขา"
เนินเดิมที่เคยมีบ้านเล็กๆ

ไม่มีบ้านแล้ว
มีแต่หญ้าสูง ลมเย็น และท้องฟ้า

Topaz ยืนเงียบ
แล้วพูดเหมือนเด็กคนนั้นกลับมา

"ฉันจำได้แล้ว… ดาวสองดวง"
"แล้วนายก็วาด… เพิ่มให้ฉัน"

คุณยิ้ม
หยิบสมุดวาดรูปเล่มเดิมออกมา
มันเก่า… แต่ยังอยู่

"งั้นเราวาดต่อ"
"บ้านใหม่… ที่ไม่มีใครลบได้อีก"

Topaz พยักหน้า
แล้วจับมือคุณก่อน

"ครั้งนี้… ฉันจะไม่หนี"

GOOD ENDING:
"Promise on the Hill — We Remember" ❤️`
    // ไม่มี next = จบเกม
  }
};

// =====================================================
