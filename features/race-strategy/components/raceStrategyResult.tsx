import { Button } from "@/components/ui/button";
import { RaceStrategyHook } from "../hooks/useCreateStrategy";
import { useLocale } from "@/i18n/LocaleProvider";

interface RaceStrategyResultProps {
  raceStrategy: RaceStrategyHook;
}

export default function RaceStrategyResult({
  raceStrategy,
}: RaceStrategyResultProps) {
  const { t } = useLocale();

  const { strategy, setShowResult } = raceStrategy;

  return (
    <div className="flex flex-col items-center justify-center m-auto w-fit pt-12 pb-12 gap-7">
      <div className="flex flex-col gap-3">
        <p className="h-4 w-50 text-center">
          {t("strategy.reserveFuelPercentage")}
        </p>
        <p className="h-8 w-full text-3xl text-center">
          {strategy.reserveFuelPercentage.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="h-4 w-50 text-center">{t("strategy.reserveFuelLaps")}</p>
        <p className="h-8 w-full text-3xl text-center">
          {strategy.reserveFuelLaps.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="h-4 w-50 text-center">
          {t("strategy.estimadedRaceFuel")}
        </p>
        <p className="h-8 w-full text-3xl text-center">
          {strategy.raceFuel.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="h-4 w-50 text-center">
          {t("strategy.recomendedTotalFuel")}
        </p>
        <p className="h-14 w-full text-6xl text-center">
          {strategy.totalFuel.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="h-4 w-50 text-center">
          {t("strategy.estimadedFuelLaps")}
        </p>
        <p className="h-8 w-full text-3xl text-center">
          {strategy.estimatedFuelLaps.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="h-4 w-50 text-center">
          {t("strategy.estimadedFuelTime")}
        </p>
        <p className="h-8 w-full text-3xl text-center">
          {strategy.estimatedFuelSeconds.toFixed(2)}
        </p>
      </div>
      <Button className={"w-full mt-2"} onClick={() => setShowResult(false)}>
        {t("common.back")}
      </Button>
    </div>
  );
}
