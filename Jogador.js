
class Jogador {
  constructor(cor) {
    this.cor = cor
  }
  
  emCheque = false
  posInicial = []
  movValidos = []
  imgDaPeca = null
  chequeMate = false
  
  setPosInicial(posInicial){
    this.posInicial = posInicial
  }

  setImgDaPeca(imgDaPeca){
    this.imgDaPeca = imgDaPeca
  }

  setEmCheque(emCheque){
    this.emCheque = emCheque
  }

  setChequeMate(chequeMate){
    this.chequeMate = chequeMate
  }
  
  setMovValidos(movValidos) {
    this.movValidos = movValidos
  }

  pecaNaoFoiSelec(){
    return this.posInicial === []
  }


  default() {
    this.posInicial = []
    this.posFinal = []
    this.movValidos = []
    this.imgDaPeca = null
    this.zonaDePerigo = []
  }
}

export default Jogador