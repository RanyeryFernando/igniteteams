import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Theme  from './src/theme/index';
import { Groups } from '@screens/Groups';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={Theme}>
    { fontsLoaded ? <Groups /> : <ActivityIndicator />}
    </ThemeProvider>
  );
}
