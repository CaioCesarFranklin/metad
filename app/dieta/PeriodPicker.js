// PeriodPicker.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const PeriodPicker = ({ selectedValue,onPeriodChange  }) => {
    const [selectedPeriod, setSelectedPeriod] = useState(selectedValue); 
  const [isModalVisible, setModalVisible] = useState(false);
  const values = [
    { label: 'Manhã', value: 'manha' },
    { label: 'Tarde', value: 'tarde' },
    { label: 'Noite', value: 'noite' },
  ];

  useEffect(() => {

  }, [isModalVisible]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelectValue = () => {
    setModalVisible(true);
  };


  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    onPeriodChange(period); // Chame a função passada como prop para atualizar o groupedData
    toggleModal();
  };

  return (
    <View style={styles.areaTotal}>
      <View style={styles.areaAlterarValue}>

    <View style={{flexDirection:'column', alignContent:"center", justifyContent:'center'}}>

        <Text style={styles.textoInicio}>SELECIONE </Text>
        <Text style={{color:"white",fontSize:15, fontWeight:'bold', fontStyle:'italic', alignSelf:"center"}}> o período:</Text>
    </View>



        <TouchableOpacity style={styles.itemSelectValue} onPress={handleSelectValue}>
          <Text style={styles.textoSelectValue}>
            {values.find((item) => item.value === selectedPeriod)?.label}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
 <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
   <View style={styles.modal}>
     <FlatList
       style={styles.modalFlatList}
       data={values}
       keyExtractor={(item) => item.value}
       renderItem={({ item }) => (
         <TouchableOpacity onPress={() => handlePeriodSelect(item.value)}>
           <Text style={styles.modalText}>{item.label}</Text>
         </TouchableOpacity>
       )}
     />
     <TouchableOpacity onPress={toggleModal}>
       <Text style={styles.textoFechar}>Fechar</Text>
     </TouchableOpacity>
   </View>
 </View>
</Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkolivegreen',
    width: '70%',
    height: 200,
    marginTop: 250,
    borderRadius: 15,
  },
  areaTotal: 
{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor:"darkolivegreen",
    borderRadius:15 ,
  },
  texto: {
    padding: 5,
    fontStyle: 'italic',
    fontWeight: '900',
    color: 'white',
    fontSize: 20,
  },
  textoFechar: {
    fontStyle: 'italic',
    fontWeight: '900',
    color: 'orangered',
    fontSize: 20,
  },
  textoInicio: {
    fontStyle: 'italic',
    fontWeight: '900',
    color: 'white',
    alignItems:'center',
    textAlign:"center",
    alignSelf:"center",
    fontSize: 20,
    marginRight:20
  },
  areaAlterarValue: {
    display: 'flex',
    flexDirection: 'row',
    alignContent:'center',
    alignContent:'center',
    justifyContent: 'space-around',
    padding: 3,
  },
  modalFlatList: {
    alignContent: 'center',
    textAlign: 'center',
  },
  modalText: {
    padding: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  textoSelectValue:{

    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '900',
    color: 'darkolivegreen',

   

  },
  itemSelectValue: {
    alignItems:'center',
    justifyContent:"center",
    textAlign: 'center',
    width:130,
    height:80,
    borderRadius:15, 
    backgroundColor:'orange',
  },
});

export default PeriodPicker;
