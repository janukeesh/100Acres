import 'react-native-gesture-handler';

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Srp from './screens/Srp';
import Sortlist from './screens/Sortlist';
import {Provider} from 'react-redux';
import configureStore from './store';

const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={configureStore}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SRP" component={Srp} />
            <Stack.Screen name="Sortlist" component={Sortlist} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* <Srp /> */}
    </SafeAreaView>
  );
}

export default App;
