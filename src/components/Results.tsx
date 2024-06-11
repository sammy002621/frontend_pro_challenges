import { useState, useEffect,ChangeEvent } from 'react'
import { Link, NavLink, useSearchParams} from 'react-router-dom';
import "../App.css"
// import { Link } from 'react-router-dom';

type User = {
  id:number,
  username: string,

};

function Results() {
  

  const user1: User = {
    id:1,
    username: "employee_1",
  };

  const users_1: User[] = [user1];

  const [users, setUsers] = useState<User[]>(users_1);
  const [originalUsers, setOriginalUsers] = useState<User[]>(users_1);
  const [searchParams] = useSearchParams();
  const [selected,setSelected]=useState<string[]>([]);
  const [rerender, setRerender] = useState(false);
  const [removedIndex,setRemovedIndex]=useState<number>(0);

  

 

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data) => {
        const userData:User[] = data.map((user:any)=>({
          id:user.id,
          username:user.username
        }));
        setUsers(userData);
        setOriginalUsers(userData);
        console.log("users are :",users);
      });
  }, []); 
  
  useEffect(()=>{
  console.log("new users are:",selected);

  const selectIndex=selected.length-1;
  

  selected.map((select,index)=>{
    if(index === selectIndex){
  const newP=document.createElement('p');
  newP.innerHTML=select;
  newP.classList.add("class_select");
  newP.classList.add("roboto-regular");
  newP.setAttribute("id",`${index}`);
  document.body.appendChild(newP);
    }
  })


  // selected.map((select,index)=>{

  // //   if(index === select.length-1){
  // //     console.log(" the numbers are equal");
  // //     const newP=document.createElement('p');
  // //     newP.innerHTML=select;
  // //     document.body.appendChild(newP)
  // //   }else{

  // //   }
  // //   console.log("after the condition")
  // // })

  
      
    
  },[selected])



  
  
  
  // Changed dependency to an empty array to avoid infinite loop


const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
  const searchQuery = e.target.value.toLocaleLowerCase();
  console.log("the search query is :",searchQuery);
  if(searchQuery){
    const filteredUsers = originalUsers.filter((user)=>{
     return user.username.toLocaleLowerCase().includes(searchQuery);
    })
    console.log("filtered users are:",filteredUsers)
    setUsers(filteredUsers);
  }else{
    setUsers(originalUsers);
  }
 
  }
  return (
    <>
      <div className='body_div'>
        <div className='container'>
          {/* container_search_bar */}
          <div className='search'>
            <input type="text" placeholder='Search' id='search' onChange={handleChange} />
            {/* 
            get the value in the input
            compare that value with all the words in our array
            return all the values that have atleast a character in the search word
            setUsers(newArray)

            
            keep track of the index that has been removed and then update the state to reflect the changes
            
            
            
            */}
          </div>
          {/* container_body */}
          <div className='container_body'>
            {users.map((user) => (
              <div  key={user.id} id='clicked' className={(selected.includes(user.username.toLocaleLowerCase())) ? `container_body_name` : `roboto-regular`} onClick={()=>{
  if(!selected.includes(user.username.toLocaleLowerCase())){
   setSelected((prev:string[])=>[...prev,user.username.toLocaleLowerCase()]);

    
    // let newP = document.createElement("p");
    // newP.innerHTML = user.username;
    // document.getElementById("search")?.appendChild(newP);
  }else{
   setSelected((prevSelected)=>{
    return prevSelected.filter((select,index)=>{
      setRemovedIndex(index);
      return select!==user.username.toLocaleLowerCase()
    });
    })


    
  }
  setRerender(prev => !prev);
              }} >
                {user.username}
              </div>
            ))}
          </div>

          <div id='search'></div>
        </div>
      </div>
    </>
  )

  }


export default Results;
