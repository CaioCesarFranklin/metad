import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Picker from 'react-native-picker';
import Searchbar from './Searchbar';
import axios from 'axios';
import AntDesign from  'react-native-vector-icons/AntDesign'
import Entypo from  'react-native-vector-icons/Entypo'
import { DietaContext } from '../usercontext/DietaContext';






function AreaAlimentar() {


 
    

  const [dieta, setDieta] = useState([]);

  const { user } = useContext(DietaContext);


dieta
  return (
    <View>

<View 
style=
{{  flex: 1,
 
    justifyContent: "center",
    alignItems: "center",
    width:340,
    }}>

  <Text style={{ fontSize: 50, color:"white" }}>Area Alimentar</Text>
</View>

    

      


      <View style={styles.botaoSalvarContainer}>


        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <TouchableOpacity style={styles.iconeAdicionar} onPress={handleAdicionarCampo}>
          <AntDesign  style={{  color:"white" }} name="pluscircle" size={24}  />
        </TouchableOpacity>
        <Text  style={{  color:"white" }}>Adicionar refeição</Text>
        </View>
<View style={{ flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <TouchableOpacity style={styles.iconeSalvar} onPress={handleSalvar}>
        
        <Entypo  style={{  color:"white" }} name="save" size={24} color="black" />
      </TouchableOpacity>
      <Text  style={{  color:"white" }}>Salvar</Text>
      </View>
      </View>

  
      <FlatList
     
  data={dieta}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View key={item.id}>
      <Picker
 style={{
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: '#E6E6E6', // Cor de fundo
  borderRadius: 5,
  paddingVertical: 8,
  paddingHorizontal: 12,

  borderColor: '#CCCCCC',
  borderWidth: 1,

}}
        selectedValue={item.selectValue}
        onValueChange={(value) => handleChangeSelect(item.id, value)}
        itemStyle={{ textAlign: 'center' }} // Centralizar o valor selecionado
        
      >
        <Picker.Item label="Manhã" value="manha" />
        <Picker.Item label="Tarde" value="tarde" />
        <Picker.Item label="Noite" value="noite" />
      </Picker>

      {/* Lista de search bars */}
      {item.searchbars.map((sb) => (
        <View style={{}} key={sb.id}>
          {/* Componente de SearchBar */}
          <Searchbar
            initialValue={sb.alimentoEncontrado ? sb.alimentoEncontrado : ''}
            onChange={(newValue) =>
              handleInputChange(
                item.id,
                sb.id,
                newValue,
                sb.proteina,
                sb.carboidrato,
                sb.lipideo,
                sb.kilocalorias,
                sb.nota
              )
            }
            onSearchResult={(alimento) =>
              handleInputChange(
                item.id,
                sb.id,
                alimento,
                alimento.proteina,
                alimento.carboidrato,
                alimento.lipideo,
                alimento.kilocalorias,
                alimento.nota
              )
            }
            selectValue={sb.selectValue} 
            style={{ zIndex: 1}} // Adicione o selectValue aqui
          />
          {/* Botão de excluir search bar */}
          <TouchableOpacity 
            style={{
              marginTop:"1",
              marginBottom:"15",
              flexDirection:"row",
              textAlign:"center",
              alignItems: 'center', // Centralizar conteúdo horizontalmente
              justifyContent: 'center', // Centralizar conteúdo verticalmente
            }}
          
          onPress={() => handleExcluirSearchBar(item.id, sb.id)}>

            <AntDesign style={{  color:"white" }} name="minuscircle" size={24} color="black" />
            <Text style={{ marginLeft:10,color:"white"}}>Excluir Alimento</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Botões de controle de refeição */}
      <View    style={{ marginTop:15,marginBottom:25,flexDirection:"row", justifyContent:"space-around"}}>
    
        <TouchableOpacity
        style={{flexDirection:"row"}} onPress={() => handleAdicionarSearchBar(item.id)}>
          <AntDesign style={{  color:"white" }} name="pluscircle" size={24} color="black" />
          <Text  style={{  color:"white" ,marginLeft:4}}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity    style={{flexDirection:"row"}} onPress={() => handleExcluirCampo(item.id)}>
          <AntDesign  style={{  color:"white" }} name="minuscircle" size={24} color="black" />
          <Text style={{  color:"white" ,marginLeft:4}}>Excluir</Text>

        </TouchableOpacity>
  
      </View>
    </View>
  )}
  style={{
    width:"100%",
      height:300,

    minWidth:320,
 
    zIndex: 1, // Isso já está no seu código para priorizar a exibição da lista de sugestões
    backgroundColor: 'darkolivegreen', // Altere a cor de fundo conforme necessário
    borderWidth: 1, // Adicione bordas ou outras estilizações desejadas
    borderColor: 'gray', // Cor da borda
    borderRadius: 5, // Borda arredondada
    
    

  }}
/>
<View >
      <View style={styles.totalNutrientesContainer}>
        {/* Seção de micronutrientes */}
        <View style={styles.micronutrientesContainer}>
          <TextInput
            style={styles.inputMicronutrientes}
            value={somaCarboidratos.toString()}
            editable={false}
          />
          <Text style={styles.nutrientesTitle}>CARB</Text>
        </View>
        {/* Repita o padrão para os outros nutrientes */}
      </View>

      <View style={styles.totalNutrientesContainer}>
        {/* Seção de micronutrientes */}
        <View style={styles.micronutrientesContainer}>
          <TextInput
            style={styles.inputMicronutrientes}
            value={somaProteinas.toString()}
            editable={false}
          />
          <Text style={styles.nutrientesTitle}>PROT</Text>
        </View>
        {/* Repita o padrão para os outros nutrientes */}
      </View>

      <View style={styles.totalNutrientesContainer}>
        {/* Seção de micronutrientes */}
        <View style={styles.micronutrientesContainer}>
          <TextInput
            style={styles.inputMicronutrientes}
            value={somaLipideos.toString()}
            editable={false}
          />
          <Text style={styles.nutrientesTitle}>LIP</Text>
        </View>
        {/* Repita o padrão para os outros nutrientes */}
      </View>

      <View style={styles.totalNutrientesContainer}>
        {/* Seção de micronutrientes */}
        <View style={styles.micronutrientesContainer}>
          <TextInput
            style={styles.inputMicronutrientes}
            value={somaKcal.toString()}
            editable={false}
          />
          <Text style={styles.nutrientesTitle}>KKAL</Text>
        </View>
        {/* Repita o padrão para os outros nutrientes */}
      </View>

      <View style={styles.totalNutrientesContainer}>
        {/* Seção de micronutrientes */}
        <View style={styles.micronutrientesContainer}>
          <TextInput
            style={styles.inputMicronutrientes}
            value={somaNota.toString()}
            editable={false}
          />
          <Text style={styles.nutrientesTitle}>NOTA</Text>
        </View>
        {/* Repita o padrão para os outros nutrientes */}
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
  areaTotalNutrientesContainer:{
    marginBottom:210,
    flexDirection: 'row',

  },
  micronutrientesContainer: {
    

    alignItems: 'center',
    justifyContent:'center',
  },
  inputMicronutrientes: {
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    color:"white",
    width: 40,
  },
  nutrientesTitle: {
    fontSize: 16,
    marginLeft: 8,
  },
  botaoSalvarContainer: {

    justifyContent:'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    
  },
  iconeAdicionar: {
    marginRight: 5,
  },
  iconeSalvar: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
};

export default AreaAlimentar;