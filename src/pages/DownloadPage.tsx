import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React from 'react'
import { FirebaseContext } from '../context/FirebaseContext'
import { useParams } from 'react-router-dom';
import NothingPage from './NothingPage';
import CardFile from '../components/UI/CardFile/CardFile';
import '../styles/DownloadPage/downloadPage.scss'

const DownloadPage = () => {
  const {id} = useParams();
  const {storage} = React.useContext(FirebaseContext);
  const [files, setFiles] = React.useState([] as Blob[]);
  const [names, setNames] = React.useState<string[]>([]);
  const [isMobile] = React.useState<boolean>((/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
  .test(navigator.userAgent)))

  React.useEffect(() => {
    listAll(ref(storage, `${id!}/`))
    .then((res: any) => {
      res.items.forEach((itemRef: any) => {
        getDownloadURL(ref(storage, `${itemRef._location.path_}`))
          .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';

            xhr.onload = () => {
              const blob = xhr.response;
              setFiles((prev) => [...prev, blob]);
              setNames((prev) => [...prev, `${itemRef._location.path_.split('/')[1]}`])
            };

            xhr.open('GET', url);
            xhr.send();
          })
          .catch((error) => {
            throw new Error(error)
          })
        });
    })
    .catch((error) => {
      throw new Error(error)
    });

  }, [id, storage])
  
  return (
    <>
      {
        isMobile
        ?
          <NothingPage content='on mobile this application does not work!'/>
        :
        files.length === 0
          ?
          <NothingPage content='or files is loading!'/>
          :
          <div className="download">
            <span>You can dowload it:</span>
            {
              files.map((el, ind) =>
                <CardFile href={`${el ? URL.createObjectURL(el) : ''}`} key={el.size} name={names[ind]} size={el.size} type={el.type}/>
              )
            }
          </div>
      }
    </>
  )
}

export default DownloadPage