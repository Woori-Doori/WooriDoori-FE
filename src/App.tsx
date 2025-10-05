import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from "styled-components";
import CardManagement from './pages/CardManagement';
import CardList from './pages/CardList';
import CardDetail from './pages/CardDetail';
import CardRegistration from './pages/CardRegistration';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<CardManagement />} />
          <Route path="/cards" element={<CardList />} />
          <Route path="/cards/:id" element={<CardDetail />} />
          <Route path="/cards/register" element={<CardRegistration />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;