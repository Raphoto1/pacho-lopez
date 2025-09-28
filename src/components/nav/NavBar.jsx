import React from "react";

export default function NavBar() {
  const menuItems = [
    {
      title: "Noticias",
      link: "link",
    },
    {
      title: "Biografía",
      link: "link",
    },
    {
      title: "Música",
      link: "link",
    },
    {
      title: "Videos",
      link: "link",
    },
    {
      title: "Tour",
      link: "link",
    },
    {
      title: "Tienda",
      link: "link",
    },
    {
      title: "Contacto",
      link: "link",
    },
  ];
  return (
    <div className='navba absolute shadow-sm bg-gray-800/50 flex w-full'>
      <div className='navbar-end lg:hidden w-full pr-5'>
        <div className='dropdown dropdown-center'>
          <div tabIndex={0} role='button' className='btn btn-ghost'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              {" "}
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />{" "}
            </svg>
          </div>
          <ul tabIndex={0} className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a className="uppercase">{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='hidden lg:flex  sm:hidden w-full'>
        <ul className='menu menu-horizontal flex w-full justify-around px-50'>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a className="uppercase">{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
