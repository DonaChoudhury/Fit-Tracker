import { useState } from 'react'
import Signup from "./Signup.jsx";
import Signin from "./Signin.jsx";
import Appbar from "./Appbar.jsx";
import Landing from "./Landing.jsx";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Workouts from './Workouts.jsx';
import Chest from './Chest.jsx';
import Abs from './Abs.jsx';
import Back  from './Back.jsx';
import Shoulder from './Shoulder.jsx';
import Biceps from './Biceps.jsx';
import Triceps from './Triceps.jsx';
import Legs from './Legs.jsx';
import Dailylog from './Dailylog.jsx';
import Forearms from './Forearms.jsx';
import Form from './Form.jsx';
import Calender from './Calender.jsx';
import Waterintake from './Waterintake.jsx';
import Sleep from './Sleep.jsx';
import StepCount from './StepCount.jsx';
import WorkoutDuration from './WorkoutDuration.jsx';
import { userState } from "../Store/atom/user.js";
import { useEffect } from 'react';
import Profile from './profile.jsx';
import axios from "axios";
import {
  RecoilRoot,
  useSetRecoilState
} from 'recoil';

function App() {
  const [useremail, setuserEmail] = useState(null)
  

  
  return (
    <RecoilRoot>
    <Router>
    <Appbar />
    <InitUser />
       <Routes>
       
       <Route path="/Signup" element={<Signup/>} />
      <Route path="/Signin" element={<Signin/>} />
      <Route path="/" element={<Landing useremail={useremail}/>}/>
      <Route path="/Chest" element={<Chest/>}/>
      <Route path="/Workouts" element={<Workouts/>}/>
      <Route path="/Abs" element={<Abs/>}/>
      <Route path="Shoulder" element={<Shoulder/>}/>
      <Route path="/Legs" element={<Legs/>}/>
      <Route path="/Triceps" element={<Triceps/>}/>
      <Route path="/Back" element={<Back/>}/>
      <Route path="/Biceps" element={<Biceps/>}/>
      <Route path="/WorkoutDuration" element={<WorkoutDuration/>}/>
      <Route path="/Forearms" element={<Forearms/>}/>
      <Route path="/Form" element={<Form/>}/>
      <Route path="/Dailylog" element={<Dailylog  />}/>
      <Route path="/Calender" element={<Calender/>}/>
      <Route path="/WaterIntake" element={<Waterintake/>}/>
      <Route path="/Sleep" element={<Sleep/>}/>
      <Route path="/StepCount" element={<StepCount/>}/>
      <Route path="/Profile" element={<Profile/>}/>
       </Routes>
      </Router>
      </RecoilRoot>
  )
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
  try {
    const response = await axios.get(`http://localhost:3000/user/me`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })

    if (response.data.username) {
        setUser({
            isLoading: false,
            userEmail: response.data.username
        })
    } else {
        setUser({
            isLoading: false,
            userEmail: null
        })
    }
  } catch (e) {
    setUser({
      isLoading: false,
      userEmail: null
  })
}
};

useEffect(() => {
init();
}, []);
}
export default App