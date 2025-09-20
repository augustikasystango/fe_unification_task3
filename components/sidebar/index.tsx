"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { href: "/home", icon: "/home.png", label: "Home" },
    { href: "/profile", icon: "/user.png", label: "Profile" },
    { href: "/bookings", icon: "/book.png", label: "Bookings" },
    { href: "/groups", icon: "/groups.png", label: "Groups" },
    { href: "/sales", icon: "/sales.png", label: "Sales" },
  ];

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false); // Close mobile menu on desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen &&
        isMobile &&
        target &&
        !target.closest('aside') &&
        !target.closest('[data-mobile-menu-button]')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen && isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  // Handle keyboard navigation

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement | HTMLElement>) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        data-mobile-menu-button
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 p-3 rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls="sidebar-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <div className="space-y-1.5" aria-hidden="true">
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      <aside
        id="sidebar-menu"
        className={`fixed top-0 left-0 mt-16 w-60 h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        role="navigation"
        aria-label="Main navigation"
        onKeyDown={handleKeyDown}
      >
       

        {/* Navigation menu */}
        <nav className="flex-1 px-4 py-6">
          <ul role="list" className="space-y-2">
            {menuItems.map((item, idx) => (
              <li key={idx} role="none">
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/30 focus:bg-blue-500/30 focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset transition-all duration-200 group"
                  onClick={() => isMobile && setIsOpen(false)}
                  role="menuitem"
                  tabIndex={0}
                >
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <Image 
                      src={item.icon} 
                      alt="" 
                      width={20} 
                      height={20}
                      className="group-hover:scale-110 transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-blue-500/30">
          <p className="text-xs text-blue-200 text-center">
            Assignment 3
          </p>
        </div>
      </aside>

      {/* Sidebar spacer for desktop layout */}
      <div className="hidden lg:block w-60 flex-shrink-0" aria-hidden="true" />
    </>
  );
};

export default SideBar;