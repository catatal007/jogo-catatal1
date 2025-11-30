    // Fallback generator (inline)
    function autoGen(subject){
      if(subject === 'logic'){
        const start = Math.floor(Math.random()*5)+1;
        const seq = [start, start*2, start*4];
        return { title:'Sequência', explain:'Multiplique por 2', question:`Complete: ${seq.join(', ')}, __`, answer:String(seq[2]*2) };
      }
      if(subject === 'web'){
        return { title:'Tag HTML', explain:'Use <p> para parágrafo', question:'Qual tag cria um parágrafo?', choices:['<div>','<p>','<h1>'], answer:'<p>' };
      }
      // default math
      const a = Math.floor(Math.random()*20);
      const b = Math.floor(Math.random()*20);
      return { title:'Soma', explain:'Soma de dois números', question:`Quanto é ${a} + ${b}?`, answer:String(a+b) };
    }
    const q = autoGen(subject);
    return { statusCode:200, body:JSON.stringify(q) };
