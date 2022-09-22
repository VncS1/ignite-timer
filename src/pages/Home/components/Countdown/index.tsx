import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CyclesContext } from "../..";
import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
    const { activeCycle, activeCycleId, amountSecondsPassed, markCurrentCycleAsFinished, setSecondsPassed } = useContext(CyclesContext)

   const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 //convertendo o tempo do ciclo ativo para segundos


    //toda vez que o activeCycle muda, chama o useEffect
    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate) //Diferença em segundos da data atual com o inicio do ciclo

                if (secondsDifference >= totalSeconds) { //Vendo se o tempo acabou
                    markCurrentCycleAsFinished()
                    setSecondsPassed(totalSeconds)

                    clearInterval(interval)
                } else {
                    setSecondsPassed(secondsDifference)
                }


            }, 1000)
        }

        return () => { //quando executar o useEffect novamente, vai resetar oq tava fazendo antes
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60) //pegando os minutos dentro dos segundos
    const secondsAmount = currentSeconds % 60 //Pegando os segundos que sobraram da divisão acima

    const minutes = String(minutesAmount).padStart(2, '0')//Sempre ter dois caracteres, se não tiver, colocar um 0 no começo dela
    const seconds = String(secondsAmount).padStart(2, '0')//Sempre ter dois caracteres, se não tiver, colocar um 0 no começo dela

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}` //atualizando o titulo da pagina de acordo com o tempo somente se tiver um ciclo ativo
        }
    }, [minutes, seconds, activeCycle])


    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}