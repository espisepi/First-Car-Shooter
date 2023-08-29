import Game from '../../game'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'

import * as Sketchbook from './sketchbook'

export default class GameSketchbook extends Game {
    constructor(
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        listener: THREE.AudioListener,
        labelRenderer: CSS2DRenderer
    ) {
        // Run Game Firt car Shooter (with extends Game)
        super(scene, camera, renderer, listener, labelRenderer)

        // Los console.log del client se miran en el navegador
        console.log('sketchbookGame Client run! v1 ============================', {
            self: this,
        })

        this.init()
    }

    private init(): void {
        const world = new Sketchbook.World('build/assets/world.glb')
    }

    public update(delta: number) {
        super.update(delta)
    }
}
