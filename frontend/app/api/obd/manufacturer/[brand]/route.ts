import { NextRequest, NextResponse } from "next/server";
import { HyundaiAdapter } from "@/services/obd/adapters/HyundaiAdapter";
import { TeslaAdapter } from "@/services/obd/adapters/TeslaAdapter";
import { BaseManufacturerAdapter } from "@/services/obd/adapters/BaseAdapter";

export async function GET(
    req: NextRequest,
    { params }: { params: { brand: string } }
) {
    const brand = params.brand.toLowerCase();
    const vin = req.nextUrl.searchParams.get("vin");
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!vin || !token) {
        return NextResponse.json({ error: "Missing VIN or Access Token" }, { status: 400 });
    }

    let adapter: BaseManufacturerAdapter | null = null;

    switch (brand) {
        case "hyundai":
        case "kia":
            adapter = new HyundaiAdapter();
            break;
        case "tesla":
            adapter = new TeslaAdapter();
            break;
        default:
            return NextResponse.json({ error: `Manufacturer ${brand} not supported yet` }, { status: 404 });
    }

    try {
        const data = await adapter.fetchData(vin, token);
        return NextResponse.json(data);
    } catch (error) {
        console.error(`[Gateway Error] Brand: ${brand}`, error);
        return NextResponse.json({ error: "Failed to fetch manufacturer data" }, { status: 500 });
    }
}
