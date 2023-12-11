  import React,{useState,useEffect,useContext} from 'react'
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { View,Text,TextInput, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
  import axios from 'axios'
  import PasswordSeen from './passwordSeen/PasswordSeen';
  import { DietaContext } from '../usercontext/DietaContext';
  import Apoiadores from '../apoiadores/Apoiadores';
  import LoginGoogle from './GoogleLogin';
  import FontAwesome from 'react-native-vector-icons/FontAwesome'

  function Login({autenticado,setAutenticado,setRegistrar}) {



      const[checkCor,setCheckCor]=useState("white")
      const [email,setEmail] = useState('')
      const [senha,setSenha] = useState('')
      const [emailErro, setEmailErro] = useState('');
      const {user,setUser } = useContext(DietaContext);


  




    function VerificarEmail(text, setEmail, setEmailErro) {
      if(text=null){
        let text=""
      }
      
    
      setEmail(text);
      const ApenasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      if (!ApenasEmail.test(text)) {
        setEmailErro('O email informado é inválido');
      } else {
        setEmailErro('');
      }
    }

    async function handleLogin() {
      if (!senha) {
        setCheckCor('red');
        setTimeout(() => {
          setCheckCor('white');
        }, 1500);
        return;
      }

      try {
      
        const resposta = await axios.post('http://192.168.2.14:8080/login', { email, senha });
        console.log('handleLogin funcionando');
        console.log(resposta.data); // Verifique a resposta da rota
    
        if (resposta.status === 200) {
        
          await  AsyncStorage.setItem('token', resposta.data.token);

          setAutenticado(true);
        
          setUser(resposta.data);
      

        }
    
        setEmail('');
        setSenha('');

      } catch (error) {
        console.log(error); // Adicione isso para ver detalhes do erro
        if (error.response && error.response.status === 400) {
          alert('Usuário ou senha inválido');
          setEmail('');
          setSenha('');
        }
      }
    
      
    }




    useEffect(() => {
      // Aqui será executado quando autenticado mudar
      console.log(autenticado);
  
    }, [autenticado]); // Array de dependências

    function HandleRegister() {
      setRegistrar(true);
  
    }
    return (

  <ScrollView>
      <View style={{ backgroundColor: '#fffacd',flex: 1 , height:1200, alignItems:'center',justifyContent:"space-around"}}>
    

  <View style={{height:300, display:'flex', justifyContent:'space-around', marginTop:0}}>


  <View style={{alignItems:'center',backgroundColor:'darkolivegreen', justifyContent:'space-around',height:120,borderRadius:15}}>

          <View style={{ height:100, display:"flex",borderRadius:15 ,flexDirection:'column' , justifyContent:'space-around', alignItems:'center'}}>
          <Text style={{ color: 'yellow',fontSize: 30, fontWeight: 'bold'  ,textAlign: 'center'}}>Digite seu email: </Text>
          <TextInput
    style={{ backgroundColor: 'white', padding: 10,  width: 380, height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 30,textAlign: 'center'}}
    placeholder="Seu Email Pessoal"
    value={email}
    onChangeText={(text) => {
      VerificarEmail(text, setEmail, setEmailErro); // Chame a função aqui
      setEmail(text); // Atualiza o estado do email
    }}
  />
  </View>
  {emailErro && email &&  <Text style={{ fontSize: 15,height:20, color: '#ff4500', justifyContent:'space-around', display:'flex', marginTop:-16 }}>{emailErro}</Text>}

  </View>











          <View style={{alignItems:'center',backgroundColor:'darkolivegreen', justifyContent:'space-around',height:130,borderRadius:15}}>
        
          <Text style={{ color: 'yellow', fontSize: 30, fontWeight: 'bold'  , paddingBottom: 1, paddingTop: 2 , textAlign: 'center', textAlign: 'center' }}>Digite sua senha:</Text>
        
          <PasswordSeen 
          style={{ backgroundColor: 'white', padding: 10, width: 260, height: 50,  borderColor: 'gray', borderWidth: 1, borderRadius: 3 }}
          senha={senha} setSenha={setSenha}  onChange={setSenha} placeholder="Senha" />
          </View>
          
          </View>
    
          <View style={{ marginTop:-50}}>
          <View style={{ flexDirection: 'row',width:380  ,justifyContent: 'space-between', justifyContent:'space-around' }}>

            <TouchableOpacity
              style={{ backgroundColor: 'darkolivegreen', borderRadius: 10, width: 170, height:60, alignItems:'center', justifyContent:'center' }}
              onPress={handleLogin}
            >
              <Text style={{ color: 'white' ,textAlign: 'center'}}>ENTRAR</Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity
             style={{ backgroundColor: '#ff6347', borderRadius: 10, width: 170, height:60, alignItems:'center', justifyContent:'center' }}
              onPress={HandleRegister}
            >
              <Text style={{ color: 'white' }}>CADASTRAR-SE</Text>
            </TouchableOpacity>
          
            </View>
            <Text style={{ marginTop: 20 , textAlign: 'center'}}>Esqueceu sua senha? <Text style={{ textDecorationLine: 'underline' }}>Clique Aqui.</Text></Text>
          
          </View>

          <View style={{alignContent:"center",justifyContent:'center', alignItems:'center', marginTop:-60}}>
          <Text style={{fontSize:20, fontWeight: 'bold' , fontWeight: 'bold', width:400, color:'darkolivegreen', textAlign:'center'}}> É GRAÇAS A ELES</Text>
          <FontAwesome  name='chevron-down' size={50} color='darkolivegreen' />
          </View>
  <Apoiadores />
      </View>
      </ScrollView>
    )
  }


  const styles = StyleSheet.create({
    container: {
      marginVertical: 30,
      backgroundColor: 'darkolivegreen',
    },
  });


  export default Login
