/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
'use strict';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import SearchPage from './SearchPage';


const NavStack = createStackNavigator({
    Home: { screen: SearchPage },
});

const App = createAppContainer(NavStack);



export default App;
