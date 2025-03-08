import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/utils";
import { DBDateFormat, HttpCodes } from "@/constants";
import { format } from "date-fns";

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
      .gte("date", format(new Date(from as string), DBDateFormat))
      .lte("date", format(new Date(to as string), DBDateFormat));
    return Response.json({ data: transactions || [] });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: HttpCodes.InternalServerError });
  }
}
