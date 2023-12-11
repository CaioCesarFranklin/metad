import React, { useState, useEffect,useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { DietaContext } from '../usercontext/DietaContext';
const TotalNutrientes = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [componentHeight, setComponentHeight] = useState(80);
  const [corController, setCorController]=useState('darkolivegreen')

  

  const { user,
    totalCarboidrato,
    totalProteina,
    setTotalCarboidrato,
    setTotalProteina,
    setTotalLipideo,
     searchBarsWithValues,
     totalLipideo,
     totalNota,
     setTotalNota,
     mediaNota,
     filledSearchbars,
     setFilledSearchbars,
     totalKcal,
     groupedData,
      setGroupedData,
      searchbarVazia, 
      setSearchbarVazia,
      somaCarboidratos,setSomaCarboidratos,
somaProteinas,setSomaProteinas,
somaLipideos,setSomaLipideos,
somaKilocalorias, setSomaKilocalorias,
somaFibras, setSomaFibras,
      setTotalKcal,
      totalNutrientesController,
      setTotalNutrientesController  } = useContext(DietaContext);



useEffect(()=>{


if(totalNutrientesController){
  
  
  setCorController('red')
  setIsExpanded(false)
  setComponentHeight(80)
}else{
  setCorController('darkolivegreen')
  
}

},[totalNutrientesController])

      

  const toggleExpand = () => {
if(!isExpanded){
setIsExpanded(true)
setComponentHeight(400)
}else{setIsExpanded(false)
    setComponentHeight(80)
}
  };

  return (
    <View style={[styles.container, { height: componentHeight, }]}>
      <TouchableOpacity onPress={toggleExpand} style={{height:50, alignItems:'center',width:"100%",backgroundColor:corController , borderRadius:15}}
      
      disabled={totalNutrientesController}
      
      >
        <Text  style={{color:'orange', fontSize:30, fontWeight:'bold',
        textAlign:"center",borderRadius:15
    }}
    >{isExpanded ? 'Esconder' : 'Exibir Detalhes'}
    </Text>
      </TouchableOpacity>
      {isExpanded && (
           <View style={{ width:'100%',height:'100%', justifyContent:'flex-start',alignItems:'center'}}>


<Text style={{letterSpacing:2,color:'orange',fontWeight:'bold'}}>QUANTIDADE TOTAL</Text>
        <View style={{flexDirection:'row', width:'100%',justifyContent:'space-around'}}>

<View style={{//ladoesquerdo

  flexDirection:'column',
  justifyContent:'center',
  alignItems:"center",
  width:'60%',

  height:350
}}>



   


<View style={{height:80, width:'90%',  justifyContent:'center',backgroundColor:"darkolivegreen",borderRadius:15 ,alignContent:"center"}}> 
       <Text style={{margin:7,fontSize:25,fontWeight:'bold', color:"white" ,borderRadius:15}}>Carboidratos:</Text>    
     
     </View>
       
       <Text style={{margin:7,width:'90%', fontSize:25,fontWeight:'bold',height:40, color:"white", backgroundColor:"darkolivegreen",  textAlign:"center",borderRadius:15}}>Proteína:</Text>    
       <Text style={{margin:7,width:'90%', fontSize:25,fontWeight:'bold',height:40, color:"white", backgroundColor:"darkolivegreen",  textAlign:"center",borderRadius:15}}>Gordura:</Text>    
       <Text style={{margin:7, width:'90%',fontSize:25,fontWeight:'bold',height:40, color:"white", backgroundColor:"darkolivegreen",  textAlign:"center",borderRadius:15}}>Kilocalorias:</Text>    
       <Text style={{margin:7, width:'90%',fontSize:25,fontWeight:'bold',height:40, color:"white", backgroundColor:"darkolivegreen",  textAlign:"center",borderRadius:15}}>Nota:</Text>    
           
           
           
           </View>


           <View        style={{//ladoedireito
flexDirection:'column',
justifyContent:'center',
alignItems:"center",
width:'30%',

height:350
}}>



<View style={{height:80,width:130, backgroundColor:'gray', alignItems:"center", justifyContent:'center',backgroundColor:"orange",borderRadius:15}}> 
       <Text style={{margin:7,fontSize:30,fontWeight:'bold', color:"white" ,height:40,  textAlign:"center"}}>{somaCarboidratos}</Text> 


          <View style={{flexDirection:'row', justifyContent:'center', position:'absolute',top:52, margin:0}}>
       <Text style={{margin:7,fontSize:10,fontWeight:'bold', color:"white" ,  textAlign:"center"}}>onde <Text style={{color:"red",fontSize:11}}>{somaFibras}</Text> são <Text style={{color:'darkolivegreen',fontSize:10}}>FIBRAS</Text></Text>    
     
     
     
     </View>     
     </View>     
       <Text style={{margin:7, fontSize:30,fontWeight:'bold', maxHeight:40,  color:"white", backgroundColor:"orange", width:100, textAlign:"center",borderRadius:15,width:130}}>{somaProteinas}</Text>    
       <Text style={{margin:7, fontSize:30,fontWeight:'bold',  maxHeight:40, color:"white", backgroundColor:"orange", width:100, textAlign:"center",borderRadius:15,width:130}}>{somaLipideos}</Text>    
       <Text style={{margin:7, fontSize:30,fontWeight:'bold', maxHeight:40,  color:"white", backgroundColor:"orange", width:100, textAlign:"center",borderRadius:15,width:130}}>{somaKilocalorias}</Text>    
       <Text style={{margin:7, fontSize:30,fontWeight:'bold', maxHeight:40,  color:"white", backgroundColor:"orange", width:100, textAlign:"center",borderRadius:15,width:130}}>0</Text>    
           
           







           </View>

           </View>

           </View>

      )}
    </View>
  );
};

const styles = StyleSheet.create({









  valorMacronutrienteSoma:{
    backgroundColor:'white',
    width:'80%',
    fontSize:20,
    textAlignVertical:'center',
    color:"darkolivegreen",
        textAlign:"center",
        borderRadius:15,
        borderWidth:3
  },
  valorMacronutriente:{
    borderWidth:3,
    width:50,
    fontWeight:'bold',
    fontSize:20,
    alignContent:'center',
    justifyContent:"center",
    textAlign:"center",
    borderColor:'white'
        
    },
  container: {

    marginTop:20,
    width:'100%',

alignItems:'center',
    padding: 10,
    marginBottom: 10,
  },
  
    areaTotalMacronutriente:{
    flexDirection:'column',
    justifyContent:'space-between',
  //  backgroundColor:"black",
    height:'80%',
    width:190
  },
  areaTotalMacronutrienteValor:{
    flexDirection:'column',
    justifyContent:'space-between',
  
    alignContent:"center",
    alignItems:"center",
    textAlign:'center',
    height:'80%',
    width:190
  },
  areaMacronutriente:{
    flexDirection:'row',
    width:"100%",
    justifyContent:'space-around',
    alignItems:"center",
    backgroundColor:"orange",
    borderRadius:15,

   
  },
  textoMacronutriente:{
color:'darkolivegreen',
fontSize:20,
fontWeight:'bold',
textAlign:'center',
  }
});

export default TotalNutrientes;
