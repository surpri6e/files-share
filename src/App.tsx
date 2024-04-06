import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';
import Footer from './components/Footer';
import Header from './components/Header';
import './styles/null.scss';
import './styles/main.scss';
import { FilesContext } from './context/FilesContext';

const App = () => {
   const [files, setFiles] = useState<File[]>([]);
   return (
      <FilesContext.Provider value={{ files, setFiles }}>
         <BrowserRouter>
            <Header />
            <div className='content'>
               <div className='container'>
                  <AppRoutes />
               </div>
            </div>
            <Footer />
         </BrowserRouter>
      </FilesContext.Provider>
   );
};

export default App;
