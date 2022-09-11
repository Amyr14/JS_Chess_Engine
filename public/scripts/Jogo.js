import Tabuleiro from "./Tabuleiro.js"

const Jogo = {
  cor: 1,
  posInicial: [],
  movValidos: [],
  imgDaPeca: null,
  pecaSelec: false,
  esperandoPromo: false,

  prepMovimento(posClicada, celula) {
    Tabuleiro.colDescCasas(this.movValidos, "descolorir")
    this.pecaSelec = true
    this.posInicial = posClicada
    this.movValidos = Tabuleiro.movValidos(posClicada)
    this.imgDaPeca = celula.firstChild
    Tabuleiro.colDescCasas(this.movValidos, "colorir")
  },

  valoresDefault() {
    Tabuleiro.colDescCasas(this.movValidos, "descolorir")
    this.posInicial = []
    this.movValidos = []
    this.imgDaPeca = null
    this.pecaSelec = false
    this.esperandoPromo = false
  },

  movRealizado(posClicada, tomouPeca, celula) {
    if (tomouPeca) celula.removeChild(celula.firstChild)
    celula.appendChild(this.imgDaPeca)
    Tabuleiro.moverPecas(this.posInicial, posClicada)
    this.valoresDefault()
  },

  trocarCor() {
    this.cor = this.cor === 1 ? 2 : 1
  },
}


export default Jogo
