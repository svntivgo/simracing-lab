import { toast } from "@/components/ui/toast";
import { useEffect, useState } from "react";

export function useLoading() {
  const errorDefault = {
    code: 200,
    message: "ok",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(errorDefault);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  const clearError = () => setError(errorDefault);

  useEffect(() => {
    if (error.code != 200) {
      toast.add({
        type: "error",
        description: error.message,
        priority: "high",
      });
    }
  }, [error]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    error,
    setError,
    clearError,
  };
}
