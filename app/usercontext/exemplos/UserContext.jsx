import React, { createContext ,useState} from 'react'

const UserContext = createContext()

const TesteProvider = ({ children }) => {
  const [ativado, setAtivado] = useState(false)
  return (
    <UserContext.Provider value={{ ativado, setAtivado }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, TesteProvider }
