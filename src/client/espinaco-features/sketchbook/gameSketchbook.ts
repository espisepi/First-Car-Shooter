import Game from '../../game'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'

export default class GameSketchbook extends Game {
    constructor(
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        listener: THREE.AudioListener,
        labelRenderer: CSS2DRenderer
    ) {
        super(scene, camera, renderer, listener, labelRenderer)
        // Los console.log del client se miran en el navegador
        console.log('sketchbookGame Client run! v1 ============================')
    }
}
