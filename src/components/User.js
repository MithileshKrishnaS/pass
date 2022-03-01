import React from 'react';
import { useEffect, useState } from 'react';
import logo from '../images/logo.svg';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import { useNavigate } from "react-router-dom";

var color='purple';
var url="https://password-node.herokuapp.com/";
const User = (props) => {

    let navigate = useNavigate();

    if(props.data===undefined)
    {
        navigate("/"); 
    }

    var [pass,getPass]=useState();
    var data={keyName:'',website:'',password:''}
    function savepass() 
    {
        data.website=document.getElementById('website').value;
        data.password=document.getElementById('password').value;
        data.keyName=props.data;
        fetch(url+"savePass", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
        })
        document.getElementById('website').value='';
        document.getElementById('password').value='';
    }
    function show(index,password) 
    {
        document.getElementById(index).innerHTML=password;
        document.getElementById('sp'+index).style.display='none';
        document.getElementById('hp'+index).style.display='block';
    }

    function hide(index)
    {
        document.getElementById(index).innerHTML='';
        document.getElementById('sp'+index).style.display='block';
        document.getElementById('hp'+index).style.display='none';
    }

    function deletepass(name)
    {
        var data={name:name,key:props.data};
        fetch(url+"deleteItem", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
        })
    }

    useEffect(()=>{
        fetch(url+"eachdetails?key="+props.data)
        .then((res)=>res.json())
        .then((json)=>{
            getPass(json);
        })
        
    },[])

    return (
        <div>
            <div className="kheader">
                <img src={logo} className="logo"></img> 
                <h1>  &nbsp; SECURE PASS</h1>
            </div>
            <input type='text' placeholder='website' id='website' className="userinp"></input><br></br><br></br>
            <input type='text' placeholder='password' id='password' className="userinp"></input><br></br><br></br>
            <button onClick={savepass} className="userbtn">SUBMIT</button>
            <br></br><br></br><br></br>
            <div className="usergrid">
                {pass?.map((input,index)=>{
                    return(
                        <div className="eachpass">
                            <p className="eachweb">{input.website}</p>
                            <button onClick={()=>{deletepass(input.website)}} className="icons">
                                <MaterialIcon icon="delete" />
                            </button> 
                            <div id={index}></div>
                            <div className="each-btn">
                                <button onClick={()=>{show(index,input.password)}} id={'sp'+index} className="icons" >
                                    <MaterialIcon icon="visibility" />
                                </button>
                                <button onClick={()=>{hide(index)}} id={"hp"+index} style={{display:'none'}} className="icons">
                                    <MaterialIcon icon="visibility_off" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            
            
        </div>
    )
}

export default User
