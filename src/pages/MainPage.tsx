import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../components/UI/Arrow/Arrow';
import CardFile from '../components/UI/CardFile/CardFile';
import '../styles/MainPage/mainPage.scss';
import { maximumBytes } from '../utils/consts';
import DragAndDrop from '../components/DragAndDrop';
import { IFormattedBytes, formatBytes } from 'bytes-transform';
import { getRandomKey } from 'rkey';
import { useIsMobileDevice } from '../hooks/useIsMobileDevice';
import { FilesContext } from '../context/FilesContext';
import { uploadToServer } from '../api/FilesApi';

const MainPage = () => {
   const { files } = useContext(FilesContext);
   const [drag, setDrag] = useState(false);

   const [isClicked, setIsClicked] = useState(true);

   const [id] = useState(() => getRandomKey(20, 'all'));

   const [filesSize, setFilesSize] = useState<IFormattedBytes>({ amount: 0, prefix: 'MB' });

   const isMobileDevice = useIsMobileDevice();

   React.useEffect(() => {
      if (files.map((file) => file.size).length > 0) {
         setFilesSize(
            formatBytes(
               files.map((file) => file.size).reduce((file, acc: number) => (acc += file)),
               { from: 'B', to: 'MB' },
            ),
         );
      }
   }, [files]);

   return (
      <>
         <div className='mainpage'>
            {isMobileDevice && <div>asdasasd</div>}

            {!isMobileDevice && (
               <>
                  <div className='arrow_body'>
                     <Arrow />
                  </div>

                  <DragAndDrop drag={drag} setDrag={setDrag} />

                  <div className='files-list_body'>
                     <span>Uploaded files:</span>

                     {files.length === 0 ? (
                        <div className='files-list_body-nothing'>You did not upload any files.</div>
                     ) : (
                        <>
                           {/* If array of files is not empty */}
                           {files.map((file, ind) => (
                              <CardFile key={ind} name={file.name} size={file.size} type={file.type} />
                           ))}

                           <div className='files-list_body-upload'>
                              <div
                                 className={
                                    Number(filesSize.amount.toFixed(2)) > maximumBytes.amount ? 'files-list_body-limit-danger' : 'files-list_body-limit'
                                 }
                              >
                                 Limit: {filesSize.amount.toFixed(2)} {filesSize.prefix} / {maximumBytes.amount} {maximumBytes.prefix}
                              </div>

                              <button
                                 onClick={(e) => uploadToServer(e, files, setIsClicked, id)}
                                 className='files-list_body-btn'
                                 style={{
                                    pointerEvents: Number(filesSize.amount.toFixed(2)) < maximumBytes.amount && isClicked ? 'auto' : 'none',
                                 }}
                              >
                                 Upload
                              </button>
                           </div>
                        </>
                     )}

                     {!isClicked ? (
                        <div className='after-upload'>
                           You can dowload this files of <Link to={`/download/${id}`}>link</Link>.
                        </div>
                     ) : (
                        <></>
                     )}
                  </div>
               </>
            )}
         </div>
      </>
   );
};

export default MainPage;
