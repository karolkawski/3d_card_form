import './App.css';
import Gui from './Gui/Gui';
import Scene from './Scene/Scene';
import { storage } from './storage';
import { useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import {
  Button
} from 'antd';
import {onReturnClick} from './Gui/Gui';
import useDeviceDetect from './utils/useDeviceDetect';

function App() {
  const [details, setDetails] = useState({...storage})
  const [collapse, setCollapse] = useState(false);
  const [isMobile, setIsMobile] = useState(useDeviceDetect().isMobile);



  const handleFormChange =(e, attr) => {
    let data = {}

    if (attr === 'card_exp') {
      data = e;
    }else {
      data = e.target.value;
    }
    const copy = {...details};
    copy[attr] = data;
    setDetails(copy);
  }



  const handleCollapse =(show) => {
    console.log('old state', show, isMobile);

    isMobile && setCollapse(show)

  }

  
  return (
    <div className="App">
        <Gui className="App_Form"details={{...details}} handleFormChange={(e, attr) => {handleFormChange(e, attr)}} handleCollapse={(show) => {handleCollapse(show)}} collapse={collapse} isMobile={isMobile}/>
       <div className="App_Frame">
        <Scene className="App_Scene" card={{...details}} collapse={collapse} isMobile={isMobile}/>
        <Button ghost={true} className="App_Button App_Button--Return" shape="circle" onClick={e => onReturnClick(e)}icon={<ReloadOutlined />} />
      </div>
    </div>
  ); 
}

export default App;
