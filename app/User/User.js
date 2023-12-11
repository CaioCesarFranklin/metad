import React from 'react'
import  { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList,StyleSheet,TextInput,ScrollView,Modal } from 'react-native';
import axios from 'axios';
import { DietaContext } from '../usercontext/DietaContext';
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AntDesign } from '@expo/vector-icons'; // Usando um ícone de uma biblioteca para React Native
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Camera} from 'expo-camera'

import 'moment/locale/pt-br';
import MedidasFisica from '../AreaFisica/MedidasFisica';
import InformacoesFisicas from '../AreaFisica/InformacoesFisicas';
import CompromissosPaciente from '../saudePaciete/CompromissosPaciente';
import DadosFisicos from '../AreaFisica/DadosFisicos';
import Imprevistos from '../saudePaciete/Imprevistos';
import { FisicoContext } from '../usercontext/FisicoContext';
import AtividadesFisicas from '../AreaFisica/AtividadesFisicas';
import AnaliseProfissional from '../saudePaciete/AnaliseProfissional';


function User() {
  

  const [modalVisible1, setModalVisible1] = useState(false);
const [modalVisible1Controller, setModalVisible1Controller]= useState(false)
const [modalVisible1Cor, setModalVisible1Cor]= useState('darkolivegreen')

const [salvarExercicioController,setSalvarExercicioController]=useState(false)


  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [pesoModal,setPesoModal]=useState('')
  const [pescocoModal,setPescocoModal]=useState('')
  const [cinturaModal,setCinturaModal]=useState('')
 
  const [abdomemModal,setAbdomemModal]=useState('')
  const [quadrilModal,setQuadrilModal]=useState('')
  const {user}=useContext(DietaContext)
 
  const [userName, setUserName] = useState('')


  const [probabilidadeMorte, setProbabilidadeMorte] = useState('');
  
  const {peso,setPeso,altura,setAltura,
   idade , setIdade,
    setCircuferenciaAbdomemAtual,
    circuferenciaAbdomemAtual,
    setCircuferenciaPescocoAtual,
    circuferenciaPescocoAtual,
    setCircuferenciaQuadrilAtual,
    circuferenciaQuadrilAtual,
    setCircuferenciaCinturaAtual,
    circuferenciaCinturaAtual,
    atividadeFisica,setAtividadeFisica,
    atividadeFisicaController, setAtividadeFisicaController,dataAtual, setDataAtual}=useContext(FisicoContext)






    useEffect(() => {
      // Fazer a requisição GET ao endpoint da dieta
      const fetchAtividadeData = async () => {
        try {
  

       const response = await axios.get(`http://192.168.2.14:8080/atividadefisica/${user._id}`);
       const atividadeFisica = response.data.atividadeFisica;
   
    
          console.log(JSON.stringify(atividadeFisica, null, 2) + "atividadeFisica");
    
          setAtividadeFisica(atividadeFisica);
        } catch (error) {
        //  console.error('Erro na requisição da dieta. Mensagem:', error.message);
         // console.error('Erro na requisição da dieta. Stack Trace:', error.stack);
          
        }
      };
    
      fetchAtividadeData();
    }, [user]);









useEffect(()=>{

  if(pesoModal){
    setPeso(pesoModal)
  }
},[pesoModal])


useEffect(()=>{

  if(pescocoModal){
    setCircuferenciaPescocoAtual(pescocoModal)
  }
},[pescocoModal])

useEffect(()=>{

  if(cinturaModal){
    setCircuferenciaCinturaAtual(cinturaModal)
  }
},[cinturaModal])

useEffect(()=>{

  if(quadrilModal){
    setCircuferenciaQuadrilAtual(quadrilModal)
  }
},[quadrilModal])

useEffect(()=>{

  if(abdomemModal){
    setCircuferenciaAbdomemAtual(abdomemModal)
  }
},[abdomemModal])

    useEffect(()=>{
      if(!modalVisible1Controller){
        setModalVisible1Cor('red')
        
      }else{
        setModalVisible1Cor('darkolivegreen')
      }
    },[modalVisible1Controller])
  

    const closeModal1 = () => {
      if (modalVisible1Controller) {
        // Verificar se algum dos inputs está vazio
        if (!peso || !altura || !idade) {
          // Se algum input estiver vazio, não fechar o modal

          setModalVisible1Cor('red')
          setModalVisible1Controller(false)
          return;
        }
        salvarPesoAlturaIdadeNoBackend()
        // Se todos os inputs estiverem preenchidos, fechar o modal
        setModalVisible1(false);
      }
    };

    const closeModal2 = () => {
     
     
        // Se todos os inputs estiverem preenchidos, fechar o modal
        setModalVisible2(false);
      }
      const closeModal3 = () => {
        salvarPescocoCinturaQuadrilAbdomemNoBackend()
     
        // Se todos os inputs estiverem preenchidos, fechar o modal
        setModalVisible3(false);
      }

    
useEffect(()=>{


if(!peso || !altura || !idade ){

  if(modalVisible2 || modalVisible3){return}else{

    setModalVisible1(true)
    setModalVisible1Controller(false)

  }
 

}

else if(peso && altura && idade){
  setModalVisible1Controller(true)
}


},[peso,altura,idade])








const openModal2 = () => {
  setModalVisible2(true);
  setPesoModal(peso)
};
const openModal3 = () => {
  setModalVisible3(true);
  setModalVisible2(false);
};



  useEffect(() => {
    if(user){
    // Substitua 'sua_url_backend' pela URL correta do seu backend
    axios.get(`http://192.168.2.14:8080/api/dadosusuario/${user._id}`)
      .then(response => {
        const dadosUsuario = response.data;
        setUserName(dadosUsuario.usuario)
        setPeso(dadosUsuario.peso);
        setAltura(dadosUsuario.altura);
        setIdade(dadosUsuario.idade);
        setCircuferenciaAbdomemAtual(dadosUsuario.circuferenciaAbdomemAtual)
        setCircuferenciaCinturaAtual(dadosUsuario.circuferenciaCinturaAtual)
        setCircuferenciaPescocoAtual(dadosUsuario.circuferenciaPescocoAtual)
        setCircuferenciaQuadrilAtual(dadosUsuario.circuferenciaQuadrilAtual)

       
      })
      .catch(error => {
        console.error('Erro ao obter dados do usuário:', error);

      })
    
    
    
    
    
    
    
    // está buscando o AtividadesFisicas
    const fetchAtividadeFisicaData = async ()=>{

      
      try {
          const respostaAtividadeFisica = await axios.get(`http://192.168.2.14:8080/buscaratividadefisica/${user._id}`)
          const AtividadesFisicas = respostaAtividadeFisica.data.atividadeFisica
          setAtividadeFisica(AtividadesFisicas)
          
          console.log(JSON.stringify(AtividadesFisicas, null, 2) + "AtividadesFisicas");
      } catch (error) {
  
        
      }
      
    }
    fetchAtividadeFisicaData()
    
    }else{return}



  



      
  }, [user]); 


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



  const funcaoPesoModal = (text) => {
    // Remover caracteres não numéricos, exceto pontos
    const numericText = text.replace(/[^\d.]/g, '');
  
    // Dividir o texto nos pontos e verificar o número de partes
    const parts = numericText.split('.');
  
    // Garantir que haja no máximo uma parte após o ponto
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 1)) {
      // Se a entrada for inválida, definir peso como string vazia
      setPesoModal('');
      return;
    }
  
 
    // Se a entrada for válida, definir o estado do peso
    setPesoModal(numericText);
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
  
  const funcaoPescocoModal = (text) => {
  
    // Remover caracteres não numéricos, exceto pontos
    const numericText = text.replace(/[^\d.]/g, '');
  
    // Dividir o texto nos pontos e verificar o número de partes
    const parts = numericText.split('.');
  
    // Garantir que haja no máximo uma parte após o ponto
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 1)) {
      // Se a entrada for inválida, definir peso como string vazia
      setPescocoModal('');
      return;
    }
  console.log(numericText)
    // Se a entrada for válida, definir o estado do peso
    setPescocoModal(numericText);
  };
  const funcaoPescoco = (text) => {
    // Remover caracteres não numéricos, exceto pontos
    const numericText = text.replace(/[^\d.]/g, '');
  
    // Dividir o texto nos pontos e verificar o número de partes
    const parts = numericText.split('.');
  
    // Garantir que haja no máximo uma parte após o ponto
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 1)) {
      // Se a entrada for inválida, definir peso como string vazia
      setCircuferenciaPescocoAtual('');
      return;
    }
  console.log(numericText)
    // Se a entrada for válida, definir o estado do peso
    setCircuferenciaPescocoAtual(numericText);
  };

  const funcaoQuadril = (text) => {
    // Remover caracteres não numéricos, exceto pontos
    const numericText = text.replace(/[^\d.]/g, '');
  
    // Dividir o texto nos pontos e verificar o número de partes
    const parts = numericText.split('.');
  
    // Garantir que haja no máximo uma parte após o ponto
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 1)) {
      // Se a entrada for inválida, definir peso como string vazia
      setCircuferenciaQuadrilAtual('');
      return;
    }
  console.log(numericText)
    // Se a entrada for válida, definir o estado do peso
    setCircuferenciaQuadrilAtual(numericText);
  };
  const funcaoQuadrilModal = (text) => {
    // Remover caracteres não numéricos, exceto pontos
    const numericText = text.replace(/[^\d.]/g, '');
  
    // Dividir o texto nos pontos e verificar o número de partes
    const parts = numericText.split('.');
  
    // Garantir que haja no máximo uma parte após o ponto
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 1)) {
      // Se a entrada for inválida, definir peso como string vazia
      setQuadrilModal('');
      return;
    }
  console.log(numericText)
    // Se a entrada for válida, definir o estado do peso
    setQuadrilModal(numericText);
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

  const funcaoCinturaModal = (text) => {
    // Remover caracteres não numéricos, exceto pontos
    const numericText = text.replace(/[^\d.]/g, '');
  
    // Dividir o texto nos pontos e verificar o número de partes
    const parts = numericText.split('.');
  
    // Garantir que haja no máximo uma parte após o ponto
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 1)) {
      // Se a entrada for inválida, definir peso como string vazia
      setCinturaModal('');
      return;
    }
  console.log(numericText)
    // Se a entrada for válida, definir o estado do peso
    setCinturaModal(numericText);
  };
  const funcaoCintura = (text) => {
    // Remover caracteres não numéricos, exceto pontos
    const numericText = text.replace(/[^\d.]/g, '');
  
    // Dividir o texto nos pontos e verificar o número de partes
    const parts = numericText.split('.');
  
    // Garantir que haja no máximo uma parte após o ponto
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 1)) {
      // Se a entrada for inválida, definir peso como string vazia
      setCircuferenciaCinturaAtual('');
      return;
    }
  console.log(numericText)
    // Se a entrada for válida, definir o estado do peso
    setCircuferenciaCinturaAtual(numericText);
  };

  const funcaoAbdomem = (text) => {
    // Remover caracteres não numéricos, exceto pontos
    const numericText = text.replace(/[^\d.]/g, '');
  
    // Dividir o texto nos pontos e verificar o número de partes
    const parts = numericText.split('.');
  
    // Garantir que haja no máximo uma parte após o ponto
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 1)) {
      // Se a entrada for inválida, definir peso como string vazia
      setCircuferenciaAbdomemAtual('');
      return;
    }
  console.log(numericText)
    // Se a entrada for válida, definir o estado do peso
    setCircuferenciaAbdomemAtual(numericText);
  };


  const funcaoAbdomemModal = (text) => {
    // Remover caracteres não numéricos, exceto pontos
    const numericText = text.replace(/[^\d.]/g, '');
  
    // Dividir o texto nos pontos e verificar o número de partes
    const parts = numericText.split('.');
  
    // Garantir que haja no máximo uma parte após o ponto
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 1)) {
      // Se a entrada for inválida, definir peso como string vazia
      setAbdomemModal('');
      return;
    }
  console.log(numericText)
    // Se a entrada for válida, definir o estado do peso
    setAbdomemModal(numericText);
  };

  const tabelaMortalidade = [
   [0, 11203, 1120, 100000, 98968, 7702721, 77.0],
   [1, 782, 77, 98880, 98841, 7603753, 76.9],
   [2, 497, 49, 98802, 98778, 7504912, 76.0],
   [3, 367, 37, 98753, 98736, 7406134, 75.0],
   [4, 292, 29, 98716, 98704, 7307398, 74.1],
   [5, 239, 24, 98687, 98682, 7208694, 73.2],
   [6, 199, 20, 98663, 98661, 7110024, 72.3],
   [7, 168, 17, 98643, 98641, 7011386, 71.5],
   [8, 143, 14, 98628, 98627, 6912783, 70.6],
   [9, 122, 12, 98616, 98615, 6814213, 69.8],
   [10, 106, 11, 98606, 98605, 6715675, 69.1],
   [11, 93, 9, 98597, 98597, 6617170, 68.3],
   [12, 82, 8, 98590, 98590, 6518698, 67.6],
   [13, 73, 7, 98584, 98583, 6420258, 66.9],
   [14, 66, 6, 98579, 98579, 6321849, 66.2],
   [15, 60, 6, 98575, 98575, 6223470, 65.6],
   [16, 55, 5, 98571, 98571, 6125122, 65.0],
   [17, 51, 5, 98568, 98568, 6026803, 64.4],
   [18, 47, 4, 98565, 98565, 5928515, 63.9],
   [19, 44, 4, 98562, 98562, 5830256, 63.3],
   [20, 41, 4, 98559, 98559, 5732027, 62.8],
   [21, 38, 4, 98556, 98556, 5633827, 62.3],
   [22, 36, 4, 98554, 98554, 5535656, 61.8],
   [23, 33, 3, 98551, 98551, 5437513, 61.4],
   [24, 31, 3, 98549, 98549, 5339399, 60.9],
   [25, 29, 3, 98547, 98547, 5241313, 60.5],
   [26, 27, 3, 98545, 98545, 5143256, 60.1],
   [27, 26, 3, 98544, 98544, 5045226, 59.7],
   [28, 24, 3, 98542, 98542, 4947223, 59.3],
   [29, 23, 3, 98541, 98541, 4849248, 58.9],
   [30, 21, 3, 98539, 98539, 4751300, 58.5],
   [31, 20, 3, 98538, 98538, 4653379, 58.1],
   [32, 19, 2, 98537, 98537, 4555485, 57.7],
   [33, 18, 2, 98536, 98536, 4457618, 57.3],
   [34, 17, 2, 98535, 98535, 4359777, 56.9],
   [35, 16, 2, 98534, 98534, 4261962, 56.6],
   [36, 15, 2, 98533, 98533, 4164174, 56.2],
   [37, 14, 2, 98532, 98532, 4066411, 55.9],
   [38, 13, 2, 98531, 98531, 3968674, 55.5],
   [39, 13, 2, 98531, 98531, 3870962, 55.2],
   [40, 12, 2, 98530, 98530, 3773274, 54.9],
   [41, 11, 2, 98529, 98529, 3675610, 54.6],
   [42, 11, 2, 98529, 98529, 3577971, 54.3],
   [43, 10, 2, 98528, 98528, 3480355, 54.0],
   [44, 10, 2, 98528, 98528, 3382762, 53.7],
   [45, 9, 2, 98527, 98527, 3285191, 53.4],
   [46, 9, 2, 98527, 98527, 3187643, 53.1],
   [47, 8, 2, 98526, 98526, 3090116, 52.8],
   [48, 8, 2, 98526, 98526, 2992610, 52.5],
   [49, 8, 2, 98526, 98526, 2895124, 52.2],
   [50, 7, 2, 98525, 98525, 2797657, 51.9],
   [51, 7, 2, 98525, 98525, 2700210, 51.6],
   [52, 7, 2, 98525, 98525, 2602781, 51.4],
   [53, 6, 2, 98524, 98524, 2505371, 51.1],
   [54, 6, 2, 98524, 98524, 2407978, 50.9],
   [55, 6, 2, 98524, 98524, 2310602, 50.6],
   [56, 6, 2, 98524, 98524, 2213243, 50.4],
   [57, 5, 2, 98523, 98523, 2115901, 50.1],
   [58, 5, 2, 98523, 98523, 2018575, 49.9],
   [59, 5, 2, 98523, 98523, 1921264, 49.7],
   [60, 5, 2, 98523, 98523, 1823970, 49.4],
   [61, 5, 2, 98523, 98523, 1726691, 49.2],
   [62, 4, 2, 98522, 98522, 1629427, 49.0],
   [63, 4, 2, 98522, 98522, 1532178, 48.8],
   [64, 4, 2, 98522, 98522, 1434945, 48.6],
   [65, 4, 2, 98522, 98522, 1337727, 48.4],
   [66, 4, 2, 98522, 98522, 1240523, 48.2],
   [67, 4, 2, 98522, 98522, 1143334, 48.0],
   [68, 3, 2, 98521, 98521, 1046161, 47.8],
   [69, 3, 2, 98521, 98521, 948007, 47.6],
   [70, 3, 2, 98521, 98521, 848486, 47.4],
   [71, 3, 2, 98521, 98521, 748595, 47.2],
   [72, 3, 2, 98521, 98521, 648334, 47.0],
   [73, 3, 2, 98521, 98521, 547703, 46.8],
   [74, 3, 2, 98521, 98521, 446701, 46.6],
   [75, 3, 2, 98521, 98521, 345327, 46.4],
   [76, 2, 2, 98520, 98520, 243581, 46.2],
   [77, 2, 2, 98520, 98520, 141464, 46.0],
   [78, 2, 2, 98520, 98520, 38974, 45.9],
   [79, 2, 2, 98520, 98520, 0, 45.7]
 ];






 useEffect(() => {
  const calcularProbabilidadeMorte = () => {
    for (let i = 0; i < tabelaMortalidade.length; i++) {
      if (idade === tabelaMortalidade[i][0].toString()) {
        return tabelaMortalidade[i][6];
      }
    }
    return '';
  };

  setProbabilidadeMorte(calcularProbabilidadeMorte());
}, [idade]);

 function calcularProbabilidadeMorte(idade) {
  for (let i = 0; i < tabelaMortalidade.length; i++) {
    if (idade === tabelaMortalidade[i][0].toString()) {
      return tabelaMortalidade[i][6];
    }
  }
return ''
}





const salvarAtividadeNoBackend = async () => {
  try {
    await axios.put(`http://192.168.2.14:8080/atividadefisica/${user._id}`, {
      atividadeFisica: atividadeFisica, // ou a estrutura correta que você deseja enviar
    });
    console.log('atividadeFisica salva c(om sucesso no backend!');
    console.log(JSON.stringify(atividadeFisica, null, 2 ))
  } catch (error) {
    console.error('Erro ao atividadeFisica a atividadeFisica:', error.message);
  }
};

const salvarPesoAlturaIdadeNoBackend = async () => {
  try {
    await axios.put(`http://192.168.2.14:8080/pesoidadealtura/${user._id}`, {
      peso: peso, // ou a estrutura correta que você deseja enviar
    altura:altura,
    idade:idade
    });

  } catch (error) {
    console.error('Erro ao atividadeFisica a atividadeFisica:', error.message);
  }
};


const salvarPescocoCinturaQuadrilAbdomemNoBackend = async () => {
  try {
    await axios.put(`http://192.168.2.14:8080/pescocoquadrilcinturaabdomem/${user._id}`, {
      circuferenciaAbdomemAtual:circuferenciaAbdomemAtual,
      circuferenciaCinturaAtual:circuferenciaCinturaAtual,
      circuferenciaPescocoAtual:circuferenciaPescocoAtual,
      circuferenciaQuadrilAtual:circuferenciaQuadrilAtual 
    });

  } catch (error) {
    console.error('Erro ao atividadeFisica a atividadeFisica:', error.message);
  }
};

      
  return (
    <View style={{backgroundColor:"lightyellow", width:'100%',height:"100%", maxHeight:1300 ,  alignContent:"center",alignItems:"center",textAlign:"center",justifyContent:"center"}}>




<View style={{flexDirection:"row",justifyContent:'space-around', width:"100%",height:50,alignContent:"center"}}>



<Text style={{fontSize:20, fontWeight:'bold',letterSpacing:2,color:"darkolivegreen", backgroundColor:'orange', borderRadius:15, margin:5, textAlign:"center", alignSelf:'center'}}> Olá, {userName}.</Text>

<View style={{flexDirection:"column",marginTop:5}}>

<Text  style={{fontSize:10, fontWeight:'bold',letterSpacing:2,color:"darkolivegreen", backgroundColor:'orange', borderRadius:15,  textAlign:"center", alignSelf:'center'}}>Hoje é </Text>
<Text  style={{fontSize:20, fontWeight:'bold',letterSpacing:2,color:"darkolivegreen", backgroundColor:'orange', borderRadius:15,  textAlign:"center", alignSelf:'center'}}>{dataAtual}</Text>
</View>
</View>




<ScrollView style={{ borderWidth:3, borderColor:'orange',  }}>



    <View style={{ justifyContent:"center", alignItems:"center", marginTop:20,width:350,borderRadius:15}}>
     
     
<Text style={{color:'darkolivegreen', fontSize:20, fontWeight:'bold',borderRadius:15 ,letterSpacing:4, marginTop:10, marginBottom:20}}>AREA FÍSICA</Text>


<View style={{width:'100%', backgroundColor:'darkolivegreen', marginTop:5,marginBottom:5, borderRadius:15}}>
    <DadosFisicos />

</View>


<View style={{width:'100%', backgroundColor:'orange', marginTop:5,marginBottom:5, borderRadius:15}}>
    <MedidasFisica />

</View>
    

<View style={{width:'100%', backgroundColor:'orange', marginTop:5,marginBottom:5, borderRadius:15}}>
    <InformacoesFisicas />

</View>

    

<TouchableOpacity onPress={openModal2} style={{backgroundColor:'orange', width:200, height:50, borderRadius:15, alignItems:"center", justifyContent:'center', marginBottom:10}}>

  <Text  style={{color:'darkolivegreen', fontSize:20, fontWeight:'bold'}}> Fazer Avaliação</Text>
</TouchableOpacity>

</View>
  
    

  
  









    </ScrollView>

    <AtividadesFisicas  dataAtual={dataAtual}/>
<TouchableOpacity style={{height:50, backgroundColor:"darkolivegreen", width:"60%", alignContent:"center",justifyContent:"center", borderRadius:15,marginBottom:10,marginTop:15}} onPress={salvarAtividadeNoBackend} >
<Text style={{textAlign:"center", fontSize:20,color:'white',fontWeight:'bold'}}>salvar</Text>

</TouchableOpacity>
 
  {/* Modal 1 */}
  <Modal animationType="slide" t
  ransparent={true} 
  visible={modalVisible1}
   onRequestClose={() => {
    if (modalVisible1Controller) {
      setModalVisible1(false);
    }
  }}>
        <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'rgba(0, 0, 0, 0.7)',alignItems: 'center' }}>
          
          <View style={{width:"80%",height:500,backgroundColor:"white",alignContent:"center",textAlign:"center",justifyContent:"center", alignItems:"center",borderRadius:15}}>
            

            <View style={{backgroundColor:'orange',borderRadius:15, padding:5}}>

          <Text style={{fontSize:20, fontWeight:'bold',textAlign:'center',color:"darkolivegreen", letterSpacing:4}}>PARA CONTINUAR </Text>
          <Text style={{fontSize:20, fontWeight:'bold',textAlign:'center',color:"darkolivegreen", letterSpacing:4}}>PRECISAMOS SABER:</Text>

            </View>
        <View style={{flexDirection:'column', height:400,width:"100%", justifyContent:"space-around", alignItems:'center',marginTop:50}}>

        <View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'darkolivegreen', borderRadius:15, width:"60%", height:100}}>
          <Text style={{color:"white",fontSize:20, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>Seu PESO:</Text>
          
          <TextInput
                keyboardType="numeric"
                    style={styles.input}
                    placeholder='Peso'
                    placeholderTextColor='darkolivegreen'
                    onChangeText={(text)=>funcaoPeso(text)}
                    value={peso}
                    />

                      <Text style={{color:"white",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>em Quilogramas.</Text>
          </View>


          <View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'darkolivegreen', borderRadius:15, width:"60%", height:100}}>
          <Text style={{color:"white",fontSize:20, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>Sua ALTURA:</Text>
          <TextInput
                   keyboardType="numeric"
                   style={styles.input}
                   placeholder='Altura'
                   placeholderTextColor='darkolivegreen'
                   onChangeText={(text)=> funcaoAltura(text)}
                   value={altura}
/>

                        <Text style={{color:"white",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>em Centímetros.</Text>
          </View>

          <View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'darkolivegreen', borderRadius:15, width:"60%", height:100}}>
          <Text style={{color:"white",fontSize:20, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>Sua IDADE:</Text>
       
          
          <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        placeholder='Idade'
                        placeholderTextColor='darkolivegreen'
                        onChangeText={(text) => funcaoIdade(text)}
                        value={idade}
                       
                       
                      />
                        <Text style={{color:"white",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>em Anos.</Text>
          </View>

        </View>

          </View>

<View style={{backgroundColor:'darkolivegreen', width:"80%", marginTop:10,borderRadius:15}}>
  <Text style={{color:"white", textAlign:"center", fontSize:12, fontWeight:'bold', padding:15}}>
    
    Nós precisamos saber estas informações para prossseguir, já que  nossas funções, cálculos e análises necessitam 
    destas informações para melhor lhe ajudar.
  </Text>
  

  
  </View> 

  <TouchableOpacity   disabled={!modalVisible1Controller}  onPress={closeModal1} style={{width:'70%',backgroundColor:modalVisible1Cor, height:50, borderRadius:15, marginTop:10}}>

  <Text style={{color:"white", textAlign:"center", fontSize:12, fontWeight:'bold', padding:15}}> Tudo pronto para continuar</Text>

  </TouchableOpacity>
        </View>
      </Modal>

























      {/* Modal 2 */}
      <Modal animationType="slide" transparent={true} visible={modalVisible2} onRequestClose={() => setModalVisible2(false)}>
      <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'rgba(0, 0, 0, 0.7)',alignItems: 'center' }}>
          
          <View style={{width:"80%",backgroundColor:"white",alignContent:"center",textAlign:"center",justifyContent:"center", alignItems:"center",borderRadius:15}}>
            

            <View style={{backgroundColor:'orange',borderRadius:15, padding:5}}>

          <Text style={{fontSize:20, fontWeight:'bold',textAlign:'center',color:"darkolivegreen", letterSpacing:4}}>AVALIAÇÃO FÍSICA </Text>
          <Text style={{fontSize:12, fontWeight:'bold',textAlign:'center',color:"darkolivegreen", letterSpacing:4}}>PREENCHA OS CAMPOS ABAIXO:</Text>

            </View>
        <View style={{flexDirection:'column', height:400,width:"100%", justifyContent:"center", alignItems:'center'}}>

  <View style={{flexDirection:'row', justifyContent:"space-around", width:"100%"}}>




        <View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'orange', borderRadius:15, width:"40%", height:100, marginBottom:40}}>
          <Text style={{color:"darkolivegreen",fontSize:20, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>Peso :</Text>
          
          <TextInput
                keyboardType="numeric"
                style={styles.input}
                placeholder='Peso'
                placeholderTextColor='darkolivegreen'
                onChangeText={(text)=>funcaoPesoModal(text)}
                value={pesoModal}
                />

                      <Text style={{color:"darkolivegreen",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>em Quilogramas.</Text>
          </View>


          <View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'darkolivegreen', borderRadius:15, width:"40%", height:100, marginBottom:40}}>
          <Text style={{color:"white",fontSize:20, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>Sua Altura:</Text>
          <TextInput
                   keyboardType="numeric"
                   style={styles.input}
                   placeholder='Altura'
                   placeholderTextColor='darkolivegreen'
                   onChangeText={(text)=> funcaoAltura(text)}
                   value={altura}
                   editable={false}
/>

                        <Text style={{color:"white",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>em Centímetros.</Text>
          </View>

                   </View>



                   <View style={{flexDirection:'row', justifyContent:"space-around", width:"100%"}}>




<View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'darkolivegreen', borderRadius:15, width:"40%", height:100}}>
  <Text style={{color:"white",fontSize:20, fontWeight:"bold",letterSpacing:2, marginBottom:2}}>Idade :</Text>
  
  <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder='Idade'
        placeholderTextColor='darkolivegreen'
        onChangeText={(text)=>funcaoIdade(text)}
        value={idade}
        editable={false}
        />

              <Text style={{color:"white",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>em Quilogramas.</Text>
  </View>


  <View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'darkolivegreen', borderRadius:15, width:"40%", height:100}}>
  <Text style={{color:"white",fontSize:12, fontWeight:"bold",letterSpacing:2,marginTop:5}}>ULTIMA:</Text>
  <Text style={{color:"white",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>AVALIAÇÃO</Text>
       
          
       <TextInput
                     keyboardType="numeric"


                     style={{  textAlign:"center",
                     color:"orange",
                     width: 110,
                     height: 40,
                     backgroundColor:"darkolivegreen",
                     borderColor: 'yellow',
                     borderWidth: 4,
                     fontSize:15,
                     fontWeight:'bold',
                     borderRadius:15}}
                     placeholder='data'
                     placeholderTextColor='darkolivegreen'
                      editable={false}
                      value={dataAtual}
     
                    
                    
                   />
                
  </View>

           </View>


        </View>

        <TouchableOpacity  onPress={openModal3}   style={{width:'70%',backgroundColor:'orange', height:50, borderRadius:15, marginTop:10, marginBottom:20}}>

<Text style={{color:"white", textAlign:"center", fontSize:12, fontWeight:'bold', padding:15}}>Ir para Medidas Específicas</Text>

</TouchableOpacity>

          </View>


  <TouchableOpacity  onPress={closeModal2 } style={{width:'70%',backgroundColor:'darkolivegreen', height:50, borderRadius:15, marginTop:10}}>

  <Text style={{color:"white", textAlign:"center", fontSize:12, fontWeight:'bold', padding:15}}> Tudo pronto para continuar</Text>

</TouchableOpacity>
      </View>
      </Modal>









































      
  {/* Modal 3 */}
  <Modal animationType="slide" transparent={true} visible={modalVisible3} onRequestClose={() => setModalVisible3(false)}>
      <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'rgba(0, 0, 0, 0.7)',alignItems: 'center' }}>
          
          <View style={{width:"80%",backgroundColor:"white",alignContent:"center",textAlign:"center",justifyContent:"center", alignItems:"center",borderRadius:15}}>
          <View style={{backgroundColor:'darkolivegreen', width:"80%", marginTop:10,borderRadius:15}}>
  
  <View style={{flexDirection:'column', height:400,width:"100%", justifyContent:"center", alignItems:'center'}}>

  <View style={{backgroundColor:'orange',borderRadius:15, padding:5, marginBottom:10}}>

          <Text style={{fontSize:20, fontWeight:'bold',textAlign:'center',color:"darkolivegreen", letterSpacing:4}}>AVALIAÇÃO FÍSICA </Text>
          <Text style={{fontSize:12, fontWeight:'bold',textAlign:'center',color:"darkolivegreen", letterSpacing:4}}>PREENCHA OS CAMPOS ABAIXO:</Text>

            </View>






<View style={{flexDirection:'row', justifyContent:"space-around", width:"100%"}}>




<View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'orange', borderRadius:15, width:"40%", marginBottom:10}}>
  <Text style={{color:"white",fontSize:15, fontWeight:"bold",letterSpacing:2, marginBottom:2}}>Pescoço :</Text>
  
  <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder='Pescoço'
        placeholderTextColor='darkolivegreen'
        onChangeText={(text) => {
       funcaoPescocoModal(text)
    
        }}
        value={pescocoModal}
 
        />

              <Text style={{color:"white",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10, textAlign:"center"}}>em Centímetros.</Text>
  </View>


  <View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'orange', borderRadius:15, width:"40%", marginBottom:10}}>
  <Text style={{color:"white",fontSize:15, fontWeight:"bold",letterSpacing:2, marginBottom:2}}>Cintura:</Text>
  <TextInput
           keyboardType="numeric"
           style={styles.input}
           placeholder='Cintura'
           placeholderTextColor='darkolivegreen'
            onChangeText={(text)=>{funcaoCinturaModal(text)}}
            value={cinturaModal}
/>  

                <Text style={{color:"white",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10,textAlign:"center"}}>em Centímetros.</Text>
  </View>

           </View>



<View style={{flexDirection:'row', justifyContent:"space-around", width:"100%"}}>




<View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'orange', borderRadius:15, width:"40%",marginBottom:10}}>
<Text style={{color:"white",fontSize:15, fontWeight:"bold",letterSpacing:2, marginBottom:2}}>Abdômem:</Text>

<TextInput
keyboardType="numeric"
style={styles.input}
placeholder='Abdômem'
placeholderTextColor='darkolivegreen'
onChangeText={(text)=>funcaoAbdomemModal(text)}
value ={abdomemModal}
/>

      <Text style={{color:"white",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10,textAlign:"center"}}>em Centímetros.</Text>
</View>

<View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'orange', borderRadius:15, width:"40%",marginBottom:10}}>
<Text style={{color:"white",fontSize:15, fontWeight:"bold",letterSpacing:2, marginBottom:2}}>Quadril:</Text>

<TextInput
keyboardType="numeric"
style={styles.input}
placeholder='Quadril'
placeholderTextColor='darkolivegreen'
onChangeText={(text)=>funcaoQuadrilModal(text)}
value={quadrilModal}

/>

      <Text style={{color:"white",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10,textAlign:"center"}}>em Centímetros.</Text>
</View>





   </View>






<View style={{justifyContent:"center", alignContent:"center",alignItems:"center", backgroundColor:'orange', borderRadius:15, width:"40%"}}>
<Text style={{color:"white",fontSize:12, fontWeight:"bold",letterSpacing:2,marginTop:5}}>ULTIMA:</Text>
<Text style={{color:"white",fontSize:10, fontWeight:"bold",letterSpacing:2, marginBottom:10}}>AVALIAÇÃO</Text>

  
<TextInput
             keyboardType="numeric"


             style={{  textAlign:"center",
             color:"orange",
             width: 110,
             height: 40,
             backgroundColor:"darkolivegreen",
             borderColor: 'yellow',
             borderWidth: 4,
             fontSize:15,
             fontWeight:'bold',
             borderRadius:15}}
             placeholder='data'
             placeholderTextColor='darkolivegreen'
              editable={false}
              value={dataAtual}
           />
        
</View>
</View>


</View> 

          </View>


  <TouchableOpacity    onPress={closeModal3 } style={{width:'70%',backgroundColor:'orange', height:50, borderRadius:15, marginTop:10}}>

<Text style={{color:"black", textAlign:"center", fontSize:12, fontWeight:'bold', padding:15}}> Salvar dados da Avaliação.</Text>

</TouchableOpacity>
        </View>
      </Modal>
    </View>

    )}
    const styles = StyleSheet.create({
      input: {
        textAlign:"center",
        color:"black",
        width: 110,
        height: 40,
        backgroundColor:"orange",
        borderColor: 'yellow',
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

    export default User
