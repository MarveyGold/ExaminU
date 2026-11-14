import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';
import { Post, toListItem } from '#lib/server/blog.ts';

export const getPosts = query(async () => {
  const docs = await Post.find({ status: 'published' })
    .select('-body -html')
    .sort({ publishedAt: -1 })
    .limit(50)
    .lean();
  return docs.map(toListItem);
});

export const getPost = query(v.pipe(v.string(), v.regex(/^[a-z0-9-]+$/)), async (slug) => {
  const doc = await Post.findOne({ slug, status: 'published' }).lean();
  if (!doc) error(404, 'Post not found');
  return { ...toListItem(doc), html: doc.html };
});
