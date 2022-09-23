import { useContext } from "react";
import ptBR from 'date-fns/locale/pt-BR'
import { formatDistanceToNow } from 'date-fns'
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true, //coloca o 'há' na frente
                      locale: ptBR
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && ( //se tiver cycle.finishedDate (ou seja, se tiver sido concluido), exibir como concluído
                      <Status statusColor="green">Concluído</Status>
                    )}

                    {cycle.interruptedDate && ( //se tiver cycle.interruptedDate, exibir como interrompido
                      <Status statusColor="red">Interrompido</Status>
                    )}

                    {(!cycle.finishedDate && !cycle.interruptedDate) && ( //se não tiver finishedDate nem interrputedDate, quer dizer que o ciclo ainda está rolando
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
