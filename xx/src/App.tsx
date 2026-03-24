/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Loader2, 
  ExternalLink, 
  Github, 
  Mail, 
  Beaker, 
  BookOpen, 
  ChevronRight, 
  Search, 
  Filter,
  Share2,
  Download,
  Clock,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MARKDOWN_URL = 'https://brucekhlee.github.io/index.md';

const NOTEBOOKS = [
  {
    id: 'docking-01',
    title: 'Molecular Docking Analysis',
    description: 'A comprehensive notebook detailing protein-ligand interaction simulations and scoring functions.',
    tags: ['Bioinformatics', 'Docking', 'Python'],
    date: 'Mar 2026',
    url: 'https://brucekhlee.github.io/demo_docking/docking.html',
    type: 'Interactive Notebook'
  },
  {
    id: 'genomics-02',
    title: 'Genomic Sequence Alignment',
    description: 'Exploration of high-throughput sequencing data processing and alignment algorithms.',
    tags: ['Genomics', 'Algorithms', 'R'],
    date: 'Feb 2026',
    url: '#',
    type: 'Research Note'
  },
  {
    id: 'proteomics-03',
    title: 'Protein Folding Dynamics',
    description: 'Visualizing molecular dynamics simulations of small proteins in aqueous solutions.',
    tags: ['Proteomics', 'Dynamics', 'VMD'],
    date: 'Jan 2026',
    url: '#',
    type: 'Simulation'
  }
];

export default function App() {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'notebooks' | 'about'>('notebooks');

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(MARKDOWN_URL);
        if (!response.ok) throw new Error('Failed to fetch content');
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-[#FFD700] selection:text-[#1A1A1A]">
      {/* Top Navigation Rail */}
      <div className="h-1 bg-[#1A1A1A] w-full sticky top-0 z-50" />
      
      <header className="border-b border-[#1A1A1A]/10 py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] font-mono uppercase tracking-widest">v1.0.4</span>
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Open-Share Research</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-none">
            Bruce KH Lee
          </h1>
          <p className="text-sm font-mono uppercase tracking-[0.2em] opacity-60">
            Biomedical Research Notebooks
          </p>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="flex gap-6">
            <a href="https://github.com/brucekhlee" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
              <Github size={20} />
            </a>
            <a href="mailto:bruce.oceans@gmail.com" className="hover:scale-110 transition-transform">
              <Mail size={20} />
            </a>
            <Share2 size={20} className="cursor-pointer hover:scale-110 transition-transform" />
          </div>
          <div className="flex border border-[#1A1A1A] p-1">
            <button 
              onClick={() => setActiveTab('notebooks')}
              className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors ${activeTab === 'notebooks' ? 'bg-[#1A1A1A] text-[#FDFCFB]' : 'hover:bg-[#1A1A1A]/5'}`}
            >
              Notebooks
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors ${activeTab === 'about' ? 'bg-[#1A1A1A] text-[#FDFCFB]' : 'hover:bg-[#1A1A1A]/5'}`}
            >
              About
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 md:px-12 py-12">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-4"
            >
              <Loader2 className="animate-spin text-[#1A1A1A]/20" size={40} strokeWidth={1} />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40">Loading Repository...</p>
            </motion.div>
          ) : activeTab === 'notebooks' ? (
            <motion.div
              key="notebooks"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              {/* Search & Filter Bar */}
              <div className="flex flex-col md:flex-row justify-between items-center border-b border-[#1A1A1A] pb-4 gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Search size={18} className="opacity-40" />
                  <input 
                    type="text" 
                    placeholder="SEARCH NOTEBOOKS..." 
                    className="bg-transparent border-none outline-none font-mono text-xs w-full uppercase tracking-widest placeholder:opacity-20"
                  />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                    <Filter size={14} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Filter</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Showing {NOTEBOOKS.length} Results</span>
                </div>
              </div>

              {/* Notebook Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A1A1A]/10 border border-[#1A1A1A]/10">
                {NOTEBOOKS.map((notebook, index) => (
                  <motion.div
                    key={notebook.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#FDFCFB] p-8 group hover:bg-[#1A1A1A] transition-colors duration-500 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-40 group-hover:text-[#FDFCFB] group-hover:opacity-60">
                        {notebook.type}
                      </span>
                      <div className="w-8 h-8 border border-[#1A1A1A] group-hover:border-[#FDFCFB] flex items-center justify-center transition-colors">
                        <BookOpen size={14} className="group-hover:text-[#FDFCFB]" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-serif italic mb-4 group-hover:text-[#FDFCFB] transition-colors leading-tight">
                      {notebook.title}
                    </h3>
                    
                    <p className="text-sm opacity-60 mb-8 group-hover:text-[#FDFCFB] group-hover:opacity-80 transition-colors flex-grow leading-relaxed">
                      {notebook.description}
                    </p>

                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {notebook.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 border border-[#1A1A1A]/20 text-[9px] font-mono uppercase tracking-wider group-hover:border-[#FDFCFB]/20 group-hover:text-[#FDFCFB] transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-6 border-t border-[#1A1A1A]/10 group-hover:border-[#FDFCFB]/10 transition-colors">
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-40 group-hover:text-[#FDFCFB]">{notebook.date}</span>
                        <a 
                          href={notebook.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest group-hover:text-[#FDFCFB] hover:underline"
                        >
                          Open <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="markdown-body prose prose-neutral max-w-none bg-white p-12 border border-[#1A1A1A]/10 shadow-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content || ''}
                </ReactMarkdown>
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 border border-[#1A1A1A]">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest mb-4">Contact Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Mail size={16} className="opacity-40" />
                      <span className="text-sm font-mono">bruce.oceans@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Github size={16} className="opacity-40" />
                      <span className="text-sm font-mono">github.com/brucekhlee</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-[#1A1A1A] text-[#FDFCFB]">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest mb-4">Open Research</h4>
                  <p className="text-xs font-mono opacity-60 leading-relaxed">
                    All notebooks shared here are part of an open-science initiative to make biomedical research more accessible and reproducible.
                  </p>
                  <button className="mt-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest border border-[#FDFCFB]/20 px-4 py-2 hover:bg-[#FDFCFB] hover:text-[#1A1A1A] transition-colors">
                    <Download size={12} /> Download All Assets
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Side Rail Info */}
      <div className="fixed bottom-12 left-6 md:left-12 hidden lg:flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-20 vertical-text rotate-180">Scroll to Explore</span>
          <div className="w-px h-12 bg-[#1A1A1A]/10 self-center" />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 border-t border-[#1A1A1A] py-16 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif italic tracking-tighter">Bruce KH Lee</h2>
            <p className="text-xs font-mono uppercase tracking-widest opacity-40">Biomedical Informatics & Open Research</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h5 className="text-[10px] font-mono uppercase tracking-widest opacity-40">Navigation</h5>
              <ul className="space-y-2 text-xs font-mono uppercase tracking-tight">
                <li className="hover:italic cursor-pointer">Notebooks</li>
                <li className="hover:italic cursor-pointer">Research</li>
                <li className="hover:italic cursor-pointer">Archive</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-mono uppercase tracking-widest opacity-40">Social</h5>
              <ul className="space-y-2 text-xs font-mono uppercase tracking-tight">
                <li className="hover:italic cursor-pointer">GitHub</li>
                <li className="hover:italic cursor-pointer">LinkedIn</li>
                <li className="hover:italic cursor-pointer">Twitter</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-mono uppercase tracking-widest opacity-40">Legal</h5>
              <ul className="space-y-2 text-xs font-mono uppercase tracking-tight">
                <li className="hover:italic cursor-pointer">License</li>
                <li className="hover:italic cursor-pointer">Privacy</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-[#1A1A1A]/10 flex justify-between items-center">
          <span className="text-[9px] font-mono uppercase tracking-widest opacity-20">© 2026 BRUCE KH LEE. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-4">
            <Clock size={12} className="opacity-20" />
            <span className="text-[9px] font-mono uppercase tracking-widest opacity-20">Last Updated: 24.03.2026</span>
          </div>
        </div>
      </footer>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
}
