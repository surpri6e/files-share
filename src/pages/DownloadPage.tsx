import { useParams } from 'react-router-dom';
import NothingPage from './NothingPage';
import CardFile from '../components/UI/CardFile/CardFile';
import '../styles/DownloadPage/downloadPage.scss';
import { useGetFiles } from '../hooks/useGetFiles';
import { useIsMobileDevice } from '../hooks/useIsMobileDevice';

const DownloadPage = () => {
   const { id } = useParams();

   const isMobileDevice = useIsMobileDevice();

   const [files, names, loading] = useGetFiles(id);

   return isMobileDevice ? (
      <NothingPage content='Only desktop device!' />
   ) : (
      <>
         {loading && <NothingPage content='Files is uploading!' />}
         {files.length === 0 && !loading && <NothingPage />}
         {files.length !== 0 && !loading && (
            <div className='download'>
               <span>You can dowload it:</span>
               {files.map((file, ind) => (
                  <CardFile href={URL.createObjectURL(file)} key={ind} name={names[ind]} size={file.size} type={file.type} />
               ))}
            </div>
         )}
      </>
   );
};

export default DownloadPage;
