import React, { useState } from 'react';
import axios from 'axios';
import { 
  Download, Copy, Image as ImageIcon, 
  History, Check, Sparkles, Layers, Zap, Shield, ChevronRight
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

const SUGGESTIONS = [
  "A futuristic city at sunset, cyberpunk style",
  "A cute magical cat reading a spellbook",
  "An astronaut relaxing on a tropical beach in space"
];

const STYLES = [
  { id: 'none', label: 'None (Default)' },
  { id: 'photorealistic', label: 'Photorealistic' },
  { id: 'anime', label: 'Anime / Manga' },
  { id: '3d-render', label: '3D Render' },
  { id: 'cyberpunk', label: 'Cyberpunk' }
];

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6 text-blue-400" />,
    title: "Lightning Fast",
    description: "Experience near-instantaneous image generation powered by our optimized AI routing network."
  },
  {
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    title: "Infinite Styles",
    description: "From hyper-realistic portraits to stylized anime artwork, explore limitless creative boundaries."
  },
  {
    icon: <Shield className="w-6 h-6 text-indigo-400" />,
    title: "Enterprise Grade",
    description: "Built with secure, scalable architecture ensuring your prompts and generated assets remain private."
  }
];

function App() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('none');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  const generateImage = async (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) {
      setError("Please enter a creative prompt first.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/api/generate-image`, { prompt, style });
      const imageUrl = response.data.imageUrl;
      setCurrentImage(imageUrl);
      setHistory(prev => [{ prompt, style, url: imageUrl }, ...prev].slice(0, 4));
      
      // Scroll to result slightly on mobile
      if (window.innerWidth < 768) {
        setTimeout(() => window.scrollBy({ top: 300, behavior: 'smooth' }), 100);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "An error occurred while generating your masterpiece.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = () => {
    if (!currentImage) return;
    const a = document.createElement('a');
    a.href = currentImage;
    a.download = `art-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen relative selection:bg-purple-500/30">
      
      {/* Abstract Background Blobs */}
      <div className="blob-bg w-[500px] h-[500px] bg-indigo-600/20 top-[-100px] left-[-100px]"></div>
      <div className="blob-bg w-[600px] h-[600px] bg-purple-600/20 top-[20%] right-[-200px]"></div>
      <div className="blob-bg w-[400px] h-[400px] bg-blue-600/20 bottom-[-50px] left-[20%]"></div>

      {/* Navbar */}
      <nav className="glass-nav fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white ml-1">Gen<span className="text-purple-400">AI</span> Studio</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#generator" className="hover:text-white transition-colors">Generator</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div>
            <button className="hidden md:inline-flex bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all border border-white/5 backdrop-blur-md">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            V2 Model Now Live
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            GenAI Text to Image <span className="text-gradient">Converter</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Turn your text into breathtaking, high-quality images in seconds. The ultimate AI creative suite for professionals and dreamers alike.
          </p>
        </div>

        {/* Generator Interface */}
        <div id="generator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
          
          {/* Controls */}
          <div className="lg:col-span-5 space-y-6">
            <form onSubmit={generateImage} className="glass-card rounded-[2rem] p-6 md:p-8 space-y-8">
              
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-semibold text-gray-300 tracking-wide">PROMPT</label>
                  <button 
                    type="button" 
                    onClick={copyPrompt}
                    className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md"
                  >
                    {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="relative group">
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the masterpiece you want to create..."
                    className="w-full bg-[#0a0f1c]/50 border border-white/10 rounded-2xl p-5 text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none h-32 placeholder:text-gray-600 text-gray-100 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Suggestions</label>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPrompt(s)}
                      className="text-xs font-medium bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-200 border border-white/5 px-4 py-2 rounded-xl transition-all duration-300"
                    >
                      {s.length > 35 ? s.substring(0, 35) + '...' : s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-300 tracking-wide px-1">ART STYLE</label>
                <select 
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-[#0a0f1c]/50 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none cursor-pointer text-gray-200"
                >
                  {STYLES.map(s => (
                    <option key={s.id} value={s.id} className="bg-[#0f172a]">{s.label}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm flex items-start gap-3 backdrop-blur-md">
                  <span className="mt-0.5 text-xl">⚠️</span>
                  <p>{error}</p>
                </div>
              )}

              <button 
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className={`w-full py-4 px-6 flex items-center justify-center gap-3 text-lg ${!prompt.trim() || isGenerating ? 'opacity-50 cursor-not-allowed bg-white/5 border border-white/10 rounded-xl text-gray-400' : 'btn-primary'}`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Generate Artwork <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Preview & Output */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass-card rounded-[2rem] p-3 flex-1 flex flex-col relative overflow-hidden min-h-[450px]">
              
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#030014]/80 backdrop-blur-sm z-10 space-y-6">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-[3px] border-indigo-500/20 border-t-indigo-400 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-[3px] border-purple-500/20 border-t-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
                    <Sparkles className="w-8 h-8 text-blue-300 animate-pulse" />
                  </div>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium tracking-wide">
                    Rendering neural masterpiece...
                  </p>
                </div>
              ) : null}

              {currentImage ? (
                <div className="relative flex-1 group rounded-[1.5rem] overflow-hidden bg-black/40 border border-white/5">
                  <img 
                    src={currentImage} 
                    alt="Generated output" 
                    className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-8">
                    <div className="max-w-[70%]">
                      <p className="text-base font-medium text-white line-clamp-2 drop-shadow-lg">{prompt}</p>
                    </div>
                    <button 
                      onClick={downloadImage}
                      className="bg-white hover:bg-gray-200 text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-110 flex items-center justify-center"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-[#0a0f1c]/30 rounded-[1.5rem] border-2 border-dashed border-white/10 m-1">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner relative animate-float">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-md"></div>
                    <ImageIcon className="w-10 h-10 text-gray-400 relative z-10" />
                  </div>
                  <p className="text-xl font-medium text-gray-300">Canvas awaits</p>
                  <p className="text-sm mt-2 max-w-sm text-center text-gray-500 font-light">
                    Describe your vision and our AI will paint it into reality.
                  </p>
                </div>
              )}
            </div>

            {/* History Ribbon */}
            {history.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar px-2">
                {history.map((item, index) => (
                  <div 
                    key={index} 
                    className="relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer group hover:border-purple-500/50 transition-colors"
                    onClick={() => {
                      setCurrentImage(item.url);
                      setPrompt(item.prompt);
                      setStyle(item.style);
                    }}
                  >
                    <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="history" />
                    <div className="absolute inset-0 bg-[#030014]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <History className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Engineered for <span className="text-gradient">Creativity</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Industry-leading features packed into a seamless user experience.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feat, idx) => (
              <div key={idx} className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#010008] pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="font-bold text-xl">GenAI Studio</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 GenAI Studio. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">
              Twitter
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">
              GitHub
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
