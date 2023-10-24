import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AddProperty from "./pages/AddProperty";
import Footer from "./components/Footer";
import UpdateProperty from "./pages/UpdateProperty";
import Properties from "./pages/Properties";
import Search from "./pages/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/listing/:listingId" element={<Properties />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route
            path="/update-property/:listingId"
            element={<UpdateProperty />}
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
