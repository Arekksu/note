// Added 20221105
import * as React from 'react';
import { View, Text, Button,} from 'react-native';

function About({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This note app is a User-Friendly note taking app that will allow user to create, write their thoughts, ideas, and etc., 
        Everyone has their ability to shine their thoughts! Developers are willing to help you on your works and share bright ideas!
      </Text> 
    
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text>    
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 
      <Text></Text> 

      <Text>For concern, Contact teamboonote@gmail.com </Text> 
      <Text>We are willing to help you! </Text> 
    




      <Button title="Developer Profiles" onPress={() => navigation.navigate('DevProfile')}></Button>
    </View>   
  );
}

export default About;