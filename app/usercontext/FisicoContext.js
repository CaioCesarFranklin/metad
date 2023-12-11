import {createContext, React,useContext, useState,useEffect} from 'react'
import moment from 'moment';
import axios from 'axios';

const FisicoContext = createContext();

const FisicoProvider = ({ children }) => {
    const [peso,setPeso]= useState('5')
    const [altura,setAltura]= useState('3')
    const [idade,setIdade]= useState('4')
  const [circuferenciaAbdomemAtual,setCircuferenciaAbdomemAtual]= useState('')
  const [circuferenciaPescocoAtual,setCircuferenciaPescocoAtual]= useState('')
  const [circuferenciaQuadrilAtual,setCircuferenciaQuadrilAtual]= useState('')
  const [circuferenciaCinturaAtual,setCircuferenciaCinturaAtual]= useState('')
  const [atividadeFisicaController, setAtividadeFisicaController]= useState(false)
  const [rcqValue, setRCQValue] = useState(0);
  const [dataAtual, setDataAtual] = useState('');
  const [atividadeFisica,setAtividadeFisica]=useState([])
    const [probabilidadeMorte, setProbabilidadeMorte] = useState('');
 


    //controla o componente
    const [isExpanded, setIsExpanded] = useState(false);
    const [fisicoController,setFisicoController]= useState(false)


    useEffect(() => {

    
      setDataAtual(moment().format('L'));

  }, []);





    const tabelaMortalidade = [
      [0, 11203, 1120, 100000, 98968, 7702721, 77.0],
      [1, 782, 77, 98880, 98841, 7603753, 76.9],
      [2, 497, 49, 98802, 98778, 7504912, 76.0],
      [3, 367, 37, 98753, 98736, 7406134, 75.0],
      [4, 292, 29, 98716, 98704, 7307398, 74.1],
      [5, 239, 24, 98687, 98682, 7208694, 73.2],
      [6, 199, 20, 98663, 98661, 7110024, 72.3],
      [7, 168, 17, 98643, 98641, 7011386, 71.5],
      [8, 143, 14, 98628, 98627, 6912783, 70.6],
      [9, 122, 12, 98616, 98615, 6814213, 69.8],
      [10, 106, 11, 98606, 98605, 6715675, 69.1],
      [11, 93, 9, 98597, 98597, 6617170, 68.3],
      [12, 82, 8, 98590, 98590, 6518698, 67.6],
      [13, 73, 7, 98584, 98583, 6420258, 66.9],
      [14, 66, 6, 98579, 98579, 6321849, 66.2],
      [15, 60, 6, 98575, 98575, 6223470, 65.6],
      [16, 55, 5, 98571, 98571, 6125122, 65.0],
      [17, 51, 5, 98568, 98568, 6026803, 64.4],
      [18, 47, 4, 98565, 98565, 5928515, 63.9],
      [19, 44, 4, 98562, 98562, 5830256, 63.3],
      [20, 41, 4, 98559, 98559, 5732027, 62.8],
      [21, 38, 4, 98556, 98556, 5633827, 62.3],
      [22, 36, 4, 98554, 98554, 5535656, 61.8],
      [23, 33, 3, 98551, 98551, 5437513, 61.4],
      [24, 31, 3, 98549, 98549, 5339399, 60.9],
      [25, 29, 3, 98547, 98547, 5241313, 60.5],
      [26, 27, 3, 98545, 98545, 5143256, 60.1],
      [27, 26, 3, 98544, 98544, 5045226, 59.7],
      [28, 24, 3, 98542, 98542, 4947223, 59.3],
      [29, 23, 3, 98541, 98541, 4849248, 58.9],
      [30, 21, 3, 98539, 98539, 4751300, 58.5],
      [31, 20, 3, 98538, 98538, 4653379, 58.1],
      [32, 19, 2, 98537, 98537, 4555485, 57.7],
      [33, 18, 2, 98536, 98536, 4457618, 57.3],
      [34, 17, 2, 98535, 98535, 4359777, 56.9],
      [35, 16, 2, 98534, 98534, 4261962, 56.6],
      [36, 15, 2, 98533, 98533, 4164174, 56.2],
      [37, 14, 2, 98532, 98532, 4066411, 55.9],
      [38, 13, 2, 98531, 98531, 3968674, 55.5],
      [39, 13, 2, 98531, 98531, 3870962, 55.2],
      [40, 12, 2, 98530, 98530, 3773274, 54.9],
      [41, 11, 2, 98529, 98529, 3675610, 54.6],
      [42, 11, 2, 98529, 98529, 3577971, 54.3],
      [43, 10, 2, 98528, 98528, 3480355, 54.0],
      [44, 10, 2, 98528, 98528, 3382762, 53.7],
      [45, 9, 2, 98527, 98527, 3285191, 53.4],
      [46, 9, 2, 98527, 98527, 3187643, 53.1],
      [47, 8, 2, 98526, 98526, 3090116, 52.8],
      [48, 8, 2, 98526, 98526, 2992610, 52.5],
      [49, 8, 2, 98526, 98526, 2895124, 52.2],
      [50, 7, 2, 98525, 98525, 2797657, 51.9],
      [51, 7, 2, 98525, 98525, 2700210, 51.6],
      [52, 7, 2, 98525, 98525, 2602781, 51.4],
      [53, 6, 2, 98524, 98524, 2505371, 51.1],
      [54, 6, 2, 98524, 98524, 2407978, 50.9],
      [55, 6, 2, 98524, 98524, 2310602, 50.6],
      [56, 6, 2, 98524, 98524, 2213243, 50.4],
      [57, 5, 2, 98523, 98523, 2115901, 50.1],
      [58, 5, 2, 98523, 98523, 2018575, 49.9],
      [59, 5, 2, 98523, 98523, 1921264, 49.7],
      [60, 5, 2, 98523, 98523, 1823970, 49.4],
      [61, 5, 2, 98523, 98523, 1726691, 49.2],
      [62, 4, 2, 98522, 98522, 1629427, 49.0],
      [63, 4, 2, 98522, 98522, 1532178, 48.8],
      [64, 4, 2, 98522, 98522, 1434945, 48.6],
      [65, 4, 2, 98522, 98522, 1337727, 48.4],
      [66, 4, 2, 98522, 98522, 1240523, 48.2],
      [67, 4, 2, 98522, 98522, 1143334, 48.0],
      [68, 3, 2, 98521, 98521, 1046161, 47.8],
      [69, 3, 2, 98521, 98521, 948007, 47.6],
      [70, 3, 2, 98521, 98521, 848486, 47.4],
      [71, 3, 2, 98521, 98521, 748595, 47.2],
      [72, 3, 2, 98521, 98521, 648334, 47.0],
      [73, 3, 2, 98521, 98521, 547703, 46.8],
      [74, 3, 2, 98521, 98521, 446701, 46.6],
      [75, 3, 2, 98521, 98521, 345327, 46.4],
      [76, 2, 2, 98520, 98520, 243581, 46.2],
      [77, 2, 2, 98520, 98520, 141464, 46.0],
      [78, 2, 2, 98520, 98520, 38974, 45.9],
      [79, 2, 2, 98520, 98520, 0, 45.7]
    ];
   






  
    return (
      <FisicoContext.Provider value={{ 
       
        peso,setPeso,
        altura,setAltura,
        idade,setIdade,
        circuferenciaAbdomemAtual,setCircuferenciaAbdomemAtual,
        circuferenciaPescocoAtual,setCircuferenciaPescocoAtual,
        circuferenciaQuadrilAtual,setCircuferenciaQuadrilAtual,
        circuferenciaCinturaAtual,setCircuferenciaCinturaAtual,
        rcqValue, setRCQValue,
        probabilidadeMorte, setProbabilidadeMorte,
        fisicoController,setFisicoController,
        atividadeFisica,setAtividadeFisica,
        atividadeFisicaController, setAtividadeFisicaController,
        dataAtual, setDataAtual
    }}>
        {children}
      </FisicoContext.Provider>
    );
  };
  export { FisicoContext, FisicoProvider };