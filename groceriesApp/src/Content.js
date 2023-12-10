import React from "react";
import ItemsList from "./ItemsList";



const Content = ({items, handleCheck, handleDelete}) => {
  
  return (
    <main>
        {items.length ? (
          <ItemsList 
             handleCheck={handleCheck} 
             handleDelete={handleDelete}
             items={items}
             />
        ) : (
            <p style={{marginTop: '2rem'}}>Your list is empty</p>
        )}
    </main>
  );
};

export default Content;
