"use client";

import useCart from "@/lib/hooks/useCart";
import CurrencyConverter from "./CurrencyConverter";
import VoiceSearch from "./VoiceSearch"; // Import VoiceSearch component

import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart, Mic, MicOff, Sun, Moon, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Eng");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  useEffect(() => {
    if (listening && window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        router.push(`/search/${transcript}`);
        setListening(false);
      };
      recognition.onend = () => {
        setListening(false);
      };
      try {
        recognition.start();
      } catch (error) {
        console.error("Speech recognition error:", error);
        setListening(false);
      }
    }
  }, [listening, router]);
  
  const handleStartListening = () => {
    setListening(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode'); // Toggle dark mode class on body
  };

  const handleLanguageChange = (language : string) => {
    setSelectedLanguage(language);
    setLanguageDropdownOpen(false); // Close dropdown after selecting language
    // You can add logic here to handle language change
  };

  return (
    <div className={`sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} max-sm:px-2`}>
    <Link href="/">
      {isDarkMode ? (
        <Image src="/logo.png" alt="logo" width={130} height={100} />
      ) : (
        <Image src="/logoo.png" alt="logo" width={130} height={100} />
      )}
    </Link>
    <div className="flex gap-4 text-base-bold max-lg:hidden">
      <Link
        href="/"
        className={`hover:text-red-1 ${pathname === "/" && "text-red-1"}`}
      >
        Home
      </Link>
      <Link
        href={user ? "/wishlist" : "/sign-in"}
        className={`hover:text-red-1 ${pathname === "/wishlist" && "text-red-1"}`}
      >
        Wishlist
      </Link>
      <Link
        href={user ? "/orders" : "/sign-in"}
        className={`hover:text-red-1 ${pathname === "/orders" && "text-red-1"}`}
      >
        Orders
      </Link>
    </div>

    <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
      <input
        className={`outline-none ${query ? 'max-w-[120px]' : 'max-w-[80px]'} sm:max-w-[120px]`} // Conditional classes for smaller screens
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        disabled={query === ""}
        onClick={() => router.push(`/search/${query}`)}
      >
        <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
      </button>
      <button onClick={handleStartListening}>
        {listening ? <MicOff className="cursor-pointer h-4 w-4 hover:text-red-1" /> : <Mic className="cursor-pointer h-4 w-4 hover:text-red-1" />}
      </button>
    </div>

    {/* <div className="relative">
        <button
          onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)} // Toggle dropdown visibility
          className="flex items-center gap-1 border border-gray-400 px-3 py-1 rounded-lg"
        >
          {selectedLanguage}
          <span className="ml-1">
            <ChevronDown />
          </span>
        </button>
        {languageDropdownOpen && ( // Render dropdown if open
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-400 rounded-lg shadow-md">
            <button
              onClick={() => handleLanguageChange("Eng")}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Eng
            </button>
            <button
              onClick={() => handleLanguageChange("French")}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              French
            </button>
            <button
              onClick={() => handleLanguageChange("Spanish")}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Spanish
            </button>
            <button
              onClick={() => handleLanguageChange("Arabic")}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Arabic
            </button>
          </div>
        )}
      </div> */}

    <div className="relative flex gap-3 items-center">
      <Link
        href="/cart"
        className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
      >
        <ShoppingCart />
        <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
      </Link>
      
      <Menu
        className="cursor-pointer lg:hidden"
        onClick={() => setDropdownMenu(!dropdownMenu)}
      />

      {dropdownMenu && (
        <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">
          <Link href="/" className="hover:text-red-1">
            Home
          </Link>
          <Link
            href={user ? "/wishlist" : "/sign-in"}
            className="hover:text-red-1"
          >
            Wishlist
          </Link>
          <Link
            href={user ? "/orders" : "/sign-in"}
            className="hover:text-red-1"
          >
            Orders
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
          >
            <ShoppingCart />
            <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
          </Link>
        </div>
      )}

      {user ? (
        <UserButton afterSignOutUrl="/sign-in" />
      ) : (
        <Link href="/sign-in">
          <CircleUserRound />
        </Link>
      )}

      <button onClick={toggleDarkMode} className="p-1">
        {isDarkMode ? <Moon className="cursor-pointer h-6 w-4 hover:text-red-1" /> : <Sun className="cursor-pointer h-6 w-4 hover:text-red-1" />}
      </button>
    </div>
  </div>
  );
};

export default Navbar;
