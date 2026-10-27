export interface CalculateFuelInput {
  averageLapFuel: number;
  averageLapSeconds: number;
  reserveFuelLaps: number;
  reserveFuelPercentage: number;
  raceDuration: number;
  raceFormat: "laps" | "time";
}

export interface CalculateFuelResult {
  raceFuel: number;
  reserveFuelLaps: number;
  reserveFuelPercentage: number;
  totalFuel: number;
  estimatedFuelLaps: number;
  estimatedFuelSeconds: number;
}

export function calculateFuel(dto: CalculateFuelInput): CalculateFuelResult {
  const reserveFuelLaps = dto.averageLapFuel * dto.reserveFuelLaps;

  const estimatedRaceLaps =
    dto.raceFormat === "time"
      ? Math.ceil(dto.raceDuration / dto.averageLapSeconds)
      : dto.raceDuration;

  const raceFuel = estimatedRaceLaps * dto.averageLapFuel;

  const reserveFuelPercentage = raceFuel * dto.reserveFuelPercentage;

  const totalFuel = raceFuel + reserveFuelLaps + reserveFuelPercentage;

  const estimatedFuelLaps = totalFuel / dto.averageLapFuel;

  const estimatedFuelSeconds = (estimatedFuelLaps * dto.averageLapSeconds) / 60;

  return {
    raceFuel,
    reserveFuelLaps,
    reserveFuelPercentage,
    totalFuel,
    estimatedFuelLaps,
    estimatedFuelSeconds,
  };
}
