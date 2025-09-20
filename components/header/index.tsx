
"use client";

import Image from 'next/image';
import React, { useState } from 'react';

const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Handle keyboard navigation for logout button
  const handleLogoutKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Add logout functionality here
      console.log('Logout triggered');
    }
  };

  const handleProfileToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header 
      className='w-full fixed top-0 z-50 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
      role="banner"
    >
      <nav 
        className='h-full flex justify-between items-center px-4 sm:px-6 lg:px-8'
        role="navigation"
        aria-label="Main header navigation"
      >
        {/* Logo section */}
        <div className='flex items-center space-x-3'>
          <div 
            className="flex-shrink-0 p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
            role="img"
            aria-label="Company logo"
          >
            <Image 
              src='/logo.png' 
              alt='Company logo' 
              width={40} 
              height={30}
              className="w-auto h-auto max-w-[40px] max-h-[30px]"
              priority
            />
          </div>
          
          {/* Company name - visible on larger screens */}
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-white">
              Dashboard
            </h1>
            <p className="text-xs text-blue-100">
              Analytics Platform
            </p>
          </div>
        </div>

        {/* User actions section */}
        <div className='flex items-center space-x-4'>
          {/* Notifications (placeholder for future) */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-blue-100">
              Welcome back!
            </span>
          </div>

          {/* Profile/Logout section */}
          <div className="relative">
            <button
              onClick={handleProfileToggle}
              onKeyDown={handleLogoutKeyDown}
              className="flex items-center cursor-pointer space-x-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors duration-200"
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="menu"
              aria-label="User profile menu"
            >
              <div className="flex-shrink-0">
                <Image 
                  src='/logout.png' 
                  alt='' 
                  width={20} 
                  height={20}
                  className="w-5 h-5"
                  aria-hidden="true"
                />
              </div>
              <span className="hidden sm:inline text-sm font-medium">
                Profile
              </span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isProfileMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50"
                role="menu"
                aria-labelledby="profile-menu-button"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm text-gray-600">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">user@example.com</p>
                </div>
                
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-200"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    // Add settings functionality here
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                  </div>
                </button>
                
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 focus:outline-none transition-colors duration-200"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    // Add logout functionality here
                    console.log('Logout triggered');
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign out</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Screen reader information */}
      <div className="sr-only" aria-live="polite">
        <p>Header navigation loaded. Use Tab to navigate through header elements.</p>
      </div>
    </header>
  );
};

export default Header;