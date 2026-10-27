import { httpAdapter } from "@/lib/api-client";

export enum RaceFormatEnum {
  LAPS = "laps",
  TIME = "time",
}

export type CreateStrategyType = {
  averageLapFuel: number;
  averageLapSeconds: number;
  raceDuration: number;
  raceFormat: RaceFormatEnum;
  reserveFuelLaps: number;
  reserveFuelPercentage: number;
};

export default async function createRaceStrategy(data: CreateStrategyType) {
  const endpoint = "/api/create-strategy";
  const response = await httpAdapter.post(endpoint, data);

  return response;
}
