import React from 'react'
import  { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput,FlatList} from 'react-native';
import { FisicoContext } from '../usercontext/FisicoContext';
import DataAtividade from './DataAtividade';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ExercicioFisico from './ExercicioFisico';
function AtividadesFisicas({dataAtual}) {
  

  
    const {atividadeFisica,setAtividadeFisica,atividadeFisicaController, setAtividadeFisicaController,peso,altura,idade}= useContext(FisicoContext)
    const equivalences = {
      'Corrida': 7.0,
      'Caminhada': 3.9,
      'Ciclismo': 6.0,
      'Natação ': 7.0,
      'Pular corda': 12.0,
      'Levantamento de peso': 3.0,
      'Yoga': 2.0,
      'Pilates': 3.0,
      'Dança aeróbica': 5.0,
      'Tênis': 7.0,
      'Basquete': 6.0,
      'Futebol': 8.0,
      'Escalada': 8.0,
      'Remo': 6.0,
      'Patinação': 7.0,
      'Aulas de grupo (Zumba, spinning, etc.)': 6.0,
      'Futebol Americano': 8.0, // Adicionado conforme sua pergunta anterior
      'Musculação': 3.0,
      'Crossfit': 8.0, // Valor estimado, pode variar dependendo do treino específico
      'Calistenia': 4.0, // Valor estimado, pode variar dependendo do tipo de exercícios
    };

      useEffect(()=>{
      //console.log(JSON.stringify(atividadeFisica, null, 2)+ typeof atividadeFisica)

      },[atividadeFisica])


      function handleExpandirCampo(){



        if(!atividadeFisicaController){
      
            setAtividadeFisicaController(true)
        }else{
            setAtividadeFisicaController(false)
        }
      }
  
useEffect(()=>{

console.log(JSON.stringify(atividadeFisica, null, 3)+ '     '+ typeof atividadeFisica + '     '+ 'useEffecrt do atividadeFisica')



},[atividadeFisica])


const adicionarAtividadeFisica=()=>{
  const atividadeFisicaRecebida = [...atividadeFisica]

  const NovoObjeto = {
   
    'idAtividadeFisica':'0',
    'diaAtividade': dataAtual,
    'horaAtividade':"00:00",
    'tempoMinutos':'0',
    'tempoNormalHoraMinuto':'',
    'atividadeFisica': 'Selecione a atividade',
    'kilocaloriasAtividade':'0'

    
  }

  atividadeFisicaRecebida.push(NovoObjeto)

  atividadeFisicaRecebida.forEach((item, index) => {
    item.idAtividadeFisica = index;
  });
 // console.log( typeof atividadeFisicaRecebida)
  setAtividadeFisica(atividadeFisicaRecebida)
}

  
useEffect(()=>{

  
},[])





function calcularGastoCalorico(exercicioFisico, duracaoMinutos, peso) {
  const MET = equivalences[exercicioFisico];
 
  if (MET === undefined) {
    return '0';
  }

if(!exercicioFisico||!duracaoMinutos|| !peso){
  return '0';
}

  const gastoCalorico = MET * peso * (duracaoMinutos / 60);
  return gastoCalorico.toFixed(2).toString();
}





function handleDataDadosSelecionada(idAtividadeFisica, totalMinutos, data,HoraMinutoSalvar) {
  setAtividadeFisica((prevData) => {
    const newData = [...prevData];
    const exercicioIndex = newData.findIndex((item) => item.idAtividadeFisica === idAtividadeFisica);

    if (exercicioIndex !== -1) {
      newData[exercicioIndex].tempoMinutos = totalMinutos;
      newData[exercicioIndex].diaAtividade = data;
      newData[exercicioIndex].tempoNormalHoraMinuto = HoraMinutoSalvar

        
      const atividade = newData[exercicioIndex].atividadeFisica
      const Calorias = calcularGastoCalorico(atividade,totalMinutos,peso)
      newData[exercicioIndex].kilocaloriasAtividade = Calorias
      console.log(Calorias+ ' Calorias Calorias Calorias')
      return newData; 
    }
  });
}

function handleAtividadeSelecionada(idAtividadeFisica,atividadeSelecionada){

  setAtividadeFisica((prevData)=>{
      const newData =[...prevData]
      const exercicioIndex =newData.findIndex((item)=>item.idAtividadeFisica ===idAtividadeFisica)
 
    
4
      if (exercicioIndex !== -1) {
        
        newData[exercicioIndex].atividadeFisica = atividadeSelecionada
        const atividade = newData[exercicioIndex].atividadeFisica
        const totalMinutos = newData[exercicioIndex].tempoMinutos
        const Calorias = calcularGastoCalorico(atividade,totalMinutos,peso)
        newData[exercicioIndex].kilocaloriasAtividade = Calorias
        return newData; 
      
      }
  })

  }

      const AtividadeItem = ({ item }) => (
        <View style={{width:'100%', flexDirection:'column',height:200,justifyContent:"space-around", alignContent:'center', alignItems:"center",textAlign:"center",backgroundColor:'orange', alignSelf:"center", borderRadius:15, marginBottom:10}}>
          <View style={{width:'100%', flexDirection:'row',justifyContent:"space-around", alignContent:'center', alignItems:"center",textAlign:"center",backgroundColor:'orange', alignSelf:"center", borderRadius:15}}>

<View style={{alignContent:"center", textAlign:'center', alignItems:'center', width:130}}>


        <Text style={{fontSize:10, color:"darkolivegreen"}}>CLIQUE NA DATA PARA</Text>
        <DataAtividade item ={item} initialValue= {item.diaAtividade} horaminuto={item.tempoNormalHoraMinuto} onDataDadosSelecinada ={(totalMinutos,data,HoraMinutoSalvar)=>handleDataDadosSelecionada(item.idAtividadeFisica,totalMinutos,data,HoraMinutoSalvar)} />
        <Text style={{fontSize:10, color:"darkolivegreen"}}> ALTERAR A HORA</Text>
        <View style={{backgroundColor:"darkolivegreen", flexDirection:"row", width:"90%", alignContent:"center", textAlign:"center", justifyContent:"space-around", marginTop:2, borderRadius:15}}>
        <Text style={{ color: 'white', fontSize: 23, fontWeight:"bold" }}>
  {item.tempoNormalHoraMinuto ? item.tempoNormalHoraMinuto : '00:00'}
</Text>
</View>
        </View>




        <TextInput  value={`${item.kilocaloriasAtividade} KCAL`} style={{fontWeight:"bold", fontSize:20, backgroundColor:'gray', width:130,  color:"orange" , height:60, textAlign:"center",borderRadius:15,borderWidth:3,borderColor:'orangered'} }  editable={false}/>


        <TouchableOpacity onPress={()=>areaRemoverRefeicao(item.idAtividadeFisica)} style={{alignItems:"center"}}>

     
        <AntDesign  name="delete" size={30} style={{ color: "red" }}/>
<Text style={{color:'red'}}>Excluir</Text>


        </TouchableOpacity>
       
          </View>
          <ExercicioFisico item={item} initialValue={item.atividadeFisica} onAtividadeSelecionada={(atividaeSelecionada)=>handleAtividadeSelecionada(item.idAtividadeFisica,atividaeSelecionada)}/>
      

        </View>
      );

      const areaRemoverRefeicao = (idAtividadeFisica) => {
        const novaAtividadeFisica = atividadeFisica.filter((atividade) => atividade.idAtividadeFisica !== idAtividadeFisica);
       
        
        
        setAtividadeFisica(novaAtividadeFisica);
      };
  
    
  return (
    <View style={{ justifyContent:"center", alignItems:"center", borderRadius:15,borderWidth:3, borderColor:'orange', width:350,position:'relative', backgroundColor:'darkolivegreen' }}>


 {atividadeFisicaController ? (
 
 
 <View style={{ width:"100%", minHeight:50,alignContent:"center",alignItems:"center"}}>



<Text style={{color:'white', fontSize:20, fontWeight:'bold', letterSpacing:2, marginTop:10, textAlign:"center", marginLeft:-30}}>MINHAS ATIVIDADES</Text>

<TouchableOpacity onPress={()=>adicionarAtividadeFisica()} style={{backgroundColor:"orange", width:300,height:50, borderRadius:15, justifyContent:"center", alignItems:'center',marginBottom:10,marginTop:20}}>


<Text style={{color:'white', fontSize:20, fontWeight:'bold', letterSpacing:4, textAlign:"center"}}>Adicionar atividade</Text>






</TouchableOpacity>

    <TouchableOpacity onPress={()=>handleExpandirCampo()} style={{  position: 'absolute', top: 10, right: 10 }}>

<AntDesign  name="minuscircle" size={30} style={{ color: "white" }}/>
</TouchableOpacity>

<FlatList
    style={{maxHeight:150, borderRadius:15, borderColor:'orange', borderWidth:2, marginBottom:10,width:'100%'}}
    data={atividadeFisica}
    keyExtractor={(item) => item.idAtividadeFisica.toString()}
    renderItem={({ item }) => <AtividadeItem item={item} />}
  />





        </View>
        ):(



            <View style={{ width:"100%", minHeight:50}}>
            <Text style={{color:'white', fontSize:20, fontWeight:'bold', letterSpacing:2, marginTop:10, textAlign:"center",marginLeft:-30}}>MINHAS ATIVIDADES</Text>

            <TouchableOpacity onPress={()=>handleExpandirCampo()} style={{  position: 'absolute', top: 10, right: 10 }}>
          <AntDesign  name="pluscircle" size={30} style={{ color: "white" }}/>
       
          </TouchableOpacity>
          

        </View>
        
        
        
        )}
        </View>
  )
}

export default AtividadesFisicas



