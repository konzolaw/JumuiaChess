'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost, Video } from '@/types';
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, Loader2 } from 'lucide-react';

const DEFAULT_SOURCE_URLS: Record<string, string> = {
  'celebrating-minds-of-all-kinds-infinite-chess-kenya': 'https://infinitechess.fide.com/2026/04/22/celebrating-minds-of-all-kinds-infinite-chess-project-in-kenya/',
  'nathans-triumph-quiet-observer-to-chess-champion': 'https://www.instagram.com/p/DXbgsdCjdl7/',
  'kakuma-boards-distribution': 'https://infinitechess.fide.com/',
};

export default function BlogNews({ posts = [], videos = [] }: { posts?: BlogPost[], videos?: Video[] }) {


  const featuredVideo = videos.find(v => v.is_featured) || videos[0];
  const supportingVideos = videos.filter(v => v.id !== featuredVideo?.id).slice(0, 2);

  const getYouTubeId = (url: string) => {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    return match ? match[1] : '';
  };

  const getSourceUrl = (post: BlogPost): string => {
    if (post.source_url) return post.source_url;
    if (DEFAULT_SOURCE_URLS[post.slug]) return DEFAULT_SOURCE_URLS[post.slug];
    if (post.title.toLowerCase().includes('nathan')) return 'https://www.instagram.com/p/DXbgsdCjdl7/';
    return 'https://infinitechess.fide.com/2026/04/22/celebrating-minds-of-all-kinds-infinite-chess-project-in-kenya/';
  };

  return (
    <section id="news" className="py-10 md:py-14 px-6 bg-gradient-to-b from-[#F6F4EF] via-[#FAF7F2] to-white text-charcoal relative overflow-hidden scroll-mt-24 lg:scroll-mt-28">
      {/* Ambient Gradient Overlays */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F6F4EF] to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-[-120px] w-[500px] h-[500px] bg-[#C8B195]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-[-100px] w-[450px] h-[450px] bg-amber-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-sans text-xs font-semibold tracking-widest text-[#6B4A34] uppercase">
            STAY UPDATED
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2A2421] leading-tight">
            Blogs & News
          </h2>
          <p className="font-sans text-stone-600 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
            Discover impact stories from our autism mentorship programs, refugee distribution drives, and community competitions.
          </p>
        </div>

        {/* Split Layout: Left Videos Feed / Right Articles List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Stylistic Video Layout (Main Highlight + 2 Sub-grid Cards, NO Scrollbars) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="border-b border-stone-200/80 pb-2 flex items-center justify-between">
                <h3 className="font-sans text-xs font-bold tracking-widest text-[#6B4A34] uppercase">
                  Featured Videos & Live Stream
                </h3>
                <a 
                  href="/news#videos"
                  className="group inline-flex items-center text-[#6B4A34] font-sans text-xs font-bold hover:text-[#2A170F] transition-colors duration-300 hover:underline underline-offset-4"
                >
                  Explore Gallery
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Main Featured Highlight Video */}
              {featuredVideo && (
                <div className="space-y-2.5">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-stone-900 border border-stone-200/60">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(featuredVideo.youtube_url)}?autoplay=0&rel=0&modestbranding=1`}
                      title={featuredVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0 rounded-2xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-bold text-[#6B4A34] uppercase tracking-wider block">
                      FEATURED LIVE STREAM
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#2A2421] leading-snug">
                      {featuredVideo.title}
                    </h4>
                    <p className="font-sans text-xs text-stone-600 leading-relaxed">
                      {featuredVideo.description}
                    </p>
                  </div>
                </div>
              )}

              {/* 2 Supporting Videos (Side-by-Side Sub-Grid, NO Scrollbars) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {supportingVideos.map((video) => (
                  <div key={video.id} className="space-y-2">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md bg-stone-900 border border-stone-200/60">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(video.youtube_url)}?autoplay=0&rel=0&modestbranding=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-0 rounded-xl"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="font-serif text-sm font-bold text-[#2A2421] leading-tight line-clamp-1">
                        {video.title}
                      </h5>
                      <p className="font-sans text-[11px] text-stone-500 line-clamp-2 leading-tight">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Articles Vertical List View */}
            <div className="lg:col-span-6 space-y-6">
              <div className="border-b border-stone-200/80 pb-2 flex items-center justify-between">
                <h3 className="font-sans text-xs font-bold tracking-widest text-[#6B4A34] uppercase">
                  Latest Articles & Reports
                </h3>
                <a 
                  href="/news#articles"
                  className="group inline-flex items-center text-[#6B4A34] font-sans text-xs font-bold hover:text-[#2A170F] transition-colors duration-300 hover:underline underline-offset-4"
                >
                  Read All Articles
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {posts.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center text-sm text-stone-500 shadow-md">
                  No published articles are available yet. Check back soon for new field reports.
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    {posts.slice(0, 3).map((post) => (
                      <Link
                        key={post.id}
                        href={`/news/${post.slug}`}
                        className="group bg-white rounded-2xl p-4 sm:p-5 shadow-md shadow-stone-900/5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-4 items-start border border-stone-100"
                      >
                        {/* Image Thumbnail */}
                        <div className="relative w-full sm:w-36 h-36 sm:h-28 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                          <Image
                            src={post.featured_image_url || '/images/kids.jpg'}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 160px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Content Details */}
                        <div className="flex-1 space-y-2 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-[11px] text-stone-400 font-sans tracking-wide">
                              <Calendar className="w-3.5 h-3.5 text-[#6B4A34]" />
                              <span>
                                {post.published_at
                                  ? new Date(post.published_at).toLocaleDateString(undefined, {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })
                                  : 'Recent'}
                              </span>
                            </div>

                            <h4 className="font-serif text-base sm:text-lg font-bold text-[#2A2421] leading-snug group-hover:text-[#6B4A34] transition-colors duration-300 line-clamp-2">
                              {post.title}
                            </h4>

                            <p className="font-sans text-xs text-stone-600 line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="inline-flex items-center gap-1 text-xs font-bold text-[#6B4A34] group-hover:text-[#4A3222] transition-colors pt-1">
                            <span>Read Article</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

    </section>
  );
}
