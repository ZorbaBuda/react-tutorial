import React from 'react'

//instead of props, we destructure and pass title directly, works the same
const Header = ({title}) => {
   
  return (
   
    <header >
       <h1>{title}</h1>
    </header>
  )
}

//if expected prop is not passed, defaultProps is used
Header.defaultProps = {
    title: "Default title"
}

export default Header