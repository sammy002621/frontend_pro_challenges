
import { useState, useEffect, ChangeEvent } from 'react';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import "../App.css";
// import { Link } from 'react-router-dom';

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


  const handleRemove = ()=>{
    const allSelectedIds = selected.map(user => `user-${user}`);
    document.querySelectorAll('p.class_select').forEach(element => {
      if (!allSelectedIds.includes(element.id)) {
        element.remove();
      }
    });
  }

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
      if(!document.getElementById(`user-${select}`)){
        const newP=document.createElement('p');
        newP.innerHTML=select;
        const newSpan = document.createElement('span');
        newSpan.innerHTML="X";
        newSpan.classList.add("span-select");
        newP.appendChild(newSpan);
        newP.classList.add("class-select","roboto-regular");
        newP.setAttribute("id",`user-${select}`)
        newSpan.addEventListener("click",()=>{
          
          document.getElementById(`user-${select}`)?.remove();
        })
        document.body.appendChild(newP)
      }

      const selectedAllIds=selected.map(user=>`user-${user}`);
      console.log(selectedAllIds);
      document.querySelectorAll('p.class-select').forEach((element)=>{
        if(!selectedAllIds.includes(element.id)){
          setSelected((prevSelected) => {
            return prevSelected.filter((user) => {
              return user !== select;
            });
          });
    element.remove();
        }
      })

    })

    // Remove unselected usernames
    handleRemove();
    
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
                     const newSelected= prevSelected.filter((select) => {
                         select !== user.username;
                      });

                      return newSelected
                    });
                  }
                }}
              >
                {user.username}
              </div>
            ))}
          </div>

          <div id='search'></div>
        </div>
      </div>
    </>
  );
}

export default Results;