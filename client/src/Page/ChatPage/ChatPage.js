import React,{useState, useEffect, useRef} from 'react'
import Chats from '../../components/Chats/Chats'
import Input from '../../components/Input/Input'
import ChatNav from '../../components/ChatNav/ChatNav'
import socketIOClient, { io } from "socket.io-client";
import {get_or_create_userID} from '../../utils'
let socket;
const ChatPage = ({setWidgetState}) => {
    const [chatLog, setChatLog] = useState([])
    const [userID, setuserID] = useState(get_or_create_userID("user_id"))
    const [message, setMessage]  = useState("")
    const chatBody = React.createRef(null)  
    useEffect(()=>{
        socket = socketIOClient()
        socket.emit("enque", {userID:userID})  //goes to que -> match whoever is in the que list -> chat start
        socket.on("User message sent from server", ({msg, socketID}) =>{
        setChatLog((oldArr)=>[...oldArr, {socketID: socketID, msg:msg}])
        })
        socket.on("system msg", ({msg}) =>{
        setChatLog((oldArr)=>[...oldArr, {socketID: "sys", msg:msg}])
        })
    },[])
    useEffect(()=>{
        chatBody.current.scrollTop = chatBody.current.scrollHeight 
    },[chatLog])
    function sendMessage(event){
        event.preventDefault()
        if(message){
        socket.emit("User message sent",{socketID: socket.id, msg: message})
        setChatLog((arr)=>[...arr, {socketID: socket.id, msg: message}])
        setMessage("")
        // chatBody.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }
    function socketDisconnect(){
        socket.disconnect()
    }
  return (
    <>
        <ChatNav setWidgetState={setWidgetState} socketDisconnect={socketDisconnect}></ChatNav>
        <Chats userSocket={socket} chatLog={chatLog} ref={chatBody}></Chats>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}></Input>
    </>
  )
}

export default ChatPage