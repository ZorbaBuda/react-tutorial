import React from "react";
import { useState } from "react";

const Content = () => {

const [name, setName] = useState('Dave')
const [ count, setCount] = useState(0)
  const handleNameChange = () => {
    const names = ["Bob", "Kevin", "Dave"];
    const int = Math.floor(Math.random() * 3);
    setName(names[int]);
  };

  const handleClick = () => {
    setCount(count + 1)
    console.log(count)
  }

//   const handleClick2 = (name) => {
//     console.log(`${name} was clicked`)
//   }

  const handleClick3 = (e) => {
    // console.log(e.target)  <button>Click it</button>
  console.log(e.target.innerText) //Click it
}
  return (
    <main>
        <p onDoubleClick={handleClick}>Hello {name}</p>
     {/* Events examples */}
      <button onClick={handleNameChange}>Change name</button>
      <button onClick={handleClick}>Click it</button>
      <button onClick={(e) => handleClick3(e)}>Click it</button>
    </main>
  );
};

export default Content;
