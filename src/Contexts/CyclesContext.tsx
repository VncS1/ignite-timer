import { differenceInSeconds } from "date-fns/esm";
import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
    task: string
    minutesAmount: number
}


interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void //falando q é uma função q n tem retorno nem parametros
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
    children: ReactNode //children pois no app tem um componente filho do CyclesContextProvider, então precisa avisar isso
}

export const CyclesContext = createContext({} as CyclesContextType)



export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

    //dois parametros, uma função e o valor inicial, e essa função recebe dois parametros, state = valor em tempo real da variavel,
    //e uma action, qual ação o usuário ta querendo realizar na variavel

    //dispatch pois é uma variavel pra disparar algum funcionamento
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    }, () => {
        //recuperando as informações salvas no local storage
        const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

        if(storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }
    })


    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        //calcular o valor inicial do amountsSecondsPassed pois quando
        //der f5 volta pro valor q tava antes
        if(activeCycle){
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })

    //salvando os ciclos no local storage
    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    

    //função para não precisar enviar o setCycles inteiro pelo context
    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) { //data são os dados que vem do formulario
        const id = String(new Date().getTime())//Pegando a hora atual como id

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))

        setAmountSecondsPassed(0)//Resetando a variavel
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    return (
        <CyclesContext.Provider
            value={{
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle,
                cycles
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}