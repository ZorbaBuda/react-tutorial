import React from 'react'
import { useState, useEffect} from 'react'

// const Button = ({category, setCategory}) => {
//     return (
//         <button
//          onClick={setCategory(category)}
//         >
//             {category}
//         </button>
//     )
// }

const Challenge = () => {
 const categories = ["users", "posts", "comments"]
 const [category, setCategory] = useState(categories[0])
 const [items, setItems] = useState([])
 const [fetchError, setFetchError] = useState(null)
 const [isLoading, setIsLoading] = useState(true)
 

 const API_URL = `https://jsonplaceholder.typicode.com/${category}`

 useEffect(() => {
  
    const fetchItems = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/${category}`)
      if(!response.ok) throw Error('Did not receive expected data')
      const listItems = await response.json();
     setItems(listItems)
      setFetchError(null)
    }catch (err) {
     setFetchError(err.message)
    } finally {
      setIsLoading(false)
    }
    }
    setTimeout(() => {
    (async () => await fetchItems())()
    }, 2000)
  }, [])

  return (
    <>
    <section>
       {categories.map((item) => (
        <button
            key={item}
            // onClick={setCategory(item)}
         >
            {item}
        </button>
       ))}
    </section>
    <ul>
      
    {items.map((item) => (
       <li>{JSON.stringify(item)}</li>
    ) )} 
    </ul>
    </>
  )
}

export default Challenge