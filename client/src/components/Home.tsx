import { useEffect, useState } from 'react';

import Comp1 from './Comp1';
import Comp2 from './Comp2';
import Comp3 from './Comp3';
import Comp4 from './Comp4';
import Comp5 from './Comp5';

function Home(props:any) {
	const [allComponents] = useState([<Comp1/>, <Comp2/>, <Comp3/>, <Comp4/>, <Comp5/>]);
  const [compList, setCompList] = useState([<Comp1/>, <Comp2/>, <Comp3/>, <Comp4/>, <Comp5/>]);
	const [prefComp, setPrefComp] = useState([true,true,true,true,true]);
  const [logged] = useState(props.logged);
	
	useEffect(()=>{
		getCompList();
	},[]);

	const getCompList = async () => {
		const res =await fetch("http://localhost:8000/list",{
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			mode: "cors",
			body: JSON.stringify({name:props.name})
		});

		const obj = await res.json();
		
		const arr = obj.components.split(",");
		arr.pop();
		const arr2=[];
		const compArr = arr.map((ele:any) =>{
			return allComponents[Number(ele)-1];
		})
		for (let i=0; i<allComponents.length; i++)
			arr2[i]=false;

		for (let i=0; i<arr.length; i++){
			arr2[arr[i]-1]=true;
		}
		setPrefComp(arr2);
		setCompList (compArr);
	}

	const changeList = (ele:number) =>{
		const arr = prefComp.map(val=>{return val});
		arr[ele] = !prefComp[ele];
		setPrefComp(arr);
	}

	const makeChanges = async (e: any) => {
		e.preventDefault();
		const arr = [];
		let preferences="";
		for (let i=0; i<prefComp.length; i++){
			if (prefComp[i]){
				arr.push(allComponents[i]);
			}
		}
			
		for (let i=0; i<prefComp.length; i++)
			preferences+=prefComp[i]?(i+1)+",":"";
		
		setCompList(arr);

		const res = await fetch("http://localhost:8000/pref",{
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			mode: "cors",
			body: JSON.stringify({name:props.name, pref: preferences})
		});
		const obj = await res.json();
		console.log(obj);
	}

	return(
		<div>
			{!logged?
			<p className='mx-5'>Log in</p>:
			<>
				<p className="m-5">Your component list</p>
				<div className='m-5'>
					{compList.map((comp)=>{return(comp)})}
				</div>
				<form onSubmit={(e)=>makeChanges(e)}>
					{allComponents.map((ele,ind)=>{return(
						<div>
							<input type='checkbox' id={`comp${ind+1}`} checked={prefComp[ind]} onChange={()=>changeList(ind)}/>
							<label htmlFor={`comp${ind+1}`}>{`Comp${ind+1}`}</label>
						</div>
					)})}
					<button className='mx-4 btn btn-primary' type='submit'>Save Changes</button>
				</form>
			</>
			}
			</div>
	)
}

export default Home;