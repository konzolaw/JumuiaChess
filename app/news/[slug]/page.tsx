import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabaseAdmin } from '@/lib/supabase/admin';

const DEFAULT_SOURCE_URLS: Record<string, string> = {
  'celebrating-minds-of-all-kinds-infinite-chess-kenya': 'https://infinitechess.fide.com/2026/04/22/celebrating-minds-of-all-kinds-infinite-chess-project-in-kenya/',
  'nathans-triumph-quiet-observer-to-chess-champion': 'https://www.instagram.com/p/DXbgsdCjdl7/',
  'kakuma-boards-distribution': 'https://infinitechess.fide.com/',
};

function getSourceUrl(post: any): string {
  if (post.source_url) return post.source_url;
  if (DEFAULT_SOURCE_URLS[post.slug]) return DEFAULT_SOURCE_URLS[post.slug];
  if (post.title.toLowerCase().includes('nathan')) return 'https://www.instagram.com/p/DXbgsdCjdl7/';
  return 'https://infinitechess.fide.com/2026/04/22/celebrating-minds-of-all-kinds-infinite-chess-project-in-kenya/';
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const { data: post, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F2] text-charcoal pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient Gradient Overlays */}
        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-[#C8B195]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[450px] h-[450px] bg-amber-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/news"
              className="inline-flex items-center gap-2 text-stone-500 hover:text-[#6B4A34] transition-colors text-sm font-bold tracking-wide"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to News Hub</span>
            </Link>
          </div>

          <article className="bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-lg border border-stone-200/60 relative z-10">
            <div className="p-6 sm:p-10 lg:p-12">
              
              {/* Magazine Editorial Title & Date Header */}
              <div className="space-y-4 border-b border-stone-200/80 pb-8 text-center mb-8">
                <span className="font-serif italic text-sm text-[#6B4A34] font-medium tracking-wide block">
                  Field Report • {post.published_at
                    ? new Date(post.published_at).toLocaleDateString(undefined, {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Recent'}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2421] leading-tight tracking-tight max-w-3xl mx-auto">
                  {post.title}
                </h1>
              </div>

              {/* Cover Photo */}
              {post.featured_image_url && (
                <div className="relative aspect-video sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-stone-200 shadow-md mb-8">
                  <Image
                    src={post.featured_image_url}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Editorial Lead Excerpt */}
              <blockquote className="font-serif italic text-lg sm:text-xl text-stone-800 border-l-4 border-[#6B4A34] pl-5 py-3 leading-relaxed bg-white/70 p-6 rounded-r-2xl shadow-sm mb-10">
                {post.excerpt}
              </blockquote>

              {/* Article Content with Markdown formatting */}
              <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#2A2421] prose-a:text-[#6B4A34] prose-img:rounded-xl">
                <ReactMarkdown>{post.body}</ReactMarkdown>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="p-6 sm:p-8 bg-white border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/news"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#2A2421] text-sm font-bold font-sans transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Read More Articles</span>
              </Link>

              <a
                href={getSourceUrl(post)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#6B4A34] hover:bg-[#523826] text-white text-sm font-bold font-sans transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Visit Original Source</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
