import React from "react";
import { NavLink } from "react-router";

const NotFound = () => {
  return (
    <div>
      <section className="flex items-center h-full lg:mt-20">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 text-gray-500">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <NavLink to="/">
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 font-semibold rounded bg-[#ef4323] text-white"
              >
                Back to homepage
              </a>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
