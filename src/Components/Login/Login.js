import {useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import { useNavigate } from "react-router-dom";

export default function Login() {
    

    let [email, setemail] = useState('');
    let [password, setpassword] = useState('');
    let[loading,setloading] = useState(false);


    
    const navigate = useNavigate();
    toast.configure()


    let UserSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        await fetch('https://nodejs-restapi-backend.herokuapp.com/auth/login', {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => {
                return res.json();
            }).then((data) => {
                console.log(data)
                setloading(false);
            
                //Notifying
                let mesg = data.message
                toast(mesg, { position: toast.POSITION.TOP_CENTER })
               if(mesg === "Login Sucessfull"){
                navigate("/home");
               }
              
           
            })

    }

   
 
    if(loading) return <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

    return <>
        <div className='container-fluid'>
            <div className='row'>
                
                <div className='col-12' id="Applogin">
                    <div className="CardContainer">
                    <div class="card shadow"  >
                        <div className='card-title' style={{ "textAlign": "center","margin-top":"20px"}}>
                            <h3>LOGIN</h3>
                        </div>
                        <div class="card-body">
                            <form onSubmit={UserSubmit}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setemail(e.target.value)} />

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setpassword(e.target.value)} />
                                    <Link to="/forgotpassword">Forgot password ? </Link>
                                </div>
                                <br />
                                <button type="submit" class="btn btn-dark">Login</button>

                            </form>
                            <br />
                            <div>
                                <h6>Do not have an account ? <Link to="/registration">signup</Link></h6>
                                <br />

                            </div>
                        </div>
                    </div>
                    </div>
                   

                </div>

            </div>
        </div>

    </>


}
