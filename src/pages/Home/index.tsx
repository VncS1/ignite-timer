import { HandPalm, Play } from "phosphor-react";

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' //@hookform/resolvers é uma biblioteca e zod é outra. a primeira serve pro react-hook-form se integrar com a segunda
import * as zod from 'zod'
import { createContext, useState } from "react";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

//Esquema de validação, ou seja, como será feita a validação dos formulários
const newCycleFormValidationSchema = zod.object({ //zod.object pois estou validando um objeto
  task: zod.string().min(1, 'Informe a tarefa'),//Task tem q ser string, minimo 1 caracter, e se não tiver nenhum, mostrar a msg
  minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos') //minutesAmount tem que ser um number, minimo 5 maximo 60
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> /* pegando a tipagem do schema do zod, e o typeof é pra transformar a variável js em ts*/



export function Home() {

 

  const newCycleForm = useForm<NewCycleFormData>/* passando uma interface pro form saber quais os campos */({
    resolver: zodResolver(newCycleFormValidationSchema), //selecionando o resolver de validação e como ela será
    defaultValues: { //Valores iniciais dos campos
      task: '',
      minutesAmount: 0,
    }
  }) //pegando apenas duas das funções que estão dentro do useForm()

  const { handleSubmit, watch, reset } = newCycleForm



  const task = watch('task') //Pegar o valor do input task em tempo real, task pois é oq foi nomeado no ...register
  const isSubmitDisabled = !task //Variável apenas para auxiliar e melhorar a legibilidade do código

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}> pegar os dados do formulário no submit

        {/* Form provider é a forma de usar o context do react hook forms */}
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

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
