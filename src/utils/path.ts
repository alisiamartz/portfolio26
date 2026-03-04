export const withBasePath = (path: string, base: string): string => {
  if (!path) return path;

  if (
    /^(?:[a-z]+:)?\/\//i.test(path) ||
    path.startsWith("#") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
};
