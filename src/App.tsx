import React from 'react';
import Container from './components/Container';
import DetailsSection from './components/DetailsSection';
import ControlsSection from './components/ControlsSection';
import OverviewSection from './components/OverviewSection';

const App = () => {
  return (
    <Container>
      <DetailsSection />
      <ControlsSection />
      <OverviewSection />
    </Container>
  );
};

export default App;
