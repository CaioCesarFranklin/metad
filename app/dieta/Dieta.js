import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StyleSheet,Text,View,FlatList,SectionList,StatusBar,TouchableOpacity, ScrollView,TextInput} from 'react-native';
import {DietaContext} from '../usercontext/DietaContext'
import Searchbar from './Searchbar';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import PeriodPicker from './PeriodPicker'; // Importe o componente PeriodPicker
import UnidadeMedida from './UnidadeMedida';
import ItemDieta from './ItemDieta ';
import TotalNutrientes from './TotalNutrientes'





function Dieta() {


const [controllerSalvar,setControllerSalvar]= useState(false)
const [corSalvar,setCorSalvar]=useState('red')


useEffect(() => {
  // Função para verificar se a quantidade e alimentoEncontrado estão vazios
console.log(JSON.stringify(groupedData,null,3))


}, [groupedData]);




useEffect(() => {
  // Verifica se groupedData existe e tem pelo menos um item
  if (groupedData && groupedData.length > 0) {
    // Itera sobre cada item em groupedData
    groupedData.forEach(item => {
      // Verifica se há valor em "quantidade" e "alimentoEncontrado" e se não são 0 ou ""
      if (item.searchbars.some(bar => (bar.quantidade !== "" && bar.quantidade !== 0) || (bar.alimentoEncontrado !== "" && bar.alimentoEncontrado !== 0))) {
        console.log('Existe valor diferente de zero ou vazio em quantidade e alimentoEncontrado:', item);
      } else {
        console.log('Valor zero ou vazio em quantidade e alimentoEncontrado:', item);
      }
    });
  }
}, [groupedData]);






useEffect(()=>{
  
  if(!controllerSalvar){

    setCorSalvar('darkolivegreen')
    setTotalNutrientesController(false)

}else{

  setCorSalvar('red')
  setTotalNutrientesController(true)
}
},[controllerSalvar])




  const { user,
     groupedData,
      setGroupedData,
      somaCarboidratos,setSomaCarboidratos,
somaProteinas,setSomaProteinas,
somaLipideos,setSomaLipideos,
somaKilocalorias, setSomaKilocalorias,
somaFibras,setSomaFibras,
setTotalNutrientesController
       } = useContext(DietaContext);




        useEffect(() => {


    
    
      //  console.log(JSON.stringify(groupedData, null, 2) + " aqui é do da direita");
       
         calcularSomaNutrientes(
           groupedData,
           setSomaProteinas,
           setSomaCarboidratos,
           setSomaLipideos,
           setSomaKilocalorias,
           setSomaFibras
         );


      



        }, [groupedData]);




        useEffect(() => {
          // Fazer a requisição GET ao endpoint da dieta
          const fetchDietaData = async () => {
            try {
      

           const response = await axios.get(`http://192.168.2.14:8080/users/${user._id}/dieta`);
           const dieta = response.data.dieta;
       
        
              console.log(JSON.stringify(dieta, null, 2) + "dietaData");
        
              setGroupedData(dieta);
            } catch (error) {
            //  console.error('Erro na requisição da dieta. Mensagem:', error.message);
             // console.error('Erro na requisição da dieta. Stack Trace:', error.stack);
              
            }
          };
        
          fetchDietaData();
        }, [user]);
        



  useEffect(() => {
    // Verifica se groupedData existe e tem pelo menos um item
    if (groupedData && groupedData.length > 0) {
      // Define uma variável para rastrear se algum campo searchbar está vazio ou se não há valor para a quantidade
      let hasEmptySearchbarOrNoQuantidade = false;
  
      // Itera sobre cada item em groupedData
      groupedData.forEach(item => {
        // Verifica se há valor em "quantidade" igual a '' ou '0' e se searchbars está vazio
        if (item.searchbars.length === 0 || item.searchbars.some(bar => bar.quantidade === '' || bar.quantidade === '0' || bar.quantidade === '00' || bar.quantidade === '000')) {
          console.log('Este tem valor vazio ou não há valor para quantidade:', item);
          hasEmptySearchbarOrNoQuantidade = true;
        }
      });
  
      // Define os estados com base na verificação anterior
      if (hasEmptySearchbarOrNoQuantidade) {
        setControllerSalvar(true);
        setTotalNutrientesController(true);
      } else {
        console.log('Não existe valor vazio ou não há valor para quantidade');
        setControllerSalvar(false);
        setTotalNutrientesController(false);
      }
    } else {
      // Se groupedData não existir ou estiver vazio
      setControllerSalvar(true);
      setTotalNutrientesController(true);
    }
  }, [groupedData]);
  
  




  const adicionarAlimento = (idRefeicao) => {
    const dietaAtualizada = groupedData.map((refeicao) => {
      if (refeicao.idRefeicao === idRefeicao) {
        const novaSearchbar = reordenarAlimentos(refeicao.searchbars);
        return {
          ...refeicao,
          searchbars: [
            ...novaSearchbar,
            {
              idAlimento: novaSearchbar.length, // Atribuir o novo idAlimento corretamente
              alimentoEncontrado: "",
              proteina: "0",
              carboidrato: "0",
              lipideo: "0",
              kilocalorias: "0",
              nota: "0",
              quantidade: "0",
              unidadeMedida: "Gramas",
              fibra:'0'
            },
          ],
        };
      }
      return refeicao;
    });
  
   // console.log(JSON.stringify(dietaAtualizada, null, 2) + ' esse safado o');
  
    setGroupedData(dietaAtualizada);
  };
  
  const reordenarAlimentos = (searchbars) => {
    return searchbars.map((alimento, index) => ({
      ...alimento,
      idAlimento: index,
    }));
  };
  
  const adicionarRefeicao =()=>{
    const dieta = [...groupedData]
    

    const novoObjeto = {
      "idRefeicao": '0',
      "selectValue": "manha",
      "searchbars": []
    };


    dieta.push(novoObjeto)



dieta.forEach((item, index) => {
  item.idRefeicao = index;
});

//console.log(JSON.stringify(dieta, null, 2) + 'dieta atualizado');
  
setGroupedData(dieta)

  }


  const areaRemoverRefeicao = (idRefeicao) => {
    const novaDieta = groupedData.filter((refeicao) => refeicao.idRefeicao !== idRefeicao);
    setGroupedData(novaDieta);
  };



  function calcularSomaNutrientes(dieta, setSomaProteinas, setSomaCarboidrato, setSomaLipideo, setSomaKilocalorias,setSomaFibras) {
    if (!Array.isArray(dieta)) {
      // Se "dieta" não for um array válido, defina os estados de soma como zero ou qualquer outro valor padrão
      setSomaProteinas(0);
      setSomaCarboidrato(0);
      setSomaLipideo(0);
      setSomaKilocalorias(0);
      setSomaFibras(0)
      return;
    }
    const equivalencias = {
      'Colher de Sopa': 20,
      'Colher de Chá': 5,
      'Xícara': 240,
      'Gramas': 1,
      'Kilogramas': 1000,
      'Litros': 1000,
      'Mililitros': 1,
    };
    
    let somaProteina = 0;
    let somaCarboidrato = 0;
    let somaLipideo = 0;
    let somaKilocalorias = 0;
    let somaFibras = 0
  
    dieta.forEach((refeicao) => {
      if (!refeicao.searchbars) return; // Verifique se "refeicao.searchbars" é válido
  
      refeicao.searchbars.forEach((alimento) => {
        // Valide os campos do objeto "alimento" antes de realizar os cálculos
        if (
          typeof alimento.proteina !== 'string' ||
          typeof alimento.carboidrato !== 'string' ||
          typeof alimento.lipideo !== 'string' ||
          typeof alimento.kilocalorias !== 'string' ||
          typeof alimento.fibra !== 'string'
        ) {
          // Se algum campo não for uma string válida, ignore este alimento
          return;
        }
  
        const proteina = parseFloat(alimento.proteina.replace(',', '.'));
        const carboidrato = parseFloat(alimento.carboidrato.replace(',', '.'));
        const lipideo = parseFloat(alimento.lipideo.replace(',', '.'));
        const kilocalorias = parseFloat(alimento.kilocalorias.replace(',', '.'));
        const quantidade = parseFloat(alimento.quantidade);
        const fibra = parseFloat(alimento.fibra.replace(',', '.'))
      const unidadeMedida = alimento.unidadeMedida;

    //  console.log(carboidrato+'carboidrato')
     // console.log(fibra+'fibra')
     // console.log(proteina+'proteina')

      if (equivalencias[unidadeMedida] !== undefined) {
        const equivalencia = equivalencias[unidadeMedida];
        const fatorConversao = (equivalencia / 100) * quantidade;

        somaProteina += proteina * fatorConversao;
        somaCarboidrato += carboidrato * fatorConversao;
        somaLipideo += lipideo * fatorConversao;
        somaKilocalorias += kilocalorias * fatorConversao;
        somaFibras += fibra * fatorConversao
      }
    });
  
  
    });
  
    // Atualize os estados usando as funções de estado passadas como parâmetros
    setSomaProteinas(Number(somaProteina.toFixed(2)));
  setSomaCarboidrato(Number(somaCarboidrato.toFixed(2)));
  setSomaLipideo(Number(somaLipideo.toFixed(2)));
  setSomaKilocalorias(Number(somaKilocalorias.toFixed(2))); 
  setSomaFibras(Number(somaFibras.toFixed(2)))


   // console.log(somaCarboidrato+'somaCarboidrato')
   // console.log(somaFibras+'somaFibras')
   // console.log(somaProteina)
  }

  const handlePeriodChange = (idRefeicao, newPeriod) => {
    const newData = groupedData.map((refeicao) => {
      if (refeicao.idRefeicao === idRefeicao) {
        return { ...refeicao, selectValue: newPeriod };
      }
      return refeicao;
    });
    setGroupedData(newData);
  };

  const handleUnidadeMedidaSelecinada = (idRefeicao, idAlimento, UnidadeMedidaSelecinada) => {
    setGroupedData((prevData) => {
      const newData = [...prevData];
      const refeicaoIndex = newData.findIndex((item) => item.idRefeicao === idRefeicao);
  
      if (refeicaoIndex !== -1) {
        const searchbarIndex = newData[refeicaoIndex].searchbars.findIndex(
          (item) => item.idAlimento === idAlimento
        );
  
        if (searchbarIndex !== -1) {
          newData[refeicaoIndex].searchbars[searchbarIndex].unidadeMedida = UnidadeMedidaSelecinada;
        }
      }
  
      return newData;
    });
  }; 













function handleQuantidadeSelecinada(idRefeicao, idAlimento, QuantidadeSelecionada) {
  setGroupedData((prevData) => {
    const newData = [...prevData];
  const refeicaoIndex = newData.findIndex((item) => item.idRefeicao === idRefeicao);

  if (refeicaoIndex !== -1) {
    const searchbarIndex = newData[refeicaoIndex].searchbars.findIndex(
      (item) => item.idAlimento === idAlimento
    );

    if (searchbarIndex !== -1) {
      newData[refeicaoIndex].searchbars[searchbarIndex].quantidade = QuantidadeSelecionada
   
      return newData; 
    }}})}











function handleAlimentoSelecionado(idRefeicao, idAlimento, alimentoSelecionado) {
  setGroupedData((prevData) => {
    const newData = [...prevData];
  const refeicaoIndex = newData.findIndex(item => item.idRefeicao === idRefeicao);

if (refeicaoIndex !== -1) {
const searchbarIndex = groupedData[refeicaoIndex].searchbars.findIndex((item) => item.idAlimento === idAlimento);


if (searchbarIndex !== -1) {
  newData[refeicaoIndex].searchbars[searchbarIndex].alimentoEncontrado = alimentoSelecionado.alimento;
  newData[refeicaoIndex].searchbars[searchbarIndex].proteina = alimentoSelecionado.proteina;
  newData[refeicaoIndex].searchbars[searchbarIndex].carboidrato = alimentoSelecionado.carboidrato;
  newData[refeicaoIndex].searchbars[searchbarIndex].lipideo = alimentoSelecionado.lipideo;
  newData[refeicaoIndex].searchbars[searchbarIndex].kilocalorias = alimentoSelecionado.kilocalorias;
  newData[refeicaoIndex].searchbars[searchbarIndex].nota = alimentoSelecionado.nota;
  newData[refeicaoIndex].searchbars[searchbarIndex].fibra= alimentoSelecionado.fibra

   
  return newData;

}

console.log(JSON.stringify(newData,null,2)+ 'newData')
}})}




















  const removerAlimento = (idRefeicao, idAlimento) => {
    const novaDieta = groupedData.map((refeicao) => {
      if (refeicao.idRefeicao === idRefeicao) {
        const novosAlimentos = refeicao.searchbars.filter((alimento) => alimento.idAlimento !== idAlimento);
        return {
          ...refeicao,
          searchbars: novosAlimentos,
        };
      }
      return refeicao;
    });
  
    setGroupedData(novaDieta);
  };
  


  const salvarDietaNoBackend = async () => {
    try {
      await axios.put(`http://192.168.2.14:8080/users/${user._id}/dieta`, {
        dieta: groupedData, // ou a estrutura correta que você deseja enviar
      });
      console.log('Dieta salva c(om sucesso no backend!');
      console.log(JSON.stringify(groupedData, null, 2 ))
    } catch (error) {
      console.error('Erro ao salvar a dieta:', error.message);
    }
  };
  

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 20,backgroundColor:'orange', borderRadius:15}}>
<PeriodPicker selectedValue={item.selectValue} onPeriodChange={(newPeriod) => handlePeriodChange(item.idRefeicao, newPeriod)} />


    
        <FlatList
          data={item.searchbars}
          keyExtractor={(item) => item.idAlimento.toString()}
          renderItem={({ item: alimento }) => (
            <View style={{ marginVertical: 10 , alignItems:"center"}}>

              <View style={styles.areaAdicionarExcluir}>
                <View>
                 <Text style={{fontWeight:"bold", color:"darkolivegreen"}}>Quantidade:</Text>
                 <ItemDieta
  initialValue={alimento.quantidade}
  onQuantidadeSelecionada={(QuandidadeSelecionada) => handleQuantidadeSelecinada(item.idRefeicao, alimento.idAlimento, QuandidadeSelecionada)}
/>
            </View>

          <View style={{flexDirection:'column', justifyContent:'space-between', alignItems:"center"}}>
          <Text style={{fontWeight:"bold", color:"darkolivegreen"}}>Quantidade:</Text>
          <UnidadeMedida initialValue={alimento.unidadeMedida} 
          onUnidadeMedidaSelecionada={(UnidadeMedidaSelecinada) => handleUnidadeMedidaSelecinada(item.idRefeicao, alimento.idAlimento, UnidadeMedidaSelecinada)}/>
            <Text style={{fontSize:12,color:"darkolivegreen", fontWeight:'bold',marginTop:5}}>DE</Text>
            </View>
            </View>

          <Searchbar initialValue={alimento.alimentoEncontrado} 
            onAlimentoSelecionado={(alimentoSelecionado) => handleAlimentoSelecionado(item.idRefeicao, alimento.idAlimento, alimentoSelecionado)}
            proteina={alimento.proteina}
            carboidrato={alimento.carboidrato}
            lipideo={alimento.lipideo}
            kilocalorias={alimento.kilocalorias}
            nota={alimento.nota}
            fibra={alimento.fibra}  
          />


          <TouchableOpacity style={{alignItems:"center", backgroundColor:"darkolivegreen", width:210,justifyContent:'center', marginTop:-5, borderRadius:15}}
           onPress={() => removerAlimento(item.idRefeicao, alimento.idAlimento)}
          
          >
            
    <Text style={{color:'orange', fontSize:25, fontWeight:"bold",opacity:0.6}}> Excluir Alimento </Text>
    
          </TouchableOpacity>
            </View>

          )}
 
        />
          <View style={{flexDirection:"row", justifyContent:'space-around'}}> 




<TouchableOpacity style={styles.areaRemoverRefeicao} onPress={() => areaRemoverRefeicao(item.idRefeicao)}>

<Text style={{ color: 'orange', fontSize: 20, fontWeight: 'bold' }}>Remover</Text>
            <View style={styles.areaAdicionarRefeicaoSecundario}>
            <Text style={{ color: 'orange', fontWeight: 'bold' }}>Refeição</Text>
            <Text style={{ marginLeft:10,fontSize: 20,color:'orange',fontWeight:'bold'}}>-</Text>
 
          </View>

</TouchableOpacity>
</View>

<TouchableOpacity onPress={() => adicionarAlimento(item.idRefeicao)} style={{ width: '100%', height: 90, backgroundColor: 'darkolivegreen', alignContent:"center", justifyContent:'space-around', borderBottomRightRadius:15,borderBottomLeftRadius:15}}>
           <Text style={{color:'white', fontWeight:'bold',fontSize:25,alignSelf:"center",textAlign:"center", opacity: 0.5, marginTop:5}}>CLIQUE AQUI</Text>
           <Text style={{color:'white', fontWeight:'bold',fontSize:15,alignSelf:"center",textAlign:"center", opacity: 0.5}}> PARA ADICIONAR UM ALIMENTO</Text>
          </TouchableOpacity>
      </View>
    );
  };


  const handleSearchBarChange = (value, idRefeicao, idAlimento) => {
    // Aqui, você pode acessar o valor, idRefeicao e idAlimento e fazer o que desejar com eles.
    //console.log('Valor do SearchBar:', value);
   // console.log('ID da Refeição:', idRefeicao);
   // console.log('ID do Alimento:', idAlimento);

    // Exemplo: atualize o valor no estado dietaPacienteClicked
    // Supondo que dietaPacienteClicked é um estado que você deseja atualizar
    const newData = { ...dietaPacienteClicked };
    console.log(JSON.stringify(newData,null,2)+ 'newData')
    const refeicaoIndex = newData.dieta.findIndex((item) => item.idRefeicao === idRefeicao);

    if (refeicaoIndex !== -1) {
      const searchbarIndex = newData.dieta[refeicaoIndex].searchbars.findIndex((item) => item.idAlimento === idAlimento);

      if (searchbarIndex !== -1) {
        newData.dieta[refeicaoIndex].searchbars[searchbarIndex].alimentoEncontrado = value;
        
        // Atualize o estado com os dados modificados
        setDietaPacienteClicked(newData);
      }
    }
  };













  return (
    <View style={{ flex: 1, padding: 20,backgroundColor:'lightyellow', height:'100%',width:"100%",justifyContent:'center',alignContent:'center',alignItems:"center" }}>

 



  <View   style={{flexDirection:'row',width:'100%',justifyContent:"space-around"}}>

      <TouchableOpacity  onPress={adicionarRefeicao}>

<View style={styles.areaAdicionarRefeicao}>
<Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Adicionar</Text>
            <View style={styles.areaAdicionarRefeicaoSecundario}>  
            <Text style={{ color: 'white',  fontWeight: 'bold' }}>Refeição</Text>
              <Text style={{ marginLeft:10,fontSize: 20,color:'white',fontWeight:'bold'}}>
                +
                </Text>
            </View>
          </View>

</TouchableOpacity>

<TouchableOpacity
  style={{
    backgroundColor: corSalvar,
    width: 150,
    marginBottom: 10,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  }}
  onPress={()=>salvarDietaNoBackend()}
  disabled={controllerSalvar}
>
    <Text style={{ color:"white", fontSize:20, fontWeight:'bold',fontStyle:"italic"}}>
      
     Salvar

    </Text>

</TouchableOpacity>



</View>

{groupedData.length === 0 ? (
  <View style={{width:'100%', alignContent:"center", justifyContent:'center', alignItems:'center'}}>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20,color:"darkolivegreen", opacity:0.2, letterSpacing:2 ,textAlign:'center' }}>NOS CONTE SUA ALIMENTAÇÃO</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20,color:"darkolivegreen", opacity:0.2, letterSpacing:2 ,textAlign:'center' }}>COMEÇANDO NO</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20,color:"darkolivegreen", opacity:0.6, letterSpacing:2 ,textAlign:'center' }}>ADICIONAR REFEIÇÃO</Text>
  </View>
    ) : (
      <FlatList
        style={{ width: "100%", borderRadius: 15 }}
        data={groupedData}
        keyExtractor={(item) => item.idRefeicao.toString()}
        renderItem={renderItem}
      />
    )}







<TotalNutrientes style={{height:"40%", backgroundColor:corSalvar}}




disabled={controllerSalvar}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionList:{
width:'100%',
height:'70%'},
  textoExcluirRefeicao:{
    color:'orange',
    fontWeight:'bold',
    fontSize:15


  },
  botaoExcluirRefeicao:{
    backgroundColor:"darkolivegreen",
    width:150,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    marginTop:-50
  },
  areaExcluirRefeicao:{

  
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:50
  },

  areaAdicionarRefeicaoSecundario:{
    alignContent:"center",
    alignItems:"center",
    width:"100%",
    flexDirection:'row',
justifyContent:'center',
marginTop:-10
  },
 
  
  areaRemoverRefeicao:{
width:150,
height:60,
marginBottom:15,
    backgroundColor:'darkolivegreen',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    borderRadius:15


  },
  areaAdicionarRefeicao:{
    backgroundColor:'darkolivegreen',
    width:150,
    height:60,
    justifyContent:'center',
    alignItems:'center',

    borderRadius:15

  },
  areaAdicionarExcluir:{
    flexDirection:'row',
      width:'100%',
      alignItems:'center',
      justifyContent:"space-around",
      marginBottom:10

  },
  viewquantidade:{
    width:100,
    marginRight:-50


  },
textoExplicativo:{
  textAlign:'center',
    fontSize:15,
    color: 'darkolivegreen',
    fontWeight:"bold"
},
  areamedidaQuantidade:{width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:"center",
    

  
  },
  areamedidaview:{
    


  },
  areaTotal:{
    width:'100%',
    backgroundColor:'wheat',
    justifyContent:"center",
    alignContent:'center',
    alignSelf:"center",
 
  },
  textoalimento:{
  
  width:'100%'


},
  totalNutrientesContainer: {
    marginRight:10,
    marginLeft:10,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  inputMicronutrientes: {
    fontSize: 21,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    backgroundColor:"darkolivegreen",
    textAlign: 'center',
    color:"white",
    width: 90,
    height:40
  },
   micronutrientesContainer: {
    

    alignItems: 'center',
    justifyContent:'center',
  },
  inputQuantidade:{
    backgroundColor:"darkolivegreen",
    color:'white',
    textAlign:"center",
    fontSize:20,
    fontWeight:"bold",    
    borderRadius:15,
    height:50,
    width:70,
    borderWidth:2,
    borderColor:'white',
    justifyContent:'center'


  },
  inputsMicroArea:{
    flexDirection:'column',
    height:'150',
    

  },
  container: {
    

    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center", // Centraliza verticalmente
    backgroundColor: "orange",
    width: 380,
    borderRadius: 20,
    padding: 5,
    height: 500,
    marginVertical: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  nutrientesTitle:{
    fontSize:15,
    color:"darkolivegreen",
    fontWeight:'900'
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24
  },
});

export default Dieta;
