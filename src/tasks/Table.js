import React from "react";

const Table = ({ items }) => {
  // console.log(Object.keys(items))
  const keys = Object.keys(items[0]);
  console.log(keys);
  const item = items[0]
  const entries = Object.entries(item)
  console.log("object entries ", entries)
  const entrie0 = entries[0]
  console.log("entrie 0 ", entrie0)
  console.log(entrie0[0])
//   console.log(Object.entries(item)[2]['id'])
//   console.log(Object.entries(item).keys[3])

  return (
    // <table>
    //   <tr>
    //     {keys.map((item) => (
    //       <th key={item}>{item}</th>
    //     ))}
    //   </tr>
    //   {items.map((item, index) => (

    //   )}
    // </table>
    <table>
      <tr>
        {keys.map((item) => (
       <th key={item}>{item}</th>
         ))}
       </tr>
        <tr>
        {items.map((item, index) => (
        
            <td  key={index}>{Object.entries(item).keys[index]}</td>
        
        ))}
         </tr>
    </table>
  );
};

export default Table;
