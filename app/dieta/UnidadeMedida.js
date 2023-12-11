import React, { useState, useRef, useEffect,useContext } from 'react';
import { View, Text, TextInput, SafeAreaView,FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { DietaContext } from '../usercontext/DietaContext';
const UnidadeMedida = ({ initialValue, onUnidadeMedidaSelecionada }) => {
 const [unit, setUnit] = useState(initialValue || '');
 const [isModalVisible, setModalVisible] = useState(false);
 const inputRef = useRef();
 const equivalences = {
  'Colher de Sopa': 20,
  'Colher de Chá': 5,
  'Xícara': 240,
  'Gramas': 1,
  'Kilogramas': 1000,
  'Litros': 1000,
  'Mililitros': 1,
 };


 

 const units = Object.keys(equivalences);

 const handleUnitSelect = (unit) => {
  
setUnit(unit)

   setModalVisible(false);
   onUnidadeMedidaSelecionada(unit)
 };

 const handleInputFocus = () => {
   setModalVisible(true);
 };

 const handleModalClose = () => {
   setModalVisible(false);
 };


 
 return (
    <SafeAreaView>
     <TouchableOpacity style ={{width:'100%', height:50}} onPress={handleInputFocus}>
   <View style={styles.container}>
       <Text
        
         style={styles.input} 
       >
         {unit} 
       </Text>
       </View>
     </TouchableOpacity>

     <Modal
       animationType="slide"
       transparent={true}
       visible={isModalVisible}
       onRequestClose={handleModalClose}
     >
       <TouchableOpacity
         style={styles.modalOverlay}
         activeOpacity={1}
        
       >
         <View style={styles.modalContainer}>
           <FlatList
             style={styles.flatList}
             data={units}
             keyExtractor={(item) => item}
             renderItem={({ item }) => (
               <TouchableOpacity onPress={() => handleUnitSelect(item)}>
                 <Text style={{color:"white",alignSelf:'center',fontSize:20,margin:5, fontWeight:'bold',fontStyle:'italic'}}>{item} </Text>

                
               </TouchableOpacity>
             )}
           />
           <TouchableOpacity   onPress={handleModalClose}>
       <Text style={styles.textoFechar}>Fechar</Text>
     </TouchableOpacity>
         </View>
       </TouchableOpacity>
     </Modal>
 
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
    areaunidadeMedida:{
   width:"100%",
  height:50,
  
    },
    textoFechar: {
      fontStyle: 'italic',
      fontWeight: '900',
      color: 'orangered',
      fontSize: 20,
      alignSelf:"center"
    },
 container: {
  
  justifyContent: 'center',
  alignItems: 'center',
  alignContent:'center',
  textAlign:"center",
  backgroundColor:"darkolivegreen",
  width:150,
  height:50,
  borderRadius:15
 },
 input: {

   fontSize:20,
   fontWeight:"bold",
   color:'white',
   

 },
 modalOverlay: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(0,0,0,0.7)'
 },
 modalContainer: {

  justifyContent:'center',
  alignContent:"center",
  textAlign:"center",
   width: '80%',
   backgroundColor: 'darkolivegreen',
   borderRadius: 10,
   padding: 20,
   height:400
 },
 flatList: {
   height: '100%',
  alignContent:"center",
  textAlign:"center",
 },
});

export default UnidadeMedida;
