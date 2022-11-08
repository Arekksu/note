import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
//import { StyleSheet } from 'react-native';    // DEL 20221105 unused
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // INS 20221105 for bottom tab navigation
import Ionic from 'react-native-vector-icons/Ionicons';

import Intro from './app/screens/Intro';
import NoteScreen from './app/screens/NoteScreen';
import AboutScreen from './app/screens/About'; // INS 20221105 new screen
import HowTo from './app/screens/HowTo'; // INS 20221105 new screen
import DevProfile from './app/screens/DevProfile'; // INS 20221105 new screen

import NoteDetail from './app/components/NoteDetail';
import NoteProvider from './app/contexts/NoteProvider';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar, } from 'react-native-paper';

const NoteStack = createStackNavigator();
const AboutStack = createStackNavigator(); // INS 20221105 for About page navigation
const Tab = createBottomTabNavigator(); // INS 20221105 for botton tab navigation

export default function App() {
  const [user, setUser] = useState({});
  

  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />; // MOD 20221105 change to upper case "R" for "Render"

  // Begin of INS 20221105 Create navigation stack for Notes feature
  // Added headerTintcolor for dark background page
  function NoteScreens() {
    return (
      <NoteStack.Navigator
        screenOptions={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: 'white',
        }}>
        <NoteStack.Screen component={RenderNoteScreen} name="NoteScreen" />
        <NoteStack.Screen component={NoteDetail} name="NoteDetail" />
      </NoteStack.Navigator>
    );
  }
  
  // Create navigation stack for About page
  function AboutScreens() {
    return (
      <AboutStack.Navigator
        screenOptions={{ headerTitle: '', headerTransparent: true }}>
        <AboutStack.Screen component={AboutScreen} name="AboutScreen" />
        <AboutStack.Screen component={DevProfile} name="DevProfile" />
      </AboutStack.Navigator>
    );
  }
  // End of INS 20221105
  
  // Begin of MOD 20221105 Replaced existing Note navigation stack with TAB stack to include new screens
  return (
    <NavigationContainer>
      <NoteProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size, colour }) => {
              let iconName;
              if (route.name === 'Notes') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'How To Use') {
                iconName = focused ? 'help' : 'help-outline';
              } else if (route.name === 'About') {
                iconName = focused ? 'information-circle' : 'md-information-circle-outline';
              }
              return <Ionic name={iconName} size={size} colour={colour} />;
            },
          })}>
          <Tab.Screen name="Notes" component={NoteScreens} />
          <Tab.Screen name="How To Use" component={HowTo} />
          <Tab.Screen name="About" component={AboutScreens} />
        </Tab.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
  // End of MOD 20221105
}

// Begin of DEL 20221105 unused
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//   backgroundColor: 'red',
//    alignItems: 'center',
//    justifyContent: 'center',
//  },
//});
// End of DEL 20221105
