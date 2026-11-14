import { Schema, type InferSchemaType, type Model } from 'mongoose';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { error } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import mongoose from '#lib/server/db.ts';

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: '' },
    body: { type: String, required: true }, // markdown source
    html: { type: String, required: true }, // sanitized, rendered on save
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date, default: null }
  },
  { timestamps: true } // adds createdAt / updatedAt
);

postSchema.index({ status: 1, publishedAt: -1 });

export type PostDoc = InferSchemaType<typeof postSchema>;

export const Post: Model<PostDoc> =
  (mongoose.models.Post as Model<PostDoc>) ?? mongoose.model<PostDoc>('Post', postSchema);

export function requireAdmin() {
  const { locals } = getRequestEvent();
  if (locals.user?.role !== 'admin') error(403, 'Forbidden');
}

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export function renderMarkdown(md: string) {
  const raw = marked.parse(md, { async: false }) as string;
  return sanitizeHtml(raw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt'] }
  });
}

// Works on lean() results
export const toListItem = (p: any) => ({
  id: p._id.toString() as string,
  title: p.title as string,
  slug: p.slug as string,
  excerpt: p.excerpt as string,
  tags: p.tags as string[],
  status: p.status as 'draft' | 'published',
  publishedAt: (p.publishedAt ?? null) as Date | null
});
