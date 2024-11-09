export const getOllamaURL = async () => {
  return "http://localhost:11434";
};

export const getAllModels = async ({ returnEmpty = false } = {}) => {
  try {
    const response = await fetch("http://localhost:11434/api/tags");
    if (!response.ok) {
      if (returnEmpty) {
        return [];
      }
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return json.models;
  } catch (e) {
    console.error(e);
    return [];
  }
};
