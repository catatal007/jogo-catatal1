/* script.js - front app */
let state = { score: Number(localStorage.getItem('cma_score')||0), progress: JSON.parse(localStorage.getItem('cma_progress')||'{}') };

function saveState(){ localStorage.setItem('cma_score', String(state.score)); localStorage.setItem('cma_progress', JSON.stringify(state.progress)); updateUI(); }
function updateUI(){ document.getElementById('score').innerText = state.score; document.getElementById('lastModule').innerText = state.progress.lastModule || '—'; }

// Navigation
document.querySelectorAll('.navbtn').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.navbtn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('visible'));
    document.getElementById('screen-'+b.dataset.screen).classList.add('visible');
  });
});
document.getElementById('startMath').addEventListener('click', ()=> document.querySelector('[data-screen="math"]').click());
document.getElementById('startLogic').addEventListener('click', ()=> document.querySelector('[data-screen="logic"]').click());
document.getElementById('startWeb').addEventListener('click', ()=> document.querySelector('[data-screen="web"]').click());

// mode helper
function currentMode(){ return document.getElementById('modeSelect').value; }

// Math
async function newMathQuestion(){
  document.getElementById('mathFeedback').innerText = 'Carregando...';
  if(currentMode() === 'auto'){
    const q = AutoQuestions.math.gen();
    showMathQuestion(q);
  } else {
    try {
      const q = await fetch('/.netlify/functions/gerarPergunta', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({subject:'math', useAI:true})
      }).then(r=>r.json());
      showMathQuestion(q);
    } catch(e){ document.getElementById('mathFeedback').innerText = 'Erro IA: '+e.message; }
  }
}
function showMathQuestion(q){
  document.getElementById('mathTitle').innerText = q.title || 'Matemática';
  document.getElementById('mathExplain').innerText = q.explain || '';
  document.getElementById('mathQuestion').innerText = q.question || '';
  window._currentMathAnswer = String(q.answer || '').trim();
  document.getElementById('mathFeedback').innerText = '';
}
document.getElementById('newMath').addEventListener('click', newMathQuestion);
document.getElementById('checkMath').addEventListener('click', ()=>{
  const ans = document.getElementById('mathAnswer').value.trim();
  const fb = document.getElementById('mathFeedback');
  if(!ans){ fb.innerText='Digite uma resposta.'; return; }
  if(ans.replace(/\s+/g,'').toLowerCase() === window._currentMathAnswer.replace(/\s+/g,'').toLowerCase()){
    fb.innerText='✔ Correto!'; state.score += 10; state.progress.lastModule='Matemática'; saveState(); triggerCat('celebrate');
  } else { fb.innerText='✖ Incorreto. Resposta: '+window._currentMathAnswer; triggerCat('sad'); }
});

// Logic
async function newLogicQuestion(){
  document.getElementById('logicFeedback').innerText = 'Carregando...';
  if(currentMode()==='auto'){ showLogic(AutoQuestions.logic.gen()); }
  else {
    try{ const q=await fetch('/.netlify/functions/gerarPergunta', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject:'logic',useAI:true})}).then(r=>r.json()); showLogic(q); } catch(e){ document.getElementById('logicFeedback').innerText='Erro IA'; }
  }
}
function showLogic(q){ document.getElementById('logicExplain').innerText = q.explain || ''; document.getElementById('logicQuestion').innerText = q.question || ''; window._currentLogicAnswer = String(q.answer||''); document.getElementById('logicFeedback').innerText = ''; }
document.getElementById('newLogic').addEventListener('click', newLogicQuestion);
document.getElementById('checkLogic').addEventListener('click', ()=>{
  const ans = document.getElementById('logicAnswer').value.trim().toLowerCase();
  const fb = document.getElementById('logicFeedback');
  if(!ans){ fb.innerText='Digite resposta.'; return; }
  if(ans === String(window._currentLogicAnswer).toLowerCase()){ fb.innerText='✔ Correto!'; state.score += 8; state.progress.lastModule='Lógica'; saveState(); triggerCat('celebrate'); } else { fb.innerText='✖ Incorreto. Resposta: '+window._currentLogicAnswer; triggerCat('sad'); }
});

// Web
async function newWebQuestion(){
  document.getElementById('webFeedback').innerText = 'Carregando...';
  if(currentMode()==='auto'){ showWeb(AutoQuestions.web.gen()); }
  else {
    try{ const q=await fetch('/.netlify/functions/gerarPergunta', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject:'web',useAI:true})}).then(r=>r.json()); showWeb(q); } catch(e){ document.getElementById('webFeedback').innerText='Erro IA'; }
  }
}
function showWeb(q){
  document.getElementById('webExplain').innerText = q.explain || '';
  document.getElementById('webQuestion').innerText = q.question || '';
  const area = document.getElementById('webOptions'); area.innerHTML='';
  if(q.choices && Array.isArray(q.choices)){
    q.choices.forEach(choice=>{
      const btn = document.createElement('button'); btn.className='btn'; btn.innerText = choice;
      btn.onclick = ()=>{
        if(String(choice) === String(q.answer)){ document.getElementById('webFeedback').innerText='✔ Correto!'; state.score += 12; state.progress.lastModule='HTML/CSS'; saveState(); triggerCat('celebrate'); }
        else { document.getElementById('webFeedback').innerText='✖ Incorreto. Resposta: '+q.answer; triggerCat('sad'); }
      };
      area.appendChild(btn);
    });
  } else {
    const input = document.createElement('input'); input.placeholder='Resposta';
    const chk = document.createElement('button'); chk.className='btn primary'; chk.innerText='Verificar';
    chk.onclick = ()=>{
      if(input.value.trim().toLowerCase() === String(q.answer).toLowerCase()){ document.getElementById('webFeedback').innerText='✔ Correto!'; state.score += 12; saveState(); triggerCat('celebrate'); }
      else { document.getElementById('webFeedback').innerText='✖ Incorreto.'; triggerCat('sad'); }
    };
    const area2 = document.getElementById('webOptions'); area2.innerHTML=''; area2.appendChild(input); area2.appendChild(chk);
  }
  window._currentWebAnswer = q.answer;
  document.getElementById('webFeedback').innerText = '';
}
document.getElementById('newWeb').addEventListener('click', newWebQuestion);

// Catatal reactions
function triggerCat(stateName){
  const hero = document.getElementById('catatalHero');
  if(!hero) return;
  if(stateName==='celebrate'){ hero.src = 'catatal/celebrate.png'; setTimeout(()=>hero.src='catatal/normal.png',1500); }
  if(stateName==='sad'){ hero.src = 'catatal/sad.png'; setTimeout(()=>hero.src='catatal/normal.png',1500); }
  if(stateName==='explain'){ hero.src = 'catatal/explaining.png'; setTimeout(()=>hero.src='catatal/normal.png',2500); }
}

// Export progress
document.getElementById('exportProgress').addEventListener('click', ()=>{
  const data = {score:state.score, progress:state.progress};
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download='progress.json'; a.click();
});

// init
updateUI();
newMathQuestion();
newLogicQuestion();
newWebQuestion();
