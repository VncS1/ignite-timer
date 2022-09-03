import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
    variant: ButtonVariant
}

//Propriedades que as variantes vão ter
const buttonVariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;

    //Setando o background color com as cores do buttonVariants de acordo com o que foi passado pelas props
    ${props => {
        return css`
            background-color: ${buttonVariants[props.variant]};
        `
    }}
`