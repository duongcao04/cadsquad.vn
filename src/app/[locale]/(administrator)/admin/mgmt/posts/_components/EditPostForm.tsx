'use client'

import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'

interface Post {
  id: string
  title: string
  slug: string
  shortDescription: string | null
  keywords: string[]
  thumbnailUrl: string
  bgCoverUrl: string | null
  content: string
  tags: string[]
}

interface EditPostFormProps {
  post: Post
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: post.title,
    slug: post.slug,
    shortDescription: post.shortDescription || '',
    keywords: post.keywords,
    thumbnailUrl: post.thumbnailUrl,
    bgCoverUrl: post.bgCoverUrl || '',
    content: post.content,
    tags: post.tags,
  })
  const [keywordInput, setKeywordInput] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error: postError } = await supabase
        .from('posts')
        .update({
          thumbnail_url: formData.thumbnailUrl,
          bg_cover_url: formData.bgCoverUrl || null,
        })
        .eq('id', post.id)

      if (postError) throw postError

      const { error: translationError } = await supabase
        .from('post_translations')
        .update({
          title: formData.title,
          slug: formData.slug,
          short_description: formData.shortDescription || null,
          content: formData.content,
          tags: formData.tags,
          seo_keywords: formData.keywords,
        })
        .eq('post_id', post.id)
        .eq('language', 'EN')

      if (translationError) throw translationError

      navigate({ to: '/admin' })
    } catch (error) {
      console.error('Error updating post:', error)
    } finally {
      setLoading(false)
    }
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }))
      setKeywordInput('')
    }
  }

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }))
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
          Short Description
        </label>
        <textarea
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Keywords
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add keyword"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(keyword)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700">
          Thumbnail URL
        </label>
        <input
          type="url"
          id="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="bgCoverUrl" className="block text-sm font-medium text-gray-700">
          Background Cover URL
        </label>
        <input
          type="url"
          id="bgCoverUrl"
          value={formData.bgCoverUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, bgCoverUrl: e.target.value }))}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add tag"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content (Markdown)
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          rows={20}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-mono"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </div>
    </form>
  )
}
