import Game from '../../game'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'

import * as THREE from 'three'

import * as Sketchbook from './sketchbook'

export default class GameSketchbook /* extends Game */ {
    public world: Sketchbook.World

    public scene: THREE.Scene
    public camera: THREE.PerspectiveCamera
    public renderer: THREE.WebGLRenderer
    public listener: THREE.AudioListener
    public labelRenderer: CSS2DRenderer

    constructor(
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        listener: THREE.AudioListener,
        labelRenderer: CSS2DRenderer
    ) {
        // Run Game Firt car Shooter (with extends Game)
        // super(scene, camera, renderer, listener, labelRenderer)

        // Los console.log del client se miran en el navegador
        console.log('sketchbookGame Client run! v1 ============================', {
            gameSketchbook: this,
        })

        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.listener = listener
        this.labelRenderer = labelRenderer

        // Por si acaso no hay luces en la escena (que no las hay de momento xD)
        const light = new THREE.AmbientLight(0x909090) // soft white light
        this.scene.add(light)

        this.world = new Sketchbook.World(
            scene,
            camera,
            renderer,
            listener,
            labelRenderer,
            'build/assets/world.glb'
        )

        // this.connectWorldClientWithWorldSketchbook()
    }

    // connectWorldClientWithWorldSketchbook(): void {
    //     const light = new THREE.AmbientLight(0x404040) // soft white light
    //     this.scene.add(light)

    //     // this.scene.add(...this.world.graphicsWorld.children)
    //     // this.camera = this.world.camera
    //     // this.world.camera = this.camera
    //     // this.world.renderer = this.renderer
    // }

    public update(delta: number) {
        // super.update(delta)
    }
}
