import React from 'react';
import { platforms } from '../utils/platforms';

function PlatformButtons({ prompt }) {
  const handlePlatformClick = (platform) => {
    const url = platform.getUrl(prompt);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
        Choose Your AI Platform
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handlePlatformClick(platform)}
            className={`ai-platform-btn ${platform.color}`}
          >
            <img
              src={platform.logo}
              alt={platform.name}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline';
              }}
            />
            <span className="text-2xl" style={{ display: 'none' }}>{platform.icon}</span>
            <span className="text-lg">{platform.name}</span>
            <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800 text-center">
          💡 <strong>Tip:</strong> Click any platform to open it with your prompt pre-filled!
        </p>
      </div>
    </div>
  );
}

export default PlatformButtons;

