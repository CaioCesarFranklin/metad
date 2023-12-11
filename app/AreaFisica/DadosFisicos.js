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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AntDesign } from '@expo/vector-icons'; // Usando um ícone de uma biblioteca para React Native
import { FisicoContext } from '../usercontext/FisicoContext';


function DadosFisicos() {

      



    const [probabilidadeMorte, setProbabilidadeMorte] = useState('');
    const [ dadosFisicosController,setDadosFisicosController]= useState(true)

    const {
      peso,
      altura,
      idade,
      circuferenciaAbdomemAtual,
      circuferenciaPescocoAtual,
      circuferenciaCinturaAtual,
      circuferenciaQuadrilAtual
      }=useContext(FisicoContext)


  
  function calcularRCQ(circuferenciaCinturaAtual, circuferenciaQuadrilAtual) {
    if (circuferenciaCinturaAtual > 0 && circuferenciaQuadrilAtual > 0) {
        var rcq = circuferenciaCinturaAtual / circuferenciaQuadrilAtual;
        return rcq.toFixed(2); // Arredonda para duas casas decimais
    } else {
        return "0";
    }
}



var resultadoRCQ = calcularRCQ(circuferenciaCinturaAtual, circuferenciaQuadrilAtual);


    function calcularIMC(peso, altura) {
        // Certifique-se de que peso e altura sejam números positivos
        if (peso <= 0 || altura <= 0) {
          return "Peso e altura devem ser números positivos.";
        }
      
        // Converta a altura para metros, se necessário (por exemplo, altura em centímetros)
        if (altura > 3) {
          altura /= 100; // Converta de centímetros para metros
        }
      
        // Calcule o IMC
        const imc = peso / (altura * altura);
      
        // Arredonde o IMC para uma ou duas casas decimais, se desejar
        return imc.toFixed(2); // Retorna o IMC com duas casas decimais
      }
      
      const resultadoIMC = calcularIMC(peso, altura);



      function calcularPercentualGordura() {
        // Convertendo metros para polegadas (1 metro = 39.3701 polegadas)
        const barrigaPolegadas = circuferenciaAbdomemAtual * 0.393701;
        const pescoçoPolegadas = circuferenciaPescocoAtual * 0.393701;
        const comprimentoPolegadas = altura * 0.393701;
  
        // Calculando o percentual de gordura corporal com base na fórmula
        const percentualGordura =
          86.010 * Math.log10(barrigaPolegadas - pescoçoPolegadas) -
          70.041 * Math.log10(comprimentoPolegadas) + 36.76;
          if (!isFinite(percentualGordura)){return 0} 
          
        return percentualGordura;
      }

    

    const percentualGordura = calcularPercentualGordura();


function handleExpandirCampo(){

if(dadosFisicosController){

  setDadosFisicosController(false)
}else{
  setDadosFisicosController(true)
}

  
}




   return (
    <View style={{ justifyContent: "center", alignContent: "center", width: '100%',  borderRadius: 15, position: 'relative' }}>
      {dadosFisicosController ? (
        <View style={{width:"100%", borderRadius: 15}}>
           
           <Text style={{ alignItems: "center", color: "orange", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 20, marginBottom: 15, marginTop: 10,borderRadius:15}}>MINHAS AVALIAÇÕES</Text>
          
          <TouchableOpacity onPress={()=>handleExpandirCampo()} style={{  position: 'absolute', top: 10, right: 10, borderRadius: 15}}>

          <AntDesign  name="pluscircle" size={30} style={{ color: "white" }}/>
          </TouchableOpacity>

        </View>
      ) : (
        <View style={{width:"100%", borderRadius: 15}}>
          <Text style={{ alignItems: "center", color: "orange", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 20, marginBottom: 15, marginTop: 10,borderRadius:15 }}>MINHAS AVALIAÇÕES</Text>
         
          <TouchableOpacity onPress={()=>handleExpandirCampo()} style={{  position: 'absolute', top: 10, right: 10 }}>

         
          <AntDesign style={{ color: "white" }} name="minuscircle" size={30} />
          </TouchableOpacity>
          {/* Restante do conteúdo */}
          <View>
            {/* Exemplo com R.Q.C */}
            <View style={{ flexDirection: "column", alignItems: "center", marginBottom: 10 }}>
              <Text style={{ color: "white", letterSpacing: 2, fontWeight: "bold", fontSize: 25, marginRight: 5 }}> R.Q.C</Text>
              <Text style={{ color: "orange", letterSpacing: 2, fontWeight: "bold", fontSize: 15 }}> <Text style={{ color: "white", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 15 }}>R</Text>elação <Text style={{ color: "white", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 15 }}>C</Text>intura - <Text style={{ color: "white", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 15 }}>Q</Text>uadril</Text>
              <TextInput
                style={styles.input}
                placeholder='rcqValue'
                placeholderTextColor='orange'
                value={resultadoRCQ}
                editable={false}
              /> 
            </View>

            {/* Exemplo com I.M.C */}
            <View style={{ flexDirection: "column", alignItems: "center", marginBottom: 10 }}>
              <Text style={{ color: "white", letterSpacing: 2, fontWeight: "bold", fontSize: 25, marginRight: 5 }}>I.M.C</Text>
              <Text style={{ color: "orange", letterSpacing: 2, fontWeight: "bold", fontSize: 15 }}> <Text style={{ color: "white", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 15 }}>Í</Text>ndice de  <Text style={{ color: "white", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 15 }}>M</Text>assa <Text style={{ color: "white", justifyContent: "center", textAlign: "center", letterSpacing: 2, fontWeight: "bold", fontSize: 15 }}>C</Text>orporal</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor='orange'
                placeholder='resultadoIMC'
                value={resultadoIMC}
                editable={false}
              />
            </View>

            {/* Exemplo com Percentual de Gordura */}
            <View style={{ flexDirection: "column", alignItems: "center", marginBottom: 10 }}>
              <Text style={{ color: "white", letterSpacing: 2, fontWeight: "bold", fontSize: 25, marginRight: 5 }}>Percentual de Gordura</Text>
              <Text style={{ color: "orange", letterSpacing: 2, fontWeight: "bold", fontSize: 10, marginRight: 5 }}>Aproximado</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor='orange'
                placeholder='%Gordura'
                value={percentualGordura.toFixed(2)}
                editable={false}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    textAlign: "center",
    color: "orange",
    width: 130,
    height: 50,
    borderColor: 'orange',
    borderWidth: 4,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 15
  },
});

export default DadosFisicos