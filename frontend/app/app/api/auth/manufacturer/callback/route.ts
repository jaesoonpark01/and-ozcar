import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state"); // brand:user_id format expected

    if (!code) {
        return NextResponse.json({ error: "Authorization code missing" }, { status: 400 });
    }

    // In a real implementation:
    // 1. Exchange 'code' for 'access_token' using Manufacturer Client Secret
    // 2. Persist the token in Supabase (vehicle_approvals table)
    // 3. Redirect back to the dashboard with a success message

    console.log(`[OAuth2 Callback] Received code: ${code} for state: ${state}`);

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/technician/dashboard?sync=success&brand=${state}`);
}
