/* Gerador de perguntas offline para cada área */
const AutoQuestions = {
  math: {
    gen() {
      const type = Math.floor(Math.random()*4);
      if(type===0){
        let a = Math.floor(Math.random()*50);
        let b = Math.floor(Math.random()*50);
        return {
          title: `Soma`,
          explain: `A soma é a operação de adicionar dois números.`,
          question: `Quanto é ${a} + ${b}?`,
          answer: String(a+b)
        };
      } else if(type===1){
        let a = Math.floor(Math.random()*10)+1;
        let x = Math.floor(Math.random()*10);
        const b = a*x;
        return {
          title: `Equação linear`,
          explain: `Resolva para x na equação ax = b.`,
          question: `Resolva: ${a}x = ${b}. Qual é x?`,
          answer: String(x)
        };
      } else if(type===2){
        let r1 = Math.floor(Math.random()*10)+1;
        let r2 = Math.floor(Math.random()*10)+1;
        const B = -(r1 + r2);
        const C = r1 * r2;
        return {
          title: `Quadrática`,
          explain: `Fatore a expressão e encontre as raízes.`,
          question: `Encontre as raízes de f(x)=x² + (${B})x + (${C}).`,
          answer: `${r1},${r2}`
        };
      } else {
        let a = Math.floor(Math.random()*10)+1;
        let b = Math.floor(Math.random()*10)+1;
        return {
          title: `Potência`,
          explain: `Calcule a potência indicada.`,
          question: `Quanto é ${a}² + ${b}² ?`,
          answer: String(a*a + b*b)
        };
      }
    }
  },

  logic: {
    gen() {
      const type = Math.floor(Math.random()*2);
      if(type===0){
        let start = Math.floor(Math.random()*5)+1;
        let seq = [start, start*2, start*4, start*8];
        return {
          title:'Sequência',
          explain:'Observe o padrão de multiplicação por 2.',
          question: `Complete: ${seq.join(', ')}, __`,
          answer: String(seq[3]*2)
        };
      } else {
        const a = Math.random() < 0.5;
        const b = Math.random() < 0.5;
        return {
          title:'Lógica booleana',
          explain:'Avalie a expressão lógica com AND/OR.',
          question: `Se A = ${a}, B = ${b}, qual é A && B ? (true/false)`,
          answer: String(a && b)
        };
      }
    }
  },

  web: {
    gen() {
      const items = [
        {
          title:'Tag HTML',
          explain:'&lt;p&gt; é a tag de parágrafo.',
          question:'Qual tag cria um parágrafo?',
          choices:['<div>','<p>','<h1>'],
          answer:'<p>'
        },
        {
          title:'Propriedade CSS',
          explain:'A propriedade <code>color</code> muda a cor do texto.',
          question:'Qual propriedade muda a cor do texto?',
          choices:['background','color','margin'],
          answer:'color'
        }
      ];
      return items[Math.floor(Math.random()*items.length)];
    }
  }
};
