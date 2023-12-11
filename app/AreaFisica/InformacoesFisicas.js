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
function InformacoesFisicas() {

 
    const [informacoesFisicasController,setInformacoesFisicasControllerController]= useState(true)
  const {peso,setPeso,
    altura,setAltura,
    idade,setIdade} = useContext(FisicoContext)


  
      function handleExpandirCampo(){



  if(!informacoesFisicasController){

    setInformacoesFisicasControllerController(true)
  }else{
    setInformacoesFisicasControllerController(false)
  }
      }


      const funcaoAltura = (text) => {
        // Remover caracteres não numéricos, exceto pontos
        const numericText = text.replace(/[^\d]/g, '');
        
        // Garantir que não há mais de um ponto decimal
       if(numericText >= 260){
        
        
        setAltura('')
    
      }else{   
          // Restante da lógica, se necessário
          setAltura(numericText)}
        
        console.log(typeof numericText);
     
      };
    
    
    
    


      const funcaoPeso = (text) => {
        // Remover caracteres não numéricos, exceto pontos
        const numericText = text.replace(/[^\d.]/g, '');
      
        // Dividir o texto nos pontos e verificar o número de partes
        const parts = numericText.split('.');
      
        // Garantir que haja no máximo uma parte após o ponto
        if (parts.length > 2 || (parts.length === 2 && parts[1].length > 1)) {
          // Se a entrada for inválida, definir peso como string vazia
          setPeso('');
          return;
        }
      
        // Se a entrada for válida, definir o estado do peso
        setPeso(numericText);
      };
      
    
    
      const funcaoIdade = (text) => {
        const numericText = text.replace(/[^\d]/g, '');
    
        if(numericText> 123){
          setIdade('')
        }else{
    
          setIdade(numericText)
        }
        console.log(typeof text)
      };

      
      

      return (
        <View style={{ justifyContent: "center", alignContent: "center", width: '100%', borderRadius: 15, position: 'relative' }}>
          {informacoesFisicasController ? (
            <View>
  <Text style={{ alignItems: "center", color: "darkolivegreen", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 20, marginBottom: 15, marginTop: 10,borderRadius:15}}>MINHAS INFORMAÇÕES</Text>
             
              <TouchableOpacity onPress={()=>handleExpandirCampo()} style={{  position: 'absolute', top: 10, right: 10 }}>

        <AntDesign  name="pluscircle" size={30} style={{ color: "white" }}/>
        </TouchableOpacity>
              {/* Restante do conteúdo */}
      
            </View>
          ) : (
            <View>
<Text style={{ alignItems: "center", color: "darkolivegreen", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 20,marginBottom: 10, marginTop: 5  ,borderRadius:15}}>MINHAS INFORMAÇÕES</Text>
             
             

            <TouchableOpacity onPress={()=>handleExpandirCampo()} style={{  position: 'absolute', top: 10, right: 10 }}>
          <AntDesign  name="minuscircle" size={30} style={{ color: "white" }}/>
       
          </TouchableOpacity>


              <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", marginBottom: 25 }}>
                <View style={{ flexDirection: "column", justifyContent: "space-around" }}>
                  <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
                    <View style={{ marginBottom: 8 }}>
                      <Text style={{ color: "darkolivegreen", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 15, marginRight: 5 }}>Peso</Text>
                      <Text style={{ color: "darkolivegreen", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 10, marginRight: 5, marginTop: -4 }}>(kg)</Text>
                    </View>
                    <FontAwesome5 name="weight" size={30} color={"darkolivegreen"} />
                  </View>
                  <TextInput
                     keyboardType="numeric"
                    style={styles.input}
                    placeholder='Peso'
                    placeholderTextColor='darkolivegreen'
                    value={peso}
                    onChangeText={(text) => {
                      if (funcaoPeso(text) || text === '') {
                        setPeso(text);
                      }
                    }}
                    editable={false}
                  />
                </View>
      
                <View>
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                      <View style={{ marginBottom: 8 }}>
                        <Text style={{ alignItems: "center", color: "darkolivegreen", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 15, marginRight: 5 }}>Altura</Text>
                        <Text style={{ color: "darkolivegreen", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 10, marginRight: 5, marginTop: -4 }}>(cm)</Text>
                      </View>
                      <MaterialCommunityIcons name="human-male-height-variant" size={30} color={"darkolivegreen"} />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput
                         keyboardType="numeric"
                        style={styles.input}
                        placeholder='Altura'
                        placeholderTextColor='darkolivegreen'
                        value={altura}
                        onChangeText={(text) => { if (funcaoAltura(text) || text === "") { setAltura(text) } }}
                        editable={false}
                      />
                    </View>
                  </View>
                </View>
      
                <View>
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                      <View style={{ marginBottom: 8 }}>
                        <Text style={{ alignItems: "center", color: "darkolivegreen", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 15, marginRight: 5 }}>Idade</Text>
                        <Text style={{ color: "darkolivegreen", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 10, marginRight: 5, marginTop: -4 }}>(anos)</Text>
                      </View>
                      <Octicons name="number" size={30} color="darkolivegreen" />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput
                         keyboardType="numeric"
                        style={styles.input}
                        placeholder='Idade'
                        placeholderTextColor='darkolivegreen'
                        value={idade}
                        onChangeText={(text) => {
                          if (funcaoIdade(text) || text === '') {
                            setIdade(text)
                          }
                        }}
                        editable={false}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      );
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
      width: 90,
      height: 40,
      borderColor: 'darkolivegreen',
      borderWidth: 4,
      fontSize:20,
      fontWeight:'bold',
      borderRadius:15


    },
  });

export default InformacoesFisicas