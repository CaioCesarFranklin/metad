import React, { useState,useEffect } from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenA from './app/screen/ScreenA';
import ScreenB from './app/screen/ScreenB';
import Login from './app/login/Login';
import Logo from './app/logo/Logo';
import Register from './app/register/Register';
import User from './app/User/User';
import AreaAlimentar from './app/dieta/Areaalimentar';
import Cam from './app/Camera/Cam';
import Dieta from './app/dieta/Dieta';
import { FisicoProvider } from './app/usercontext/FisicoContext';
import { MeuPerfilProvider } from './app/usercontext/PerfilContext';
import { DietaProvider } from './app/usercontext/DietaContext';
import { View, StyleSheet,Text } from 'react-native';
import PeriodPicker from './app/dieta/PeriodPicker';
import Searchbar from './app/dieta/Searchbar';
import UnidadeMedida from './app/dieta/UnidadeMedida'
import { Ionicons } from '@expo/vector-icons'; 
import CompromissosPaciente from './app/saudePaciete/CompromissosPaciente';
import AntDesign from 'react-native-vector-icons/AntDesign'

import AnaliseProfissional from './app/saudePaciete/AnaliseProfissional';
const Tab = createBottomTabNavigator();

function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [registrar, setRegistrar] = useState(false);
  const[ titulo,setTitulo]=useState('')

if(!titulo){setTitulo('Olá, Paciente')}

  useEffect(()=>{

console.log(titulo)

  },[titulo])
  let ControleLoginRegister = null; // Inicialize como null

  if (!autenticado && !registrar) {
    
    ControleLoginRegister = <Login setAutenticado={setAutenticado} setRegistrar={setRegistrar} />;
  } else if (!autenticado && registrar) {
    ControleLoginRegister = <Register setRegistrar={setRegistrar} />;
  }

  return (
    <MeuPerfilProvider>
      <DietaProvider>
        <FisicoProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <Logo titulo={titulo}/>
            
            {autenticado ? (
              <Tab.Navigator >
         
                <Tab.Screen name="AreaAlimentar" component={Dieta} options={{
                   headerTransparent: true ,
                   title:"",
          tabBarLabel: '', // Defina a label da guia como uma string vazia para remover o título superior
          tabBarIcon: () => (
            <Ionicons name="ios-fast-food-outline" size={24} color="darkolivegreen"  />
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Define o título quando a guia "Home" for pressionada
            setTitulo('Area Alimentar');
          },
        })}/>
             









<Tab.Screen name="User" component={User} options={{
                   headerTransparent: true ,
                   title:"",
          tabBarLabel: '', // Defina a label da guia como uma string vazia para remover o título superior
          tabBarIcon: () => (
            <Ionicons name="stats-chart" size={24} color="darkolivegreen" />
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Define o título quando a guia "Home" for pressionada
            setTitulo('Meu Perfil');
          },
        })}/>

<Tab.Screen name="AnaliseProfissional" component={AnaliseProfissional} options={{
                   headerTransparent: true ,
                   title:"",
          tabBarLabel: '', // Defina a label da guia como uma string vazia para remover o título superior
          tabBarIcon: () => (
            <Ionicons name="calendar" size={24} color="darkolivegreen" />
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Define o título quando a guia "Home" for pressionada
            setTitulo('Análise Profissional');
          },
        })}/>

              </Tab.Navigator>
            ) : (
              ControleLoginRegister // Renderiza o componente apropriado
            )}
          </View>
        </NavigationContainer>
        </FisicoProvider>
      </DietaProvider>
    </MeuPerfilProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height:800,
    marginVertical: 30,
    backgroundColor: 'darkolivegreen',
  },
});

export default App;
