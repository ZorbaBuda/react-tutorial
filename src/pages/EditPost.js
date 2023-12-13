import React from "react";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import api from '../api/posts'
import { format } from "date-fns";


const EditPost = () => {
  const { posts, setPosts} = useContext(DataContext)
  const { id } = useParams();
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const post = posts.find((post) => post.id.toString() === id);
  const navigate = useNavigate()

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };


  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle]);

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Title</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody">Post</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
          </form>
        </>
      )}
      {!editTitle && 
      <>
        <h2>Post Not Found</h2>
          <p>Well, that's disappointing</p>
          <p>
            <Link to='/'>Visit our homepage</Link>
          </p>
      </>

      }
    </main>
  );
};

export default EditPost;