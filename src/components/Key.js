import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

var disabled=false;
var url="https://password-node.herokuapp.com/";

const Key = () => {

    const [key,getKey]=useState();

    function genKey() 
    {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < 10; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        getKey(result);
        var send={key:result}
        disabled =true;
        fetch(url+"saveKey", {
            method: "POST",
            body: JSON.stringify(send),
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
        })
    }

    return (
        <div>
            <div className="kheader">
                <img src={logo} className="logo"></img> 
                <h1>  &nbsp; SECURE PASS</h1>
            </div> 
            <br></br><br></br>
            <div className="note">
                <p><b>NOTE : </b> This key can be generated only once so save the generated key value after generated</p>
            </div>
            <br></br><br></br><br></br>
            <div className="genkey">
                <button disabled={disabled} onClick={genKey} className="genkey1">Generate Key</button>
                <div >
                    <Link to={{pathname:'/' }} >
                        <button className="genkey2">Back</button>
                    </Link>
                </div>
            </div>
            
            <br></br><br></br><br></br>
            <p className="kh2"> Generated key  </p>
            <div >
                <p className="keyvalue">{key}</p>
            </div>
        </div>
    )
}

export default Key
