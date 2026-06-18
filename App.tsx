import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppContent from './src/AppContent.tsx';

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;