import React,{useRef} from 'react'
import './Chats.scss'
const Chats = React.forwardRef(({chatLog, userSocket}, ref) => {
    return (
            <ul className='chat-container overflow-auto' ref={ref}>
                {chatLog.map((chatInfo,i)=>
                    <li className='d-flex' key={i}>
                        {
                            chatInfo.socketID==="sys"?
                            <div className='sys'><b>{chatInfo.msg}</b></div>:
                            <div className={`speechbubble ${chatInfo.socketID===userSocket.id?'you':'they'}`}>
                                {chatInfo.msg}
                            </div>
                        }
                    </li>
                )}     
            </ul>
    )
})

export default Chats