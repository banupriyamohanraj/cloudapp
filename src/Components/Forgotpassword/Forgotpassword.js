import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Forgotpassword(){
    let [email, setemail] = useState('')
    let history = useHistory(); 

    let UserSubmit = async (e) => {
        e.preventDefault()

        await fetch('https://invoice-backendapp.herokuapp.com/auth/passwordreset', {
            method: "PUT",
            body: JSON.stringify({
                email
            }),
            headers: {
                "content-type": "application/json",

            }
        }).then(res => {
            return res.json();

        }).then((data) => {
           
            let mesg = data.message
            toast(mesg,{position: toast.POSITION.TOP_CENTER})
            history.push('/')


        }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
        });


    }

    return <>
    <div className='container'>
            <div className='row'>
                <div className='col-md-7' style={{"padding-left":"50px","margin-left":"200px","margin-top":"150px","paddingBottom":"83px"}}>
                    <div class="card" style={{"padding":"20px","border-radius": "3%","color":"white","background-image": "linear-gradient(to bottom right, #173F5F, #20639B)"}}>
                        <div className='card-title' style={{"textAlign":"center"}}>
                            <h2>Forgot Password</h2>
                        </div>
                        <div class="card-body">
                            <form onSubmit={UserSubmit}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" onChange={(e) => setemail(e.target.value)}/>
                                    
                                </div>
                                
                                <button type="submit" class="btn btn-light">send</button>
        
                            </form>
                            <br/>
                            
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </>
    
    
    }