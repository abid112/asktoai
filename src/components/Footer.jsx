import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Copyright Text */}
          <div className="text-center">
            <p className="text-sm text-black">
              ✨ Made by{' '}
              <a
                href="https://abidhasan.me"
                target="_blank"
                rel="noopener noreferrer"
                className="personal-link font-bold text-black hover:text-gray-700 transition-colors duration-300"
              >
                Abid Hasan
              </a>
              {' '}– Legally worthless, emotionally priceless.
            </p>
          </div>

          {/* Buy Me a Coffee Button */}
          <div>
            <a
              href="https://buymeacoffee.com/abid_hasan112"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bmc-button"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                className="h-10 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

