import Tabuleiro from "./Tabuleiro.js"
import Jogo from "./Jogo.js"

const GUI = {
  imgBrancas: [
    "./pecas/bPeao.png",
    "./pecas/bTorre.png",
    "./pecas/bCavalo.png",
    "./pecas/bBispo.png",
    "./pecas/bRainha.png",
    "./pecas/bRei.png",
  ],
  imgPretas: [
    "./pecas/pPeao.png",
    "./pecas/pTorre.png",
    "./pecas/pCavalo.png",
    "./pecas/pBispo.png",
    "./pecas/pRainha.png",
    "./pecas/pRei.png",
  ],

  promoGUI: null,

  renderizarTabuleiro() {
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
        if ((linhaImpar && celulaImpar) || (linhaPar && celulaPar))
          celula.className = "branca"
        else celula.className = "preta"
        celula.id = i.toString() + j.toString()
        linha.appendChild(celula)
      }
    }

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const idCelula = i.toString() + j.toString()
        const celula = document.getElementById(idCelula)
        const tipoDaPeca = Tabuleiro.tipoDaPeca([i, j])
        const casaVazia = tipoDaPeca === 0
        const corDaPeca = Tabuleiro.corDaPeca([i, j])
        if (casaVazia) continue
        const img = document.createElement("img")
        img.className = "img"
        let caminho = "./pecas/"
        const ehBranca = corDaPeca === 1
        if (ehBranca) caminho = caminho + "b"
        else caminho = caminho + "p"
        switch (tipoDaPeca) {
          case 1:
            caminho = caminho + "Peao.png" //Mudar essa gambiarra do caralho
            break
          case 2:
            caminho = caminho + "Torre.png"
            break
          case 3:
            caminho = caminho + "Cavalo.png"
            break
          case 4:
            caminho = caminho + "Bispo.png"
            break
          case 5:
            caminho = caminho + "Rainha.png"
            break
          case 6:
            caminho = caminho + "Rei.png"
            break
        }
        img.src = caminho
        celula.appendChild(img)
      }
    }
  },
  rendPromoGUI(cor) {
    this.promoGUI = document.createElement("div")
    this.promoGUI.className = "promocao"
    const imagens = cor === 1 ? this.imgBrancas : this.imgPretas
    for (let i = 0; i < 5; i++) {
      const celula = document.createElement("div")
      const img = document.createElement("img")
      img.src = imagens[i]
      img.className = "img"
      celula.className = "branca"
      celula.onclick = cliquePromo
      celula.appendChild(img)
      this.promoGUI.appendChild(celula)
    }
    document.body.appendChild(this.promoGUI)
  },
  removPromoGUI() {
    this.promoGUI.remove()
    this.promoGUI = null
  },
}

function cliquePromo() {
  const img = this.firstChild
  const imagens = Jogo.cor === 1 ? GUI.imgBrancas : GUI.imgPretas
  const posPromo = Tabuleiro.posPromo
  const imgPromo = document.createElement("img")
  const celulaPromo = document.getElementById(
    posPromo[0].toString() + posPromo[1].toString()
  )
  celulaPromo.removeChild(celulaPromo.firstChild)
  imgPromo.className = "img"
  console.log(img.src)
  switch (img.src[36]) {
    case "P":
      Tabuleiro.promover(1)
      imgPromo.src = imagens[0]
      break
    case "T":
      Tabuleiro.promover(2)
      imgPromo.src = imagens[1]
      break
    case "C":
      Tabuleiro.promover(3)
      imgPromo.src = imagens[2]
      break
    case "B":
      Tabuleiro.promover(4)
      imgPromo.src = imagens[3]
      break
    case "R":
      Tabuleiro.promover(5)
      imgPromo.src = imagens[4]
      break
  }
  celulaPromo.appendChild(imgPromo)
  GUI.removPromoGUI()
  Jogo.esperandoPromo = false
  Jogo.trocarCor()
}

export default GUI
  

