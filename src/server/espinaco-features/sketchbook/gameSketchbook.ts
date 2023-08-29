import socketIO from 'socket.io'

import Game from '../../game'

export default class GameSketchbook extends Game {
    constructor(io: socketIO.Server) {
        super(io)
        // Los console.log del server se miran en terminal, no en el navegador
        console.log('sketchbookGame Server run! v1 ===========')

        //sepinaco TODO: Continuar por aqui, desarrollando el Game especifico para Sketchbook del lado del servidor
    }
}
