import React, { useState } from 'react';
import { templates } from '../utils/templates';

function PromptComposer({ onGenerate, isLoading }) {
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  const handleTemplateSelect = (template) => {
    setPrompt(template.prompt);
    setSelectedTemplate(template.id);
    setShowTemplates(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(prompt);
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Create Your AI Prompt Link
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Template Selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Quick Templates
            </label>
            <button
              type="button"
              onClick={() => setShowTemplates(!showTemplates)}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {showTemplates ? 'Hide' : 'Show'} Templates
            </button>
          </div>
          
          {showTemplates && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 animate-slide-up">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleTemplateSelect(template)}
                  className={`p-3 text-left rounded-lg border-2 transition-all ${
                    selectedTemplate === template.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300 bg-white'
                  }`}
                >
                  <div className="font-medium text-sm text-gray-900">
                    {template.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {template.category}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Prompt Textarea */}
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Your Prompt
          </label>
          <textarea
            id="prompt"
            rows={8}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your AI prompt here... (e.g., 'Explain quantum computing in simple terms')"
            className="input-field resize-none"
            required
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {prompt.length} / 5000 characters
            </span>
            {prompt.length > 5000 && (
              <span className="text-xs text-red-500 font-medium">
                Prompt is too long
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !prompt.trim() || prompt.length > 5000}
          className="btn-primary w-full"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Link...
            </span>
          ) : (
            '🚀 Generate Shareable Link'
          )}
        </button>
      </form>
    </div>
  );
}

export default PromptComposer;

