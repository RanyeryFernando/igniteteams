import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from '@components/Loading';

import Theme  from './src/theme/index';

import { NewGroup } from '@screens/NewGroup';


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={Theme}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    {fontsLoaded ? <NewGroup /> : <Loading />}
    </ThemeProvider>
  );
}
