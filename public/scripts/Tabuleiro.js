import {
  movimentosBispo,
  movimentosCavalo,
  movimentosPeao,
  movimentosRei,
  movimentosRainha,
  movimentosTorre,
  isArrayInArray,
  zonaDePerigo,
} from "./funcoes.js"

import { matriz, Peca } from "./matriz.js"


const Tabuleiro = {
  posReiBranco: [0, 3],
  posReiPreto: [7, 3],
  posPromo: [],
  brancoEmCheque: false,
  pretoEmCheque: false,
  matriz: matriz,

  moverPecas(posInicial, posFinal) {
    const xInicial = posInicial[0]
    const yInicial = posInicial[1]
    const xFinal = posFinal[0]
    const yFinal = posFinal[1]
    const peca = this.matriz[xInicial][yInicial]
    const alvo = this.matriz[xFinal][yFinal]
    const reiBranco = peca.tipo === 6 && peca.cor === 1
    const reiPreto = peca.tipo === 6 && peca.cor === 2
    if (reiBranco) this.posReiBranco = posFinal
    else if (reiPreto) this.posReiPreto = posFinal
    alvo.tipo = peca.tipo
    alvo.cor = peca.cor
    alvo.seMexeu = true
    peca.tipo = 0
    peca.cor = 0
    peca.seMexeu = false
  },

  tipoDaPeca(posicao) {
    const x = posicao[0]
    const y = posicao[1]
    return this.matriz[x][y].tipo
  },

  corDaPeca(posicao) {
    const x = posicao[0]
    const y = posicao[1]
    return this.matriz[x][y].cor
  },

  colDescCasas(casas, colOuDesc) {
    if (casas.length === 0) return
    let operacao
    if (colOuDesc === "colorir") {
      operacao = (celula) => {
        celula.className === "branca"
          ? celula.classList.add("movimentoBranca")
          : celula.classList.add("movimentoPreta")
      }
    } else if (colOuDesc === "descolorir") {
      operacao = (celula) => {
        celula.classList.contains("branca")
          ? celula.classList.remove("movimentoBranca")
          : celula.classList.remove("movimentoPreta")
      }
    }
    for (let i = 0; i < casas.length; i++) {
      const x = casas[i][0].toString()
      const y = casas[i][1].toString()
      const id = x + y
      const celula = document.getElementById(id)
      operacao(celula)
    }
  },

  movValidos(posicao) {
    const x = posicao[0]
    const y = posicao[1]
    const peca = this.matriz[x][y]
    const movimentos = []
    let ehRei = false
    switch (peca.tipo) {
      case 1:
        movimentos.push(...movimentosPeao(posicao, this.matriz))
        break
      case 2:
        movimentos.push(...movimentosTorre(posicao, this.matriz))
        break
      case 3:
        movimentos.push(...movimentosCavalo(posicao, this.matriz))
        break
      case 4:
        movimentos.push(...movimentosBispo(posicao, this.matriz))
        break
      case 5:
        movimentos.push(...movimentosRainha(posicao, this.matriz))
        break
      case 6:
        movimentos.push(...movimentosRei(posicao, this.matriz))
        ehRei = true
        break
    }

    const movValidos = movimentos.filter((posFinal) =>
      this.movEhPossivel(posicao, posFinal, ehRei)
    )
    return movValidos
  },

  movEhPossivel(posInicial, posFinal, ehRei) {
    const copia = this.copiaTabuleiro()
    const x = posInicial[0]
    const y = posInicial[1]
    const xFinal = posFinal[0]
    const yFinal = posFinal[1]
    const peca = copia[x][y]
    const cor = peca.cor
    const alvo = copia[xFinal][yFinal]
    const posRei = peca.cor === 1 ? this.posReiBranco : this.posReiPreto
    if (ehRei) {
      const perigo = zonaDePerigo(peca.cor, copia)
      return !isArrayInArray(perigo, posFinal)
    }
    alvo.tipo = peca.tipo
    alvo.cor = peca.cor
    alvo.seMexeu = peca.seMexeu
    peca.cor = 0
    peca.tipo = 0
    peca.seMexeu = false
    const perigo = zonaDePerigo(cor, copia)
    return !isArrayInArray(perigo, posRei)
  },

  copiaTabuleiro() {
    const copia = []
    for (let i = 0; i < 8; i++) {
      const linha = []
      for (let j = 0; j < 8; j++) {
        let peca = new Peca(0, 0)
        peca.tipo = this.matriz[i][j].tipo
        peca.cor = this.matriz[i][j].cor
        peca.seMexeu = this.matriz[i][j].seMexeu
        linha.push(peca)
      }
      copia.push(linha)
    }
    return copia
  },

  podePromover(cor) {
    const linha = cor === 1 ? 7 : 0
    for (let i = 0; i < 8; i++) {
      const peca = this.matriz[linha][i]
      if (peca.tipo === 1 && peca.cor === cor) {
        this.posPromo = [linha, i]
        return true
      }
    }
    return false
  },

  promover(tipo) {
    const x = this.posPromo[0]
    const y = this.posPromo[1]
    this.matriz[x][y].tipo = tipo
    this.posPromo = []
  },
}
export default Tabuleiro
