import Content from './Content';
import Footer from './Footer';
import Header from './Header'
import { useState } from 'react';

const itemsArray =  [
  {
      id: 1,
      checked: false,
      item: "One half pound bag of Cocoa Covered Almonds Unsalted"
  },
  {
      id: 2,
      checked: true,
      item: "Item2"
  },
  {
      id: 3,
      checked: false,
      item: "Item3"
  }
]

function App() {

  const [items, setItems] = useState(itemsArray)

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, 
    checked: !item.checked} : item)
    setItems(listItems)
    localStorage.setItem('shoppingList', JSON.stringify(listItems))
}

const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
    localStorage.setItem('shoppingList', JSON.stringify(listItems))
}
 
  return (
    <div className="App">
      <Header title="Groceries"/>
      <Content
       items={items}
       handleCheck={handleCheck}
       handleDelete={handleDelete}
      />
      <Footer  length={items.length}/>
    </div>
  );
}

export default App;
