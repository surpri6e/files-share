import { FC, useContext, useState } from 'react';
import cl from './CardFile.module.scss';
import { formatBytes } from 'bytes-transform';
import { deleteFile } from '../../../api/FilesApi';
import { FilesContext } from '../../../context/FilesContext';

interface ICardFile {
   name: string;
   size: number;
   type: string;
   href?: string;
}

const CardFile: FC<ICardFile> = ({ name, size, type, href }) => {
   const { files, setFiles } = useContext(FilesContext);
   const [newFormat] = useState(formatBytes(size, { from: 'B', to: 'MB', fixTo: 2 }));

   return (
      <div className={cl.cardfile}>
         <div className={cl.cardfileLeft}>
            <div className={cl.cardfileName}>{name}</div>
            {/* Type: .png/.jpg/.mp4 and etc. */}
            <div className={cl.cardfileType}>{type.split('/')[0] ? type.split('/')[0] : type.split('/')[1]}</div>
         </div>

         <div className={cl.cardfileRight}>
            <div className={cl.cardfileSize}>
               {/* Library bytes-transform */}
               {newFormat.amount} {newFormat.prefix}
            </div>
            {deleteFile ? (
               <div className={cl.cardfileDelete} onClick={() => deleteFile(name, files, setFiles)}>
                  x
               </div>
            ) : (
               <a className={cl.cardfileDownload} href={href} download={name}>
                  {'>'}
               </a>
            )}
         </div>
      </div>
   );
};

export default CardFile;
