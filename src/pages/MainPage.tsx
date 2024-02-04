import { ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import { Link } from 'react-router-dom';
import Arrow from '../components/UI/Arrow/Arrow'
import CardFile from '../components/UI/CardFile/CardFile';
import { FirebaseContext } from '../context/FirebaseContext';
import '../styles/MainPage/mainPage.scss'
import { formatBytes } from '../utils/bytesToString';
import { maximumBytes } from '../utils/consts';
import DragAndDrop from '../components/DragAndDrop';

const MainPage = () => {
  const {storage} = React.useContext(FirebaseContext);
  const [drag, setDrag] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState([] as File[]);
  const [isClicked, setIsClicked] = React.useState<boolean>(true)
  const [ID] = React.useState<string>(() => String(Date.now()));

  const deleteFile = (name: string) => {
    setFiles(files.filter((el) => el.name !== name))
  }

  const uploadToServer = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    files.forEach((el) => {
      const storageRef = ref(storage, `${ID}/${el.name}`);
      uploadBytes(storageRef, el).then(() => setIsClicked(false)).catch((error) => {
        throw new Error(error);
      });
    })
  }

  return (
    <>
    <div className='mainpage'>
      <div className={`arrow_body`}>
        <Arrow/>
      </div>
      <DragAndDrop drag={drag} files={files} setDrag={setDrag} setFiles={setFiles}/>

      <div className="files-list_body">
        <span>Uploaded files:</span>
        {
          files.length === 0 
            ?
            <div className='files-list_body-nothing'>You did not upload any files.</div>
            :
            <>
              {
                files.map((el, ind) => 
                  <CardFile key={ind} name={el.name} size={el.size} type={el.type} deleteFile={deleteFile}/>
                )
              }
              <div className='files-list_body-upload'>
                <div className={[...files.map((el) => el.size)].reduce((el, acc: number) => acc += el) > maximumBytes ? 'files-list_body-limit-danger' : 'files-list_body-limit'}>
                  Limit: {formatBytes([...files.map((el) => el.size)].reduce((el, acc: number) => acc += el))} / {formatBytes(maximumBytes)}
                </div>
                <button 
                  onClick={e => uploadToServer(e)} 
                  className='files-list_body-btn' 
                  style={{pointerEvents: [...files.map((el) => el.size)].reduce((el, acc: number) => acc += el) < maximumBytes && isClicked ? 'auto' : 'none'}}
                >Upload</button>
              </div>
            </>
        }
        {
                !isClicked
                  ?
                  <div className='after-upload'>You can dowload this files of <Link to={`/download/${ID}`}>link</Link>.</div>
                  :
                  <></>
        }
      </div> 
    </div>  
    </>   
  )
}

export default MainPage