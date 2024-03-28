import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { config } from './utils/config';
import { FirebaseContext } from './context/FirebaseContext';

initializeApp(config);
const storage = getStorage();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
   <FirebaseContext.Provider value={{ storage }}>
      <App />
   </FirebaseContext.Provider>,
);
