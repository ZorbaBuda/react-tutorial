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
 const [fetchError, setFetchError] = useState(null)
 const [isLoading, setIsLoading] = useState(true)
 const [items, setItems] = useState('')

 const API_URL = `https://jsonplaceholder.typicode.com/${category}`

 useEffect(() => {
  
    const fetchItems = async () => {
    try {
      const response = await fetch(API_URL)
      if(!response.ok) throw Error('Did not receive expected data')
      const listItems = await response.json();
     setItems(JSON.stringify(listItems))
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
           
            onClick={setCategory(item)}
         >
            {item}
        </button>
       ))}
    </section>
    <ul>
        {items}
    {/* {items.map((item) => (
       <li>{item}</li>
    ) )} */}
    </ul>
    </>
  )
}

export default Challenge