import { query, command } from '$app/server';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';
import { Post, requireAdmin, slugify, renderMarkdown, toListItem } from '#lib/server/blog.ts';

const Id = v.pipe(v.string(), v.length(24), v.hexadecimal());

export const getAdminPosts = query(async () => {
  requireAdmin();
  const docs = await Post.find().select('-body -html').sort({ updatedAt: -1 }).lean();
  return docs.map(toListItem);
});

export const getAdminPost = query(Id, async (id) => {
  requireAdmin();
  const doc = await Post.findById(id).lean();
  if (!doc) error(404, 'Post not found');
  return { ...toListItem(doc), body: doc.body };
});

const PostInput = v.object({
  id: v.optional(Id),
  title: v.pipe(v.string(), v.trim(), v.minLength(3), v.maxLength(150)),
  slug: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(150))),
  excerpt: v.pipe(v.string(), v.trim(), v.maxLength(300)),
  body: v.pipe(v.string(), v.minLength(1)),
  tags: v.pipe(v.array(v.pipe(v.string(), v.trim(), v.maxLength(30))), v.maxLength(8)),
  published: v.boolean()
});

export const savePost = command(PostInput, async (input) => {
  requireAdmin();

  const slug = slugify(input.slug || input.title);
  if (!slug) error(400, 'Invalid slug');

  const fields = {
    title: input.title,
    slug,
    excerpt: input.excerpt,
    body: input.body,
    html: renderMarkdown(input.body),
    tags: input.tags,
    status: input.published ? ('published' as const) : ('draft' as const)
  };

  try {
    if (input.id) {
      const doc = await Post.findById(input.id);
      if (!doc) error(404, 'Post not found');
      doc.set(fields);
      // keep the original publish date once it exists
      if (input.published && !doc.publishedAt) doc.publishedAt = new Date();
      await doc.save();
      await getAdminPosts().refresh();
      return { id: input.id };
    }

    const doc = await Post.create({
      ...fields,
      publishedAt: input.published ? new Date() : null
    });
    await getAdminPosts().refresh();
    return { id: doc._id.toString() };
  } catch (e: any) {
    if (e?.code === 11000) error(409, 'A post with this slug already exists');
    throw e;
  }
});

export const deletePost = command(Id, async (id) => {
  requireAdmin();
  await Post.findByIdAndDelete(id);
  await getAdminPosts().refresh();
});
