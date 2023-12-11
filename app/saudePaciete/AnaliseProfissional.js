import React from 'react'
import  { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput,ScrollView} from 'react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'

function AnaliseProfissional() {

    const [analiseProfissional,setAnaliseProfissional]= useState('Não existe Comentários')



  return (
    <View style={{ alignItems:"center",borderRadius:15, marginTop:20,width:'100%',justifyContent:"center",alignContent:"center" , minHeight:150,textAlign:"center"}}>


        
     
        <Text style={{color:'darkolivegreen', fontSize:20, fontWeight:'bold', letterSpacing:4, marginTop:10, textAlign:"center"}}>
        ANÁLISE PROFISSIONAL
        </Text>


     
     
      <View style={{flexDirection:'column', width:'100%',backgroundColor:'gray'}}>
        <Text style={{color:'darkolivegreen', fontSize:15, fontWeight:'bold', letterSpacing:4, marginTop:30, textAlign:"center"}}>
       SOBRE CALORIAS
        </Text>



      <View style={{flexDirection:'column', alignContent:'center',justifyContent:"center",width:"100%"}}>
<TouchableOpacity >


  

<TextInput

value="3000.00"/>

</TouchableOpacity>
<Text>Gasto Calórico</Text>
</View>



<View >


<TouchableOpacity >
<TextInput

value="3000.00"/>

</TouchableOpacity >
<Text>Gasto Calórico</Text>



</View>





      </View>





















        <View style={{ justifyContent:"center", alignItems:"center", borderRadius:15,borderWidth:3, borderColor:'orange', marginTop:10,width:330,position:'relative', backgroundColor:'darkolivegreen',marginBottom:10} }>



<View style={{minHeight:90, marginBottom:10, justifyContent:"center"}}>



<Text style={{color:"white", fontSize:20, fontWeight:"bold", fontStyle:"italic",}}>{analiseProfissional}</Text>

</View>






        </View>


        <View style={{ justifyContent:"center", alignItems:"center", borderRadius:15,borderWidth:3, borderColor:'orange', marginTop:10,width:330,position:'relative', backgroundColor:'white',marginBottom:10} }>



<View style={{minHeight:90, marginBottom:10, justifyContent:"center"}}>



<TextInput style={{color:"darkolivegreen", fontSize:20, fontWeight:"bold", fontStyle:"italic",}}
value='chat do usuario'/>
</View>






        </View>


    </View>
  )
}

export default AnaliseProfissional