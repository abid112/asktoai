import React, { useState } from 'react';
import { copyToClipboard, getTwitterShareUrl, getWhatsAppShareUrl } from '../utils/share';
import { platforms } from '../utils/platforms';

function ShareModal({ prompt, onGenerate, onClose }) {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateLink = async () => {
    if (!selectedPlatform) return;

    setIsGenerating(true);

    // Get the platform configuration
    const platform = platforms.find(p => p.id === selectedPlatform);
    if (!platform) return;

    // Generate the direct platform URL with the prompt
    const directUrl = platform.getUrl(prompt);
    setGeneratedUrl(directUrl);

    setIsGenerating(false);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
    setGeneratedUrl(null); // Reset generated URL when platform changes
    setCopied(false);
  };

  const handleBack = () => {
    setGeneratedUrl(null);
    setCopied(false);
    // Keep selectedPlatform so user can see their previous selection
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {generatedUrl ? '🎉 Link Created!' : '🤖 Select AI Platform'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!generatedUrl ? (
          // Platform Selection View
          <div className="space-y-6">
            <p className="text-gray-600 text-sm">
              Choose which AI platform you want to share this prompt with:
            </p>

            {/* Platform Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                AI Platform
              </label>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <label
                    key={platform.id}
                    className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPlatform === platform.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="platform"
                      value={platform.id}
                      checked={selectedPlatform === platform.id}
                      onChange={handlePlatformChange}
                      className="sr-only"
                    />
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="w-12 h-12 object-contain mb-2"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'inline';
                      }}
                    />
                    <span className="text-3xl mb-2" style={{ display: 'none' }}>{platform.icon}</span>
                    <span className="font-medium text-gray-900 text-sm text-center">{platform.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateLink}
              disabled={!selectedPlatform || isGenerating}
              className="btn-primary w-full"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                '🚀 Generate Link'
              )}
            </button>
          </div>
        ) : (
          // Link Generated View
          <div className="space-y-6">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Choose Different Platform
            </button>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-800 font-medium text-sm">
                  Direct link to {platforms.find(p => p.id === selectedPlatform)?.name} created!
                </p>
              </div>
            </div>

            {/* URL Display */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Direct Link
              </label>
              <div className="flex items-center gap-2">
                {/* Input field with copy button inside */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={generatedUrl}
                    readOnly
                    className="input-field w-full text-sm pr-12"
                  />
                  <button
                    onClick={handleCopy}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                  >
                    {copied ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Open button outside */}
                <button
                  onClick={() => window.open(generatedUrl, '_blank', 'noopener,noreferrer')}
                  className="p-3 rounded-lg transition-all bg-primary-600 text-white hover:bg-primary-700 flex-shrink-0"
                  title="Open in new tab"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                This link will open {platforms.find(p => p.id === selectedPlatform)?.name} with your prompt pre-filled
              </p>
            </div>

            {/* Share Buttons */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 mb-3">Share via:</p>

              <a
                href={getTwitterShareUrl(generatedUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Share on X (Twitter)
              </a>

              <a
                href={getWhatsAppShareUrl(generatedUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Share on WhatsApp
              </a>
            </div>

            <button
              onClick={onClose}
              className="btn-secondary w-full"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShareModal;

