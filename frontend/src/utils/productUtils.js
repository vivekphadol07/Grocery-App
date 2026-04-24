export const resolveImagePath = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  if (imagePath.startsWith(import.meta.env.BASE_URL)) {
    return imagePath;
  }

  const base = import.meta.env.BASE_URL || "/";
  const cleanImage = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  return `${base}${cleanImage}`;
};

export const normalizeProduct = (product) => ({
  ...product,
  id: product.id || product._id,
  image: resolveImagePath(product.image),
});

export const normalizeProducts = (products = []) => products.map(normalizeProduct);

