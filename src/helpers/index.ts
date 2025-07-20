export const getProducts = async () => {
  const res = await fetch("/api/menu-items", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};