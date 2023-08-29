import Game from '../../game'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'

import { io, Socket } from 'socket.io-client'

import * as CANNON from 'cannon-es'
import * as THREE from 'three'

import * as Sketchbook from './sketchbook'
import Player from '../../player'

export default class GameSketchbook /* extends Game */ {
    public world: Sketchbook.World

    public scene: THREE.Scene
    public camera: THREE.PerspectiveCamera
    public renderer: THREE.WebGLRenderer
    public listener: THREE.AudioListener
    public labelRenderer: CSS2DRenderer

    public socket: Socket
    private updateInterval: any //used to update server
    // players: { [id: string]: Player } = {}
    players: { [id: string]: any } = {}
    private myId = ''
    private timestamp = 0

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

        this.socket = io()

        this.setupSocket()
    }

    private setupSocket(): void {
        this.socket.on('connect', function () {
            console.log('connected')
        })
        this.socket.on('disconnect', (message: any) => {
            console.log('disconnected ' + message)
            clearInterval(this.updateInterval)
            Object.keys(this.players).forEach((p) => {
                this.players[p].dispose()
            })
        })
        this.socket.on(
            'joined',
            (id: string, screenName: string, recentWinners: []) => {
                this.myId = id
                ;(
                    document.getElementById('screenNameInput') as HTMLInputElement
                ).value = screenName

                // this.ui.menuActive = true
                // this.ui.menuPanel.style.display = 'block'

                this.updateInterval = setInterval(() => {
                    if (this.world.characters[0]) {
                        // sepinaco TODO: Siguiente paso cambiar los datas que se envian y actualizar sus posiciones, fisicas y animaciones correctamente
                        this.socket.emit('update', {
                            t: Date.now(),
                            // p: this.car.frameMesh.position,
                            p: this.world.characters[0].position,
                            // q: this.car.frameMesh.quaternion,
                            q: this.world.characters[0].quaternion,
                            // v: this.car.forwardVelocity,
                            v: this.world.cameraOperator?.forwardVelocity, // mismo xD
                            // tp: this.car.turretMesh.position,
                            tp: this.world.characters[0].position,
                            // tq: this.car.turretMesh.quaternion,
                            tq: this.world.characters[0].quaternion,
                            w: [
                                {
                                    // p: this.car.wheelLFMesh.position,
                                    // q: this.car.wheelLFMesh.quaternion,
                                    p: this.world.characters[0].position,
                                    q: this.world.characters[0].quaternion,
                                },
                                {
                                    // p: this.car.wheelRFMesh.position,
                                    // q: this.car.wheelRFMesh.quaternion,
                                    p: this.world.characters[0].position,
                                    q: this.world.characters[0].quaternion,
                                },
                                {
                                    // p: this.car.wheelLBMesh.position,
                                    // q: this.car.wheelLBMesh.quaternion,
                                    p: this.world.characters[0].position,
                                    q: this.world.characters[0].quaternion,
                                },
                                {
                                    // p: this.car.wheelRBMesh.position,
                                    // q: this.car.wheelRBMesh.quaternion,
                                    p: this.world.characters[0].position,
                                    q: this.world.characters[0].quaternion,
                                },
                            ],
                            b: [
                                {
                                    // p: this.car.bulletMesh[0].position,
                                    // c: this.car.lastBulletCounter[0],
                                    p: this.world.characters[0].position,
                                    c: this.world.characters[0].quaternion,
                                },
                                {
                                    // p: this.car.bulletMesh[1].position,
                                    // c: this.car.lastBulletCounter[1],
                                    p: this.world.characters[0].position,
                                    c: this.world.characters[0].quaternion,
                                },
                                {
                                    // p: this.car.bulletMesh[2].position,
                                    // c: this.car.lastBulletCounter[2],
                                    p: this.world.characters[0].position,
                                    c: this.world.characters[0].quaternion,
                                },
                            ],
                        })
                    }
                }, 50)
                // this.ui.updateScoreBoard(recentWinners)
            }
        )

        this.socket.on(
            'hitCar',
            (message: { p: string; pos: THREE.Vector3; dir: CANNON.Vec3 }) => {
                console.log('HIT CAR!!! ======================')
                //     if (this.gamePhase === 1) {
                //         if (message.p === this.myId) {
                //             //detach and re position camera before blowing up car
                //             const v = this.earth.getSpawnPosition(
                //                 this.car.frameMesh.position
                //             )
                //             this.car.cameraTempPosition.position.copy(v)
                //             this.car.cameraTempPosition.add(this.car.chaseCamPivot)
                //             new TWEEN.Tween(this.car.chaseCam.position)
                //                 .to({ z: 250 })
                //                 .easing(TWEEN.Easing.Cubic.Out)
                //                 .start()

                //             this.car.explode(
                //                 new CANNON.Vec3(
                //                     message.dir.x,
                //                     message.dir.y,
                //                     message.dir.z
                //                 )
                //             )
                //         }

                //         this.explosions.forEach((e) => {
                //             e.explode(message.pos)
                //         })
                //         this.explosionSound.position.copy(message.pos)
                //         if (this.explosionSound.isPlaying) {
                //             this.explosionSound.stop()
                //         }
                //         this.explosionSound.play()
                //         console.log('playing explosion sound')
                //     }
            }
        )

        this.socket.on('hitMoon', (pos: THREE.Vector3) => {
            console.log('HIT Moon!!! ======================')
            // if (this.gamePhase === 1) {
            //     this.explosions.forEach((e) => {
            //         e.explode(pos)
            //     })
            //     this.explosionSound.position.copy(pos)
            //     if (this.explosionSound.isPlaying) {
            //         this.explosionSound.stop()
            //     }
            //     this.explosionSound.play()
            //     console.log('playing explosion sound')
            // }
        })

        this.socket.on('winner', (screenName: string, recentWinners: []) => {
            console.log('Winner!!! ======================')
            // ;(
            //     document.getElementById('winnerLabel') as HTMLDivElement
            // ).style.display = 'block'
            // ;(
            //     document.getElementById('winnerScreenName') as HTMLDivElement
            // ).innerHTML = screenName
            // this.ui.updateScoreBoard(recentWinners)
        })

        this.socket.on('newGame', () => {
            console.log('NEW GAME!!! ======================')
            // this.ui.gameClosedAlert.style.display = 'none'
            // if (!this.ui.menuActive) {
            //     this.ui.newGameAlert.style.display = 'block'
            //     setTimeout(() => {
            //         this.ui.newGameAlert.style.display = 'none'
            //     }, 2000)
            // }
        })

        this.socket.on('removePlayer', (p: string) => {
            console.log('deleting player ' + p)
            // this.players[p].dispose()
            delete this.players[p]
        })

        this.socket.on('gameData', (gameData: any) => {
            let pingStatsHtml = 'Socket Ping Stats<br/><br/>'
            Object.keys(gameData.players).forEach((p) => {
                this.timestamp = Date.now()
                pingStatsHtml +=
                    gameData.players[p].sn +
                    ' ' +
                    gameData.players[p].s +
                    ' ' +
                    (this.timestamp - gameData.players[p].t) +
                    'ms<br/>'
                if (p !== this.myId) {
                    if (!this.players[p]) {
                        console.log('adding player ' + p)
                        // this.players[p] = new Player(
                        //     this.scene,
                        //     this.physics,
                        //     this.listener
                        // )
                        this.players[p] = 'player: ' + p
                        // Instanciar en el world un character que corresponde con el nuevo player unido
                        this.world.spawnNewPlayerCharacter()

                        // if (this.world.scenarios[0]) {
                        //     this.world.scenarios[0].createSpawnCharacter()
                        // } else {
                        //     console.warn(
                        //         'FALLLOOOOOO DEL SPAWWWNNN, world.scenarios[0] undefined',
                        //         { scenario: this.world.scenarios[0] }
                        //     )
                        // }
                    }
                    // this.players[p].updateTargets(gameData.players[p])
                }
            })
            // console.log('Game Data!!! ======================', gameData)
            // if (gameData.gameClock >= 0) {
            //     if (this.gamePhase != 1) {
            //         console.log('new game')
            //         this.gamePhase = 1
            //         ;(
            //             document.getElementById('gameClock') as HTMLDivElement
            //         ).style.display = 'block'
            //         ;(
            //             document.getElementById('winnerLabel') as HTMLDivElement
            //         ).style.display = 'none'
            //         ;(
            //             document.getElementById(
            //                 'winnerScreenName'
            //             ) as HTMLDivElement
            //         ).innerHTML = ''
            //         if (!this.car.enabled) {
            //             this.car.fix()
            //             const pos = this.earth.getSpawnPosition()
            //             this.car.spawn(pos)
            //             new TWEEN.Tween(this.car.chaseCam.position)
            //                 .to({ z: 4 })
            //                 .easing(TWEEN.Easing.Cubic.Out)
            //                 .start()
            //         }
            //         // Object.keys(this.springs).forEach((s) => {
            //         //     this.springs[s].randomise()
            //         // })
            //     }
            //     ;(
            //         document.getElementById('gameClock') as HTMLDivElement
            //     ).innerText = Math.floor(gameData.gameClock).toString()
            // } else {
            //     ;(
            //         document.getElementById('gameClock') as HTMLDivElement
            //     ).style.display = 'none'
            //     if (
            //         !this.ui.menuActive &&
            //         gameData.gameClock >= -3 &&
            //         this.gamePhase === 1
            //     ) {
            //         console.log('game closed')
            //         this.ui.gameClosedAlert.style.display = 'block'
            //         setTimeout(() => {
            //             this.ui.gameClosedAlert.style.display = 'none'
            //         }, 5000)
            //     }
            //     this.gamePhase = 0
            // }
            // let pingStatsHtml = 'Socket Ping Stats<br/><br/>'
            // Object.keys(gameData.players).forEach((p) => {
            //     this.timestamp = Date.now()
            //     pingStatsHtml +=
            //         gameData.players[p].sn +
            //         ' ' +
            //         gameData.players[p].s +
            //         ' ' +
            //         (this.timestamp - gameData.players[p].t) +
            //         'ms<br/>'
            //     if (p !== this.myId) {
            //         if (!this.players[p]) {
            //             console.log('adding player ' + p)
            //             this.players[p] = new Player(
            //                 this.scene,
            //                 this.physics,
            //                 this.listener
            //             )
            //         }
            //         this.players[p].updateTargets(gameData.players[p])
            //     }
            // })
            // Object.keys(gameData.moons).forEach((m) => {
            //     if (!this.moons[m]) {
            //         console.log('adding moon ' + m)
            //         this.moons[m] = new Moon(this.scene, this.physics)
            //     }
            //     this.moons[m].updateTargets(gameData.moons[m])
            // })
            // if (!this.isMobile) {
            //     ;(
            //         document.getElementById('pingStats') as HTMLDivElement
            //     ).innerHTML = pingStatsHtml
            // }
        })
    }

    public update(delta: number) {
        // super.update(delta)
    }
}
