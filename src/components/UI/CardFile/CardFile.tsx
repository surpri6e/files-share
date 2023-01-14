import React, { FC } from 'react'
import { formatBytes } from '../../../utils/bytesToString';
import cl from './CardFile.module.scss'

interface CardFileProps {
    file: File;
    deleteFile: (name: string) => void
}

const CardFile: FC<CardFileProps> = ({file, deleteFile}) => {
  return (
    <div className={cl.cardfile}>
        <div className={cl.cardfileLeft}>
            <div className={cl.cardfileName}>{file.name}</div>
            <div className={cl.cardfileType}>{file.type.split('/')[0] ? file.type.split('/')[0] : file.type.split('/')[1]}</div>
        </div>
        <div className={cl.cardfileRight}>
            <div className={cl.cardfileSize}>{formatBytes(file.size)}</div>
            <div className={cl.cardfileDelete} onClick={() => deleteFile(file.name)}>x</div>
        </div>
    </div>
  )
}

export default CardFile