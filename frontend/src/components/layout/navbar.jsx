import React, { useState } from "react";
// import { FaShoppingBag } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
import "../../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../form/searchInput";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FaShoppingBag } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";

function NavBar() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart([]);
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container container-fluid">
        <NavLink className="navbar-brand" to="/">
          Aech
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse p-3" id="navbarNav">
          
          <ul className="navbar-nav link">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link "
                aria-current="page"
                href="#"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/all-products" className="nav-link">
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
           {show?( <li className="nav-item mt-2 search">
              <SearchInput />
            </li>):null}
            <li className="nav-item">
              <button className=" nav-link" onClick={() => setShow(!show)}>
                <AiOutlineSearch
                  style={{ fontSize: "1.4rem", fontWeight: "900" }}
                />
              </button>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link ">
                <Badge className="nav-link p-1" count={cart.length}>
                  <FaShoppingBag style={{ fontSize: "1.4rem" }} />
                </Badge>
              </NavLink>
            </li>
          </ul>
          {!auth.user ? (
            <>
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link"
                    aria-current="page"
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" aria-current="page">
                    Sign In
                  </NavLink>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <CgProfile style={{ fontSize: "1.5rem" }} />
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li className="name">
                      <h4 className="px-3 py-2" style={{ color: "#ffffff" }}>
                        Hi {auth.user.name}!
                      </h4>
                    </li>
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        onClick={handleLogout}
                        className="dropdown-item"
                      >
                        Log Out
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>

    // <div className="navbar" >
    //   <Navbar bg="light" variant="light" expand="lg" fixed="top">
    //     <Container>
    //       <Navbar.Brand className="logo" href="#home">
    //         Aech
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //       <Navbar.Collapse className="bg-light ps-3" id="responsive-navbar-nav">
    //         <Nav className=" m-auto">
    //           <Nav.Link>
    //             <NavLink className="nav-link" to="/">
    //               Home
    //             </NavLink>
    //           </Nav.Link>
    //           <Nav.Link>
    //             <NavLink className="nav-link" to="/about">
    //               Shop
    //             </NavLink>
    //           </Nav.Link>
    //         </Nav>
    //         <Nav>
    //           <Nav.Link>
    //             <NavLink to="/cart" className="nav-link">
    //               <FaShoppingBag style={{ fontSize: "1.4rem" }} />
    //             </NavLink>
    //           </Nav.Link>
    //           <Nav.Link>
    //             <NavLink to="/profile" className="nav-link">
    //               <CgProfile style={{ fontSize: "1.5rem" }} />
    //             </NavLink>
    //           </Nav.Link>
    //           {!auth.user ? (
    //             <>
    //               <Nav.Link>
    //                 <NavLink
    //                   to="/register"
    //                   className="nav-link btn btn-light border-dark p-1 mt-1"
    //                 >
    //                   Sign Up
    //                 </NavLink>
    //               </Nav.Link>
    //               <Nav.Link>
    //                 <NavLink
    //                   to="/login"
    //                   className="nav-link btn btn-light border-dark p-1 mt-1"
    //                 >
    //                   Sign In
    //                 </NavLink>
    //               </Nav.Link>
    //             </>
    //           ) : (
    //             <>
    //               <Nav.Link>
    //                 <NavLink
    //                   to="/login"
    //                   onClick={handleLogout}
    //                   className="nav-link btn btn-light border-dark p-1 mt-1"
    //                 >
    //                   Log Out
    //                 </NavLink>
    //               </Nav.Link>
    //             </>
    //           )}
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    // </div>
  );
}

export default NavBar;
