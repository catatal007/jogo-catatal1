/* script.js - main app logic */
let state = {
  score: Number(localStorage.getItem('cma_score')||0),
  progress: JSON.parse(localStorage.getItem('cma_progress')||'{}')
};

function saveState(){ localStorage.setItem('cma_score', String(state.score)); localStorage.setItem('cma_progress', JSON.stringify(state.progress)); updateUI(); }
function updateUI(){
  document.getElementById('score').innerText = state.score;
  document.getElementById('lastModule').innerText = state.progress.lastModule || '—';
}

/* NAV */
document.querySelectorAll('.navbtn').forEach(b=>{
  b.addEventListener('click', e=>{
    document.querySelectorAll('.navbtn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const screen = 'screen-'+b.dataset.screen;
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('visible'));
    document.getElementById(screen).classList.add('visible');
  });
});

document.getElementById('startMath').addEventListener('click', ()=> document.querySelector('[data-screen="math"]').click());
document.getElementById('startLogic').addEventListener('click', ()=> document.querySelector('[data-screen="logic"]').click());
document.getElementById('startWeb').addEventListener('click', ()=> document.querySelector('[data-screen="web"]').click());

/* MODE */
function currentMode(){ return document.getElementById('modeSelect').value; }

/* ---------- MATEMÁTICA ---------- */
async function newMathQuestion(){
  document.getElementById('mathFeedback').innerText = 'Carregando...';
  if(currentMode() === 'auto'){
    const q = AutoQuestions.math.gen();
    showMathQuestion(q);
  } else {
    try {
      const q = await fetchAIQuestion('math','medium');
      showMathQuestion(q);
    } catch(err){
      document.getElementById('mathFeedback').innerText = 'Erro IA: '+err.message;
    }
  }
}
function showMathQuestion(q){
  document.getElementById('mathTitle').innerText = q.title || 'Matemática';
  document.getElementById('mathExplain').innerText = q.explain || '';
  document.getElementById('mathQuestion').innerText = q.question || '—';
  // store current expected answer
  window._currentMathAnswer = q.answer;
  document.getElementById('mathFeedback').innerText = '';
}
document.getElementById('newMath').addEventListener('click', newMathQuestion);

document.getElementById('checkMath').addEventListener('click', ()=>{
  const ans = document.getElementById('mathAnswer').value.trim();
  const fb = document.getElementById('mathFeedback');
  if(!ans){ fb.innerText = 'Digite uma resposta.'; return; }
  const expected = String(window._currentMathAnswer).replace(/\s+/g,'').toLowerCase();
  if(ans.replace(/\s+/g,'').toLowerCase() === expected){
    fb.innerText = '✔ Correto!';
    state.score += 10;
    state.progress.lastModule = 'Matemática';
    saveState();
    triggerCat('celebrate');
  } else {
    fb.innerText = '✖ Incorreto — resposta: ' + window._currentMathAnswer;
    triggerCat('sad');
  }
});

/* ---------- LÓGICA ---------- */
async function newLogicQuestion(){
  document.getElementById('logicFeedback').innerText = 'Carregando...';
  if(currentMode()==='auto'){
    const q = AutoQuestions.logic.gen();
    showLogic(q);
  } else {
    try{ const q = await fetchAIQuestion('logic','medium'); showLogic(q); } catch(e){ document.getElementById('logicFeedback').innerText = 'Erro IA'; }
  }
}
function showLogic(q){
  document.getElementById('logicExplain').innerText = q.explain || '';
  document.getElementById('logicQuestion').innerText = q.question || '';
  window._currentLogicAnswer = q.answer;
  document.getElementById('logicFeedback').innerText = '';
}
document.getElementById('newLogic').addEventListener('click', newLogicQuestion);
document.getElementById('checkLogic').addEventListener('click', ()=>{
  const ans = document.getElementById('logicAnswer').value.trim().toLowerCase();
  const fb = document.getElementById('logicFeedback');
  if(!ans){ fb.innerText='Digite resposta.'; return; }
  if(String(ans) === String(window._currentLogicAnswer).toLowerCase()){
    fb.innerText='✔ Correto!'; state.score += 8; state.progress.lastModule='Lógica'; saveState(); triggerCat('celebrate');
  } else { fb.innerText='✖ Incorreto. Resposta: '+window._currentLogicAnswer; triggerCat('sad'); }
});

/* ---------- WEB ---------- */
async function newWebQuestion(){
  document.getElementById('webFeedback').innerText = 'Carregando...';
  if(currentMode()==='auto'){
    const q = AutoQuestions.web.gen();
    showWeb(q);
  } else {
    try{ const q = await fetchAIQuestion('web','medium'); showWeb(q); } catch(e){ document.getElementById('webFeedback').innerText='Erro IA'; }
  }
}
function showWeb(q){
  document.getElementById('webExplain').innerText = q.explain || '';
  document.getElementById('webQuestion').innerText = q.question || '';
  const area = document.getElementById('webOptions'); area.innerHTML='';
  if(q.choices && Array.isArray(q.choices)){
    q.choices.forEach(choice=>{
      const btn = document.createElement('button'); btn.className='btn'; btn.innerText = choice;
      btn.onclick = ()=> {
        if(String(choice) === String(q.answer)) {
          document.getElementById('webFeedback').innerText = '✔ Correto!'; state.score += 12; state.progress.lastModule='HTML/CSS'; saveState(); triggerCat('celebrate');
        } else {
          document.getElementById('webFeedback').innerText = '✖ Incorreto. Resposta: '+q.answer; triggerCat('sad');
        }
      };
      area.appendChild(btn);
    });
  } else {
    // open answer input
    const input = document.createElement('input'); input.placeholder='Resposta';
    const chk = document.createElement('button'); chk.className='btn primary'; chk.innerText='Verificar';
    chk.onclick = ()=> {
      if(input.value.trim().toLowerCase() === String(q.answer).toLowerCase()){
        document.getElementById('webFeedback').innerText='✔ Correto!'; state.score+=12; saveState(); triggerCat('celebrate');
      } else { document.getElementById('webFeedback').innerText='✖ Incorreto.'; triggerCat('sad'); }
    };
    const area2 = document.getElementById('webOptions'); area2.innerHTML=''; area2.appendChild(input); area2.appendChild(chk);
  }
  window._currentWebAnswer = q.answer;
  document.getElementById('webFeedback').innerText = '';
}
document.getElementById('newWeb').addEventListener('click', newWebQuestion);

/* ---------- Catatal reactions ---------- */
function triggerCat(stateName){
  const hero = document.getElementById('catatalHero');
  if(stateName==='celebrate'){ hero.src = 'catatal/celebrate.png'; setTimeout(()=>hero.src='catatal/normal.png',1500);}
  if(stateName==='sad'){ hero.src = 'catatal/sad.png'; setTimeout(()=>hero.src='catatal/normal.png',1500);}
  if(stateName==='explain'){ hero.src = 'catatal/explaining.png'; setTimeout(()=>hero.src='catatal/normal.png',2500);}
}

/* ---------- Export / Import progress ---------- */
document.getElementById('exportProgress').addEventListener('click', ()=>{
  const data = {score: state.score, progress: state.progress};
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='progress.json'; a.click(); URL.revokeObjectURL(url);
});

/* ---------- Init ---------- */
updateUI();
// attach a first auto-question for demo:
newMathQuestion();
newLogicQuestion();
newWebQuestion();
