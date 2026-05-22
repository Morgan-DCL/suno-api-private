import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { sunoApi } from '@/lib/SunoApi';
import { corsHeaders } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get('page') ?? '1');
    const personas = await (await sunoApi((await cookies()).toString())).getMyPersonas(page);
    return new NextResponse(JSON.stringify(personas), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}
