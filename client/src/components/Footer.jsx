import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-100/80 font-sans dark:bg-gray-900">
    <div className="container px-6 py-12 mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
       
        <div>
          <p className="font-bold text-2xl text-gray-800 dark:text-white">Services</p>

          <div className="flex flex-col items-start mt-5 space-y-2">
            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Lead Generation</p>
            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Advertising</p>
            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Data Licensing</p>
          </div>
          </div>

        <div>
          <p className="font-bold text-2xl text-gray-800 dark:text-white">More Services</p>

          <div className="flex flex-col items-start mt-5 space-y-2">
            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Real-Estate Advisory</p>
            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Partnerships and Affiliates</p>
            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Property Valuation Services</p>
          </div>
          
        </div>
        <div>
          <p className="font-bold text-2xl text-gray-800 dark:text-white">Products</p>

          <div className="flex flex-col items-start mt-5 space-y-2">
            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Rental Mangement System</p>
            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">ERP & CRM </p>
            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Builders IT Solution</p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-2xl text-gray-800 dark:text-white">Comming Soon</p>

          <div className="flex flex-col items-start mt-5 space-y-2">
            <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Marketplace for Real Estate Products</p>
            <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Virtual Tours and 3D Walkthroughs</p>
            <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Data Analytics and Market Insights</p>
            <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Real Estate Certification Programs</p>
          </div>
        </div>
      </div>
      
      <hr className="my-6 border-gray-500 md:my-8 dark:border-gray-700 h-2" />
      
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4 hover:cursor-pointer">
          <a href="URL_TO_GOOGLE_PLAY" target="_blank" rel="noopener noreferrer">
            <img src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg" width="130" height="110" alt="Google Play" />
          </a>
          <a href="URL_TO_APP_STORE" target="_blank" rel="noopener noreferrer">
            <img src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg" width="130" height="110" alt="App Store" />
          </a>
        </div>
        
        <div className="flex gap-4 hover:cursor-pointer">
          <a href="URL_TO_FACEBOOK" target="_blank" rel="noopener noreferrer" onClick={() => openInNewWindow('URL_TO_FACEBOOK')}>
            <img src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg" width="30" height="30" alt="Facebook" />
          </a>
          <a href="URL_TO_TWITTER" target="_blank" rel="noopener noreferrer" onClick={() => openInNewWindow('URL_TO_TWITTER')}>
            <img src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg" width="30" height="30" alt="Twitter" />
          </a>
          <a href="URL_TO_TWITTER" target="_blank" rel="noopener noreferrer" onClick={() => openInNewWindow('URL_TO_TWITTER')}>
            <img src= "https://www.svgrepo.com/show/22048/dribbble.svg" width="30" height="30" alt="dribble" />
          </a>
          <a href="URL_TO_TWITTER" target="_blank" rel="noopener noreferrer" onClick={() => openInNewWindow('URL_TO_TWITTER')}>
            <img src= "https://www.svgrepo.com/show/28145/linkedin.svg" width="30" height="30" alt="linkedin" />
          </a>
          <a href="URL_TO_TWITTER" target="_blank" rel="noopener noreferrer" onClick={() => openInNewWindow('URL_TO_TWITTER')}>
            <img src= "https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" width="30" height="30" alt="instagram" />
          </a>
          
         
          {/* Add more social media icons here */}
        </div>
      </div>
      <p className="font-sans p-8 text-start md:text-center md:text-lg md:p-4">© 2023 EASE.RENTALS All rights reserved.</p>
    </div>
  </footer>
  );
}


