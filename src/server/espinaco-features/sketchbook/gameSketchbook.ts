import socketIO from 'socket.io'

import Game from '../../game'

export default class GameSketchbook extends Game {
    constructor(io: socketIO.Server) {
        super(io)
        console.log('sketchbookGame run! v1')
    }
}
