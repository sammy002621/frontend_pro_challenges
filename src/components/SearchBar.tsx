import React from 'react'


type user={
    address:string[],
    company:string[],
    email:string,
    id:number,
    name:string,
    phone:number,
    username:string,
    website:string,
  }

function SearchBar({users}:{users:user[]}) {
  return (
    <div>SearchBar</div>
  )
}

export default SearchBar