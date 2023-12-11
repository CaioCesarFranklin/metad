import { useState, useEffect ,useRef} from 'react'
import React from 'react'
import { View, SafeAreaView,Text, TouchableOpacity,Modal, Image } from 'react-native'
import { Camera } from 'expo-camera'
import Ionicons from 'react-native-vector-icons/Ionicons'

function Cam() {
  const canRef = useRef(null)
  const [permissao,setPermissao]=useState(false)
  const [camTrazeira,setCamTrazeira]=useState(Camera.Constants.Type.front)
  const [fotoCapturada,setFotoCapturada] = useState(null)
  const [open,setOpen]= useState(false)
  useEffect(()=>{
    (async()=>{
    const {status}  = await Camera.requestCameraPermissionsAsync()
    setPermissao(status === 'granted')
    })()
    },[])

    async function tirarFoto() {
      if (canRef.current) { // Certifique-se de verificar se canRef.current não é nulo
        const data = await canRef.current.takePictureAsync();
        setFotoCapturada(data.uri)
        setOpen(true)
        console.log(data);
      }
    }
    
    if (permissao === null){return <View/>}
    if(permissao===false){
      return <Text>ANDO ruim</Text>
    }
 

  return (
  <SafeAreaView style={{flex:1, justifyContent:"center"}}>

    <Camera
    style={{flex:1,}}
    type={camTrazeira}
    ref={canRef}
>
<View
style={{flex:1, backgroundColor:"transparent", flexDirection:"row"}}
>
<TouchableOpacity
style={{position:"absolute",bottom:20, left:20, flexDirection:'row', justifyContent:"space-around",width:"100%"}}
>



<Ionicons name="camera-reverse-sharp" size={60} color={"darkolivegreen"} style={{ alignContent:"center" ,textAlign:"center", marginBottom:15}} 
onPress={() => {
  setCamTrazeira(camTrazeira === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front);
}}/>


<Ionicons name="camera-sharp" size={60} 
color={"darkolivegreen"} 
style={{ alignContent:"center" 
,textAlign:"center", marginBottom:15
}} 
onPress={tirarFoto}/>


</TouchableOpacity>

<TouchableOpacity
style={{position:"absolute",bottom:20, left:20, flexDirection:'row', justifyContent:"space-around",width:"100%"}}

onPress={() => setOpen(false)
}

>


</TouchableOpacity>
{fotoCapturada && <Modal

animationType='slide'
transparent={false}
visible={open}
>
  <View
  style={{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    margin:20

  }}>

<TouchableOpacity   onPress={()=>{setOpen(false)}}>

  <Text
  style={{color:"red"}}
  >
    FECHAR
  </Text>

</TouchableOpacity>

    <Image
      style={{width:"100%", height:300, borderRadius:20}}
    source={{uri:fotoCapturada}}
    />




  </View>
  
  </Modal>}


</View>



    </Camera>
  </SafeAreaView>
  )
}

export default Cam
