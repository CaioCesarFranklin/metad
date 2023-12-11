import {createContext, React,useContext, useState} from 'react'

const TituloContext =createContext()

const TituloProvider =({children})=>{

 const [tituloHome,setTituloHome]=useState(false)


    return(


        <TituloContext.Provider value={{
            tituloHome,setTituloHome

             }}>

             {children}    
        </TituloContext.Provider>
    )
}
export {TituloContext,TituloProvider}