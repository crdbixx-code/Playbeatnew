import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';
import { BookOpen, Calendar, User, ArrowRight, ChevronLeft, Tag } from 'lucide-react';

export const BlogView: React.FC = () => {
  const { setActiveView } = useApp();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setPosts(data.posts || []))
      .catch(() => {});
  }, []);

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to All Articles
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-950 text-cyan-400 border border-cyan-800">
              {selectedPost.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {new Date(selectedPost.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            {selectedPost.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>{selectedPost.author}</span>
            </div>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>

        <div className="aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
          <img src={selectedPost.coverImage} alt={selectedPost.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 space-y-4 leading-relaxed whitespace-pre-line">
          {selectedPost.content}
        </div>

        <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Looking for genuine keys & software?</h4>
            <p className="text-xs text-slate-400">Browse our verified catalog with instant delivery.</p>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-slate-800 text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold border border-cyan-800">
          PlayBeat Knowledge Base & Guides
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Digital Licensing & Tech Blog</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Tutorials, security guides, activation tips, and software updates from our technical team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="aspect-video bg-slate-950 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-semibold uppercase text-cyan-400">{post.category}</span>
                  <span className="font-mono">{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:text-cyan-300">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
