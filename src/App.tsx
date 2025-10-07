import styled from "styled-components";
import { Outlet } from "react-router-dom";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
  );
};

export default App;