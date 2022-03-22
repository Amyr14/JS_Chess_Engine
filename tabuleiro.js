
import {
  movimentosBispo,
  movimentosCavalo,
  movimentosPeao,
  movimentosRei,
  movimentosRainha,
  movimentosTorre,
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
  brancas: [],
  pretas: [],
  posReiBranco: [0, 4],
  posReiPreto: [7, 4],
  brancoEmCheque : false,
  pretoEmCheque : false,
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
    const reiBranco = peca.tipo === 6 && peca.cor === 1
    const reiPreto = peca.tipo === 6 && peca.cor === 2
    if (reiBranco) this.posReiBranco = posFinal
    else if (reiPreto) this.posReiPreto = posFinal
    alvo.tipo = peca.tipo;
    alvo.cor = peca.cor;
    alvo.seMexeu = true;
    peca.tipo = 0;
    peca.cor = 0;
    peca.seMexeu = false;
  },
  
  ehPosOcupada(posicao) {
    const x = posicao[0];
    const y = posicao[1];
    return this.matriz[x][y].tipo !== 0;
  },

  getCorDaPeca(posicao) {
    const x = posicao[0];
    const y = posicao[1];
    return this.matriz[x][y].cor;
  },

  colDescCasas(casas, colOuDesc) {
    const operacao =
      colOuDesc === "colorir"
        ? (celula) => celula.classList.add("movimento")
        : (celula) => celula.classList.remove("movimento");
    for (let i = 0; i < casas.length; i++) {
      const x = casas[i][0].toString();
      const y = casas[i][1].toString();
      const id = x + y;
      const celula = document.getElementById(id);
      operacao(celula);
    }
  },

  calcMovValidos(posicao) {
    const x = posicao[0];
    const y = posicao[1];
    const peca = this.matriz[x][y];
    if (peca.tipo === 1) return movimentosPeao(posicao, cor, peca.seMexeu, this.matriz);
    if (peca.tipo === 2) return movimentosTorre(posicao, cor, this.matriz);
    if (peca.tipo === 3) return movimentosCavalo(posicao, cor, this.matriz);
    if (peca.tipo === 4) return movimentosBispo(posicao, cor, this.matriz);
    if (peca.tipo === 5) return movimentosRainha(posicao, cor, this.matriz);
    if (peca.tipo === 6) return movimentosRei(posicao, cor, this.matriz);
  },

  setZonaPerigo(cor) {
    let zonaDePerigo = [];
    const pecasAdv = cor === 1 ? this.pretas : this.brancas;
    for (let i = 0; i < 16; i++) {
      if (pecasAdv[i].tipo === 0) continue;
      const posicao = [pecasAdv[i].x, pecasAdv[i].y];
      const movValidos = this.calcMovValidos(posicao);
      zonaDePerigo.push(...movValidos);
    }
    cor === 1
      ? (this.perigoBrancas = zonaDePerigo)
      : (this.perigoPretas = zonaDePerigo);
  },

  setReiEmCheque(cor) {
    switch (cor) {
      case 1:
        this.brancoEmCheque = isArrayInArray(this.posReiBranco, this.perigoBrancas)
        break
      case 2:
        this.pretoEmCheque = isArrayInArray(this.posReiPreto, this.perigoPretas)
        break
    }
  },

  chequeMate(cor) {
    let chequeMate
    switch (cor){
      case 1:
          chequeMate = calcMovValidos(this.posReiBranco) === []
          break
      case 2:
          chequeMate = calcMovValidos(this.posReiPreto) === []
    }
    return chequeMate
  }
}


for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    if (i > 1 && i < 6) continue
    else if (i < 2) Tabuleiro.brancas.push(matriz[i][j])
    else if (i > 5) Tabuleiro.pretas.push(matriz[i][j])
  }
}

export default Tabuleiro