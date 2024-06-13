
import { useState, useEffect, ChangeEvent } from 'react';
import "../App.css";

type User = {
  id: number,
  username: string,
};

function Results() {
  const user1: User = {
    id: 1,
    username: "Loading...",
  };

  const users_1: User[] = [user1];

  const [users, setUsers] = useState<User[]>(users_1);
  const [originalUsers, setOriginalUsers] = useState<User[]>(users_1);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data) => {
        const userData: User[] = data.map((user: any) => ({
          id: user.id,
          username: user.username
        }));
        setUsers(userData);
        setOriginalUsers(userData);
        console.log("users are :", users);
      });
  }, []);

  useEffect(() => {
    console.log("new users are:", selected);

    selected.forEach((select)=>{
      if(!document.getElementById(`${select}`)){
        const newP=document.createElement('p');
        newP.innerHTML=select;
        const newSpan = document.createElement('span');
        newSpan.innerHTML="X";
        newSpan.classList.add("span-select");
        newP.appendChild(newSpan);
        newP.classList.add("class-select","roboto-regular");
        newP.setAttribute("id",`${select}`)
        newSpan.addEventListener("click",()=>{
          document.getElementById(`${select}`)?.remove();
          setSelected((prevSelected)=>{
            return prevSelected.filter(user => user !== select);
          })
        })
        document.getElementById("search-div")?.appendChild(newP)
      }else{
        const allSelectedIds = selected.map(user => `${user}`);
        document.querySelectorAll('p.class-select')?.forEach(element => {
          if (!allSelectedIds.includes(element.id)) {
            element.remove();
          }
        }); 
      }
    });

    // Remove unselected usernames
   
    
  }, [selected]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLocaleLowerCase();
    console.log("the search query is :", searchQuery);
    if (searchQuery) {
      const filteredUsers = originalUsers.filter((user) => {
        return user.username.toLocaleLowerCase().includes(searchQuery);
      });
      console.log("filtered users are:", filteredUsers);
      setUsers(filteredUsers);
    } else {
      setUsers(originalUsers);
    }
  };

  return (
    <>
      <div className='body_div'>
        <div className='container'>
          {/* container_search_bar */}
          <div className='search'>
            <input type="text" placeholder='Search' id='search' onChange={handleChange} />
            
          </div>
          {/* container_body */}
          <div className='container_body'>
            {users.map((user) => (
              <div
                key={user.id}
                id='clicked'
                className={selected.includes(user.username) ? `container_body_name` : `roboto-regular`}
                onClick={() => {
                  if (!selected.includes(user.username)) {
                    setSelected((prev: string[]) => [...prev, user.username]);
                  } else {
                    setSelected((prevSelected) => {
                      return prevSelected.filter((select) => {
                        return select !== user.username;
                      });
                    });
                  }
                }}
              >
                {user.username}
              </div>
            ))}
          </div>

          <div id='search-div'></div>
          
        </div>
      </div>
    </>
  );
}

export default Results;