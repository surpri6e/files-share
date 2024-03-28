import { ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../components/UI/Arrow/Arrow';
import CardFile from '../components/UI/CardFile/CardFile';
import { FirebaseContext } from '../context/FirebaseContext';
import '../styles/MainPage/mainPage.scss';
import { maximumBytes } from '../utils/consts';
import DragAndDrop from '../components/DragAndDrop';
import { throwError } from '../utils/throwError';
import { IFormatBytesReturned, formatBytes } from 'bytes-transform';

const MainPage = () => {
   const { storage } = React.useContext(FirebaseContext);
   const [drag, setDrag] = React.useState(false);

   const [files, setFiles] = React.useState<File[]>([]);

   const [isClicked, setIsClicked] = React.useState(true);

   const [ID] = React.useState(() => String(Date.now()));

   const [filesSize, setFilesSize] = React.useState<IFormatBytesReturned>({ amount: 0, prefix: 'MB' });

   React.useEffect(() => {
      if (files.map((el) => el.size).length > 0) {
         setFilesSize(
            formatBytes(
               files.map((el) => el.size).reduce((el, acc: number) => (acc += el)),
               { from: 'B', to: 'MB' },
            ),
         );
      }
   }, [files]);

   const deleteFile = (name: string) => {
      setFiles(files.filter((el) => el.name !== name));
   };

   const uploadToServer = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      files.forEach((el) => {
         const storageRef = ref(storage, `${ID}/${el.name}`);
         uploadBytes(storageRef, el)
            .then(() => setIsClicked(false))
            .catch((err) => {
               throwError(err);
            });
      });
   };

   return (
      <>
         <div className='mainpage'>
            <div className={`arrow_body`}>
               <Arrow />
            </div>

            <DragAndDrop drag={drag} files={files} setDrag={setDrag} setFiles={setFiles} />

            <div className='files-list_body'>
               <span>Uploaded files:</span>

               {files.length === 0 ? (
                  <div className='files-list_body-nothing'>You did not upload any files.</div>
               ) : (
                  <>
                     {/* If array of files is not empty */}
                     {files.map((el, ind) => (
                        <CardFile key={ind} name={el.name} size={el.size} type={el.type} deleteFile={deleteFile} />
                     ))}

                     <div className='files-list_body-upload'>
                        <div className={filesSize.amount > maximumBytes.amount ? 'files-list_body-limit-danger' : 'files-list_body-limit'}>
                           Limit: {filesSize.amount.toFixed(2)} {filesSize.prefix} / {maximumBytes.amount} {maximumBytes.prefix}
                        </div>

                        <button
                           onClick={(e) => uploadToServer(e)}
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
                     You can dowload this files of <Link to={`/download/${ID}`}>link</Link>.
                  </div>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </>
   );
};

export default MainPage;
