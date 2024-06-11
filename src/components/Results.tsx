
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
    username: "employee_1",
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
      if(!document.getElementById(`user-${select}`)){
        const newP=document.createElement('p');
        newP.innerHTML=select;
        newP.classList.add("class-select","roboto-regular");
        newP.setAttribute("id",`user-${select}`)
        document.body.appendChild(newP)
      }

      const selectedAllIds=selected.map(user=>`user-${user}`);
      console.log(selectedAllIds);
      document.querySelectorAll('p.class-select').forEach((element)=>{
        if(!selectedAllIds.includes(element.id)){
    element.remove();
        }
      })

    })

    // Remove unselected usernames
    const allSelectedIds = selected.map(user => `user-${user}`);
    document.querySelectorAll('p.class_select').forEach(element => {
      if (!allSelectedIds.includes(element.id)) {
        element.remove();
      }
    });
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
                className={selected.includes(user.username.toLocaleLowerCase()) ? `container_body_name` : `roboto-regular`}
                onClick={() => {
                  if (!selected.includes(user.username.toLocaleLowerCase())) {
                    setSelected((prev: string[]) => [...prev, user.username.toLocaleLowerCase()]);
                  } else {
                    setSelected((prevSelected) => {
                      return prevSelected.filter((select) => {
                        return select !== user.username.toLocaleLowerCase();
                      });
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