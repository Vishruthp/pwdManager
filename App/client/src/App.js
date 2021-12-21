import './App.css';
import {useState,useEffect} from "react";
import Axios from 'axios';
function App() {
  const [password,setPassword] = useState('');
  const [websitename, setwebsitename] = useState('')
  const [passwordList,setPasswordList] = useState([])
   useEffect(()=>{
      Axios.get('http://localhost:3001/showpasswords').then((resp)=>{
          setPasswordList(resp.data);
      });
   },[]);
  const addPassword = ()=>{
    Axios.post('http://localhost:3001/addpassword',{password: password,websitename: websitename}).then((result)=>{
    if(result.status === 200)
      {
        setPassword('');
        setwebsitename('');
      }
    });
  };

  const decryptPassword = (encryption) => {
    Axios.post('http://localhost:3001/decryptpassword',{password: encryption.password,iv: encryption.iv}).then((response)=> {
     console.log(passwordList);  
    setPasswordList(passwordList.map((val)=>{
        return  val.Id === encryption.Id ? 
        {id:val.Id,
          password:val.password,
          websitename:response.data,
          iv: val.iv
        } : val;
      }));
    });
  }

  return (
    <div className="App">
      <div className="addpwd">
        <h2>
          Save New Password
        </h2>
        <div className="flexv">
        <p>Password :</p> <input type="text" value={password} placeholder="Ex Password 123" onChange={(event)=>{setPassword(event.target.value);}}/>
        </div>
        <div className="flexv">
        <p>Website Name : </p> 
        <input type="text" value={websitename} placeholder="Ex Gmail" onChange={(event)=>{setwebsitename(event.target.value);}}/>
    
        </div>
        <button onClick={addPassword}>Add Password</button>
      </div>
      <h2> Passwords Currently Present </h2>
      <div className="passwords">
        {passwordList.map((val,key)=>{
          return (
            <div className="password"
                 key={key} 
                 onClick={()=> {decryptPassword(val)}}>
                <h1>{val.websitename}</h1>
              </div>
          );
          
        })}
      </div>
    </div>
  );
}

export default App;
