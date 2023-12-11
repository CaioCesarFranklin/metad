
import Teste from './teste'
import { View, StyleSheet,Text } from 'react-native';
import { useState,useEffect,useContext } from 'react'
import { MeuPerfilContext } from '../src/components/usercontext/PerfilContext'
import Quemsomos from './quemsomos/Quemsomos'
import Login from './login/Login'
import Novidades from './novidades/Novidades'
import Propaganda from './propaganda/Propaganda'
import Logo from './logo/Logo';
import User from './User/User';
import Register from './register/Register';
import SearchBar from './dieta/Searchbar';
import AreaAlimentar from './dieta/Areaalimentar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cat from './teste';


const Tab = createBottomTabNavigator();

function Index() {

  const [autenticado, setAutenticado]= useState(false)
  const [registrar,setRegistrar]= useState(false)

  const{
    perfilClicked, setPerfilClicked,
    dietaClicked, setDietaClicked,
    informacoesClicked, setInformacoesClicked,
    marketClicked, setMarketClicked,
    profissionaisClicked, setProfissionaisClicked,
    procurarClicked, setProcurarClicked,
    setDietaCalculo
  
  
  } = useContext(MeuPerfilContext)


 


  return (
    <NavigationContainer>
    <Tab.Navigator>

    <Tab.Screen name="Home" component={Cat} />

  </Tab.Navigator>
  </NavigationContainer>


  
);
};



export default Index;
