import React, { useState } from 'react';
import PromptComposer from '../components/PromptComposer';
import ShareModal from '../components/ShareModal';
import RateLimitWarning from '../components/RateLimitWarning';
import Logo from '../components/Logo';
import { checkRateLimit, recordRequest } from '../utils/rateLimit';
import config from '../config';

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [error, setError] = useState(null);
  const [rateLimitInfo, setRateLimitInfo] = useState(null);

  const handleGenerate = async (prompt) => {
    setError(null);

    // Check rate limit
    const rateLimit = checkRateLimit(
      config.rateLimit.maxRequests,
      config.rateLimit.windowMs
    );

    if (!rateLimit.allowed) {
      setRateLimitInfo(rateLimit);
      return;
    }

    // Record the request
    recordRequest();

    // Open the ShareModal with the prompt
    setCurrentPrompt(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <Logo size="lg" inline={true} />
          <h1 className="text-5xl font-bold text-gray-900 ml-4">
            Ask to AI
          </h1>
        </div>
        <p className="text-xl text-gray-600 mb-2">
          Create shareable links that prefill prompts for multiple AI platforms
        </p>
        <p className="text-lg text-gray-500">
          ChatGPT • Claude • Gemini • Grok • Perplexity
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-up">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Prompt Composer */}
      <PromptComposer onGenerate={handleGenerate} isLoading={isLoading} />

      {/* Modals */}
      {currentPrompt && (
        <ShareModal
          prompt={currentPrompt}
          onClose={() => setCurrentPrompt(null)}
        />
      )}

      {rateLimitInfo && (
        <RateLimitWarning
          resetIn={rateLimitInfo.resetIn}
          onClose={() => setRateLimitInfo(null)}
        />
      )}
    </div>
  );
}

export default HomePage;

