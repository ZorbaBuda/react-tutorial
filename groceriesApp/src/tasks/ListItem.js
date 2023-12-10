import React from 'react'

const ListItem = ({item}) => {
    console.log(Object.entries(item))
  return (
    <li >{JSON.stringify(item)}</li>
  )
}

export default ListItem