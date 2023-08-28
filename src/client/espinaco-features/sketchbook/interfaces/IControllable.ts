// sepinaco commented
// import { Character } from '../characters/Character';
import { IInputReceiver } from './IInputReceiver'
// sepinaco commented
// import { VehicleSeat } from '../vehicles/VehicleSeat';
// import { EntityType } from '../enums/EntityType';

export interface IControllable extends IInputReceiver {
    // sepinaco commented
    // entityType: EntityType
    // seats: VehicleSeat[]
    position: THREE.Vector3
    // sepinaco commented
    // controllingCharacter: Character

    triggerAction(actionName: string, value: boolean): void
    resetControls(): void
    allowSleep(value: boolean): void
    onInputChange(): void
    noDirectionPressed(): boolean
}
