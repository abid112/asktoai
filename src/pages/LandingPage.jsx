import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import PlatformButtons from '../components/PlatformButtons';
import { getShortLink, incrementClickCount } from '../services/api';
import { decodePrompt } from '../utils/encoding';
import { copyToClipboard } from '../utils/share';

function LandingPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadPrompt = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check if using query parameter (demo mode)
        const queryPrompt = searchParams.get('q');
        
        if (queryPrompt) {
          // Demo mode: decode from URL
          const decoded = decodePrompt(queryPrompt);
          if (decoded) {
            setPrompt(decoded);
          } else {
            setError('Invalid prompt encoding');
          }
        } else if (id) {
          // Production mode: fetch from API
          const result = await getShortLink(id);
          
          if (result.success) {
            setPrompt(result.prompt);
            // Increment click count
            await incrementClickCount(id);
          } else {
            setError(result.error || 'Link not found');
          }
        } else {
          setError('No prompt specified');
        }
      } catch (err) {
        console.error('Error loading prompt:', err);
        setError('Failed to load prompt');
      } finally {
        setLoading(false);
      }
    };

    loadPrompt();
  }, [id, searchParams]);

  const handleCopyPrompt = async () => {
    const success = await copyToClipboard(prompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">Loading prompt...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a href="/" className="btn-primary inline-block">
            Create a New Link
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Prompt Display */}
        <div className="card animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Your AI Prompt
            </h2>
            <button
              onClick={handleCopyPrompt}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {prompt}
            </p>
          </div>
        </div>

        {/* Platform Buttons */}
        <div className="card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <PlatformButtons prompt={prompt} />
        </div>

        {/* QR Code Section */}
        <div className="card animate-fade-in text-center" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Share via QR Code
          </h3>
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
              <QRCodeSVG value={window.location.href} size={200} level="H" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Scan this QR code to access this prompt on any device
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-gray-600 mb-4">
            Want to create your own AI prompt link?
          </p>
          <a href="/" className="btn-primary inline-block">
            Create Your Link
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

