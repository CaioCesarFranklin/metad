import React from 'react'
import  { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput} from 'react-native';
import axios from 'axios';
import { MeuPerfilContext } from '../usercontext/PerfilContext'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FisicoContext } from '../usercontext/FisicoContext';


    function MedidasFisica() {

  
        const [medidaFisicaController, setMedidaFisicaController]= useState(true)
        const {circuferenciaAbdomemAtual,setCircuferenciaAbdomemAtual,
          circuferenciaPescocoAtual,setCircuferenciaPescocoAtual,
          circuferenciaQuadrilAtual,setCircuferenciaQuadrilAtual,
          circuferenciaCinturaAtual,setCircuferenciaCinturaAtual} =useContext(FisicoContext)

        function handleExpandirCampo(){



          if(!medidaFisicaController){
        
            setMedidaFisicaController(true)
          }else{
            setMedidaFisicaController(false)
          }
        }
    

 const handlePescoçoChange = (text) => {

 // Remover caracteres não numéricos, exceto pontos
const numericText = text.replace(/[^\d]/g, '');
    
 // Garantir que não há mais de um ponto decimal
        if(numericText >= 1000){
 
 
  setCircuferenciaPescocoAtual('')

}else{   
   // Restante da lógica, se necessário

   setCircuferenciaPescocoAtual(numericText);
  
  }
 
 console.log(typeof numericText);

         
          
        };
      





        const handleCinturaChange = (text) => {

          const numericText = text.replace(/[^\d]/g, '');
  

          if(numericText >= 1000){
 
 

            setCircuferenciaCinturaAtual('')
          }else{   
             // Restante da lógica, se necessário
          

             setCircuferenciaCinturaAtual(numericText);
            }


        };
      








        const handleAbdomenChange = (text) => {
          
          const numericText = text.replace(/[^\d]/g, '');
  

          if(numericText >= 1000){
 
 

            setCircuferenciaAbdomemAtual('')
          }else{   
             // Restante da lógica, se necessário
          

             setCircuferenciaAbdomemAtual(numericText);
            }



        };
      




        const handleQuadrilChange = (text) => {
         
          const numericText = text.replace(/[^\d]/g, '');
  

          if(numericText >= 1000){
 
 

            setCircuferenciaQuadrilAtual('')
          }else{   
             // Restante da lógica, se necessário
          

             setCircuferenciaQuadrilAtual(numericText);
            }

          

        };
      

        
      return (
    <View style={{ justifyContent: "center", alignContent: "center", width: '100%', borderRadius: 15, position: 'relative' }}>

        {medidaFisicaController ? (
        <View style={{ width:"100%"}}>


<Text style={{ alignItems: "center", color: "darkolivegreen", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 20, marginBottom: 15, marginTop: 10,borderRadius:15}}>MINHAS MEDIDAS</Text>
        <TouchableOpacity onPress={()=>handleExpandirCampo()} style={{  position: 'absolute', top: 10, right: 10 }}>

          <AntDesign  name="pluscircle" size={30} style={{ color: "white" }}/>
          </TouchableOpacity>
  
      
          </View>
          ):(
        <View  >



<Text style={{ alignItems: "center", color: "darkolivegreen", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 20,marginBottom: 10, marginTop: 5  ,borderRadius:15}}>MINHAS MEDIDAS</Text>
        
        
        
       <TouchableOpacity onPress={()=>handleExpandirCampo()} style={{  position: 'absolute', top: 10, right: 10 }}>
          <AntDesign  name="minuscircle" size={30} style={{ color: "white" }}/>
       
          </TouchableOpacity>

      {/* area de cima */}
      <View style={{flexDirection:'row',justifyContent:"space-around",width:"100%"}}>
      
      
      {/*pescoço */}
        <View style= {{flexDirection:'column'}}>
      
      <View style={{ flexDirection:"row", justifyContent:'center',alignContent:"center"}}>
      
      <View style={{ marginBottom:8}}>
      
      <Text style={{  color:"darkolivegreen",letterSpacing:2, fontWeight:"bold", fontSize:15, marginRight:5, }}>Pescoço</Text>
      <Text style={{   color:"darkolivegreen", justifyContent:"center",textAlign:"center",letterSpacing:2, fontWeight:"bold", fontSize:10, marginRight:5, marginTop:-4 }}>(cm)</Text>
      </View>
      
      <Entypo name="ruler"   size={30} style={{ color:"darkolivegreen"}}/>
           
      </View>
      
           <TextInput
            keyboardType="numeric"
            style={styles.inputMedidas}
            placeholder='Pescoço'
            placeholderTextColor='darkolivegreen'
            value={circuferenciaPescocoAtual}
            onChangeText={handlePescoçoChange}
            editable={false}
            />
      
      
      </View>
         
      {/*cintura */}
      <View style={{flexDirection:"column"}}>
      
      
         
      <View style={{ flexDirection:"row", justifyContent:'center',alignContent:"center"}}>
      
      
      
            
      <View style={{ marginBottom:8}}>
      
      
            <Text style={{  color:"darkolivegreen", justifyContent:"center",textAlign:"center",letterSpacing:2, fontWeight:"bold", fontSize:15, marginRight:5 }}>Cintura</Text>
            <Text style={{   color:"darkolivegreen", justifyContent:"center",textAlign:"center",letterSpacing:2, fontWeight:"bold", fontSize:10, marginRight:5, marginTop:-4 }}>(cm)</Text>
            </View>
      
           <Entypo name="ruler"   size={30} style={{ color:"darkolivegreen"}}/>
          </View>
      
      
      
           <TextInput
            keyboardType="numeric"
            style={styles.inputMedidas}
            placeholder='Cintura'
            placeholderTextColor='darkolivegreen'
            value={circuferenciaCinturaAtual}
            onChangeText={handleCinturaChange}
            editable={false}
            
            />
      
            
            </View>
            </View>
      
      {/* area de baixo */}
      <View style={{flexDirection:"row", justifyContent:"space-around",marginTop:10, width:"100%", marginBottom:10}}>
      
      
      {/*Abdomen */}
      <View style={{ flexDirection:"column"}}>
      
      
      <View style={{ flexDirection:"row", justifyContent:'center',alignContent:"center"}}>
      <View style={{ marginBottom:8}}>
      
      <Text style={{  color:"darkolivegreen", justifyContent:"center",textAlign:"center",letterSpacing:2, fontWeight:"bold", fontSize:15, marginRight:5 }}>Abdômen</Text>
      <Text style={{   color:"darkolivegreen", justifyContent:"center",textAlign:"center",letterSpacing:2, fontWeight:"bold", fontSize:10, marginRight:5, marginTop:-4 }}>(cm)</Text>
      </View>
      <Entypo name="ruler"   size={30} style={{ color:"darkolivegreen"}}/>
      </View>
      <TextInput
        keyboardType="numeric"
            style={styles.inputMedidas}
            placeholder='Abdômen'
            placeholderTextColor='darkolivegreen'
            value={circuferenciaAbdomemAtual}
            onChangeText={handleAbdomenChange}
            editable={false}
            />
      
           
      </View>
      
      
         
      {/*Quadril */}
      <View style={{flexDirection:"column"}}>
      
      
         
          <View style={{ flexDirection:"row", justifyContent:'center',alignContent:"center"}}>
          <View style={{ marginBottom:8}}>
      
            <Text style={{  color:"darkolivegreen", justifyContent:"center",textAlign:"center",letterSpacing:2, fontWeight:"bold", fontSize:15, marginRight:5 }}>Quadril</Text>
            <Text style={{   color:"darkolivegreen", justifyContent:"center",textAlign:"center",letterSpacing:2, fontWeight:"bold", fontSize:10, marginRight:5, marginTop:-4 }}>(cm)</Text>
            </View>
           <Entypo name="ruler"   size={30} style={{ color:"darkolivegreen"}}/>
          </View>
      
      
      
           <TextInput
            keyboardType="numeric"
            style={styles.inputMedidas}
            placeholder='Quadril'
            placeholderTextColor='darkolivegreen'
            value={circuferenciaQuadrilAtual}
            onChangeText={handleQuadrilChange}
            editable={false}
            
            />
      
            
            </View>
            </View>
            </View>

            )}
            </View>
         
      
      )
    }
    
    const styles = StyleSheet.create({
        input: {
          textAlign:"center",
          color:"darkolivegreen",
          width: 90,
          height: 40,
          borderColor: 'darkolivegreen',
          borderWidth: 4,
          fontSize:20,
          fontWeight:'bold',
          borderRadius:15
  
  
        },
        inputMedidas:{
          textAlign:"center",
          color:"darkolivegreen",
          width: 130,
          height: 50,
          borderColor: 'darkolivegreen',
          borderWidth: 4,
          fontSize:20,
          fontWeight:'bold',
          borderRadius:15
  
  
        },
      });

    export default MedidasFisica