"use client"
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

const Navbar = () => {
    const { data: session } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showlogin, setshowlogin] = useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const handleBlur = () => {
        // Delay hiding the dropdown to allow click event to be registered
        setTimeout(() => {
            setShowDropdown(false);
        }, 125);
    };
    return (
        <>
            <nav className='bg-[#0a0a16] w-full text-white flex justify-between h-16 text-lg items-center'>
                <div className='logo w-full mx-2 flex items-center'>
                    <Link href={'/'}>
                        <div className="flex items-center gap-1">
                            <span>
                                <lord-icon
                                    src="https://cdn.lordicon.com/cengyxkh.json"
                                    trigger="loop"
                                    style={{ width: "50px", height: "50px" }}
                                ></lord-icon>
                            </span>
                            <span>PATREON</span>
                        </div>
                    </Link>
                </div>
                <div className="relative w-max">
                    <div className='hidden md:flex items-center w-max justify-center mx-3'>
                        <button
                            id="dropdownDefaultButton"
                            onClick={() => setShowDropdown(!showDropdown)}
                            onBlur={handleBlur}
                            className={`flex items-center w-max text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                            type="button"
                        >
                            {session ? `Welcome ${session.user.email}` : "Dashboard"}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                    </div>
                    <div
                        id="dropdown1"
                        className={`z-10 ${showDropdown ? "" : "hidden"} flex absolute w-[135px] right-3 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
                    >
                        <ul className="py-2 w-full text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link href={session ? `/${session.user.name}` : "/login"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                            <li onClick={() => { session ? signOut() : signIn() }}>
                                <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    {session ? "Sign out" : "Login"}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <button onClick={toggleDrawer} className="mr-3 md:hidden flex">
                    <span className="w-[40px] h-[40px]" onClick={() => { setshowlogin(!showlogin) }}>
                        <img className="w-[40px] h-[40px]" src="https://static.vecteezy.com/system/resources/previews/010/148/479/original/app-menu-icon-sign-symbol-design-free-png.png" alt="" />
                    </span>
                </button>
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='right'
                    className='relative w-auto'>
                    <div className="flex flex-col">
                        <div className="relative w-full">
                            <div className='items-center w-full justify-center mx-3 mt-3 h-auto'>
                                <button
                                    id="dropdownDefaultButton"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    onBlur={handleBlur}
                                    className={`flex h-auto ${session ? "flex-col" : ""} w-[90%] justify-center items-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center`}
                                    type="button">
                                    <span>{session ? `Welcome ${session.user.email}` : "Dashboard"}</span>
                                    <span className="w-2.5 h-2.5">
                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div id="dropdown1"
                                className={`z-10 ${showDropdown ? "" : "hidden"} flex absolute w-[90%] right-3 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}>
                                <ul className="py-2 w-full text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link href={session ? `/${session.user.name}` : "/login"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                                    </li>
                                    <li onClick={() => { session ? signOut() : signIn() }}>
                                        <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            {session ? "Sign out" : "Login"}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`items-center ${showDropdown ? "mt-32" : "mt-3"} justify-center mx-3`}>
                            <Link href={"/login"}>
                                <button
                                    onClick={() => session ? signOut() : ""}
                                    type="button"
                                    className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                                    {session ? "Logout" : "Login"}
                                </button>
                            </Link>
                        </div>

                    </div>
                </Drawer>
                <div className='hidden md:flex items-center justify-center mx-3'>
                    <Link href={"/login"}>
                        <button
                            onClick={() => session ? signOut() : ""}
                            type="button"
                            className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                        >
                            {session ? "Logout" : "Login"}
                        </button>
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
