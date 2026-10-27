"use client";

import RaceStrategyForm from "@/features/race-strategy/components/raceStrategyForm";
import RaceStrategyResult from "@/features/race-strategy/components/raceStrategyResult";
import { SkeletonForm } from "@/features/race-strategy/components/raceStrategyResultSkeleton";
import { useRaceStrategy } from "@/features/race-strategy/hooks/useCreateStrategy";
import LocaleSwitcher from "@/i18n/LocaleSwitcher";

export default function Page() {
  const raceStrategy = useRaceStrategy();

  return (
    <div>
      <div className="absolute right-4 top-4 z-10">
        <LocaleSwitcher />
      </div>
      {raceStrategy.showResult && !raceStrategy.isLoading && (
        <RaceStrategyResult raceStrategy={raceStrategy} />
      )}
      {!raceStrategy.showResult && !raceStrategy.isLoading && (
        <RaceStrategyForm raceStrategy={raceStrategy} />
      )}
      {raceStrategy.isLoading && <SkeletonForm />}
    </div>
  );
}
