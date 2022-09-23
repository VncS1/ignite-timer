import { createContext, ReactNode, useState } from "react";

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface Cycle {
    id: string;
    task: string
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date
    finishedDate?: Date
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
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)//Pode ser null pois pode não ter nenhum ciclo ativo
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    //função para não precisar enviar o setCycles inteiro pelo context
    function markCurrentCycleAsFinished() {
        setCycles(state => state.map((cycle) => {
            if (cycle.id === activeCycleId) { //percorre os ciclos, se o ciclo for interrompido, salva a data em que a ação ocorreu
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        })
        )
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

        setCycles((state) => [...cycles, newCycle])//pegando todos os ciclos anteriores e juntando com o novo
        setActiveCycleId(id)
        setAmountSecondsPassed(0)//Resetando a variavel

        //reset() //Função do react hook form pra resetar o form após o submit (ele volta pros valores setados acima no defaultValues)
    }

    function interruptCurrentCycle() {
        setActiveCycleId(null) //voltando o ciclo ativo pro padrão
        setCycles(state => state.map((cycle) => {
            if (cycle.id === activeCycleId) { //percorre os ciclos, se o ciclo for interrompido, salva a data em que a ação ocorreu
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }))

        setActiveCycleId(null) //voltando o ciclo ativo pro padrão


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