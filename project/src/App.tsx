import React, { useState, useEffect } from 'react';
import { Timer3D } from './components/Timer3D';
import { Construction, Sun, Moon } from 'lucide-react';
import logoImage from './assets/NoBGWhite.png';

function App() {
  const [timeLeft, setTimeLeft] = useState('00:00:00:00');
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 days from now
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      const days = Math.floor(distance / (10000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (10000 * 60 * 60 * 24)) / (10000 * 60 * 60));
      const minutes = Math.floor((distance % (10000 * 60 * 60)) / (10000 * 60));
      const seconds = Math.floor((distance % (10000 * 60)) / 10000);
      
      setTimeLeft(`${days}:${hours}:${minutes}:${seconds}`);
      
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('00:00:00:00');
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Toggle between day and night modes
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Theme variables
  const bgGradient = isDarkMode 
    ? "bg-gradient-to-br from-green-900 to-black" 
    : "bg-gradient-to-br from-green-100 to-white";
  
  const textColor = isDarkMode ? "text-white" : "text-green-950";
  const subtitleColor = isDarkMode ? "text-green-100" : "text-green-700";
  const accentColor = isDarkMode ? "text-green-300" : "text-green-600";
  const borderColor = isDarkMode ? "border-green-500" : "border-green-600";
  const glowColor = isDarkMode ? "bg-green-500/10" : "bg-green-500/10";
  
  const inputBg = isDarkMode ? "bg-green-950" : "bg-white";
  const inputBorder = isDarkMode ? "border-green-700" : "border-green-300";
  const buttonBg = isDarkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600";

  return (
    <div className={`h-screen ${bgGradient} ${textColor} flex items-center justify-center transition-colors duration-300`}>
      <div className="container mx-auto px-4 flex flex-col h-full">
        {/* Theme toggle button */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-green-800' : 'bg-green-200'} transition-colors duration-300`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-yellow-300" />
            ) : (
              <Moon className="w-6 h-6 text-green-700" />
            )}
          </button>
        </div>
        
        <div className="text-center mt-2 flex-shrink-0">
          <h1 className="text-7xl font-bold mb-2 flex items-center justify-center gap-4">
            <Construction className={`w-10 h-10 ${accentColor}`} />
            Coming Soon
            <Construction className={`w-10 h-10 ${accentColor}`} />
          </h1>
          <p className={`text-2xl ${subtitleColor} mb-20 text-center`}>
            Something amazing is in the works. Stay tuned!
          </p>
          
          {/* Logo */}
          <div className="w-64 h-64 mx-auto mb-0 relative">
            <div className={`absolute inset-0 ${glowColor} rounded-full blur-xl`}></div>
            <div className={`relative w-full h-full rounded-full border-4 ${borderColor} flex items-center justify-center`}>
              <img 
                src={logoImage} 
                alt="Logo" 
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
        </div>
        
        <div className="h-[50vh] w-full flex items-center justify-center flex-grow">
          <Timer3D time={timeLeft} isDarkMode={isDarkMode} />
        </div>
        
        <div className="text-center mb-20 flex-shrink-0">
          <p className={`text-base ${subtitleColor}`}>
            We're crafting something spectacular for you.
            Subscribe to our newsletter to be the first to know when we launch!
          </p>
          
          <form className="mt-3 flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-2 rounded-lg ${inputBg} ${inputBorder} focus:outline-none focus:border-green-500 ${textColor} transition-colors duration-300`}
            />
            <button
              type="submit"
              className={`px-5 py-2 ${buttonBg} rounded-lg transition-colors duration-200 text-white`}
            >
              Notify Me
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;