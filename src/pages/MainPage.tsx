import React from 'react'
import Arrow from '../components/UI/Arrow/Arrow'
import '../styles/MainPage/mainPage.scss'

const MainPage = () => {
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
    setFiles((prev) => [...prev, ...e.dataTransfer.files])
    setDrag(false);
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
        Uploaded files:
      </div> 
    </div>     
  )
}

export default MainPage