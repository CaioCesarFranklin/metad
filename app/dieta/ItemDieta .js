import React, { useEffect, useState ,useContext} from 'react';
import { View, TextInput,StyleSheet } from 'react-native';
import { DietaContext } from '../usercontext/DietaContext';

const ItemDieta = ({ initialValue,onQuantidadeSelecionada  }) => {
  const [quantidade, setQuantidade] = useState(initialValue || '0');
  const[ corController, setCorController]=useState('darkolivegreen')




  const handleQuantityChange = (newValue) => {
    // Remove qualquer caractere não numérico
    const numericValue = newValue.replace(/[^0-9]/g, '');
  
    // Atualiza o estado apenas se o valor for válido


    setQuantidade(numericValue);
  };





  useEffect(() => {
    onQuantidadeSelecionada(quantidade);
  
    if (!quantidade || quantidade === '0' || quantidade ==='00' || quantidade === '000'|| quantidade === '0000') {
      setCorController('red');
    } else {
      setCorController('darkolivegreen');

    }
  
    console.log('quantidade:', quantidade);
    console.log('corController:', corController);

  }, [quantidade]);






  return (
    <View  style={[styles.areatotal, { backgroundColor: corController}]}>
      <TextInput
      keyboardType="numeric"
      placeholder='QNT'
          style={styles.textoQuantidade}
        value={quantidade}
        onChangeText={handleQuantityChange}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    areatotal:{
       
        width:80,
        height:70,
        textAlign:'center',
        alignContent:'center',
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        borderWidth:3,
        borderColor:'white'

    },
    textoQuantidade:{
        textAlign:"center",
        color:'white',
        fontSize:30,
        fontWeight:'bold'


    }
    
})
export default ItemDieta;
