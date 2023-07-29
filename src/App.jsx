import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Header from "./components/header/Header";
import About from "./components/about/About";
import Product from "./components/product/Product";
import Team from "./components/team/Team";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Pricing from "./components/pricing/Pricing";
import Whyus from "./components/whyus/Whyus";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

const App = () => {
  return (
    <Router>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
};

const Home = () => {
  return (
    <>
      <Header />
      <About />
      <Product />
      <Whyus />
      <Pricing />
      <Team />
      <Contact />
    </>
  );
};

export default App;
