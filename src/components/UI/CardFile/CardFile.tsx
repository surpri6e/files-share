import React, { FC } from 'react'
import { formatBytes } from '../../../utils/bytesToString';
import cl from './CardFile.module.scss'

interface CardFileProps {
    name: string;
    size: number;
    type: string;
    deleteFile?: (name: string) => void;
    href?: string;
}

const CardFile: FC<CardFileProps> = ({name, deleteFile, size, type, href}) => {
  return (
    <div className={cl.cardfile}>
        <div className={cl.cardfileLeft}>
            <div className={cl.cardfileName}>{name}</div>
            <div className={cl.cardfileType}>{type.split('/')[0] ? type.split('/')[0] : type.split('/')[1]}</div>
        </div>
        <div className={cl.cardfileRight}>
            <div className={cl.cardfileSize}>{formatBytes(size)}</div>
            {
              deleteFile
                ?
                  <div className={cl.cardfileDelete} onClick={() => deleteFile(name)}>x</div>
                :
                  <a className={cl.cardfileDownload} href={href} download={name.split('.')[1] === 'png' ? name : ''}>{'>'}</a>
            }
            
        </div>
    </div>
  )
}

export default CardFile