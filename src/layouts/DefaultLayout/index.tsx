import { Outlet } from "react-router-dom";
import { Header } from "../../Components/Header/index";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {
    return (
        <LayoutContainer>
            {/* Layout padrão com o header pra não precisar repetir código */}
            <Header />
            <Outlet /> {/* Conteudo que está sendo definido pelo Route do Router.tsx*/}
        </LayoutContainer>
    )
}