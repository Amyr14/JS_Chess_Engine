
import { isArrayInArray } from "./funcoes.js"
import Tabuleiro from "./Tabuleiro.js"
import GUI from "./GUI.js"
import Jogo from "./Jogo.js"

GUI.renderizarTabuleiro()

for (let i = 0; i < 8; i++) {             
  for (let j = 0; j < 8; j++) {               
    const id = i.toString() + j.toString()
    const cell = document.getElementById(id)
    cell.onclick = clique
  }
}

function clique() {   
  const celula = this
  const x = parseInt(celula.id[0])
  const y = parseInt(celula.id[1])
  const posClicada = [x, y]
  const corJogando = Jogo.cor
  const corDif = Tabuleiro.corDaPeca( posClicada ) !== corJogando
  const corIgual = !corDif
  const casaVazia = Tabuleiro.tipoDaPeca( posClicada ) === 0
  const tomouPeca = !casaVazia
  const primClique = !Jogo.pecaSelec
  const segClique = !primClique
  const movValido = isArrayInArray(Jogo.movValidos, posClicada)

  if ( primClique && (corDif || casaVazia || Jogo.esperandoPromo) ) return
  else if ( primClique || (segClique && corIgual) ) Jogo.prepMovimento(posClicada, celula)
  else if ( segClique && movValido ) { 
    Jogo.movRealizado(posClicada, tomouPeca, celula)
    if ( Tabuleiro.podePromover(Jogo.cor) ) { 
      GUI.rendPromoGUI(Jogo.cor) 
      Jogo.esperandoPromo = true 
    }
    else Jogo.trocarCor()
  }
  else Jogo.valoresDefault()
}  



