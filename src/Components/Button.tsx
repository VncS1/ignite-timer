import { ButtonContainer, ButtonVariant } from "./Button.styles";

interface ButtonProps {
    variant?: ButtonVariant; // (?) pois pode ser opcional e buttonVariant é a tipagem importada do styles
}

//Se a prop variant estiver vazia, a padrão será a 'primary'
export function Button({variant = 'primary'}: ButtonProps){
    return(

        <ButtonContainer variant={variant}> Enviar </ButtonContainer>

    );
}