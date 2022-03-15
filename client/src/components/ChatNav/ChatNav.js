import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import './ChatNav.scss'
const ChatNav = ({setWidgetState,socketDisconnect}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white justify-content-center border">
        <div className='container-fluid'>
            <a onClick={()=>{setWidgetState("Home");socketDisconnect()}} className='navbar-brand icon_wrapper'><FontAwesomeIcon className='stopIcon' icon={faAngleLeft} />
                <span className='stopText'>Stop</span>
            </a>
        </div>
    </nav>

  )
}

export default ChatNav