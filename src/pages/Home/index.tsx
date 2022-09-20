import { HandPalm, Play } from "phosphor-react";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' //@hookform/resolvers é uma biblioteca e zod é outra. a primeira serve pro react-hook-form se integrar com a segunda
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'

import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
  StopCountdownButton
} from "./styles";


//Esquema de validação, ou seja, como será feita a validação dos formulários
const newCycleFormValidationSchema = zod.object({ //zod.object pois estou validando um objeto
  task: zod.string().min(1, 'Informe a tarefa'),//Task tem q ser string, minimo 1 caracter, e se não tiver nenhum, mostrar a msg
  minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos') //minutesAmount tem que ser um number, minimo 5 maximo 60
})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> /* pegando a tipagem do schema do zod, e o typeof é pra transformar a variável js em ts*/

interface Cycle {
  id: string;
  task: string
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)//Pode ser null pois pode não ter nenhum ciclo ativo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>/* passando uma interface pro form saber quais os campos */({
    resolver: zodResolver(newCycleFormValidationSchema), //selecionando o resolver de validação e como ela será
    defaultValues: { //Valores iniciais dos campos
      task: '',
      minutesAmount: 0,
    }
  }) //pegando apenas duas das funções que estão dentro do useForm()

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 //convertendo o tempo do ciclo ativo para segundos


  //toda vez que o activeCycle muda, chama o useEffect
  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate) //Diferença em segundos da data atual com o inicio do ciclo

        if (secondsDifference >= totalSeconds) { //Vendo se o tempo acabou
          setCycles(state => state.map((cycle) => {
              if (cycle.id === activeCycleId) { //percorre os ciclos, se o ciclo for interrompido, salva a data em que a ação ocorreu
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            })
          )

          setAmountSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }


      }, 1000)
    }

    return () => { //quando executar o useEffect novamente, vai resetar oq tava fazendo antes
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  function handleCreateNewCycle(data: NewCycleFormData) { //data são os dados que vem do formulario
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

    reset() //Função do react hook form pra resetar o form após o submit (ele volta pros valores setados acima no defaultValues)
  }

  function handleInterruptCycle() {
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

  const task = watch('task') //Pegar o valor do input task em tempo real, task pois é oq foi nomeado no ...register
  const isSubmitDisabled = !task //Variável apenas para auxiliar e melhorar a legibilidade do código

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}> {/* pegar os dados do formulário no submit*/}
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register('task')} //Nomeando o input e colocando nele todas as funções que estão dentro do register(ex: onBlur, onChange, etc...)
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            disabled={!!activeCycle}
            step={5}
            min={1}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}//falando que esse input tem que passar os dados como number
          />

          <span>minutos.</span>
        </FormContainer>


        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
