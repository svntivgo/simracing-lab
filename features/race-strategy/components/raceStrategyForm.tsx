"use client";

import { RaceStrategyHook } from "../hooks/useCreateStrategy";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { RaceFormatEnum } from "../services/createRaceStrategy";
import { Slider } from "@/components/ui/slider";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RaceStrategyFormInput,
  RaceStrategyFormOutput,
  raceStrategyFormSchema,
} from "../schemas/raceStrategySchema";
import { useEffect } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

interface RaceStrategyFormProps {
  raceStrategy: RaceStrategyHook;
}

export default function RaceStrategyForm({
  raceStrategy,
}: RaceStrategyFormProps) {
  const { t } = useLocale();

  const { onSubmit } = raceStrategy;

  const defaultValues = {
    averageLapFuel: undefined,
    averageLapSeconds: "",
    reserveFuelPercentage: 0.03,
    reserveFuelLaps: 2,
    raceFormat: undefined,
    raceDuration: "",
  };

  const {
    register,
    setValue,
    control,

    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RaceStrategyFormInput, undefined, RaceStrategyFormOutput>({
    resolver: zodResolver(raceStrategyFormSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    console.log("averageLapFuel errors:", errors.averageLapFuel);
    console.log("isValid:", isValid);
  }, [errors.averageLapFuel, isValid]);

  const raceFormat = useWatch({
    control,
    name: "raceFormat",
  });

  const formatRaceDuration = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) {
      return digits;
    }

    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
  };

  function formatMinutesSecondsMs(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 7);

    if (digits.length <= 2) {
      return digits;
    }

    if (digits.length <= 4) {
      return `${digits.slice(0, 2)}:${digits.slice(2)}`;
    }

    return `${digits.slice(0, 2)}:${digits.slice(2, 4)}.${digits.slice(4)}`;
  }

  return (
    <form
      className="flex flex-col items-center justify-center w-full pt-12 pb-12"
      onSubmit={handleSubmit((e) => onSubmit(e))}
    >
      <FieldLegend>{t("strategy.title")}</FieldLegend>
      <FieldSet className="w-full max-w-xs">
        <FieldGroup>
          <Field>
            <FieldLabel>{t("strategy.fuelPerLap")}</FieldLabel>
            <Input
              id="fuelPerLap"
              type="text"
              placeholder="1.23"
              maxLength={5}
              {...register("averageLapFuel", { valueAsNumber: true })}
            />
            <FieldError>{errors.averageLapFuel?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel>{t("strategy.averageLaptime")}</FieldLabel>
            <Input
              id="timePerLap"
              type="text"
              placeholder="01:23.456"
              {...register("averageLapSeconds", {
                onChange: (e) =>
                  setValue(
                    "averageLapSeconds",
                    formatMinutesSecondsMs(e.target.value),
                    { shouldValidate: true },
                  ),
              })}
            />
            <FieldError>{errors.averageLapSeconds?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel>{t("strategy.raceFormat")}</FieldLabel>
            <Toggle
              onClick={() => setValue("raceFormat", RaceFormatEnum.LAPS)}
              variant="outline"
              aria-pressed={raceFormat === RaceFormatEnum.LAPS}
            >
              {t("strategy.lapLimit")}
            </Toggle>
            <Toggle
              onClick={() => setValue("raceFormat", RaceFormatEnum.TIME)}
              variant="outline"
              aria-pressed={raceFormat === RaceFormatEnum.TIME}
            >
              {t("strategy.timeLimit")}
            </Toggle>
          </Field>
          <Field>
            <FieldLabel>{t("strategy.raceDuration")}</FieldLabel>
            <Input
              type="text"
              inputMode="numeric"
              maxLength={raceFormat === RaceFormatEnum.TIME ? 5 : 4}
              disabled={raceFormat === undefined}
              placeholder={
                useWatch({
                  control,
                  name: "raceFormat",
                }) === RaceFormatEnum.TIME
                  ? t("strategy.raceDurationTimePlaceholder")
                  : t("strategy.raceDurationLapsPlaceholder")
              }
              {...register("raceDuration", {
                onChange: (e) => {
                  if (raceFormat === RaceFormatEnum.TIME) {
                    setValue(
                      "raceDuration",
                      formatRaceDuration(e.target.value),
                      { shouldValidate: true },
                    );
                  }
                },
              })}
            />
            <FieldError>{errors.raceDuration?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel>{t("strategy.extraFuel")}</FieldLabel>
            <Slider
              defaultValue={defaultValues.reserveFuelPercentage}
              max={0.1}
              step={0.01}
              className="mx-auto w-full max-w-xs"
              onValueChange={(e) =>
                setValue("reserveFuelPercentage", e as number[][0])
              }
            />
            <FieldError>{errors.reserveFuelPercentage?.message}</FieldError>
            <div className="flex items-center justify-between gap-2">
              <FieldDescription>
                {t("strategy.reserveFuelPercentage")}
              </FieldDescription>
              <span className="text-sm text-muted-foreground">
                {[
                  Number(
                    useWatch({
                      control,
                      name: "reserveFuelPercentage",
                    }) * 100,
                  ).toFixed(0),
                ] + "%"}
              </span>
            </div>
            <Slider
              defaultValue={defaultValues.reserveFuelLaps}
              max={5}
              step={1}
              className="mx-auto w-full max-w-xs"
              onValueChange={(e) =>
                setValue("reserveFuelLaps", e as number[][0])
              }
            />
            <FieldError>{errors.reserveFuelLaps?.message}</FieldError>
            <div className="flex items-center justify-between gap-2">
              <FieldDescription>
                {t("strategy.reserveFuelLaps")}
              </FieldDescription>
              <span className="text-sm text-muted-foreground">
                {[
                  useWatch({
                    control,
                    name: "reserveFuelLaps",
                  }),
                ]}
              </span>
            </div>
          </Field>
          <Button type="submit" disabled={!isValid}>
            {t("common.send")}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
