export const api = () => {
  const baseUrl = "http://localhost:8080";

  const ApiBackend = (endpoint?: string) => {
    if (endpoint) {
      return `${baseUrl}${endpoint}`;
    }
    return "";
  };

  return { ApiBackend };
};
