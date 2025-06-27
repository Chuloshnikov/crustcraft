"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Menu, X, Pizza, User } from "lucide-react";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if (userName && userName.includes(" ")) {
        userName = userName.split(' ')[0];
    }
    console.log(session);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={"/"} className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <Pizza className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              CRUSTCRAFT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href={"/"} className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Home
            </a>
            <a href={"/menu"} className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Menu
            </a>
            <a href={"/about"} className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              About
            </a>
            <a href={"/contact"} className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
           
            {status === 'authenticated' ? (
  <div className="flex gap-2 items-center">
    <Link href="/profile">
      <Button
        variant="ghost"
        className="cursor-pointer text-gray-700 hover:text-orange-600 flex items-center gap-2"
      >
        <User className="h-5 w-5 text-orange-500" />
        <span className="hidden md:inline-block whitespace-nowrap">
          Hello, {userName}
        </span>
      </Button>
    </Link>
    <Button
      onClick={() => signOut()}
      className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
    >
      Logout
    </Button>
  </div>
) : (
  <>
    <Link href="/login">
      <Button variant="ghost" className="cursor-pointer text-gray-700 hover:text-orange-600">
        Login
      </Button>
    </Link>
    <Link href="/register">
      <Button className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
        Register
      </Button>
    </Link>
  </>
)}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100">
            <nav className="flex flex-col space-y-4">
              <a href={"/"} className="text-gray-700 hover:text-orange-600 font-medium">
                Home
              </a>
              <a href={"/menu"} className="text-gray-700 hover:text-orange-600 font-medium">
                Menu
              </a>
              <a href={"/about"} className="text-gray-700 hover:text-orange-600 font-medium">
                About
              </a>
              <a href={"/contact"} className="text-gray-700 hover:text-orange-600 font-medium">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
            {status !== 'authenticated' ? (
                    <>
                      <Link href="/login" className="w-full">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 hover:text-orange-600"
                        >
                          Login
                        </Button>
                      </Link>

                      <Link href="/register" className="w-full">
                        <Button
                          className="w-full justify-start bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                        >
                          Register
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/profile" className="w-full border rounded-md">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 hover:text-orange-600 flex items-center gap-2"
                        >
                          <User className="h-5 w-5 text-orange-500" />
                          <span className="whitespace-nowrap">
                            Hello, {userName}
                          </span>
                        </Button>
                      </Link>

                      <Button
                        onClick={() => signOut()}
                        className="w-full justify-start bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                      >
                        Logout
                      </Button>
                    </>
                  )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;