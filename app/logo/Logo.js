import {React,useContext} from 'react'
import { View, Image,StyleSheet,Text  } from 'react-native'; // Certifique-se de que Image seja importado corretamente


function Logo({titulo}) {



  
  return (
    <View style={styles.logoContainer}>
    <Image source={require('../../imagens/metareduzida.jpg')} style={styles.logo} />
    <Text  style={{color: 'white' , fontSize: 20, backgroundColor:"orange" , borderRadius:15, width:170  ,fontWeight: 'bold',textAlign: 'center'}}> {titulo}</Text>
  </View>
);
};

const styles = StyleSheet.create({
logoContainer: {
  borderBottomWidth: 2, // Espessura da borda inferior
  borderBottomColor: 'yellow',
  justifyContent: 'center',
  alignItems: 'center',
},
logo: {
  width:150,
  height: 50,

},
});
export default Logo
