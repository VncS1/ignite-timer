/* Apenas para aprender sobre context */

import { createContext, useContext, useState } from 'react'

//variavel do contexto precisa ter relação com a informação que será contida nele
const CyclesContext = createContext({} as any)

function Countdown() {
    const { activeCycle } = useContext(CyclesContext)

    return <h1>Countdown: {activeCycle}</h1>
}

function NewCycleForm() {
    const { activeCycle, setActiveCycle } = useContext(CyclesContext)

    return (
        <div>
            <h1>New Cycle Form: {activeCycle}</h1>
            <button
                onClick={() => {
                    setActiveCycle(2)
                }}
            >
                Alterar Ciclo
            </button>
        </div>
    )
}

export function Home() {

    //está no componente pai dos componentes que precisam do activeCycle
    const [activeCycle, setActiveCycle] = useState(0)



    return (
        <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
            <div>
                <Countdown />
                <NewCycleForm />
            </div>
        </CyclesContext.Provider>
    )
}