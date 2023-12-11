import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'; // Importe da forma correta

function PasswordSeen({senha,setSenha}) {

  const [verSenhaPositivo, setVerSenhaPositivo] = useState(false);

  const verPassword = () => {
    setVerSenhaPositivo(!verSenhaPositivo);
  };

  return (
    <View style={styles.espacoPasswordComponent}>
      <View style={styles.areaTotalVerPassword}>
        <TextInput
          style={{ backgroundColor: 'white', padding: 10, width: 380, height: 50,  borderColor: 'gray', borderWidth: 1, borderRadius: 30,textAlign: 'center' }}
          secureTextEntry={!verSenhaPositivo} // Altera o tipo do input com base em verSenhaPositivo
          value={senha}
          onChangeText={setSenha}
          placeholder="Senha"
          placeholderTextColor="#666" // Cor do placeholder
        />
        <TouchableOpacity style={styles.iconePasswordComponent} onPress={verPassword}>
          {verSenhaPositivo ? (
            <Icon name="eye" color="darkolivegreen" size={20} />
          ) : (
            <Icon name="eye-off-outline" color="darkolivegreen" size={20} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  espacoPasswordComponent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaTotalVerPassword: {
    display: 'flex',
  },
  inputPasswordComponent: {
    width: 210,
    textAlign: 'center',
    borderRadius: 10,
    borderColor: 'rgba(255, 218, 56, 0.418)',
    borderWidth: 1, // Adicione isso para criar uma borda
    padding: 10, // Adicione isso para criar um espaço interno
    marginBottom: 10, // Espaçamento inferior
    placeholderTextColor: '#666', // Cor do placeholder
  },
  iconePasswordComponent: {
    position: 'absolute',
    // display: 'flex', // Não é necessário
    justifyContent: 'center',
    alignItems: 'start',
    right: 10, // Ajuste a posição do ícone da direita
    top: 12, // Ajuste a posição do ícone de cima
  },
};
export default PasswordSeen;
