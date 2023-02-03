import { ThemeProvider } from 'styled-components'
import Theme  from 'src/theme'
import { Groups } from '@screens/Groups';

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
    <Groups />
    </ThemeProvider>
  );
}
