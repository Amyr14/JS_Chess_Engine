
import tabuleiro from "./tabuleiro.js"

const body = document.body
const container = document.createElement("div")
container.className = "container"
body.appendChild(container)
for (let i = 0; i < 8; i++) {
  const linha = document.createElement("div")
  linha.className = "linha"
  container.appendChild(linha)
  for (let j = 0; j < 8; j++) {
    const linhaImpar = i % 2 === 1
    const celulaImpar = j % 2 === 1
    const linhaPar = !linhaImpar
    const celulaPar = !celulaImpar
    const celula = document.createElement("div")
    if ((linhaImpar && celulaImpar) || (linhaPar && celulaPar)) celula.className = "branca"
    else celula.className = "preta"
    celula.id = i.toString() + j.toString()
    linha.appendChild(celula)
  }
}

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const idCelula = i.toString() + j.toString()
    const celula = document.getElementById(idCelula)
    const peca = tabuleiro[i][j]
    if (peca.tipo === 0) continue
    const img = document.createElement("img")
    img.className = "img"
    let caminho = "./pecas/"
    const ehBranca = peca.cor === 1
    if (ehBranca) caminho = caminho + "b"
    else caminho = caminho + "p"
    switch(peca.tipo){
      case 1 :
           caminho = caminho + "Peao.png"
           break
      case 2 :
           caminho = caminho + "Torre.png"
           break
      case 3 :
           caminho = caminho + "Cavalo.png"
           break
      case 4 :
           caminho = caminho + "Bispo.png"
           break
      case 5 :
           caminho = caminho + "Rainha.png"
           break
      case 6 :
           caminho = caminho + "Rei.png"
           break
    }
  img.src = caminho
  celula.appendChild(img)
  }
}


