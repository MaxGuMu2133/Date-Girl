// ====== DATA (เนื้อเรื่องแก้ตรงนี้) ======
const scenes = {
  start: {
    bg: "evening",
    speaker: "ผู้บรรยาย",
    charName: "—",
    avatar: "🌆",
    text: "วันแรกของการเป็นนักเรียนใหม่… คุณเดินเข้าไปที่ชมรมเกมแล้วเจอ “ไอริน” นั่งอยู่คนเดียว",
    next: "meet"
  },

  meet: {
    bg: "club",
    speaker: "ไอริน",
    charName: "ไอริน",
    avatar: "👩🏻‍💻",
    text: "อ้าว… นายคือคนใหม่ใช่ไหม? มาหาใครเหรอ",
    choices: [
      { label: "มาหาชมรมเกม! อยากเข้าด้วย", to: "join", rel: +2 },
      { label: "แค่มาหลบคน… ขอนั่งด้วยได้ไหม", to: "sit", rel: +1 },
      { label: "เดินผ่านเฉยๆ (ทำเท่)", to: "cold", rel: -1 }
    ]
  },

  join: {
    bg: "club",
    speaker: "ไอริน",
    charName: "ไอริน",
    avatar: "👩🏻‍💻",
    text: "งั้นลองพิสูจน์หน่อย—เลือกเกมที่เราเล่นด้วยกันสิ",
    choices: [
      { label: "เกมวางแผน Turn-based (ถูกใจสายคิด)", to: "plan", rel: +2 },
      { label: "เกม Rhythm (ชวนสนุก)", to: "rhythm", rel: +1 }
    ]
  },

  sit: {
    bg: "club",
    speaker: "ไอริน",
    charName: "ไอริน",
    avatar: "👩🏻‍💻",
    text: "ได้สิ… แต่ถ้านายเงียบเกินไปเราจะชวนคุยเองนะ 😌",
    next: "afterTalk",
    relOnce: +1
  },

  cold: {
    bg: "hall",
    speaker: "ผู้บรรยาย",
    charName: "—",
    avatar: "😎",
    text: "คุณทำเท่เกินไปจนบรรยากาศแปลกๆ… เธอมองตามแบบงงๆ",
    next: "afterTalk"
  },

  plan: {
    bg: "club",
    speaker: "ไอริน",
    charName: "ไอริน",
    avatar: "👩🏻‍💻",
    text: "โอเค! งั้น… ถ้าเราแพ้ นายต้องเลี้ยงน้ำหวานนะ",
    next: "afterTalk",
    relOnce: +2
  },

  rhythm: {
    bg: "club",
    speaker: "ไอริน",
    charName: "ไอริน",
    avatar: "👩🏻‍💻",
    text: "นายชวนเล่นเพลงเร็วเลยเหรอ… กล้าดี 😳",
    next: "afterTalk",
    relOnce: +1
  },

  afterTalk: {
    bg: "night",
    speaker: "ผู้บรรยาย",
    charName: "—",
    avatar: "🌙",
    text: "หลังคุยกันสักพัก เธอเหมือนเปิดใจมากขึ้น… คุณจะทำยังไงต่อ?",
    choices: [
      { label: "ชมว่าเธอเก่งมาก (จริงใจ)", to: "compliment", rel: +2, day: +1 },
      { label: "ชวนคุยเรื่องเกมที่ชอบ (เป็นเพื่อนก่อน)", to: "friend", rel: +1, day: +1 },
      { label: "รีบกลับ (กลัวเขิน)", to: "leave", rel: 0, day: +1 }
    ]
  },

  compliment: {
    bg: "night",
    speaker: "ไอริน",
    charName: "ไอริน",
    avatar: "😊",
    text: "…ขอบใจนะ นายพูดแบบนี้เราดีใจแปลกๆ",
    next: "endingCheck"
  },

  friend: {
    bg: "night",
    speaker: "ไอริน",
    charName: "ไอริน",
    avatar: "🙂",
    text: "ดีเลย! งั้นครั้งหน้าลองแลกเกมกันเล่นนะ",
    next: "endingCheck"
  },

  leave: {
    bg: "night",
    speaker: "ผู้บรรยาย",
    charName: "—",
    avatar: "🏃",
    text: "คุณกลับบ้าน… แต่ในหัวมีแต่ประโยคที่ยังไม่ได้พูด",
    next: "endingCheck"
  },

  endingCheck: {
    bg: "morning",
    speaker: "ผู้บรรยาย",
    charName: "—",
    avatar: "☀️",
    text: "วันถัดมา… คุณเปิดมือถือเห็นข้อความใหม่จากไอริน",
    next: (state) => {
      if (state.rel >= 6) return "endingGood";
      if (state.rel >= 3) return "endingMid";
      return "endingBad";
    }
  },

  endingGood: {
    bg: "morning",
    speaker: "ไอริน",
    charName: "ไอริน",
    avatar: "💌",
    text: "“วันนี้ว่างไหม… อยากให้นายมาช่วยสอนเกมหน่อย”\n\nจบแบบดี: ความสัมพันธ์พุ่ง! ❤️",
  },

  endingMid: {
    bg: "morning",
    speaker: "ไอริน",
    charName: "ไอริน",
    avatar: "📩",
    text: "“เจอกันที่ชมรมนะ เดี๋ยวเล่นเกมต่อเมื่อวาน”\n\nจบแบบกลาง: ไปต่อได้ มีหวัง 🙂",
  },

  endingBad: {
    bg: "morning",
    speaker: "ผู้บรรยาย",
    charName: "—",
    avatar: "💤",
    text: "ไม่มีข้อความอะไร… บางทีคุณต้องเริ่มใหม่ แล้วกล้าพูดมากขึ้น\n\nจบแบบเศร้า: ความสัมพันธ์ไม่พอ 😅",
  }
};

// ====== STATE ======
const state = {
  sceneId: "start",
  rel: 0,
  day: 1
};

// ====== UI ======
const elRel = document.getElementById("rel");
const elDay = document.getElementById("day");
const elSpeaker = document.getElementById("speaker");
const elText = document.getElementById("text");
const elChoices = document.getElementById("choices");
const elBg = document.getElementById("bg");
const elAvatar = document.getElementById("avatar");
const elCharName = document.getElementById("charName");
const btnNext = document.getElementById("btnNext");

document.getElementById("btnSave").addEventListener("click", saveGame);
document.getElementById("btnLoad").addEventListener("click", loadGame);
document.getElementById("btnReset").addEventListener("click", resetGame);
btnNext.addEventListener("click", () => goNext());

// ====== RENDER ======
function render() {
  const scene = scenes[state.sceneId];
  if (!scene) return;

  // bg แบบง่ายๆ (ปรับเป็นรูปจริงได้ใน CSS หรือใส่รูปใน bg)
  const bgMap = {
    morning: "radial-gradient(900px 500px at 20% 20%, rgba(255,255,255,.18), transparent 60%), linear-gradient(135deg, rgba(255,220,120,.25), rgba(0,0,0,.45))",
    evening: "radial-gradient(900px 500px at 30% 30%, rgba(255,150,120,.16), transparent 60%), linear-gradient(135deg, rgba(120,160,255,.18), rgba(0,0,0,.55))",
    night: "radial-gradient(900px 500px at 40% 30%, rgba(140,120,255,.14), transparent 60%), linear-gradient(135deg, rgba(60,90,200,.16), rgba(0,0,0,.70))",
    club: "radial-gradient(900px 500px at 30% 30%, rgba(120,255,220,.10), transparent 60%), linear-gradient(135deg, rgba(120,120,255,.16), rgba(0,0,0,.60))",
    hall: "radial-gradient(900px 500px at 30% 30%, rgba(255,255,255,.10), transparent 60%), linear-gradient(135deg, rgba(255,120,160,.14), rgba(0,0,0,.65))",
  };
  elBg.style.background = bgMap[scene.bg] || "";

  elSpeaker.textContent = scene.speaker ?? "—";
  elText.textContent = scene.text ?? "";
  elAvatar.textContent = scene.avatar ?? "🙂";
  elCharName.textContent = scene.charName ?? "—";

  elRel.textContent = state.rel.toString();
  elDay.textContent = state.day.toString();

  // choices
  elChoices.innerHTML = "";
  const hasChoices = Array.isArray(scene.choices) && scene.choices.length > 0;
  if (hasChoices) {
    btnNext.disabled = true;
    btnNext.textContent = "เลือกตัวเลือกด้านบน";
    scene.choices.forEach((c) => {
      const b = document.createElement("button");
      b.className = "btnChoice";
      b.textContent = c.label;
      b.addEventListener("click", () => choose(c));
      elChoices.appendChild(b);
    });
  } else {
    btnNext.disabled = false;
    btnNext.textContent = "ถัดไป";
  }
}

function choose(choice) {
  if (typeof choice.rel === "number") state.rel += choice.rel;
  if (typeof choice.day === "number") state.day += choice.day;

  // ไปฉากถัดไป
  state.sceneId = choice.to;
  applyRelOnce();
  render();
}

function goNext() {
  const scene = scenes[state.sceneId];
  if (!scene) return;

  // ถ้าฉากมี next เป็น function ให้คำนวณจาก state
  let next = scene.next;
  if (typeof next === "function") next = next(state);

  if (!next) return; // ฉากจบ
  state.sceneId = next;

  applyRelOnce();
  render();
}

// บางฉากให้ relOnce ตอนเข้าเพียงครั้งเดียว
function applyRelOnce() {
  const scene = scenes[state.sceneId];
  if (!scene) return;
  if (typeof scene.relOnce === "number") {
    // ป้องกันไม่ให้บวกซ้ำด้วย flag ใน sceneId+relOnce
    const key = `__relOnce__${state.sceneId}`;
    if (!state[key]) {
      state.rel += scene.relOnce;
      state[key] = true;
    }
  }
}

// ====== SAVE/LOAD ======
function saveGame() {
  localStorage.setItem("loveVN_save", JSON.stringify(state));
  toast("บันทึกแล้ว ✅");
}
function loadGame() {
  const raw = localStorage.getItem("loveVN_save");
  if (!raw) return toast("ยังไม่มีไฟล์บันทึก");
  const data = JSON.parse(raw);
  Object.assign(state, data);
  toast("โหลดแล้ว ✅");
  render();
}
function resetGame() {
  localStorage.removeItem("loveVN_save");
  state.sceneId = "start";
  state.rel = 0;
  state.day = 1;
  // ลบ flag relOnce
  Object.keys(state).forEach(k => { if (k.startsWith("__relOnce__")) delete state[k]; });
  toast("เริ่มใหม่แล้ว 🔄");
  render();
}

// Toast แบบง่าย
function toast(msg){
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.position="fixed";
  t.style.left="50%";
  t.style.bottom="18px";
  t.style.transform="translateX(-50%)";
  t.style.padding="10px 12px";
  t.style.border="1px solid rgba(255,255,255,.18)";
  t.style.background="rgba(0,0,0,.65)";
  t.style.borderRadius="12px";
  t.style.zIndex="9999";
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 1200);
}

// เริ่ม
render();
