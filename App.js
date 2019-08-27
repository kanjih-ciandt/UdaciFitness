import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import EntryDetail from './components/EntryDetail'
import Constants from 'expo-constants';
import Live from './components/Live'




function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


class HomeScreen extends React.Component {
  render() {
    return (
        <View style={{ flex: 1}}>
          <AddEntry/>
        </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <History/>
      </View>
    );
  }
}

class LiveScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <Live/>
      </View>
    );
  }
}

const Tabs = createBottomTabNavigator({
  AddEntry: { screen: HomeScreen },
  History: { screen: SettingsScreen },
  Live: { screen: LiveScreen },
});




const MainNavigator = createAppContainer(createStackNavigator({
  home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },
}));


export default class App extends React.Component {
  render() {
    

    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}