
import {
  movimentosBispo,
  movimentosCavalo,
  movimentosPeao,
  movimentosRei,
  movimentosRainha,
  movimentosTorre,
  diagonaisPeao,
  isArrayInArray
} from "./funcoes.js"

class Peca {
  constructor(tipo, x, y, cor) {
    this.tipo = tipo
    this.x = x
    this.y = y
    this.cor = cor
  }
  seMexeu = false
}

const matriz = []
for (let i = 0; i < 8; i++) {
  const linha = []
  let cor = 0
  if (i < 2) cor = 1
  else if (i > 5) cor = 2
  for (let j = 0; j < 8; j++) {
    let peca = {}
    if (i > 1 && i < 6) peca = new Peca(0, 0, 0, 0)
    else if (i === 1 || i === 6) peca = new Peca(1, i, j, cor)
    else if (j < 5) peca = new Peca(j + 2, i, j, cor)
    else if (j >= 5) peca = new Peca(9 - j, i, j, cor)
    linha.push(peca)
  }
  matriz.push(linha)
}


const Tabuleiro = {
  posReiBranco: [0, 4],
  posReiPreto: [7, 4],
  brancoEmCheque: false,
  pretoEmCheque: false,
  perigoBrancas: [],
  perigoPretas: [],
  matriz: matriz,

  moverPecas(posInicial, posFinal) {
    const xInicial = posInicial[0];
    const yInicial = posInicial[1];
    const xFinal = posFinal[0];
    const yFinal = posFinal[1];
    const peca = this.matriz[xInicial][yInicial];
    const alvo = this.matriz[xFinal][yFinal];
    const reiBranco = peca.tipo === 6 && peca.cor === 1;
    const reiPreto = peca.tipo === 6 && peca.cor === 2;
    if (reiBranco) this.posReiBranco = posFinal;
    else if (reiPreto) this.posReiPreto = posFinal;
    alvo.tipo = peca.tipo;
    alvo.cor = peca.cor;
    alvo.seMexeu = true;
    peca.tipo = 0;
    peca.cor = 0;
    peca.seMexeu = false;
  },

  tipoDaPeca(posicao) {
    const x = posicao[0];
    const y = posicao[1];
    return this.matriz[x][y].tipo;
  },

  corDaPeca(posicao) {
    const x = posicao[0];
    const y = posicao[1];
    return this.matriz[x][y].cor;
  },

  colDescCasas(casas, colOuDesc) {
    const operacao =
      colOuDesc === "colorir"
        ? (celula) => celula.classList.add("movimento")
        : (celula) => celula.classList.remove("movimento")
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
    if (peca.tipo === 1)
      return movimentosPeao(posicao, this.matriz)
    if (peca.tipo === 2) return movimentosTorre(posicao, this.matriz)
    if (peca.tipo === 3) return movimentosCavalo(posicao, this.matriz)
    if (peca.tipo === 4) return movimentosBispo(posicao, this.matriz)
    if (peca.tipo === 5) return movimentosRainha(posicao, this.matriz)
    if (peca.tipo === 6 && peca.cor === 1)
      return movimentosRei(posicao, this.matriz, this.perigoBrancas)
    if (peca.tipo === 6 && peca.cor === 2)
      return movimentosRei(posicao, this.matriz, this.perigoPretas)
  },

  reiEmCheque(cor) {
    let reiEmCheque
    switch (cor) {
      case 1:
        reiEmCheque = isArrayInArray(this.perigoBrancas, this.posReiBranco)
        break
      case 2:
        reiEmCheque = isArrayInArray(this.perigoPretas, this.posReiPreto)
        break
    }
    return reiEmCheque
  },

  reiSemMov(cor) {
    let reiSemMov
    switch (cor) {
      case 1:
        reiSemMov = this.movValidos(this.posReiBranco).length === 0
        break
      case 2:
        reiSemMov = this.movValidos(this.posReiPreto).length === 0
        break
    }
    return reiSemMov
  },

  setZonaPerigo(cor) {
    const zonaDePerigo = []
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
        const posicao = this.matriz[i][j]
        const corDif = posicao.cor !== cor
        const posValida = posicao.tipo !== 0 && corDif
        const peao = posicao.tipo === 1 && corDif
        if (posValida && peao)
          zonaDePerigo.push(...diagonaisPeao([i, j], this.matriz))
        else if (posValida) zonaDePerigo.push(...this.movValidos([i, j]))
      }
    cor === 1
      ? (this.perigoBrancas = zonaDePerigo)
      : (this.perigoPretas = zonaDePerigo)
  },

  verifPromocao(cor) {
    const branca = cor === 1
    let podePromover = false
    let linha
    if (branca) linha = 7
    else linha = 0
    for(let col = 0; col < 8; col++) {
      const posicao = this.matriz[linha][col]
      const peaoNaPos = posicao.tipo === 1 && posicao.cor === cor
      if (peaoNaPos) {
        podePromover = true
        break
      }
    }
    return podePromover
  }
}

export default Tabuleiro