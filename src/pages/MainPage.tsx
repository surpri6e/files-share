import { ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import { Link } from 'react-router-dom';
import Arrow from '../components/UI/Arrow/Arrow'
import CardFile from '../components/UI/CardFile/CardFile';
import { FirebaseContext } from '../context/FirebaseContext';
import '../styles/MainPage/mainPage.scss'
import { formatBytes } from '../utils/bytesToString';
import { maximumBytes } from '../utils/consts';

const MainPage = () => {
  const {storage} = React.useContext(FirebaseContext);
  const [drag, setDrag] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState([] as File[]);

  const ID: string = String(Date.now());

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true);
  }

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false);
  }

  const dragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const condition: boolean = [...files.map((el) => el.name)].includes(e.dataTransfer.files[0].name);
    if(!condition) {
      setFiles((prev) => [...prev, ...e.dataTransfer.files])
    }
    console.log(files)
    setDrag(false);
  }

  const deleteFile = (name: string) => {
    setFiles(files.filter((el) => el.name !== name))
  }

  const uploadToServer = async () => {
    files.forEach((el) => {
      const storageRef = ref(storage, `${ID}/${el.name}`);
      uploadBytes(storageRef, el).then(() => console.log('upload!')).catch(() => console.log('error!'));
    })
  }

  return (
    <div className='mainpage'>
      <div className={`arrow_body`}>
        <Arrow/>
      </div>
      {
          drag
            ?
              <div className="drag_body"
                onDragStart={e => dragStart(e)}
                onDragLeave={e => dragLeave(e)}
                onDragOver={e => dragStart(e)}
                onDrop={e => dragDrop(e)}
              >
                Drop here
              </div>
            :
              <div className="drag_body"
                onDragStart={e => dragStart(e)}
                onDragLeave={e => dragLeave(e)}
                onDragOver={e => dragStart(e)}
              >
                Takes here
              </div>
      }
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
                  <CardFile key={ind} file={el} deleteFile={deleteFile}/>
                )
              }
              <div className='files-list_body-upload'>
                <div className={[...files.map((el) => el.size)].reduce((el, acc: number) => acc += el) > maximumBytes ? 'files-list_body-limit-danger' : 'files-list_body-limit'}>
                  Limit: {formatBytes([...files.map((el) => el.size)].reduce((el, acc: number) => acc += el))} / {formatBytes(maximumBytes)} MB
                </div>
                <Link to={`/download/${ID}`} className='files-list_body-btn' onClick={uploadToServer}>Upload</Link>
              </div>
            </>
        }
      </div> 
    </div>     
  )
}

export default MainPage