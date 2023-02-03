import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, Header } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Splash from './screens/Splash';
import Home from './screens/Home';
import Stats from './screens/Stats';
import Settings from './screens/Settings';
import Trip from './screens/Trip';
import History from './screens/History';
import Map from './screens/Map';
import Result from './screens/Result';
import Baseline from './screens/Baseline';
import PastTrips from './screens/PastTrips';
import DefaultMethod from './screens/DefaultMethod';


const Stack = createStackNavigator();

function HomeStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen
          name='Home'
          component={Home}
          options={{ 
            headerTitle:'CalCarbon',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
          }}
        />
      <Stack.Screen
          name='Trip'
          component={Trip}
          options={{ 
            headerTitle:'CalCarbon',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
          }}
        />
        <Stack.Screen
          name='History'
          component={History}
          options={{ 
            headerTitle:'CalCarbon',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
          }}
        />
        <Stack.Screen
          name='Map'
          component={Map}
          options={{ 
            headerTitle:'CalCarbon',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
          }}
        />
        <Stack.Screen
          name='Result'
          component={Result}
          options={{ 
            headerTitle:'CalCarbon',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
          }}
        />
    </Stack.Navigator>
  )
}


const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
    screenOptions={
      ({route}) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeStack') {
            iconName = 'home';
            size = focused ? 25: 20;
          } else if (route.name === 'Stats') {
            iconName = 'chart-line';
            size = focused ? 25: 20;
          } else if (route.name === 'Settings') {
            iconName = 'cog';
            size = focused ? 25: 20;
          }
          return(
            <FontAwesome5 
              name = {iconName}
              color = {color}
              size = {size}
            />
          );
        },
        tabBarActiveTintColor: '#0080ff',
        tabBarInactiveTintColor: '#777777',
        tabBarShowLabel: false,
      })
    }
    >
      <Tab.Screen
        name={'HomeStack'} 
        component={HomeStack} 
        options = {{
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name={'Stats'} 
        component={Stats} 
        options={{ 
          headerTitle:'CalCarbon',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
          },
        }}
      />
      <Tab.Screen 
        name={'Settings'} 
        component={Settings} 
        options={{ 
          headerTitle:'CalCarbon',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
          },
        }}
      />
    </Tab.Navigator>
  )
}


const RootStack = createStackNavigator();


const App = () => {

  return (
    <Provider store={Store}>
    <NavigationContainer>
      <RootStack.Navigator
      initialRouteName='Splash'
      >
        <RootStack.Screen
          name='Splash'
          component={Splash}
          options = {{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name='My Trips'
          component={HomeTabs}
          options = {{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name='Baseline'
          component={Baseline}
          options={{ 
            headerTitle:'CalCarbon',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
          }}
        />
        <RootStack.Screen
          name='PastTrips'
          component={PastTrips}
          options={{ 
            headerTitle:'CalCarbon',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
          }}
        />
        <RootStack.Screen
          name='DefaultMethod'
          component={DefaultMethod}
          options={{ 
            headerTitle:'CalCarbon',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
