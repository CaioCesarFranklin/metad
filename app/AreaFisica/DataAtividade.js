import React from 'react'
import  { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput,FlatList,Modal,Button} from 'react-native';
import { FisicoContext } from '../usercontext/FisicoContext';

import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
function DataAtividade({item,onDataDadosSelecinada, initialValue,horaminuto}) {
    const {atividadeFisica,setAtividadeFisica,atividadeFisicaController, setAtividadeFisicaController,dataAtual, setDataAtual}= useContext(FisicoContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [dateInput, setDateInput] = useState('');
    const [dia,setDia]=useState('')   
    const [mes,setMes]=useState('')
    const [hora,setHora]= useState('') 
  const [minuto,setMinuto]=useState('')

const [dadoHora,setDadoHora]=useState('')
const [totalMinutos,setTotalMinutos]=useState('')
const [dataData,setDataData]=useState('')
  const [dataController,setDataController]= useState(false)
  const [ corController,setCorController]= useState('orange')
    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };


    useEffect(()=>{

      console.log(initialValue+"initialValue")

      const partes = initialValue.split('/');

      // Extraia os valores para as variáveis dia, mes e ano
      const diaConvertido = parseInt(partes[0], 10);
      const mesConvertido = parseInt(partes[1], 10);
      const mesConvertidoString = mesConvertido.toString()
      const diaConvertidoString= diaConvertido.toString()
      console.log( typeof diaConvertidoString)
      setDia(diaConvertidoString)
      setMes(mesConvertidoString)
      




    },[initialValue])












useEffect(()=>{



if(hora && minuto){
  setDadoHora(`${hora}:${minuto}`)

const horaConvertida = converterHorasParaMinutos(hora)
const tratarMinuto = parseFloat(minuto)

const totalMinutos = horaConvertida + tratarMinuto;

setTotalMinutos(totalMinutos.toString())
}

if(!hora){

  setDadoHora(`00:${minuto}`)
}
if(!minuto){
  setDadoHora(`${hora}:00`)

}



},[hora,minuto])



useEffect(()=>{

  setDataData(`${dia}/${mes}`)






},[dia,mes])
useEffect(() => {
  console.log(horaminuto + " iase ijek jak jsak jeksa jke jsalkejksa j skl");

  // Dividir a string do horário nos componentes de hora e minuto
  const [hora, minuto] = horaminuto.split(':');
setHora(hora)
setMinuto(minuto)
  console.log('Hora:', hora);
  console.log('Minuto:', minuto);

}, [horaminuto]);

















useEffect(()=>{

  console.log(dadoHora+ '    dadoHora')

  

  
  },[dadoHora])

    useEffect(()=>{

  if(!dia&&!mes&&!hora&& !minuto){
    
    setDataController(true)
    setCorController('red')
  
  
  }else{
    setDataController(false)
    setCorController('orange')
  
  }
 


    },[dia,mes,hora,minuto])



    function converterHorasParaMinutos(hora) {
      // Converte a string para um número
      const horasComoNumero = parseFloat(hora);
    
      // Verifica se a conversão foi bem-sucedida e se o número é positivo
      if (!isNaN(horasComoNumero) && horasComoNumero >= 0) {
        // Calcula o número de minutos
        const minutos = horasComoNumero * 60;
        return minutos;
      } else {
        // Se a conversão falhou ou o número não é válido, retorna null ou lança um erro
        return null;
      }
    }
    


    const verificarDia = (text) => {
      const resposta = text.trim(); // Remova espaços em branco antes e depois do texto
      const regexNumeros = /^[0-9]*$/;
      const meuNumeroInteiro = parseInt(resposta, 10);
    
      if (!regexNumeros.test(resposta)) {
        console.log('Dia inválido. Por favor, forneça apenas números.');
        setDia('');
      } else if (meuNumeroInteiro === 0) {
        setDia('');
      } else {
        // Verifique o comprimento da string
        if (resposta.length > 2) {
          console.log('Dia inválido. Por favor, forneça no máximo dois dígitos.');
          setDia('');
        } else if (meuNumeroInteiro >= 32) {
          console.log('Dia inválido. Por favor, forneça um número menor que 32.');
          setDia('');
        } else {
          setDia(resposta);
        }
      }
    };
    


    const VerificarMes = (text) => {
      const resposta = text.trim(); // Remova espaços em branco antes e depois do texto
      const regexNumeros = /^[0-9]*$/;
      const meuNumeroInteiro = parseInt(resposta, 10);
    
      if (!regexNumeros.test(resposta)) {
        console.log('Mês inválido. Por favor, forneça apenas números.');
        setMes('');
      } else if (meuNumeroInteiro === 0) {
        setMes('');
      } else {
        // Verifique o comprimento da string
        if (resposta.length > 2) {
          console.log('Mês inválido. Por favor, forneça no máximo dois dígitos.');
          setMes('');
        } else if (meuNumeroInteiro >= 13) {
          console.log('Mês inválido. Por favor, forneça um número menor que 13.');
          setMes('');
        } else {
          setMes(resposta);
        }
      }
    };
    



const VerificarHora = (text) => {
  const resposta = text.trim(); // Remova espaços em branco antes e depois do texto
  const regexNumeros = /^[0-9]*$/;
  const meuNumeroInteiro = parseInt(resposta, 10);

  if (!regexNumeros.test(resposta)) {
    console.log('Hora inválida. Por favor, forneça apenas números.');
    setHora('');
  } else if (meuNumeroInteiro === null) {  
    setHora('00');
  } else {
    // Verifique o comprimento da string
    if (resposta.length > 3) {
      console.log('Hora inválida. Por favor, forneça no máximo três dígitos.');
      setHora('');
    } else if (meuNumeroInteiro >= 60) {
      console.log('Hora inválida. Por favor, forneça um número menor que 60.');
      setHora('');
    } else {
      setHora(resposta);
    }
  }
};




const VerificarMinuto = (text) => {
  const resposta = text.trim(); // Remova espaços em branco antes e depois do texto
  const regexNumeros = /^[0-9]*$/;
  const meuNumeroInteiro = parseInt(resposta, 10);

  if (!regexNumeros.test(resposta)) {
    console.log('Minuto inválido. Por favor, forneça apenas números.');
    setMinuto('');
  } else if (meuNumeroInteiro === 0) {
    setMinuto('');
  } else {
    // Verifique o comprimento da string
    if (resposta.length > 2) {
      console.log('Minuto inválido. Por favor, forneça no máximo dois dígitos.');
      setMinuto('');
    } else if (meuNumeroInteiro >= 60) {
      console.log('Minuto inválido. Por favor, forneça um número menor que 60.');
      setMinuto('');
    } else {
      setMinuto(resposta);
    }
  }
};

















































    

  
  
const saveDate = () => {
  // Verifica se hora, minuto, dia e mês estão vazios e atribui '00' a eles
  const horaSalvar = hora || '00';
  const minutoSalvar = minuto || '00';
  const diaSalvar = dia || '00';
  const mesSalvar = mes || '00';

  // Combina os valores formatados para totalMinutos e dataData
  const totalMinutosSalvar = `${converterHorasParaMinutos(horaSalvar) + parseFloat(minutoSalvar)}`;
  const dataDataSalvar = `${diaSalvar}/${mesSalvar}`;
 const HoraMinutoSalvar = `${horaSalvar}:${minutoSalvar}`
  // Chama a função de callback com os valores formatados
  onDataDadosSelecinada(totalMinutosSalvar,dataDataSalvar,HoraMinutoSalvar);
  // Fecha o modal após salvar
  closeModal();
};


  return (
    <View style={{flexDirection:'row',  justifyContent:'space-around'}}> 
    


    <TouchableOpacity onPress={openModal}>
        <View style={{ backgroundColor: 'darkolivegreen', width: 80, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 15, borderWidth: 5, borderColor: 'green' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{dataData}</Text>
        </View>
      </TouchableOpacity>






      



        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, alignItems: 'center',height:"100%",width:"100%", justifyContent:'center', alignContent:'center',backgroundColor:'rgba(0,0,0,0.7)'}}>
          <View style={{   borderRadius: 10, width: '80%' , backgroundColor:"white",justifyContent:'center', alignContent:'center',alignItems:"center",borderRadius:15}}>

          <Text style={{color:"black", fontSize:20, fontWeight:'bold',marginTop:15, color: 'darkolivegreen'}}>Digite a data (dia/mês):</Text>



          <View style={{   flexDirection:"row",marginTop:25, marginBottom:25}}>
         

         <View style={{flexDirection:'column', justifyContent:"center", alignContent:'center'}}>

            <TextInput
              style={{  fontSize:45, fontWeight:'bold',borderBottomWidth: 1, marginBottom: 10 , color: 'darkolivegreen',width:70,textAlign:"center"}}
              placeholder="00"
              value={dia}
              onChangeText={(text) => verificarDia(text)}
              keyboardType="numeric"
              />


    <Text style={{textAlign:'center', fontSize:20, fontWeight:"bold", color: 'darkolivegreen'}}>DIA</Text>

              </View>


            <Text   style={{ color:"black", fontSize:45, fontWeight:'bold', color: 'darkolivegreen' }}>/</Text>
          
            <View style={{flexDirection:'column', justifyContent:"center", alignContent:'center'}}>

            <TextInput
              style={{  fontSize:45, fontWeight:'bold',borderBottomWidth: 1, marginBottom: 10, color: 'darkolivegreen',width:70,textAlign:"center" }}
              placeholder="00"
              value={mes}
              onChangeText={(text) => VerificarMes(text)}
              keyboardType="numeric"
            />

<Text style={{textAlign:'center', fontSize:20, fontWeight:"bold", color: 'darkolivegreen'}}>MÊS</Text>
  </View>





  </View>







<View>

<Text style={{color:"black", fontSize:20, fontWeight:'bold', color: 'darkolivegreen',marginBottom:15}}>Digite o horário (hora/minuto):</Text>

</View>


<View style={{   flexDirection:"row",marginTop:25, marginBottom:25}}>
         

         <View style={{flexDirection:'column', justifyContent:"center", alignContent:'center'}}>

            <TextInput
              style={{ fontSize:45, fontWeight:'bold',borderBottomWidth: 1, marginBottom: 10 , color: 'darkolivegreen',width:70,textAlign:"center"}}
              placeholder="00"
              value={hora}
              onChangeText={(text) => VerificarHora(text)}
              keyboardType="numeric"
              />


    <Text style={{textAlign:'center', fontSize:20, fontWeight:"bold", color: 'darkolivegreen'}}>HORA</Text>

              </View>


            <Text   style={{ color:"black", fontSize:45, fontWeight:'bold', color: 'darkolivegreen' }}>:</Text>
          
            <View style={{flexDirection:'column', justifyContent:"center", alignContent:'center'}}>

            <TextInput
              style={{ color:"black", fontSize:45, fontWeight:'bold',borderBottomWidth: 1, marginBottom: 10, letterSpacing:4, color: 'darkolivegreen',width:70,textAlign:"center" }}
              placeholder="00"
              value={minuto}
              onChangeText={(text) => VerificarMinuto(text)}
              keyboardType="numeric"
            />

<Text style={{textAlign:'center', fontSize:20, fontWeight:"bold", color: 'darkolivegreen'}}>MIN</Text>
  </View>





  </View>


<View style={{flexDirection:'row', justifyContent:'space-around', width:"100%", marginBottom:30}}>

<TouchableOpacity onPress={saveDate} disabled={dataController}> 

 <Text style={{textAlign:'center', fontSize:20, fontWeight:"bold", color: 'darkolivegreen',backgroundColor:corController, borderRadius:15,padding:7}}>TUDO OK!</Text>

 </TouchableOpacity>

 
<TouchableOpacity onPress={closeModal} >
<Text style={{textAlign:'center', fontSize:20, fontWeight:"bold", color: 'white', backgroundColor:'orangered',borderRadius:15,padding:7}}>Decidir depois</Text>
</TouchableOpacity>

</View>
         
          </View>
        </View>
      </Modal>
        </View>
  )
}

export default DataAtividade