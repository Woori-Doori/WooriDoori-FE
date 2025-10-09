import styled from "styled-components";

import Findid from "./pages/Findid.tsx";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Findid />;
    </AppContainer>
  );
};

export default App;