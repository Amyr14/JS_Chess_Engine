
import Tabuleiro from "./Tabuleiro.js"
import { isArrayInArray } from "./funcoes.js"

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const id = i.toString() + j.toString()
    const cell = document.getElementById(id)
    cell.onclick = clique
  }
}

Tabuleiro.setZonaPerigo(1)
Tabuleiro.setZonaPerigo(2)

let cor = 1
let posInicial = []
let posFinal = []
let movValidos = []
let imgDaPeca = null
let emCheque = false

function valoresDefault(){
  Tabuleiro.colDescCasas(movValidos, "descolorir")
  posInicial = []
  posFinal = []
  movValidos = []
  imgDaPeca = null
}

function clique() {
  const celula = this
  const coordX = parseInt(celula.id[0])
  const coordY = parseInt(celula.id[1])
  const posClicada = [coordX, coordY]
  const corJogando = cor
  const corDiferente = Tabuleiro.corDaPeca(posClicada) !== corJogando
  const casaVazia = Tabuleiro.tipoDaPeca(posClicada) === 0
  const posEstaOcupada = !casaVazia
  const pecaNaoEhRei = Tabuleiro.tipoDaPeca(posClicada) !== 6
  const reiSemMov = Tabuleiro.reiSemMov(corJogando)
  const primeiroClique = posInicial.length === 0
  const segundoClique = !primeiroClique

  if (primeiroClique) {
     if (corDiferente || casaVazia) return 
     if (emCheque && reiSemMov) return alert("Cheque Mate!")
     if (emCheque && pecaNaoEhRei) return alert("Rei está em cheque!")
     posInicial = posClicada
     movValidos = Tabuleiro.movValidos(posInicial)
     Tabuleiro.colDescCasas(movValidos, "colorir")
     imgDaPeca = celula.firstChild
  } else if (segundoClique) {
     posFinal = posClicada
     const movInvalido = !isArrayInArray(movValidos, posFinal)
     if (movInvalido) { valoresDefault(); return }
     if (posEstaOcupada) celula.firstChild.remove()
     celula.appendChild(imgDaPeca)
     Tabuleiro.moverPecas(posInicial, posFinal)
     valoresDefault()
     cor = cor === 1 ? 2 : 1
     Tabuleiro.setZonaPerigo(cor)
     emCheque = Tabuleiro.reiEmCheque(cor)
  }
}  



