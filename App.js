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
import SearchResults from './SearchResults';


const NavStack = createStackNavigator({
    Home: { screen: SearchPage },
    Results: { screen: SearchResults },
});

const App = createAppContainer(NavStack);



export default App;
