import { z } from "zod";
import { RaceFormatEnum } from "../services/createRaceStrategy";

export const createStrategySchema = z
  .object({
    averageLapFuel: z.number().positive().max(100),
    averageLapSeconds: z.number().positive(),
    raceDuration: z.number().positive(),
    raceFormat: z.enum(RaceFormatEnum),
    reserveFuelLaps: z.number().int().min(0).max(5),
    reserveFuelPercentage: z.number().min(0).max(0.1),
  })
  .superRefine((data, ctx) => {
    if (
      data.raceFormat === RaceFormatEnum.LAPS &&
      !Number.isInteger(data.raceDuration)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["raceDuration"],
        message: "Race duration in laps must be an integer",
      });
    }
  });

export type CreateStrategyInput = z.infer<typeof createStrategySchema>;
