
import tabuleiro from "./tabuleiro.js"
import { isArrayInArray, colDescMovimentos } from "./funcoes.js"
import Jogador from "./Jogador.js"

const Jogador1 = new Jogador([0, 4], 1)
const Jogador2 = new Jogador([7, 4], 2)

const Jogo = {
  jogoAcabou: false,
  jogadorJogando: Jogador1,
  tabuleiro: tabuleiro,
  vencedor: null,
}

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const id = i.toString() + j.toString()
    const cell = document.getElementById(id)
    cell.onclick = clique
  }
}

function clique() {
  const Jogador = Jogo.jogadorJogando
  const celula = this
  const coordX = parseInt(celula.id[0])
  const coordY = parseInt(celula.id[1])
  const refPosClicada = Jogo.tabuleiro[coordX][coordY]
  const posEstaOcupada = refPosClicada.tipo !== 0
  const corValida = refPosClicada.cor === Jogador.cor
  const primeiroClique = Jogador.pecaSelec === null
  const segundoClique = !primeiroClique

  if (primeiroClique && posEstaOcupada && corValida) {
    Jogador.posInicial = [coordX, coordY]
    Jogador.pecaSelec = refPosClicada  
    Jogador.setMovValidos(Jogo.tabuleiro)
    Jogador.imgDaPeca = celula.firstChild
    colDescMovimentos(Jogador.movValidos, "colorir")
  }  else if (segundoClique) {
    Jogador.posFinal = [coordX, coordY]
    const refPosFinal = refPosClicada
    const movimentoEhValido = isArrayInArray(Jogador.movValidos, Jogador.posFinal)
    if (movimentoEhValido) {
      refPosFinal.tipo = Jogador.pecaSelec.tipo
      refPosFinal.cor = Jogador.pecaSelec.cor
      refPosFinal.seMexeu = true
      refPosFinal.emPerigo = Jogador.pecaSelec.estaEmPerigo //Criar uma classe Board para fazer essas coisas?
      Jogador.pecaSelec.tipo = 0
      Jogador.pecaSelec.cor = 0
      Jogador.pecaSelec.seMexeu = false
      Jogador.pecaSelec.emPerigo = false
      Jogo.jogadorJogando = Jogador === Jogador1 ? Jogador2 : Jogador1
      if (posEstaOcupada) celula.firstChild.remove()
      celula.appendChild(Jogador.imgDaPeca)
      colDescMovimentos(Jogador.movValidos, "descolorir")
      Jogador.default()
    } else {
      colDescMovimentos(Jogador.movValidos, "descolorir")
      Jogador.default()
    }
  }
}




/*

Funções de funcoes.js -> recebem posInicial, a referência da peça, e o tabuleiro, retornam os movimentos que essas peças podem fazer

class Tabuleiro -> contém a matriz "tabuleiro", que contém instâncias da classe Peca ({x, y, seMoveu, tipo, cor})
                   contém métodos que mudam as peças de lugar
                   contém um array "brancas" com todas as peças brancas e um array "pretas" com todas as peças pretas

class Jogador -> contém informações referentes a um jogador específico
                 propriedades -> reiEmCheque, posDoRei, zonaDePerigo, pecaSelec, posInicial, posFinal, movValidos, imgDaPeca, cor.
                 métodos -> setZonaDePerigo: recebe informação da instância Tabuleiro para calcular zona de perigo
                            setPosDoRei: recebe informação de main.js e da instância Tabuleiro para setar a posição do rei
                            setReiEmCheque: usa das propriedades zonaDePerigo e posDoRei para verificar se o rei está em cheque ou não
                            setPecaSelec: recebe informação de main.js e da instância Tabuleiro para setar a peça selecionada
                            setPosInicial: recebe informação de main.js e seta a posição inicial 
                            setPosFinal: recebe informação de main.js e seta a posição final
                            setMovValidos: usa as funções de funcoes.js para calcular os movimentos válidos de determinada peça
                            setImagemDaPeça: recebe informação de main.js para setar a imagem da peça
                            default: seta as propriedades posInicial, posFinal, pecaSelec, imgDaPeca, movValidos e zonaDePerigo para seus valores default

função clique -> descreve a funcionalidade do jogo 


*/