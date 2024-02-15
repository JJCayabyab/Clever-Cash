import React, { useMemo }  from 'react';
import styled from 'styled-components'
import bg from './img/bg.png'
import { MainLayout } from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Incomes from './Components/Incomes/Incomes';
import Expenses from './Components/Expenses/Expenses';
import Dues from './Components/Dues/Dues';
import { useGlobalContext } from './context/globalContext';


function App() {
  // activate dashboard on left
  const [active, setActive] = React.useState(1)

  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return<Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Incomes />
      case 4:
        return<Expenses />
      case 5:
        return<Dues />
      default:
        return <Dashboard />
    }
  }

  const orbMemo = useMemo (()=> {
    return <Orb/>
  }, [])

  //main layout
  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
    </MainLayout>
      </AppStyled>
  );
}

// styling
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
