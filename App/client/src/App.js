import './App.css';
import {useState} from "react";
import Axios from 'axios';
function App() {
  const [password,setPassword] = useState('');
  const [websitename, setwebsitename] = useState('')
  const [email, setemail] = useState('')

  const addPassword = ()=>{
    Axios.post('http://localhost:3001/addpassword',{password: password,email: email,websitename: websitename});
  };
  return (
    <div className="App">
      <div className="addpwd">
      <input type="text" placeholder="Ex Password 123" onChange={(event)=>{setPassword(event.target.value);}}/>
      <input type="text" placeholder="Ex someone@email.com" onChange={(event)=>{setwebsitename(event.target.value);}}/>
      <input type="text" placeholder="Ex Gmail" onChange={(event)=>{setemail(event.target.value);}}/>
      <button onClick={addPassword}>Add Password</button>
      </div>
    </div>
  );
}

export default App;
