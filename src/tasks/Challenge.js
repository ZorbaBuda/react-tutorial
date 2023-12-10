import React from 'react'
import { useState, useEffect} from 'react'
import Form from './Form'
import List from './List'

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
 const reqTypes = ["users", "posts", "comments"]
 const [reqType, setReqType] = useState(reqTypes[0])
 const [items, setItems] = useState([])
 const [fetchError, setFetchError] = useState(null)
 const [isLoading, setIsLoading] = useState(true)
 

 const API_URL = 'https://jsonplaceholder.typicode.com/'

 

 useEffect(() => {
   console.log("inside use effect ", reqType)
   setIsLoading(true)
   setFetchError(null)
    const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}${reqType}`)
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
  }, [reqType])

  return (
    <>
    <Form 
       setReqType={setReqType}
       reqType={reqType} />
    {/* <section>
       {reqTypes.map((item) => (
        <button
            key={item}
             onClick={() => setReqType(item)}
         >
            {item}
        </button>
       ))}
    </section> */}

    <div style={{marginTop : '20px'}}>
    {isLoading  && <p>Loading items...</p>}
    {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
    {!fetchError &&  !isLoading &&
       <List items={items} /> }
    </div>
    </>
  )
}

export default Challenge