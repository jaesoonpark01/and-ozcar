import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Simulate IPFS Upload Delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate a mock CID based on timestamp and file name
        // In production, this would use Pinata or QuickNode IPFS SDK
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const mockCid = `Qm${timestamp}${randomString}XyZ${file.name.substring(0, 3)}`;

        console.log(`[Mock IPFS] File ${file.name} uploaded. CID: ${mockCid}`);

        return NextResponse.json({
            success: true,
            ipfsHash: mockCid,
            url: `https://ipfs.io/ipfs/${mockCid}`
        });

    } catch (error: unknown) {
        console.error('IPFS Upload Error:', error);
        return NextResponse.json({
            error: 'Failed to upload to IPFS',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
