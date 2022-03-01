import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.svg';
import key from '../images/key.png'


var url="https://password-node.herokuapp.com/";
var logCheck=false;

const Home = (props) => {
    const [result,setResult]=useState({
        key:'',
        index:''
    });
    let navigate = useNavigate();

    if(result.key.length>10)
    {  
        props.data(result.key)   
        navigate("/user");    
    }

    function nol() 
    {
        document.getElementById("nologin").innerHTML="enter a valid login";
    }

    function loginUser() 
    {       
        setTimeout(nol, 1000);
        console.log(result)
        var key=document.getElementById('key').value;
        fetch(url+"login/"+key)
        .then((res)=>res.json())
        .then((json)=>{
            setResult(json)
        })
        document.getElementById("dname").value='';
        
    }

    return (
        <div>
            <div className="htop">
                <div className="hleft">
                    <div className="hheader">
                        <img src={logo} className="logo"></img> 
                        <h1>  &nbsp; SECURE PASS</h1>
                    </div>
                    <div className="hl1">
                        <p className="hl11">
                            we provide you an online password manager to secure your passwords      
                        </p>
                        <p className="hl12">your personal privacy is our gaurantee  </p>
                    </div>
                </div>
                <div className="hright">
                    <div className="hr1">
                        <p>secure  with <span className='hname'>SECURE PASS</span></p>
                    </div>
                </div>
            </div>
            <div className="space"></div>
            <br></br><br></br><br></br>
            <div className="main">
                <h2>LOGIN</h2>
                <div className="m1">
                    <div className="lm1">
                        <img src={key} className="key"></img>
                    </div>
                    <div className="rm1">
                    <input type="text" placeholder="enter key" id="key"></input>
                    <br></br><br></br>
                    <p id="nologin" className="nolog"></p>
                    <br></br><br></br><br></br><br></br><br></br>
                    <div className="rm11">
                        <Link to={{pathname:'/key' }} ><a>Generate Key</a></Link>
                        <button onClick={loginUser}>LOGIN</button>
                    </div> 
                    </div>
                </div>      
            </div>   
            <br></br>
            <div className="space"></div>  
        </div>
    )
}

export default Home
