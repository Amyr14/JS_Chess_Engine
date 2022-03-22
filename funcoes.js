
function isArrayInArray(arr, item) {
  var itemAsString = JSON.stringify(item)
  var contains = arr.some(function (ele) {
    return JSON.stringify(ele) === itemAsString
  })
  return contains
}

function movEixoDiag(posInicial, cor, tabuleiro, tipo) {
  const x = posInicial[0]
  const y = posInicial[1]
  const pecaBranca = cor === 1
  const pecaPreta = cor === 2
  const movimentos = []
  let i = 1
  let iterar = true
  while (i < 8 && iterar) {
    let movX, movY
    if (tipo === "diagPrincCima") {
      movX = x + i
      movY = y + i
    } else if (tipo === "diagPrincBaixo") {
      movX = x - i
      movY = y - i
    } else if (tipo === "diagSecCima") {
      movX = x + i
      movY = y - i
    } else if (tipo === "diagSecBaixo") {
      movX = x - i
      movY = y + i
    } else if (tipo === "Cima") {
      movX = x + i
      movY = y
    } else if (tipo === "Baixo") {
      movX = x - i
      movY = y
    } else if (tipo === "Direita") {
      movX = x
      movY = y + i
    } else if (tipo === "Esquerda") {
      movX = x
      movY = y - i
    }
    const dentroDoTabuleiro = !(movX > 7 || movY > 7 || movX < 0 || movY < 0)
    if (dentroDoTabuleiro) {
      const posAtual = [movX, movY]
      const refDaPosAtual = tabuleiro[movX][movY]
      const posVazia = refDaPosAtual.tipo === 0
      const brancaNaPos = refDaPosAtual.cor === 1
      const pretaNaPos = refDaPosAtual.cor === 2
      const posPecaAdversaria = (pecaBranca && pretaNaPos) || (pecaPreta && brancaNaPos)
      const pecaDaMesmaCor = (pecaBranca && brancaNaPos) || (pecaPreta && pretaNaPos)
      if (posVazia) movimentos.push(posAtual)
      else if (pecaDaMesmaCor) iterar = false
      else if (posPecaAdversaria) {
        movimentos.push(posAtual)
        iterar = false
      }
    } else iterar = false
    i++
  }
  return movimentos
}

  function movimentosPeao(posInicial, peca, tabuleiro) {
    const x = posInicial[0];
    const y = posInicial[1];
    const movimentos = [];
    const naoSeMexeu = !peca.seMexeu;
    const branca = peca.cor === 1;
    if (branca) {
      const cima = tabuleiro[x + 1][y];
      const diagDir = tabuleiro[x + 1][y + 1];
      const diagEsq = tabuleiro[x + 1][y - 1];
      const doisPassos = tabuleiro[x + 2][y];
      if (diagDir !== undefined && diagDir.cor === 2)
        movimentos.push([x + 1, y + 1]);
      if (diagEsq !== undefined && diagEsq.cor === 2)
        movimentos.push([x + 1, y - 1]);
      if (cima !== undefined && cima.tipo === 0) {
        movimentos.push([x + 1, y]);
        if (doisPassos !== undefined && doisPassos.tipo === 0 && naoSeMexeu)
          movimentos.push([x + 2, y]);
      }
    } else {
      const cima = tabuleiro[x - 1][y];
      const diagDir = tabuleiro[x - 1][y + 1];
      const diagEsq = tabuleiro[x - 1][y - 1];
      const doisPassos = tabuleiro[x - 2][y];
      if (diagDir !== undefined && diagDir.cor === 1)
        movimentos.push([x - 1, y + 1]);
      if (diagEsq !== undefined && diagEsq.cor === 1)
        movimentos.push([x - 1, y - 1]);
      if (cima !== undefined && cima.tipo === 0) {
        movimentos.push([x - 1, y]);
        if (doisPassos !== undefined && doisPassos.tipo === 0 && naoSeMexeu)
          movimentos.push([x - 2, y]);
      }
    }
    return movimentos;
  }

 function movimentosRainha(posInicial, peca, tabuleiro) {
   const movimentos = [];
   const cor = peca.cor;
   const direcoes = [
     "Cima",
     "Baixo",
     "Esquerda",
     "Direita",
     "diagPrincCima",
     "diagPrincBaixo",
     "diagSecCima",
     "diagSecBaixo",
   ];
   for (let i = 0; i < 8; i++)
     movimentos.push(...movEixoDiag(posInicial, cor, tabuleiro, direcoes[i]));
   return movimentos;
 }

 function movimentosBispo(posInicial, peca, tabuleiro) {
   const movimentos = [];
   const cor = peca.cor;
   const direcoes = [
     "diagPrincCima",
     "diagPrincBaixo",
     "diagSecCima",
     "diagSecBaixo",
   ];
   for (let i = 0; i < 4; i++)
     movimentos.push(...movEixoDiag(posInicial, cor, tabuleiro, direcoes[i]));
   return movimentos;
 }


 function movimentosTorre(posInicial, peca, tabuleiro) {
   const movimentos = [];
   const cor = peca.cor;
   const direcoes = ["Cima", "Baixo", "Direita", "Esquerda"];
   for (let i = 0; i < 4; i++)
     movimentos.push(...movEixoDiag(posInicial, cor, tabuleiro, direcoes[i]));
   return movimentos;
 }



function movimentosCavalo(posInicial, peca, tabuleiro) {
    const x = posInicial[0]
    const y = posInicial[1]
    const branca = peca.cor === 1
    const preta = peca.cor === 2
    const arrayTemp = [
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2],
    ]
    const movimentos = arrayTemp.filter((elem) => {
      const x = elem[0]
      const y = elem[1]
      const dentroDoTabuleiro = !(x > 7 || y > 7 || x < 0 || y < 0)
      const brancaNaPos = dentroDoTabuleiro ? tabuleiro[x][y].cor === 1 : false
      const pretaNaPos = dentroDoTabuleiro ? tabuleiro[x][y].cor === 2 : false
      const naoPecaDaMesmaCor = !(
        (branca && brancaNaPos) ||
        (preta && pretaNaPos)
      )
      const ehPosValida = dentroDoTabuleiro && naoPecaDaMesmaCor
      return ehPosValida
    })
    return movimentos
  }

  function movimentosRei(posInicial, peca, tabuleiro, zonaDePerigo) {
    const x = posInicial[0]
    const y = posInicial[1]
    const branca = peca.cor === 1
    const preta = peca.cor === 2
    const arrayTemp = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
      [x + 1, y + 1],
      [x + 1, y - 1],
      [x - 1, y + 1],
      [x - 1, y - 1],
    ]

    const movimentos = arrayTemp.filter((elem) => {
      const x = elem[0]
      const y = elem[1]
      const dentroDoTabuleiro = !(x > 7 || x < 0 || y > 7 || y < 0)
      const brancaNaPos = dentroDoTabuleiro ? tabuleiro[x][y].cor === 1 : false
      const pretaNaPos = dentroDoTabuleiro ? tabuleiro[x][y].cor === 2 : false
      const naoPecaDaMesmaCor = !(
        (branca && brancaNaPos) ||
        (preta && pretaNaPos)
      )
      const naoEhZonaDePerigo = !isArrayInArray(zonaDePerigo, elem)
      const ehPosValida = dentroDoTabuleiro && naoPecaDaMesmaCor && naoEhZonaDePerigo
      return ehPosValida
    })
    return movimentos
  }


export {
  isArrayInArray,
  colDescMovimentos,
  movimentosPeao,
  movimentosRainha,
  movimentosCavalo,
  movimentosRei,
  movimentosBispo,
  movimentosTorre,
}


