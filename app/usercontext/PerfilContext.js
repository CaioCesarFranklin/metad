import {createContext, React,useContext, useState} from 'react'

const MeuPerfilContext =createContext()

const MeuPerfilProvider =({children})=>{

    const [perfilClicked, setPerfilClicked] = useState(true);
    const [dietaClicked, setDietaClicked] = useState(false);
    const [informacoesClicked, setInformacoesClicked] = useState(false);
    const [marketClicked, setMarketClicked] = useState(false);
    const [profissionaisClicked, setProfissionaisClicked] = useState(false);
    const [procurarClicked, setProcurarClicked] = useState(false);
    const [DietaCalculo,setDietaCalculo]=useState(false)


    return(


        <MeuPerfilContext.Provider value={{
            perfilClicked, setPerfilClicked,
            dietaClicked, setDietaClicked,
            informacoesClicked, setInformacoesClicked,
            marketClicked, setMarketClicked,
            profissionaisClicked, setProfissionaisClicked,
            procurarClicked, setProcurarClicked,
            DietaCalculo,setDietaCalculo,

             }}>

             {children}    
        </MeuPerfilContext.Provider>
    )
}
export {MeuPerfilContext,MeuPerfilProvider}