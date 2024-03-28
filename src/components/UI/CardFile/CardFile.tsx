import { FC, useState } from 'react';
import cl from './CardFile.module.scss';
import { formatBytes } from 'bytes-transform';

interface ICardFile {
   name: string;
   size: number;
   type: string;
   deleteFile?: (name: string) => void;
   href?: string;
}

const CardFile: FC<ICardFile> = ({ name, deleteFile, size, type, href }) => {
   const [newFormat] = useState(formatBytes(size, { from: 'B', to: 'MB' }));

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
               {newFormat.amount.toFixed(2)} {newFormat.prefix}
            </div>
            {deleteFile ? (
               <div className={cl.cardfileDelete} onClick={() => deleteFile(name)}>
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
