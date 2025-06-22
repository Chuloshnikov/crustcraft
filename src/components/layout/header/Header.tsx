"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Menu, X, Pizza } from "lucide-react";
import Link from 'next/link';

const Header = () => {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Menu
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
            href={"/login"}
                >
                <Button variant="ghost" className="cursor-pointer text-gray-700 hover:text-orange-600">
                  Login
                </Button>
            </Link>
            <Link
            href={"/register"}
            >
              <Button className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                Register
              </Button>
            </Link>
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
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">
                Menu
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Link
                href={"/login"}
                >
                  <Button variant="ghost" className="cursor-pointer justify-start">
                    Login
                  </Button>
                </Link>
                 
                <Link
                href={"/register"}
                >
                  <Button className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                    Register
                  </Button>
                </Link>
               
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;