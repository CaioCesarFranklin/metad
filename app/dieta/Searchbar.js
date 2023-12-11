import React, { useEffect, useState,useContext,useRef } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import {DietaContext} from '../usercontext/DietaContext'


function Searchbar({  onAlimentoSelecionado ,initialValue, proteina, carboidrato, lipideo,kilocalorias, nota,fibra  }) {

  const [input, setInput] = useState(initialValue || '');
  const [searchResults, setSearchResults] = useState([]);

const [searchbarPreenchida, setSearchbarPreenchida]= useState(true)
const [editSearchbar,setEditSearchBar]= useState(true)
const [isFlatListVisible, setFlatListVisible] = useState(true);
  const [proteinaSeachbar, setproteinaSeachbar] = useState('');
    const [carboidratoSeachbar, setcarboidratoSeachbar] = useState('');
    const [lipideoSeachbar, setlipideoSeachbar] = useState('');
    const [kilocaloriasSeachbar, setkilocaloriasSeachbar] = useState('');
    const [ fibraSearchbar,setFibraSearchbar] = useState('')
    const [notaSeachbar,setnotaSeachbar]=useState('')
    const[ corController, setCorController]=useState('darkolivegreen')

    const inputRef =useRef('')
    const alimentoSelected = useRef('');





useEffect(() => {

  if (proteina) {
    const proteinaComoNumero = parseFloat(proteina.replace(',', '.')) || 0; // Substitui vírgula por ponto e converte para número, tratando o caso em que não é um número
    const proteinaFormatada = proteinaComoNumero.toFixed(2);
    setproteinaSeachbar(proteinaFormatada)
  }
  if (carboidrato) {
    const carboidratoComoNumero = parseFloat(carboidrato.replace(',', '.')) || 0; // Substitui vírgula por ponto e converte para número, tratando o caso em que não é um número
    const carboidratoFormatada = carboidratoComoNumero.toFixed(2);
     setcarboidratoSeachbar(carboidratoFormatada)

    
  }


  if (lipideo) {
    const lipideoComoNumero = parseFloat(lipideo.replace(',', '.')) || 0; // Substitui vírgula por ponto e converte para número, tratando o caso em que não é um número
    const lipideoFormatada = lipideoComoNumero.toFixed(2);
    setlipideoSeachbar(lipideoFormatada)

    
  }

  
  if (kilocalorias) {
    const kilocaloriasComoNumero = parseFloat(kilocalorias.replace(',', '.')) || 0; // Substitui vírgula por ponto e converte para número, tratando o caso em que não é um número
    const kilocaloriasFormatada = kilocaloriasComoNumero.toFixed(2);
    setkilocaloriasSeachbar(kilocaloriasFormatada)

    
  }
  if (nota) {
    const notaComoNumero = parseFloat(nota.replace(',', '.')) || 0; // Substitui vírgula por ponto e converte para número, tratando o caso em que não é um número
    const notaFormatada = notaComoNumero.toFixed(2);
    setnotaSeachbar(notaFormatada)

    
  }

if(initialValue){
  setInput(initialValue)
}


}, [initialValue,proteina, carboidrato, lipideo, kilocalorias, nota, fibra]);





const alterarSearchbar = (text) => {
  // Remove caracteres não alfabéticos e números, mantendo espaços
//const newText = text.replace(/[^a-zA-Z\s]/g, '');
const newText = text.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, '');

  // Normaliza o texto para tornar a busca insensível a acentos
  const normalizedText = newText
  //unorm.nfd(newText).replace(/[\u0300-\u036f]/g, '');

  if (normalizedText.length > 2) {
    setInput(normalizedText);
   
    // Restante do código...
  } else {
    // Limpar os resultados se o número de caracteres for menor ou igual a 3
    setInput(normalizedText);


  }


};




  useEffect(() => {
    // Função assíncrona para buscar resultados na API
    const buscarResultados = async () => {
      try {
        const response = await axios.get(`http://192.168.2.14:8080/procuraralimento?query=${input}`);
        setSearchResults(response.data);
        
      } catch (error) {
        console.error('Erro ao buscar alimentos:', error);
      }
    };

    if (input.length < inputRef.current.length) {
      setInput(''); // Redefine o valor do input para uma string vazia
      setSearchResults([])
      setproteinaSeachbar('0')
      setcarboidratoSeachbar('0')
      setlipideoSeachbar('0')
      setkilocaloriasSeachbar('0')
      setnotaSeachbar('0')

    } else if ((input !== initialValue) &&( input!==alimentoSelected.current)){

  if(input.length>2){
    buscarResultados()
    setFlatListVisible(true)
   
  }




}


    // Atualiza a referência do inputRef com o valor atual
    inputRef.current = input;


if(input === ''){setCorController('green')}else{setCorController('darkolivegreen')








}


  }, [input]);



  const handleSuggestionClick = (selectedItem) => {
    const alimentoSelecionado = selectedItem.alimento;
    setInput(alimentoSelecionado);
    alimentoSelected.current = alimentoSelecionado;
    onAlimentoSelecionado(selectedItem);
    setSearchResults([]);
    setFlatListVisible(false);
   

    
    const proteina = parseFloat(selectedItem.proteina.replace(',', '.'));
    const carboidrato = parseFloat(selectedItem.carboidrato.replace(',', '.'));
    const lipideo = parseFloat(selectedItem.lipideo.replace(',', '.'));
    const kilocalorias = parseFloat(selectedItem.kilocalorias.replace(',', '.'));
    const fibra = parseFloat(selectedItem.fibra.replace(',', '.'));
  
    // Atualize os estados
    setproteinaSeachbar(proteina.toFixed(2));
    setcarboidratoSeachbar(carboidrato.toFixed(2));
    setlipideoSeachbar(lipideo.toFixed(2));
    setkilocaloriasSeachbar(kilocalorias.toFixed(2));
    setFibraSearchbar(fibra.toFixed(2));
    setnotaSeachbar(selectedItem.nota);
  };
  

  
  

  return (
    
    <View style={{backgroundColor:"darkolivegreen", width:"100%", borderRadius:15, marginTop:20,}}>
  <TextInput
    placeholder='Faça sua busca aqui'
    placeholderStyle={styles.placeholderStyle}
  style={{
    borderRadius: 15,
    width: '100%',
    borderWidth: 3,
    marginTop: 15,  
    padding: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
    borderColor: 'white',
    height: 50,
    backgroundColor:corController
  }}
  onChangeText={(text) => alterarSearchbar(text)}
  value={input}
/>

{isFlatListVisible &&  (
  <FlatList
    data={searchResults}
    renderItem={({ item }) => (
      <Text 
        onPress={() => handleSuggestionClick(item)}
        style={{ fontSize: 25, color: 'darkolivegreen', margin: 5, backgroundColor:'orange', textAlign:'center', borderRadius:15, fontWeight:'bold' }}>
        {item.alimento}
      </Text>
    )}
    keyExtractor={(item) => item._id}
  />
)}

     
<Text style ={{color:"white", alignSelf:"center", fontWeight:'bold', marginTop:10}}> Valores baseados em 100 gramas do alimento.</Text>

      <View style={{ marginBottom:10,flexDirection:'row', width:"100%", justifyContent:"space-around"}}>   
        
       
   
       
       
       
          <View style={styles.totalNutrientesContainer}>





        <View style={styles.inputMicronutrientes}>
         
        <Text  style={styles.tituloMicronut}>CARB</Text>
        <Text style={styles.textoMicronut} >{carboidratoSeachbar}</Text>
        </View>
      </View>

      <View style={styles.totalNutrientesContainer}>
        <View style={styles.inputMicronutrientes}>

          <Text style={styles.tituloMicronut}>PROT</Text>
          <Text  style={styles.textoMicronut}>{proteinaSeachbar}</Text>
        </View>
      </View>

      <View style={styles.totalNutrientesContainer}>
        <View style={styles.inputMicronutrientes}>
        <Text  style={styles.tituloMicronut}>GORD</Text>
        <Text  style={styles.textoMicronut}>{lipideoSeachbar}</Text>
        </View>
      </View>

      <View style={styles.totalNutrientesContainer}>
        <View style={styles.inputMicronutrientes}>
        <Text style={styles.tituloMicronut}>KCAL</Text>
        <Text style={styles.textoMicronut}>{kilocaloriasSeachbar}</Text>
        </View>
      </View>

      <View style={styles.totalNutrientesContainer}>
        <View style={styles.inputMicronutrientes}>
        <Text style={styles.tituloMicronut}>NOTA</Text>
        <Text style={styles.textoMicronut}>{notaSeachbar}</Text>
        </View>
      </View>
      </View>
   
    </View>
  );
}

const styles = {
  totalNutrientesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  micronutrientesContainer: {

    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloMicronut:{
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  inputMicronutrientes: {
    justifyContent:'center',
    alignItems:'center',
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 4,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    color: 'white',
    width: 65,
    height:70
  },
  textoMicronut:{
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  nutrientesTitle: {
    borderWidth:2,
    fontSize: 16,
    marginLeft: 8,
    color:'white'
  },
  placeholderStyle: {
    fontSize: 10, // Ajuste o tamanho do texto do placeholder conforme desejado
  },
};

export default Searchbar;
