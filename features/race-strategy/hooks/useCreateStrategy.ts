"use client";

import { useState } from "react";
import createRaceStrategy, {
  CreateStrategyType,
} from "../services/createRaceStrategy";
import { ICreateStrategyResponse } from "../interfaces/createRaceStrategy.interface";
import { useLoading } from "@/hooks/useAsyncRequest";

export type RaceStrategyHook = ReturnType<typeof useRaceStrategy>;

export function useRaceStrategy() {
  const strategyDefault: ICreateStrategyResponse = {
    reserveFuelPercentage: 0,
    reserveFuelLaps: 0,
    raceFuel: 0,
    totalFuel: 0,
    estimatedFuelLaps: 0,
    estimatedFuelSeconds: 0,
  };

  const { startLoading, stopLoading, setError, isLoading } = useLoading();

  const [strategy, setStrategy] = useState(strategyDefault);
  const [showResult, setShowResult] = useState(false);

  const onSubmit = async (data: CreateStrategyType) => {
    try {
      startLoading();
      const result = await createRaceStrategy(data);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStrategy(result);
      setShowResult(true);
    } catch (e) {
      setError({ message: "Oops, something happened", code: 500 });
    } finally {
      stopLoading();
    }
  };

  return {
    strategy,
    showResult,
    setShowResult,
    onSubmit,
    isLoading,
  };
}
