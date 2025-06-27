"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import NotFoundHero from "./hero/NotFoundHero";
import NotFoundSearchBar from "./search-bar/NotFoundSearchBar";
import QuickActions from "./quick-actions/QuickActions";
import NavigationButtons from "./NavigationButtons";
import FunMessage from "./FunMessage";
import ContactInfo from "./ContactInfo";
import FeaturedPizzas from "./FeaturedPizzas";


const NotFoundContent = () => {
  const [searchQuery, setSearchQuery] = useState("");


  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirect to menu with search query
      window.location.href = `/menu?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <section className="py-20 min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <NotFoundHero/>
          <NotFoundSearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={handleSearch}
          />
          <QuickActions/>
          <FeaturedPizzas/>
          <NavigationButtons/>
          <ContactInfo/>
          <FunMessage/>
        </div>
      </div>
    </section>
  )
}

export default NotFoundContent;