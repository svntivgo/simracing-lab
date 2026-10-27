import { NextResponse } from "next/server";
import { calculateFuel } from "@/features/race-strategy/services/calculateFuel";
import { createStrategySchema } from "@/features/race-strategy/schemas/createStrategySchema";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const validation = createStrategySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid race strategy data",
          errors: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const result = calculateFuel(validation.data);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }
}
