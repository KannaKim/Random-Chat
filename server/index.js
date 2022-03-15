const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io')
const port = 4000
const io = new Server(server)

const MAX_NUMBER_OF_PARTICIPANTS_PER_ROOM = 2
const MAX_NUMBER_OF_ROOMS = 3000

let userInfoes = {}  //userID: roomID pairs
let roomInfoes = {} // roomID: [participant] pairs 
let avail_rooms = [] // lists of available rooms with roomID (indexed)
for(let i=0;i< MAX_NUMBER_OF_ROOMS; i++){
  avail_rooms.push(i)
  roomInfoes[i] = []
}

let roomID_index = 0

function resgister_user_in_room(roomID, socket){
  socket.join(roomID.toString())
  socket.broadcast.to(roomID.toString()).emit("system msg",{msg:"a user just joined!"})

  if(roomInfoes[roomID] == undefined){  // could be improved 
    roomInfoes[roomID] = [uesrID]
  }
  else{
    roomInfoes[roomID].push(socket.id)
  }

  if(roomInfoes[roomID].length == MAX_NUMBER_OF_PARTICIPANTS_PER_ROOM){ //when maxed out room is no longer available
    avail_rooms.splice(roomID, 1)
  }

  userInfoes[socket.id] = roomID
}
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection',(socket)=>{
  socket.on("User message sent",({msg, socketID})=>{
    socket.broadcast.to(userInfoes[socket.id].toString()).emit("User message sent from server",({msg: msg, socketID:socketID}))
    console.log(msg, socketID)
  })
  socket.on("enque",()=>{
    if(avail_rooms.length == 0){
      throw `no rooms are available for user ${socket.id}`
    }
    if(userInfoes[socket.id] == null){
      for(let room in avail_rooms){ // search available room
        if(roomInfoes[room].length < MAX_NUMBER_OF_PARTICIPANTS_PER_ROOM){
          resgister_user_in_room(room, socket)
          break
        }
      }
    }
    else{
      console.error(`user ${socket.id} already has room ${userInfoes[socket.id]}`);
    }
      console.log(`que finished user is in ${userInfoes[socket.id]} socket id:${socket.id}`)
  })
  socket.on('disconnect', function(){
    if(userInfoes[socket.id] != undefined){  //if it was enqued user
      console.log(`user disconnected, socket id: ${socket.id}`);
      socket.broadcast.to(userInfoes[socket.id].toString()).emit("system msg",{msg:"a user just left"})
      //user no longers in que
      roomID_tmp = userInfoes[socket.id]
      if(roomInfoes[roomID_tmp]==0){
        avail_rooms.push(roomID_tmp)
      }
      roomInfoes[roomID_tmp] = roomInfoes[roomID_tmp].filter((userID)=>{userID != socket.id})
      delete userInfoes[socket.id]
    }
  });
})

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});