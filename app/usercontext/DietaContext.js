  import { createContext, useContext,useEffect, useState } from 'react';

  const DietaContext = createContext();

  const DietaProvider = ({ children }) => {

    const [user, setUser] = useState(null); 
    const [somaCarboidratos,setSomaCarboidratos] = useState([])
    const [somaProteinas,setSomaProteinas] = useState([])
    const [somaLipideos,setSomaLipideos] = useState([])
    const [somaKilocalorias, setSomaKilocalorias] = useState([]);
    const [somaFibras, setSomaFibras]= useState([])
    const [groupedData, setGroupedData] = useState([]); 
    const [totalNutrientesController,setTotalNutrientesController]= useState(false)





   


    return (
      <DietaContext.Provider value={{ 
       
        user, 
        setUser,
        somaCarboidratos,
        setSomaCarboidratos,
        somaProteinas,
        setSomaProteinas,
        somaLipideos,
        setSomaLipideos,
        somaKilocalorias,
        setSomaKilocalorias,
        groupedData, 
        setGroupedData,
        groupedData, 
        setGroupedData,
        somaFibras, 
        setSomaFibras,
        totalNutrientesController,
        setTotalNutrientesController
 
   

        
    }}>
        {children}
      </DietaContext.Provider>
    );
  };

  export { DietaContext, DietaProvider };
