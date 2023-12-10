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
 

//  const API_URL = `https://jsonplaceholder.typicode.com/${category}`

 

 useEffect(() => {
   console.log("inside use effect ", category)
   setIsLoading(true)
   setFetchError(null)
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
  }, [category])

  return (
    <>
    <section>
       {categories.map((item) => (
        <button
            key={item}
             onClick={() => setCategory(item)}
         >
            {item}
        </button>
       ))}
    </section>

    <div style={{marginTop : '20px'}}>
    {isLoading  && <p>Loading items...</p>}
    {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
    {!fetchError &&  !isLoading &&
    <ul>
      
    {items.map((item) => (
       <li key={item.id}>{JSON.stringify(item)}</li>
    ) )} 
    </ul> }
    </div>
    </>
  )
}

export default Challenge