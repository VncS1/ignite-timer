import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod'
import { useForm, useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {

    //contexto que eu criei
    const { activeCycle } = useContext(CyclesContext)

    //contexto do react hook form
    const { register } = useFormContext()

    return (
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
    )
}