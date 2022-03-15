import {useState,useEffect} from 'react'
import StartPage from './Page/StartPage/StartPage'
import ChatPage from './Page/ChatPage/ChatPage'
import './App.scss'

function App() {;
  const [widgetState, setWidgetState] = useState('Home');
  useEffect(() => {
    setWidgetState("Home")
  },[])
  
  return (
    <div className='custom_container'>
      {widgetState == "Home" ?<StartPage setWidgetState={setWidgetState}/>:<ChatPage setWidgetState={setWidgetState}/>}
    </div>
  );
}
export default App;
