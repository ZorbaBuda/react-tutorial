import Header from "./partials/Header";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";
//routes used
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Missing from "./pages/Missing";
import EditPost from "./pages/EditPost";
import { format } from "date-fns";

import {   Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// npx json-server -p 3500 -w data/db.json
import api from './api/posts'
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {

  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const  { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data)
  }, [data])

  // useEffect(() => {
  //  const fetchPosts = async () => {
  //   try {
  //    const response = await api.get('/posts')
  //    //axios creates automatically json and catches errors (no need if !response.ok etc)
  //    setPosts(response.data)
  //   } catch (err) {
  //     if(err.response) {
  //     //not in the 200 response range
  //     console.log(err.response.data)
  //     console.log(err.response.status)
  //     console.log(err.response.headers)
  //     } else{
  //       console.log(`Error: ${err.message}`)
  //     }
  //   }
  //  }
  //  fetchPosts()
  // }, [])

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      ||  ((post.title).toLowerCase()).includes(search.toLowerCase()))
      setSearchResults(filteredResults.reverse())
  }, [posts, search])

  const handleSubmit = async (e) => {
   e.preventDefault()
   const id = posts.length ? posts[posts.length - 1].id + 1 : 1
   const datetime = format(new Date(), 'MMMM dd, yyyy pp')
   const newPost = { id, title: postTitle, datetime, body: postBody}

   try {
    const response = await api.post('/posts', newPost)
    const allPosts = [...posts, response.data]
    console.log(allPosts)
    setPosts(allPosts)
    console.log(posts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
   } catch(err) {
    console.log(`Error: ${err.message}`)
   }
  }

  const handleEdit = async (id) => {
      const datetime = format(new Date(), 'MMMM dd, yyyy pp')
      const updatedPost = { id, title: editTitle, datetime, body: editBody}
    try{
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? { ...response.data} : post))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    } catch(err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleDelete = async (id) => {

    try{
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id)
      setPosts(postsList)
      navigate('/')

    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }
  return (
    <div className="App">
      <Header title={'ReactJS Blog'} width={width} />
        <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={
           <Home
              posts={searchResults}
              fetchError={fetchError}
              isLoading={isLoading}
               />} />
        <Route exact path="/post" element={<NewPost
         handleSubmit={handleSubmit}
         postTitle={postTitle}
         setPostTitle={setPostTitle}
         postBody={postBody}
         setPostBody={setPostBody}
        />} />
         <Route  path="/edit/:id" element={<EditPost
         posts={posts}
         handleEdit={handleEdit}
         editTitle={editTitle}
         setEditTitle={setEditTitle}
         editBody={editBody}
         setEditBody={setEditBody}
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
