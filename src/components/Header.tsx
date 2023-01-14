import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header/header.scss'

const Header = () => {
  return (
    <div className="header">
        <div className="container">
          <div className="header_body">
            <div className="header__left">
              <Link to={'/main'} className="logo">
                FShare
              </Link>
              <div className="sublogo">
                exchange documents with your friends!
              </div>
            </div>
            <div className="header__right">
              <Link to={'/instruction'} className="instruction">Instruction</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Header