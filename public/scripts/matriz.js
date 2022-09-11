
class Peca {
    constructor(tipo, cor) {
      this.tipo = tipo
      this.cor = cor
    }
    seMexeu = false
  }

const matriz = [
  [
    new Peca(2, 1),
    new Peca(3, 1),
    new Peca(4, 1),
    new Peca(6, 1),
    new Peca(5, 1),
    new Peca(4, 1),
    new Peca(3, 1),
    new Peca(2, 1),
  ],
  [
    new Peca(1, 1),
    new Peca(1, 1),
    new Peca(1, 1),
    new Peca(1, 1),
    new Peca(1, 1),
    new Peca(1, 1),
    new Peca(1, 1),
    new Peca(1, 1),
  ],
  [
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
  ],
  [
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
  ],
  [
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
  ],
  [
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
    new Peca(0, 0),
  ],
  [
    new Peca(1, 2),
    new Peca(1, 2),
    new Peca(1, 2),
    new Peca(1, 2),
    new Peca(1, 2),
    new Peca(1, 2),
    new Peca(1, 2),
    new Peca(1, 2),
  ],
  [
    new Peca(2, 2),
    new Peca(3, 2),
    new Peca(4, 2),
    new Peca(6, 2),
    new Peca(5, 2),
    new Peca(4, 2),
    new Peca(3, 2),
    new Peca(2, 2),
  ],
]

export {matriz, Peca};