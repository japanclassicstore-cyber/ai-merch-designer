import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, Wand2, Image, Loader2, Shirt, Coffee, ShoppingBag, Sticker } from 'lucide-react';
import { generateDesign } from '../api/grok';

const templates = [
  {
    id: 1,
    name: 'Cyberpunk City',
    prompt: 'Cyberpunk neon cityscape with flying cars, rain-soaked streets, holographic advertisements, synthwave aesthetic, highly detailed digital art',
    thumbnail: '🌃'
  },
  {
    id: 2,
    name: 'Abstract Geometric',
    prompt: 'Abstract geometric patterns with bold colors, shapes and lines, modern minimalist design, suitable for print, vector style',
    thumbnail: '🔷'
  },
  {
    id: 3,
    name: 'Nature Fantasy',
    prompt: 'Enchanted forest with magical creatures, glowing mushrooms, fairy lights, mystical atmosphere, fantasy digital painting',
    thumbnail: '🧚'
  },
  {
    id: 4,
    name: 'Retro Wave',
    prompt: '80s retro wave aesthetic with palm trees, sunset grid, neon colors, vintage synth style, nostalgic vibes',
    thumbnail: '🌅'
  },
  {
    id: 5,
    name: 'Space Exploration',
    prompt: 'Astronaut floating in space, galaxies and nebulae in background, cosmic colors, sci-fi digital art, detailed rendering',
    thumbnail: '🚀'
  },
  {
    id: 6,
    name: 'Japanese Art',
    prompt: 'Traditional Japanese art style with cherry blossoms, Mount Fuji, koi fish, ukiyo-e inspired, serene and elegant',
    thumbnail: '🗾'
  }
];

const products = [
  { id: 'tshirt', name: 'T-Shirt', icon: <Shirt />, price: 24.99 },
  { id: 'hoodie', name: 'Hoodie', icon: <Shirt />, price: 44.99 },
  { id: 'mug', name: 'Mug', icon: <Coffee />, price: 14.99 },
  { id: 'tote', name: 'Tote Bag', icon: <ShoppingBag />, price: 19.99 },
  { id: 'sticker', name: 'Sticker Pack', icon: <Sticker />, price: 9.99 },
  { id: 'poster', name: 'Poster', icon: <Image />, price: 29.99 },
];

function DesignStudio({ design, setDesign, product, setProduct }) {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setPrompt(template.prompt);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt or select a template');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateDesign(prompt);
      if (result.success) {
        setGeneratedImage(result.imageUrl);
        setDesign({
          type: 'ai-generated',
          imageUrl: result.imageUrl,
          prompt: prompt
        });
      } else {
        setError(result.error || 'Failed to generate design');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseUploaded = () => {
    setDesign({
      type: 'uploaded',
      imageUrl: uploadedImage,
      prompt: null
    });
  };

  const handleContinue = () => {
    if (design) {
      navigate('/preview');
    }
  };

  return (
    <div className="container">
      <h2 style={{ color: 'white', marginBottom: '2rem', textAlign: 'center' }}>
        Design Studio
      </h2>

      <div className="grid grid-2">
        {/* Left Column - Upload & Generate */}
        <div className="card">
          <h3>1. Upload Your Image or Generate with AI</h3>
          
          {/* Upload Zone */}
          <div 
            {...getRootProps()} 
            className={`dropzone ${isDragActive ? 'active' : ''}`}
            style={{ marginTop: '1rem' }}
          >
            <input {...getInputProps()} />
            <Upload size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
            {isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <>
                <p>Drag & drop an image here, or click to select</p>
                <p style={{ fontSize: '0.9rem', color: '#999' }}>Supports: JPG, PNG, WebP (max 5MB)</p>
              </>
            )}
          </div>

          {uploadedImage && (
            <div style={{ marginTop: '1.5rem' }}>
              <h4>Uploaded Preview:</h4>
              <img 
                src={uploadedImage} 
                alt="Uploaded" 
                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px', marginTop: '0.5rem' }}
              />
              <button 
                className="btn btn-primary"
                style={{ marginTop: '1rem', width: '100%' }}
                onClick={handleUseUploaded}
              >
                Use This Image
              </button>
            </div>
          )}

          <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
            <span style={{ color: '#999' }}>— OR —</span>
          </div>

          {/* AI Generation */}
          <div>
            <h4><Wand2 size={20} /> Generate with AI</h4>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your design (e.g., 'A majestic lion with golden mane, watercolor style')..."
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid #e0e0e0',
                marginTop: '0.5rem',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />

            <button
              className="btn btn-primary"
              style={{ marginTop: '1rem', width: '100%' }}
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="spin" size={20} />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  Generate Design
                </>
              )}
            </button>

            {error && (
              <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
            )}

            {generatedImage && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4>Generated Design:</h4>
                <img 
                  src={generatedImage} 
                  alt="Generated" 
                  style={{ maxWidth: '100%', borderRadius: '10px', marginTop: '0.5rem' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Templates & Products */}
        <div>
          {/* Templates */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3>2. Choose a Template</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{template.thumbnail}</div>
                  <h4 style={{ fontSize: '0.9rem' }}>{template.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="card">
            <h3>3. Select Product</h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className={`template-card ${product.type === prod.id ? 'selected' : ''}`}
                  onClick={() => setProduct({ ...product, type: prod.id })}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ color: '#667eea', marginBottom: '0.5rem' }}>{prod.icon}</div>
                  <h4 style={{ fontSize: '0.85rem' }}>{prod.name}</h4>
                  <p style={{ color: '#667eea', fontWeight: 'bold', fontSize: '0.9rem' }}>${prod.price}</p>
                </div>
              ))}
            </div>

            {/* Product Options */}
            {product.type === 'tshirt' || product.type === 'hoodie' ? (
              <div style={{ marginTop: '1.5rem' }}>
                <h4>Size:</h4>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      className={`btn ${product.size === size ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setProduct({ ...product, size })}
                      style={{ padding: '8px 16px' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <h4 style={{ marginTop: '1rem' }}>Color:</h4>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {['white', 'black', 'navy', 'red', 'green'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setProduct({ ...product, color })}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: product.color === color ? '3px solid #667eea' : '2px solid #ddd',
                        background: color,
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      {design && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="btn btn-primary"
            style={{ fontSize: '1.2rem', padding: '16px 48px' }}
            onClick={handleContinue}
          >
            Preview Product →
          </button>
        </div>
      )}
    </div>
  );
}

export default DesignStudio;
