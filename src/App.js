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
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <Header title={"ReactJS Blog"} />
      <DataProvider>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/post" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/about/" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
