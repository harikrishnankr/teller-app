import { HttpCodes } from "@/constants";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const user = getUser(request);
  try {
    const { id } = user;
    console.log(id)
    const { data: transactions, error } = await supabase.rpc(
      "get_user_monthly_transactions",
      {
        p_user_id: id,
        p_timezone: 'Asia/Kolkata'
      }
    );
    console.log(error, transactions);
    return Response.json({ data: transactions || [] });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: HttpCodes.InternalServerError });
  }
}
