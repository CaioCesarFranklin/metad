import React from 'react'
import  { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput,FlatList,Modal,ScrollView} from 'react-native';
import { FisicoContext } from '../usercontext/FisicoContext';

import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
function ExercicioFisico({item, onAtividadeSelecionada,initialValue}) {
    const {atividadeFisica,setAtividadeFisica,atividadeFisicaController, setAtividadeFisicaController,peso}= useContext(FisicoContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [exercicioFisico,setExercicioFisico]= useState(initialValue || '')


  const [dataController,setDataController]= useState(false)
  const [ corController,setCorController]= useState('orange')


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
  
    console.log(exercicioFisico)
},[exercicioFisico])

  const handlePress = (atividade) => {
    setExercicioFisico(atividade);
    onAtividadeSelecionada(atividade);
    closeModal(); // Fechar o modal após o pressionar
  };
    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };





  return (
    <View style={{flexDirection:'row', justifyContent:'space-around',marginBottom:10}}> 
    


    <TouchableOpacity onPress={openModal}>
        <View style={{ backgroundColor: 'darkolivegreen', width: 300,height:40, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 15, borderWidth: 5, borderColor: 'green' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{exercicioFisico}</Text>
        </View>
      </TouchableOpacity>




       


      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Selecione sua atividade:</Text>

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.contentContainer}>
            {Object.entries(equivalences).map(([atividade]) => (
              <TouchableOpacity
                key={atividade}
                onPress={() => handlePress(atividade)}
              >
                <Text style={styles.activityText}>{atividade}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.closeButtonText}>Fechar Modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
          </View>
    )
  }
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalTitle: {
      color: 'white',
      marginTop: 30,
      fontSize: 25,
      fontWeight: 'bold',
    },
    scrollViewContainer: {
      flexGrow: 1,
    },
    contentContainer: {
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: 'darkolivegreen',
      alignItems: 'center',
      borderRadius: 15,
      paddingVertical: 15,
    },
    activityText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: 'tomato',
      borderRadius: 10,
      marginBottom:20
    },
    closeButtonText: {
      
      color: 'white',
      textAlign: 'center',
    },
  });
  
  export default ExercicioFisico;