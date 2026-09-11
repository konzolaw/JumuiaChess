'use client';

import { useState, useEffect } from 'react';
import { apiRequest, uploadFile } from '@/lib/api';
import { BlogPost } from '@/types';
import { Loader2, Plus, BookOpen, Trash2, Edit2, Sparkles, CheckCircle2 } from 'lucide-react';
import { ImageUploadInput } from '@/components/admin/ImageUploadInput';
import { Modal } from '@/components/admin/Modal';

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState<File | string | null>(null);
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [published, setPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    const res = await apiRequest<BlogPost[]>('/blog');
    if (res.success && Array.isArray(res.data)) {
      setPosts(res.data);
    } else {
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    );
  };

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setFeaturedImageUrl(null);
    setExcerpt('');
    setBody('');
    setPublished(true);
    setMessage(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (post: BlogPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setFeaturedImageUrl(post.featured_image_url || null);
    setExcerpt(post.excerpt);
    setBody(post.body);
    setPublished(post.published);
    setMessage(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    let finalImageUrl = typeof featuredImageUrl === 'string' ? featuredImageUrl : '';
    if (featuredImageUrl instanceof File) {
      const uploadRes = await uploadFile(featuredImageUrl);
      if (!uploadRes.success || !uploadRes.url) {
        setMessage({ type: 'error', text: uploadRes.error || 'Failed to upload image' });
        setIsSubmitting(false);
        return;
      }
      finalImageUrl = uploadRes.url;
    }

    const finalSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const bodyData = {
      title,
      slug: finalSlug,
      featured_image_url: finalImageUrl || undefined,
      excerpt,
      body,
      published,
    };

    let res;
    if (editingId) {
      res = await apiRequest(`/blog/${editingId}`, {
        method: 'PUT',
        body: JSON.stringify(bodyData),
      });
    } else {
      res = await apiRequest('/blog', {
        method: 'POST',
        body: JSON.stringify(bodyData),
      });
    }

    setIsSubmitting(false);

    if (res.success) {
      setIsModalOpen(false);
      loadPosts();
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to publish blog post.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    const res = await apiRequest(`/blog/${id}`, {
      method: 'DELETE',
    });

    if (res.success) {
      loadPosts();
    } else {
      alert(res.error || 'Failed to delete blog post');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Brown Banner Card */}
      <div className="bg-[#6B4A34] text-white p-6 md:p-8 rounded-2xl shadow-md border border-[#573b29] relative overflow-hidden space-y-2">
        <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white">
          Blog & Articles
        </h1>
        <p className="text-xs md:text-sm text-[#FAF7F2]/90 leading-relaxed font-sans max-w-3xl">
          Publish press releases, news reports, and community impact stories with device image uploads.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
            Articles & News Reports ({posts.length})
          </span>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 bg-[#6B4A34] hover:bg-[#573b29] text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs hover:shadow-md active:scale-95 transition-all duration-200"
          >
            <Plus className="w-4 h-4" /> Compose New Article
          </button>
        </div>

        {/* Blog Table Card */}
        <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm overflow-x-auto w-full">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-[#6B4A34]" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 text-stone-400 text-xs font-sans bg-[#FAF7F2] border border-stone-200 rounded-xl flex flex-col items-center justify-center space-y-3">
              <BookOpen className="w-8 h-8 text-stone-300" />
              <p>No blog posts found in database.</p>
              <button
                onClick={handleOpenCreateModal}
                className="mt-2 px-4 py-2 bg-[#6B4A34] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Create First Article
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {posts.map((post) => (
                  <tr key={post.id} className="text-charcoal hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-3.5 font-bold max-w-[220px] truncate">{post.title}</td>
                    <td className="py-3.5">
                      {post.published ? (
                        <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Published
                        </span>
                      ) : (
                        <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-stone-500">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3.5 text-right space-x-1">
                      <button
                        onClick={() => handleEditClick(post)}
                        className="p-1.5 text-stone-600 hover:text-[#6B4A34] hover:bg-stone-100 rounded-lg transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingId ? 'Edit Article' : 'Compose New Article'}
      >
        {message && (
          <div className={`p-3.5 rounded-xl text-xs font-medium ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Article Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Tournament Success in Kibera"
              className="w-full bg-white border border-stone-300 p-2.5 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-[#6B4A34]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Slug URL</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="tournament-success-in-kibera"
              className="w-full bg-white border border-stone-300 p-2.5 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-[#6B4A34]"
            />
          </div>

          <ImageUploadInput
            label="Featured Image (Upload from Device)"
            value={featuredImageUrl}
            onChange={(url) => setFeaturedImageUrl(url)}
          />

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Excerpt *</label>
            <textarea
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of the article..."
              className="w-full bg-white border border-stone-300 p-2.5 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-[#6B4A34] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Body Content * <span className="font-normal text-stone-500 ml-1">(Supports Markdown)</span></label>
            <textarea
              required
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Full article content..."
              className="w-full bg-white border border-stone-300 p-2.5 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-[#6B4A34]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded border-stone-300 text-[#6B4A34] focus:ring-[#6B4A34]"
            />
            <label htmlFor="published" className="text-xs font-semibold text-stone-700 cursor-pointer">
              Publish Immediately (Visible to Public)
            </label>
          </div>

          <div className="flex space-x-2 pt-2 border-t border-stone-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-1/2 py-2.5 mt-2 border border-stone-300 font-semibold text-xs rounded-xl hover:bg-stone-100 text-stone-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-1/2 mt-2 py-2.5 bg-[#6B4A34] hover:bg-[#573b29] text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2`}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>{editingId ? 'Update Post' : 'Publish Post'}</span>}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
