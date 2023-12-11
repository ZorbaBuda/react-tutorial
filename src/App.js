import Header from "./partials/Header";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";
//routes used
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Missing from "./pages/Missing";

import {  BrowserRouter as Router, Route, Routes, useHistory } from "react-router-dom";
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
  const history = useHistory()

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id)
    setPosts(postsList)
   history.push('/')
  }
  return (
    <div className="App">
      <Header title={'ReactJS Blog'} />
      <Router>
        <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={ <Home posts={posts} />} />
        <Route exact path="/post" element={<NewPost />} />
        <Route path="/post/:id" element={ <PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about/" element={ <About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
