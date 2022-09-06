import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <span>logo</span>
      <nav>
        <a href="#">
          Timer
        </a>
        <a href="#">
          History
        </a>
      </nav>
    </HeaderContainer>
  );
}
