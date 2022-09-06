/* Só codigo de definição de tipo do typescript */
/* Só tem tipagem */

import 'styled-components'

import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// criando uma tipagem pro styled components
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
