import React from 'react'
import '../styles/Footer/footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="footer_body">
          <div className="footer__left">
            <a className='links' href="https://github.com/surpri6e/files-share" target={'_blank'} rel="noreferrer">Code</a>
            <a className='links' href="https://vk.com/surpri6e" target={'_blank'} rel="noreferrer">Sponsor</a>
            <a className='links' href="https://vk.com/surpri6e" target={'_blank'} rel="noreferrer">Politics</a>
          </div>
          <div className="footer__right">
            <div className="company">
              FShare Inc.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer