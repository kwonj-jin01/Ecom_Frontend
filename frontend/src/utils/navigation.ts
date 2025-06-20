// utils/navigation.ts
export const navigate = (path: string) => {
  console.log("Navigate to:", path);
  // Replace with your actual router implementation
  window.location.href = path;
  // Example: router.push(path);
};
