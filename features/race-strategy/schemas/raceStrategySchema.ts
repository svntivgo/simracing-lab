import { z } from "zod";
import { RaceFormatEnum } from "../services/createRaceStrategy";

const minutesSecondsMsRegex = /^\d{2}:[0-5]\d\.\d{3}$/;
const raceDurationTimeRegex = /^\d{2}:[0-5]\d$/;

export const raceStrategyFormSchema = z
  .object({
    averageLapFuel: z
      .number({ error: "Fuel per lap must be a number" })
      .gt(0, "Fuel per lap must be greater than zero")
      .max(100, "Fuel per lap is too high"),

    averageLapSeconds: z
      .string()
      .regex(minutesSecondsMsRegex, "Use MM:SS.mmm, e.g. 01:23.456")
      .transform((value) => {
        const [minutes, rest] = value.split(":");
        const [seconds, milliseconds] = rest.split(".");

        return (
          Number(minutes) * 60 + Number(seconds) + Number(milliseconds) / 1000
        );
      })
      .pipe(z.number().positive()),

    reserveFuelPercentage: z.number().min(0).max(0.1),
    reserveFuelLaps: z.number().int().min(0).max(5),

    raceFormat: z.enum(RaceFormatEnum).optional(),

    raceDuration: z.string(),
  })
  .transform((data) => {
    let raceDuration: number | string = data.raceDuration;

    if (data.raceFormat === RaceFormatEnum.LAPS) {
      raceDuration = Number(data.raceDuration);
    } else if (data.raceFormat === RaceFormatEnum.TIME) {
      const match = data.raceDuration.match(raceDurationTimeRegex);

      if (match) {
        const [hours, minutes] = data.raceDuration.split(":").map(Number);
        raceDuration = hours * 3600 + minutes * 60;
      }
    }

    return {
      ...data,
      raceDuration,
    };
  })
  .pipe(
    z.object({
      averageLapFuel: z.number().positive().max(100),
      averageLapSeconds: z.number().positive(),
      reserveFuelPercentage: z.number().min(0).max(0.1),
      reserveFuelLaps: z.number().int().min(0).max(5),
      raceFormat: z.enum(RaceFormatEnum),
      raceDuration: z.number().positive(),
    }),
  );

export type RaceStrategyFormInput = z.input<typeof raceStrategyFormSchema>;
export type RaceStrategyFormOutput = z.output<typeof raceStrategyFormSchema>;
