import styled from "styled-components";
import Login from "./pages/Login";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Login />
    </AppContainer>
  );
};

export default App;