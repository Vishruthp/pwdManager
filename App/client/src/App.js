import './App.css';
import {useState} from "react";
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faFile } from '@fortawesome/fontawesome-free-solid'
import { confirm } from './components/confirmation';
function App() {
  const [password,setPassword] = useState('');
  const [sitename, setwebsitename] = useState('')
  const [passwordList,setPasswordList] = useState([])
  const [isShow,setIsShow] = useState(false);
  const addPassword = ()=>{
    Axios.post('http://localhost:3001/addpassword',{password: password,sitename: sitename}).then((result)=>{
    if(result.status === 200)
      {
        setPassword('');
        setwebsitename('');
      }
    });
  };
  const showPasswordview = ()=>{
    setIsShow(true);
    Axios.get('http://localhost:3001/showpasswords').then((resp)=>{
      setPasswordList(resp.data);
  });
  };
  const showNewEntryView = ()=>{
    setIsShow(false);
  }

  const decryptPassword = (encryption) => {
    Axios.post('http://localhost:3001/decryptpassword',{password: encryption.password,iv: encryption.iv}).then((response)=> {
    setPasswordList(passwordList.map((val)=>{
     
        return  val._id === encryption._id ? 
        { _id:val.Id,
          _rev:val._rev,
          password:val.password,
          sitename:val.sitename,
          decryptPassword:response.data,
          iv: val.iv
        } : val;
      }));
    });
  }

  const deletePassword =  async (encryption) => {
    if(await confirm('Are you sure you want to delete this password?')){
    Axios.post('http://localhost:3001/deletepassword',{_id: encryption._id,_rev: encryption._rev}).then((response)=> {
    setPasswordList(passwordList.filter((val)=>{
      return val._id !== encryption._id;
    }));
    });
  }
}

  return (
    <div className="App">
      <div style={{ display: !isShow ? "block" : "none" }}>
      <span className="login100-form-title">
						Password Manager
					</span>
    
          <div className="wrap-input100">
						<input className="input100" type="text" value={sitename}  placeholder="Website Name" onChange={(event)=>{setwebsitename(event.target.value);}}></input>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
            <FontAwesomeIcon icon={faFile} />
						</span>
					</div>
          <div className="wrap-input100">
						<input className="input100" type="text" value={password} placeholder="Password" onChange={(event)=>{setPassword(event.target.value);}}></input>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
            <FontAwesomeIcon icon={faLock} />
						</span>
					</div>
          <div className="lgn_allpwd_btn">
          <button className="login100-form-btn" onClick={addPassword}>
							Add
						</button>
            <button className="login100-form-btn" onClick={showPasswordview}>
							Saved Passwords
						</button>
          </div>
          </div>
      <div className='tablecontainer' style={{ display: isShow ? "block" : "none" }}>
        <div>
        <span className="login100-form-title">
						Saved Passwords
					</span>
        <table>
          <tr>
          <th>Website Name</th>
          <th>Password</th>
          <th></th>
          </tr>
          <tbody>
          {passwordList.map((val,key)=>{
            return (
              <tr key={key}>
              <td>{val.sitename}</td>
              <td>{val.decryptPassword}<button onClick={()=>{decryptPassword(val)}} > {val.decryptPassword ? '' : 'Click to see'} </button></td>
              <td><button onClick={()=>{deletePassword(val)}}>Delete!</button></td>
              </tr>
            )
          })}
          </tbody>
          
        </table>
        <button className="login100-form-btn" onClick={showNewEntryView}>
							Back
						</button>
        </div>
       
       
      </div>
        
      {/* 
      
        <button onClick={addPassword}>Add Password</button>
      </div>
      <h2> Passwords Currently Present </h2>
      <div className="passwords">
        {passwordList.map((val,key)=>{
          return (
            <div className="password"
                 key={key} 
                 onClick={()=> {decryptPassword(val)}}>
                <h1>{val.sitename}</h1>
              </div>
          );
          
        })}
      </div> */}
    </div>
  );
}

export default App;
