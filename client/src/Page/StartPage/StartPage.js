import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import './StartPage.scss'
const StartPage = ({setWidgetState}) => {
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white justify-content-center border">
        <a className='navbar-brand'>Random Chat</a>
      </nav>
      <FontAwesomeIcon className="startIcon" icon={faComment}></FontAwesomeIcon>
      <button type='button' className='start_chat_btn d-flex justify-content-center col-2 mx-auto' 
      onClick={()=>{setWidgetState("Chat")}}>Start Chat</button>
    </>
  )
}

export default StartPage