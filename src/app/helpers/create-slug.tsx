export const createSlug = (name: string) => {
  let slug = name.toLowerCase().replace(/\s+/g, "-");
  slug = slug.replace(/[^\w\-]+/g, "");
  return slug;
};
