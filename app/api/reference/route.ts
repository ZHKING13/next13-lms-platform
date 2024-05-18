import { NextRequest, NextResponse } from "next/server";

export async function GET(req:Request ) {
    const { searchParams } = new URL(req.url);
    const referenceNumber = searchParams.get("referenceNumber");
    if (!referenceNumber) {
        return new NextResponse("Reference number is required", { status: 204 });
    }

    return NextResponse.json({ referenceNumber,status: 200});
}
