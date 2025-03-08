import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/utils";
import { HttpCodes } from "@/constants";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const user = getUser(request);
  const { from, to } = await request.json();
  try {
    const { id } = user;
    const { data:transactions, error } = await supabase
      .from('transactions')
      .select('amount.sum()')
      .eq("user_id", id)
      .gte("date", new Date(from as string).toISOString())
      .lte("date", new Date(to as string).toISOString());
    return Response.json({ data: transactions || [] });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: HttpCodes.InternalServerError });
  }
}
