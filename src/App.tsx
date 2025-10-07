import styled from "styled-components";
import Home from "./pages/Home";


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Home />
    </AppContainer>
  );
};

export default App;