import React from 'react'
import { View,StyleSheet,Image,Text } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


function Apoiadores(){
    return(
<View style={{flexDirection:'column',backgroundColor:"darkolivegreen", justifyContent:"space-around", borderRadius:10, marginTop:-100}}>

<View style={ {height:150, flexDirection:'row',alignItems:"center",justifyContent:"space-around", width:400, backgroundColor:'darkolivegreen' }}>
<View style={{size:20, alignItems:'center'}} >
              <Image source={require('../../imagens/Empresas/walmart.png')}   style={{ width: 100, height: 100,borderRadius: 100, resizeMode:'cover' }} />
              <View style={{alignItems:'center',justifyContent:'center',}}>
                <Text style={{backgroundColor:'darkolivegreen', fontWeight: 'bold',width:100, borderRadius:15, color:'darkolivegreen', textAlign:"center", backgroundColor:'yellow'  }} >Coca-Cola</Text>
              </View>
            </View>


            <View style={{size:20,  alignItems:'center'}} >
              <Image source={require('../../imagens/Empresas/coca.png')}   style={{ width: 100, height: 100,borderRadius: 100 }} />
              <View >
              <Text style={{backgroundColor:'yellow',fontWeight: 'bold',color: 'darkolivegreen', width:100, borderRadius:15, textAlign:"center"  }}>Coca-Cola</Text>
              </View>
            </View>

            <View style={{size:20,  alignItems:'center'}} >
              <Image source={require('../../imagens/Empresas/walmart.png')}   style={{ width: 100, height: 100,borderRadius: 100 }} />
              <View >
              <Text style={{backgroundColor:'yellow',fontWeight: 'bold', width:100, borderRadius:15, color:'darkolivegreen', textAlign:"center"  }}>Coca-Cola</Text>
              </View>
            </View>
            
           

</View>
<Text style={{fontSize:30,  fontWeight: 'bold', width:400, backgroundColor:'darkolivegreen', color:'white', textAlign:'center'}}> que conseguimos ir ALÉM</Text>


   
<Text style={{fontSize:30,  fontWeight: 'bold', width:400, backgroundColor:'darkolivegreen', color:'white', textAlign:'center'}}> para ajudar VOCÊ.</Text>

<View style={{alignItems:'center'}}>
<FontAwesome5 name="donate"   size={200} style={{ color:"yellow", alignItems:'center'}}/>
</View>
<Text style={{fontSize:30,  fontWeight: 'bold', width:400, backgroundColor:'darkolivegreen', color:'white', textAlign:'center'}}> APOIE A MeTaD.</Text>

</View>
    )
}
export default Apoiadores