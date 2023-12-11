

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

function Register({ setRegistrar }) {
  const [verificarCor, setVerificarCor] = useState('white');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [usuarioErro, setUsuarioErro] = useState('');
  const [emailErro, setEmailErro] = useState('');
  const [whatsappErro, setWhatsappErro] = useState('');

  const ApenasLetras = /^[A-Za-z\s]+$/
  const ApenasNumeros = /^[0-9]+$/;
  const ApenasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function VerificarUsuario(inputValue) {
    setUsuario(inputValue);

    if (inputValue.length === 0) {
      setVerificarCor('white');
      setUsuarioErro('');
    } else if (inputValue.length < 3 || !ApenasLetras.test(inputValue)) {
      setVerificarCor('red');
      setUsuarioErro('O usuário deve conter apenas letras e ter no mínimo 3 caracteres');
    } else {
      setVerificarCor('white');
      setUsuarioErro('');
    }
  }

  function VerificarEmail(inputValue) {
    setEmail(inputValue);

    if (!ApenasEmail.test(inputValue)) {
      setEmailErro('O email informado é inválido');
    } else {
      setEmailErro('');
    }
  }

  function VerificarWhatsapp(inputValue) {
    setWhatsapp(inputValue);

    if (!ApenasNumeros.test(inputValue)) {
      setWhatsappErro('O whatsapp deve conter apenas números');
    } else {
      setWhatsappErro('');
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("Antes das verificações:", usuario, email, whatsapp); // Adicione este console.log
  
      if (usuario.length < 3 || !ApenasLetras.test(usuario)) {
        setUsuarioErro('O usuário deve conter apenas letras e ter no mínimo 3 caracteres');
        console.log("Erro de usuário:", usuario); // Adicione este console.log
        return;
      } else {
        setUsuarioErro('');
      }
  
      if (!ApenasEmail.test(email)) {
        setEmailErro('O email informado é inválido');
        console.log("Erro de email:", email); // Adicione este console.log
        return;
      } else {
        setEmailErro('');
      }
  
      if (!ApenasNumeros.test(whatsapp)) {
        setWhatsappErro('O whatsapp deve conter apenas números');
        console.log("Erro de whatsapp:", whatsapp); // Adicione este console.log
        return;
      } else {
        setWhatsappErro('');
      }
  
      console.log("Antes da chamada à API:", usuario, email, whatsapp,senha); // Adicione este console.log
      
      const response = await axios.post('http://192.168.2.10:8080/cadastro', {
        usuario: usuario,
        senha: senha,
        email: email,
        whatsapp: whatsapp,
      });
  
      console.log("Resposta da API:", response.data); // Adicione este console.log
  
      setRegistrar(false);
    } catch (error) {
      console.log("Erro na chamada à API:", error); // Adicione este console.log
      // Tratamento de erros
    }
  };

  function voltar() {
    setRegistrar(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Área de registro de Pacientes</Text>

      <Text style={styles.texto}>Digite seu Usuário</Text>
      <TextInput
        style={[styles.input, { backgroundColor: verificarCor }]}
        placeholder="Seu usuário"
        value={usuario}
        onChangeText={VerificarUsuario}
      />
      {usuarioErro && usuario && <Text style={styles.error}>{usuarioErro}</Text>}

      <Text style={styles.texto}>Digite sua Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Sua senha"
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.texto}>Digite seu Email Pessoal</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu Email Pessoal"
        value={email}
        onChangeText={VerificarEmail}
      />
      {emailErro && email && <Text style={styles.error}>{emailErro}</Text>}

      <Text style={styles.texto}>Digite seu Whatsapp</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu Whatsapp"
        value={whatsapp}
        onChangeText={VerificarWhatsapp}
      />
      {whatsappErro && whatsapp && <Text style={styles.error}>{whatsappErro}</Text>}

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botao} onPress={handleRegister}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={voltar}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  botoesContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  botao: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginHorizontal: 10,
  },
};

export default Register;
