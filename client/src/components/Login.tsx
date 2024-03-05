import { useState } from "react";

function Login(props: any) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
	const [logged, setLogged] = useState(false)

    const submitForm = (e:any) => {
			e.preventDefault()
			props.logStatus(true, name)
			fetch("http://localhost:8000/login",{
				method: "POST",
				headers:{
					"Content-Type": "application/json"
				},
				mode: "cors",
				body: JSON.stringify({name:name})
			}).then((res:any)=>{
				res.json().then((obj:any)=>{
					console.log("Status", obj)})
					setLogged(true)
			}
			).catch((err:any) =>{
				console.log(err)
			})
    }

    return (
			<div>
			{logged?<p>Logged in</p>:<>
			<b className="fs-3 mx-5">Log in now</b>
			<form onSubmit={submitForm} className="p-5">
				<label htmlFor="username" className="form-label">Name</label>
				<input type="text" id="username" className="form-control" onChange={(e)=>{setName(e.target.value)}} />
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password" id="password" className="form-control" onChange={(e)=>{setPassword(e.target.value)}}/>
				<br/>
				<button className="btn btn-primary" onClick={submitForm}>Log In</button>
			</form></>}
			</div>
    )
}

export default Login;