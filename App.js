import * as React from 'react';
import {Header} from 'react-native-elements';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import db from "./localdb";
import PhonicSoundButton from './phonicsSound';

console.log(db['the'].chunks)

export default class  App extends React.Component {
  constructor(){
    super();
    this.state = {
      text: '',
      chunks:[],
      phonicSounds:[]
    }
  }
  render(){
    return(
     <View style = {styles.container}>
       <Header backgroundColor = 'blue' centerComponent = {{text: 'Monkey Chunky', style: {color: '#fff', fontSize: 20}}}/>
       <Image style = {styles.imageIcon} source = {{uri: 'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png'}}/>
       <TextInput style = {styles.inputBox} 
        onChangeText = {text=>{
         this.setState({text: text});
        }}
        value = {this.state.text} 
        />
       <TouchableOpacity style = {styles.goButton} onPress = {()=>{
         var word = this.state.text.toLowerCase().trim();
         db[word]? (
         this.setState({chunks: db[word].chunks}),
         this.setState({phonicSounds: db[word].phones})
         ):
         Alert.alert('This word is not in the database.')
       }}>
         <Text style = {styles.buttonText}>
            GO
         </Text>
       </TouchableOpacity>

       <View> 
           {this.state.chunks.map((item, index)=>{
             <PhonicSoundButton
             wordChunk = {this.state.chunks[index] }
             soundChunk = {this.state.phonicSounds[index]}
             buttonIndex = {index}
             />
           })}

       </View>


     </View> 
    )
  }
    
}

const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: '#b8b8b8', },
   inputBox: {
     marginTop: 200,
     width: '80%',
     alignSelf: 'center',
     height: 40,
     textAlign: 'center',
     borderWidth: 4,
    },
  goButton: {
     width: '50%',
     height: 55,
     alignSelf: 'center',
     padding: 10,
     margin: 10,
    },
  buttonText: { textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
   },
    displayText: {
      textAlign: 'center',
      fontSize: 30,
    },

    imageIcon: { 
      width: 150,
       height: 150,
        marginLeft: 95,
       },

     chunkButton:{
      width: '60%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 10,
      margin: 5,
      backgroundColor: 'red' }
  });
