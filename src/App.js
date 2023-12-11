import Header from "./partials/Header";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";
//routes used
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Missing from "./pages/Missing";
import { format } from "date-fns";

import {   Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const initialPosts = [
{
  id: 1,
  title: "My First Post",
  datetime: "July 01, 2021 11:17:36 AM",
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
},
{
  id: 2,
  title: "My 2nd Post",
  datetime: "July 01, 2021 11:17:36 AM",
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
},
{
  id: 3,
  title: "My 3rd Post",
  datetime: "July 01, 2021 11:17:36 AM",
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
},
{
  id: 4,
  title: "My Fourth Post",
  datetime: "July 01, 2021 11:17:36 AM",
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
}
]
function App() {

  const [posts, setPosts] = useState(initialPosts)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      ||  ((post.title).toLowerCase()).includes(search.toLowerCase()))
      setSearchResults(filteredResults.reverse())
  }, [posts, search])

  const handleSubmit = (e) => {
   e.preventDefault()
   const id = posts.length ? posts[posts.length - 1].id + 1 : 1
   const datetime = format(new Date(), 'MMMM dd, yyyy pp')
   const newPost = { id, title: postTitle, datetime, body: postBody}
  //  console.log(newPost)
   const allPosts = [...posts, newPost]
   console.log(allPosts)
   setPosts(allPosts)
   console.log(posts)
   setPostTitle('')
   setPostBody('')
   navigate('/')
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id)
    setPosts(postsList)
   navigate('/')
  }
  return (
    <div className="App">
      <Header title={'ReactJS Blog'} />
        <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={ <Home posts={searchResults} />} />
        <Route exact path="/post" element={<NewPost
         handleSubmit={handleSubmit}
         postTitle={postTitle}
         setPostTitle={setPostTitle}
         postBody={postBody}
         setPostBody={setPostBody}
        />} />
        <Route path="/post/:id" element={ <PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about/" element={ <About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
