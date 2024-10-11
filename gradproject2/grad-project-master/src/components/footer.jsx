import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';


import {
  Ripple,
  initTE,
} from "tw-elements";

initTE({ Ripple });

const Footer = () => {
  return (
    <>
      {/* Footer container */}
      <footer className="sticky top-[100vh]  w-full bg-neutral-900 text-center text-white">
        <div className="container px-6 pt-6">
          <div className="mb-6 flex justify-center">
            {/* Social media icons */}
            <a
              href="#!"
              className="m-1 flex items-center justify-center h-9 w-9 rounded-full border-2 border-white uppercase text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              data-te-ripple-init=""
              data-te-ripple-color="light"
            >
              <FaDribbbleSquare />
            </a>
            <a
              href="#!"
              className="m-1 flex items-center justify-center h-9 w-9 rounded-full border-2 border-white uppercase text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              data-te-ripple-init=""
              data-te-ripple-color="light"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="#!"
              className="m-1 flex items-center justify-center h-9 w-9 rounded-full border-2 border-white uppercase text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              data-te-ripple-init=""
              data-te-ripple-color="light"
            >
              <FaGithubSquare />
            </a>
            <a
              href="#!"
              className="m-1 flex items-center justify-center h-9 w-9 rounded-full border-2 border-white uppercase text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              data-te-ripple-init=""
              data-te-ripple-color="light"
            >
              <FaInstagram />
            </a>
            <a
              href="#!"
              className="m-1 flex items-center justify-center h-9 w-9 rounded-full border-2 border-white uppercase text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              data-te-ripple-init=""
              data-te-ripple-color="light"
            >
              <FaTwitterSquare />
            </a>
          </div>
        </div>
        {/* Copyright section */}
        <div
          className="p-4 text-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <a className="text-white">
            IAU
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
