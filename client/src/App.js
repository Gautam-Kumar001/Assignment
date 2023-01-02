import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Cards from './components/Cards';

function App() {

  const [userData, setUserData] = useState([]);
  const [newUserData, setNewUserData] = useState([]);
  const [renderAgain, setRenderAgain] = useState(false);
  const [userMobile, setUserMobile] = useState();

  useEffect(() => {

      axios.get('http://localhost:8080/get/user-data')
      .then((res) => {
          console.log('Found res.data :', res.data.data);
          setUserData(res.data.data);
          setNewUserData(res.data.data);
      })
      .catch((err) => {
          console.log('Eror in getting user-data :', err);
      })
    
  }, [renderAgain]);


  const handelFilter = (e) => {
    let newMobile = e.target.value;

    let newData = userData.filter((ele, ind) => {
      if(ele.mobile.includes(newMobile)){
        return true;
      }
      else{
        return false;
      }
    });

    setNewUserData(newData);
  }


  return (
    <div className="App">
      <div className='app-section'>
        <span className='app-header'>List of all Users</span>
        <label>
          Filter:
          <input type="text" name="userName" value={userMobile} onChange={(e) => {
            handelFilter(e);
            setUserMobile(e.target.value);
            }} />
        </label>
      </div>
      <Cards userData={newUserData} renderAgain={() => {setRenderAgain(!renderAgain)}} />
    </div>
  );
}

export default App;
