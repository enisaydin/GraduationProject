import React, { useContext } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import { logOut } from "../auth/firebase";
import { AuthContext } from "../context/AuthContextProvider";
import Switch from "./Switch";
// Initialization for ES Users
import {
  Dropdown,
  Collapse,
  initTE,
} from "tw-elements";

initTE({ Dropdown, Collapse });

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  //* with custom hook
  // const { currentUser } = useAuthContext();

  // const currentUser = { displayName: "felix franko" };
  // const currentUser = false;
  return (
    <>
      <nav className="w-full flex flex-wrap items-center justify-between py-3 bg-white dark:bg-gray-900 dark:text-white shadow-lg navbar navbar-expand-lg fixed-top">
        <div className="container-fluid w-full flex items-center justify-between px-6">
          <Link className="text-2xl  pr-2 font-semibold" to="/">
            What 2-Do
          </Link>

          <ul
      className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
      data-te-navbar-nav-ref=""
    >
      {/* Dashboard link */}
      
      <li className="my-4 lg:my-0 lg:pr-2"  >
        <a className="disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400" href="#contact">

          Contact
        </a>
      </li>
      <li className="my-4 lg:my-0 lg:pr-2"  >
        <a className="disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400" href="#bill">

          Billing
        </a>
      </li>
      <li className="my-4 lg:my-0 lg:pr-2" data-te-nav-item-ref="">
        <Link
          className=" disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          to="/register"
          data-te-nav-link-ref=""
        >
          Register
        </Link>
      </li>
      {/* Team link */}
      <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref="">
        <Link
          className="p-0  opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          to="/login"
          data-te-nav-link-ref=""
         
        >
          
          Login
        </Link>
      </li>
      {/* Projects link */}
      <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref="">
        <span
          className="p-0  opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          role="button"
          onClick={()=>logOut()}
          data-te-nav-link-ref=""
        >
          LogOut
        </span>
      </li>
    </ul>
          {/* Collapsible wrapper */}











          {/* Right elements */}
          <div className="flex items-center relative">
            {/* Icon */}
            {currentUser && (
              <h5 className="mr-2 capitalize">{currentUser?.displayName}</h5>
            )}
                        <Switch />

            <div className="dropdown relative">
              <span
                className="dropdown-toggle flex items-center hidden-arrow"
                id="dropdownMenuButton2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={currentUser?.photoURL || avatar}
                  className="rounded-full"
                  style={{ height: 25, width: 25 }}
                  alt="user"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </span>
              <ul
                className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <span
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    role="button"
                    onClick={() => logOut()}
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </nav>
      
    </>
  );
};

export default Navbar;
