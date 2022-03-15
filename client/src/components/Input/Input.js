import React from 'react'
import './Input.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
const Input = ({message, sendMessage, setMessage}) => {
  return (
        <form>
            <div className='form-group'>
              <div className='input-group'>
                <input onChange={({target: {value}})=>setMessage(value)} 
                onKeyPress={event=>event.key === 'Enter' ? sendMessage(event):null }
                 className='form-control' type='text' placeholder='Type a messages...' value={message}/>
                <span className='input-group-text' onClick={ sendMessage }><FontAwesomeIcon className='enter_icon' icon={faPaperPlane}/></span>
              </div>
            </div>
        </form> 
  )
}
export default Input
