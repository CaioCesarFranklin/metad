import React from 'react'
import  { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput,ScrollView } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons'; // Usando um ícone de uma biblioteca para React Native

function CompromissosPaciente() {
  return (

<View>
<AntDesign  name="calendar" size={30} style={{ color: "black" }}/>
<Text>Compromissos</Text>
</View>
  )
}

export default CompromissosPaciente