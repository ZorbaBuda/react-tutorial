import Header from "./partials/Header";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";
//routes used
import Home from "./pages/Home";
import NewPost from "./NewPost";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Missing from "./pages/Missing";

import {  Route, Routes, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route index path="/post" element={<NewPost />} />
        <Route path="/post/:id" element={ <PostPage />} />
        <Route path="/about/" element={ <About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
