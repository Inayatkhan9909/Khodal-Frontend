import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import Home from "./Shared/Home";
import Register from "./User/Register";
import Login from "./User/Login";
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from "./Posts/CreatePost";
import ModifyPost from "./Posts/ModifyPost";
import EditPost from "./Posts/EditPost";
import Profile from "./User/Profile";
import SinglePost from "./Shared/SinglePost";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<Register/>} />
        <Route path="/user/login" element={<Login/>} />
        <Route path="/user/profile" element={<Profile/>} />
        <Route path="/user/createpost" element={<CreatePost/>} />
        <Route path="/posts/modifypost" element={<ModifyPost/>} />
        <Route path="/posts/editpost" element={<EditPost/>} />
        <Route path="/posts/viewpost" element={<SinglePost/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
