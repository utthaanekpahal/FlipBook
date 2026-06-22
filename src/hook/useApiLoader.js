// hooks/useApiLoader.js

import { useState } from "react";

const useApiLoader = () => {
  const [loading, setLoading] = useState(false);

  const execute = async (apiCall) => {
    try {
      setLoading(true);

      const response = await apiCall();

      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    execute,
  };
};

export default useApiLoader;