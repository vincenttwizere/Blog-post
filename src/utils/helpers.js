import slugify from 'slugify';

export const makeSlug = (title) => slugify(title, { lower: true, strict: true });