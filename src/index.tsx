import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { config } from './utils/config';

initializeApp(config);
export const storage = getStorage();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
