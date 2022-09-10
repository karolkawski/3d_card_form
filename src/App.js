import './App.css';
import Gui from './Gui/Gui';
import Scene from './Scene/Scene';
import { storage } from './storage';
import { useState } from 'react';

function App() {
  const [details, setDetails] = useState({...storage})
  const [confirmed, setConfirmed] = useState(false);
  // const [collapse, setCollapse] = useState(false);
  // const isMobile = useDeviceDetect().isMobile;


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


  // const handleCollapse =(show) => {
  //   isMobile && setCollapse(show)
  // }
  const handleConfirmed =(boleean) => {
    console.log("🚀 ~ file: App.js ~ line 26 ~ handleConfirmed ~ boleean", boleean)
    setConfirmed(boleean);

  }
  return (
    <div className="App">
        <Gui className="App_Form"details={{...details}} confirmed={confirmed} handleConfirmed={(boolean) => handleConfirmed(boolean)}  handleFormChange={(e, attr) => {handleFormChange(e, attr)}} />
       <div className="App_Frame">
        <Scene className="App_Scene" card={{...details}} confirmed={confirmed}/>
        {/* <Button ghost={true} className="App_Button App_Button--Return" shape="circle" onClick={e => onReturnClick(e)}icon={<ReloadOutlined />} /> */}
      </div>
    </div>
  ); 
}

export default App;
