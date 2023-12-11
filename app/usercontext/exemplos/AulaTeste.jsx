import React, { useContext, useState } from 'react';
import AulaTeste2 from './AulaTeste2';
import AulaTeste3 from './AulaTeste3';
import { UserContext } from './UserContext';

function AulaTeste() {

  const { ativado, setAtivado } = useContext(UserContext);
  const handleAlterar = () => {
    setAtivado(!ativado);
  };
  return (
    <div>
<AulaTeste2/>

      <button onClick={handleAlterar} >Alterar</button>

        

        

    </div>
  );
}

export default AulaTeste;
