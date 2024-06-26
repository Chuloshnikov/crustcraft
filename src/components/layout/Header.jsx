"use client"
import { useEffect, useState, useContext } from 'react'
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
import { FaHamburger } from "react-icons/fa";
import { IoMdBasket } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import BurgerMenu from "./BurderMenu";
import DesktopHeaderNavLinks from "../layout/DesktopHeaderNavLinks";
import {CartContext} from "@/components/AppContext";

const Header = () => {
    const [windowWidth, setWindowWidth] = useState(undefined);
    const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
    const {cartProducts} = useContext(CartContext);
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if (userName && userName.includes(" ")) {
        userName = userName.split(' ')[0];
    }

    useEffect(() => {
        setWindowWidth(window?.innerWidth);
    }, []);

    const gmailCredentials = userData?.email.indexOf("gmail");

    useEffect(() => {
      if (gmailCredentials) {
        fetch('/api/profile', {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              email: userData.email,
              name: userData.name,
              image: userData.image,
          }),
      });
      }
    },[gmailCredentials]);

    const handleMenuToggle = () => {
        setOpenBurgerMenu(!openBurgerMenu);
    }
  return (
    <header className="flex items-center justify-between">
        
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link 
            href={"/"}
            className="text-primary font-black text-4xl"
            >
            C<span className='hidden md:inline'>RUST</span>C<span className='hidden md:inline'>RAFT</span>
            </Link>
            {windowWidth >= 960 && <DesktopHeaderNavLinks/>}
        </nav>
        <nav
        className='flex items-center gap-8 text gray-500 font-semibold'
        >
            {status === 'authenticated' && (
                <>
                <Link 
                href={'/profile'} 
                className='flex gap-2 items-center'
                >
                    <span className='hidden md:block whitespace-nowrap'>Hello, {userName}</span>
                    <FaUserAlt className='h-8 w-8 text-primary -mr-6'/>
                </Link>
                    <button
                        onClick={() => signOut()}
                        className="bg-primary border-0 text-white px-2 mdl:px-8 py-2 rounded-full"
                        >
                        Logout
                    </button>
                </>
                 
            )}
            {status === 'unauthenticated' && (
                <div className='flex gap-1 md:gap-8 items-center'>
                    <Link href={'/login'}>Login</Link>
                    <Link 
                    href={'/register'}
                    className="bg-primary text-white px-4 mdl:px-8 py-2 rounded-full"
                    >
                        Register
                    </Link>
                </div>
            )}
            {status === 'loading' && (
                <>
                <Link href={'/login'}>Login</Link>
                <Link 
                href={'/register'}
                className="bg-primary text-white px-4 mdl:px-8 py-2 rounded-full"
                >
                    Register
                </Link>
            </>
            )}
            {cartProducts?.length > 0 && (
                <Link 
                href={'/cart'}
                className='p-2 bg-primary text-white rounded-full relative -ml-6'
                >
                    <IoMdBasket className='w-6 h-6'/>
                    <span 
                    className='bg-white text-primary rounded-full border-2 border-primary
                    -top-1 -right-3 absolute py-[2px] px-2 text-sm shadow-lg'
                    >
                        {cartProducts.length}
                    </span>
                </Link>
            )}
            <div
            className='max-w-max bg-primary text-white p-3 rounded-full -ml-6 lg:hidden cursor-pointer'
            onClick={handleMenuToggle}
            >
                <FaHamburger/>
            </div>
        </nav>
        {openBurgerMenu && <BurgerMenu menuClose={handleMenuToggle}/>}
 </header>
  )
}

export default Header