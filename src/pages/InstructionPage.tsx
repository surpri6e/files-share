import React from 'react'
import NothingPage from './NothingPage'
import '../styles/InstructionPage/instructionPage.scss'

const InstructionPage = () => {
  const [isMobile] = React.useState<boolean>((/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
  .test(navigator.userAgent)))

  return (
    isMobile
        ?
          <NothingPage content='on mobile this application does not work!'/>
        :
    <div className="instruction_text">
      <span>On mobile this application does not work!</span> On desktop: you need to touch your files in current zone, and click on button 'Upload'. 
      After that, you can give link someone, and download this files on other computers. <span className='danger_text'>Link live 3 minutes!!!</span>
    </div>
  )
}

export default InstructionPage