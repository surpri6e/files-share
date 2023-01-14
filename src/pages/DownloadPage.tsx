import { getBlob, ref } from 'firebase/storage'
import React from 'react'
import { FirebaseContext } from '../context/FirebaseContext'
import { useParams } from 'react-router-dom';

const DownloadPage = () => {
  const {id} = useParams();
  const {storage} = React.useContext(FirebaseContext);
  console.log(getBlob(ref(storage, `${id!}/3fe1766215df4f39aa22c062b924f07f.ppt`)))
  return (
    <div>DownloadPage</div>
  )
}

export default DownloadPage