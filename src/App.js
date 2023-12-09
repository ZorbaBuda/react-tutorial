import Content from './Content';
import Footer from './Footer';
import Header from './Header'
import { useState } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

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

  const initialData = JSON.parse(localStorage.getItem('shoppinglist')) ? JSON.parse(localStorage.getItem('shoppinglist')) : itemsArray

  const [items, setItems] = useState(initialData)
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  const setAndSaveItems = (newItems) => {
    setItems(newItems)
    localStorage.setItem('shoppinglist', JSON.stringify(newItems))
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item }
    const listItems = [...items, myNewItem]
    setAndSaveItems(listItems)
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, 
    checked: !item.checked} : item)
    setAndSaveItems(listItems)
}

const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
    localStorage.setItem('shoppinglist', JSON.stringify(listItems))
}

const handleSubmit = (e) => {
  e.preventDefault()
  if(!newItem) return
  addItem(newItem)
  setNewItem('')
}
 
  return (
    <div className="App">
    
      <Header title="Groceries"/>
      <AddItem 
       newItem={newItem}
       setNewItem={setNewItem}
       handleSubmit={handleSubmit}
      />
        <SearchItem
        search={search}
        setSearch={setSearch}
        />
        
      <Content
       items={items.filter(item => ((item.item).toLowerCase()).includes
        (search.toLowerCase()))}
       handleCheck={handleCheck}
       handleDelete={handleDelete}
      />
      <Footer  length={items.length}/>
    </div>
  );
}

export default App;
