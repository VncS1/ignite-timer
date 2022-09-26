import { Cycle } from "./reducer";

//todas as ações
export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

export function addNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionTypes.ADD_NEW_CYCLE, //a ação que será tomada
        payload: {
            newCycle, //o que vai ser enviado
        }
    }
}

export function interruptCurrentCycleAction() {
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE, //a ação que será tomada
    }
}

export function markCurrentCycleAsFinishedAction() {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED, //a ação que será tomada
    }
}