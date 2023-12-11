import { React, useContext } from 'react'
import AulaTeste4 from './AulaTeste4'
import AulaTeste5 from './AulaTeste5'
import { UserContext } from './UserContext';

function AulaTeste3() {

  const { ativado } = useContext(UserContext)
  const component = ativado ? <AulaTeste5 /> : <AulaTeste4 />;

  return (

    <div>

{component}

    </div>
  )
}

export default AulaTeste3
