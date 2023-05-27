import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    return NextResponse.json(
        {
            message: "hello, here is your requested id:",
            id: id
        });
}