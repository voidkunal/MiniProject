
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from "react-redux";
import { store, persistor } from './store/store.js'; // ✅ import persistor
import { PersistGate } from 'redux-persist/integration/react'; // ✅ import PersistGate

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<div style={{ padding: 20, textAlign: 'center' }}>Rehydrating...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
