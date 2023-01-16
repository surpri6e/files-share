import { ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import { Link } from 'react-router-dom';
import Arrow from '../components/UI/Arrow/Arrow'
import CardFile from '../components/UI/CardFile/CardFile';
import { FirebaseContext } from '../context/FirebaseContext';
import '../styles/MainPage/mainPage.scss'
import { formatBytes } from '../utils/bytesToString';
import { maximumBytes } from '../utils/consts';
import NothingPage from './NothingPage';

const MainPage = () => {
  const {storage} = React.useContext(FirebaseContext);
  const [drag, setDrag] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState([] as File[]);
  const [isClicked, setIsClicked] = React.useState<boolean>(true)
  const [ID] = React.useState<string>(() => String(Date.now()));
  const [isMobile] = React.useState<boolean>((/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
  .test(navigator.userAgent)))

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
    setDrag(false);
  }

  const deleteFile = (name: string) => {
    setFiles(files.filter((el) => el.name !== name))
  }

  const uploadToServer = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    files.forEach((el) => {
      const storageRef = ref(storage, `${ID}/${el.name}`);
      uploadBytes(storageRef, el).then(() => setIsClicked(false)).catch(() => console.log('error!'));
    })
    await fetch('https://mixed-ahead-inch.glitch.me/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        storage,
        id: ID
      }),
    })
  }

  return (
    isMobile
    ?
      <NothingPage content='on mobile this application does not work!'/>
    :
    <>
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
                >Upload, 1 min.</button>
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