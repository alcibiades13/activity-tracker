export const searchInObject = (obj, query) => {
  if (Array.isArray(obj)) {
    return obj.some((item) => searchInObject(item, query));
  }
  if (typeof obj === "object" && obj !== null) {
    return Object.values(obj).some((value) => searchInObject(value, query));
  }
  if (typeof obj === "number") {
    return String(obj).includes(query);
  }
  return typeof obj === "string" && obj.toLowerCase().includes(query.toLowerCase());
};