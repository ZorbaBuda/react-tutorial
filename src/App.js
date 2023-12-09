import Content from './Content';
import Footer from './Footer';
import Header from './Header'
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

// const itemsArray =  [
//   {
//       id: 1,
//       checked: false,
//       item: "One half pound bag of Cocoa Covered Almonds Unsalted"
//   },
//   {
//       id: 2,
//       checked: true,
//       item: "Item2"
//   },
//   {
//       id: 3,
//       checked: false,
//       item: "Item3"
//   }
// ]

function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || [])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  //every time component renders, the hook is displayed.
  // useEffect(() => {
  //    console.log('render')
  // })

  //but with the dependency, only runs on load time
    //If the dependency changes, then the anonymous function will run again
  // useEffect(() => {
  //   console.log('load time')
  // }, [])

  //in this case, when items are modified, the hook runs
  // useEffect(() => {
  //   console.log('updating items state')
  // }, [items])

  //recommended way of loading data when using API
  // useEffect(() => {
  //   setItems(JSON.parse(localStorage.getItem('shoppinglist')))
  // }, [])

useEffect(() => {
  localStorage.setItem('shoppinglist', JSON.stringify(items))
}, [items])



 

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item }
    const listItems = [...items, myNewItem]
    setItems(listItems)
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, 
    checked: !item.checked} : item)
    setItems(listItems)
}

const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
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
