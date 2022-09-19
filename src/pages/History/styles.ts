import styled from "styled-components";


export const HistoryContainer = styled.main`

    flex: 1;
    padding: 3.5rem;

    display: flex;
    flex-direction: column;

    h1 {
        font-size: 1.5rem;
        color: ${props => props.theme["gray-100"]}
    }

`

export const HistoryList = styled.div`

    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table {
        width: 100%;
        border-collapse: collapse; /* Conta como se existisse apenas 1 borda para os elementos*/

        min-width: 600px;

        th {
            background-color: ${props => props.theme["gray-600"]};
            padding: 1rem;
            text-align: left;
            color: ${(props) => props.theme["gray-100"]};
            font-size: 0.875rem;
            line-height: 1.6;
        

            &:first-child { /* Selecionando a primeira th */
            border-top-left-radius: 8px;
            padding-left: 1.5rem;
            }

            &:last-child { /* Selecionando a última th */
            border-top-right-radius: 8px;
            padding-right: 1.5rem;
            }
        }
        
        td {
            background-color: ${(props) => props.theme["gray-700"]};
            border-top: 4px solid ${(props) => props.theme["gray-800"]};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child { /* Selecionando a primeira td */
            width: 50%; /* A coluna da tarefa vai ocupar mais espaço*/
            padding-left: 1.5rem;

            }

            &:last-child { /* Selecionando a última td */
            padding-right: 1.5rem;
            }
        }
    }

`

const STATUS_COLORS = {
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500'
} as const /* as const para falar pro typescript que os textos vão ser sempre fixos, ou seja, não irão mudar*/

interface StatusProps {
    statusColor: keyof typeof STATUS_COLORS //Falando q as cores do statusColor tem que ser as que estão definidas no STATUS_COLORS
}

export const Status = styled.span<StatusProps> ` /* Falando que o span pode receber as propriedades que estão no <StatusProps> */
    display: flex;
    align-items: center;
    gap: 0.5rem;
    

    &::before {
        content: ''; /* Faz aparecer em tela */
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
    }
`
