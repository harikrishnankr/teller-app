import { DBDateFormat, HttpCodes } from "@/constants";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/utils";
import { format } from "date-fns";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const user = getUser(request);
  try {
    const { id } = user;
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    let { data: transactions, error } = await supabase
      .from("transactions")
      .select(
        `
        *,
        categories (
          id,
          name,
          icon
        )
      `
      )
      .eq("user_id", id)
      .gte("date", format(new Date(from as string), DBDateFormat)) // Filter by timestamp >= from
      .lte("date", format(new Date(to as string), DBDateFormat))
      .order("date", { ascending: false });
    return Response.json({ data: transactions || [] });
  } catch {
    return Response.json({ data: [] });
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { category, date, notes, amount } = await request.json();
  if (!category || !date || !amount || isNaN(amount)) {
    return Response.json(
      { data: [], error: "Bad Request" },
      { status: HttpCodes.BadRequest }
    );
  }
  const user = getUser(request);
  if (!user) {
    return Response.json(
      { data: [], error: "Unauthorized user" },
      { status: HttpCodes.UnAuthorized }
    );
  }
  try {
    const { id } = user;
    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          category_id: category,
          date: format(new Date(date), DBDateFormat),
          notes,
          amount: parseFloat(amount).toFixed(2),
          type: "expense",
          user_id: id,
          currency: "INR",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .select();
    if (error) {
      return Response.json({ error });
    }
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: HttpCodes.InternalServerError });
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { ids } = await request.json();
  const user = getUser(request);
  if (!user) {
    return Response.json(
      { data: [], error: "Unauthorized user" },
      { status: HttpCodes.UnAuthorized }
    );
  }
  try {
    const { id } = user;
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("user_id", id)
      .eq("id", ids);
    if (error) {
      return Response.json({ error }, { status: HttpCodes.BadRequest });
    }
    return Response.json({
      data: {
        ids,
      },
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: HttpCodes.InternalServerError });
  }
}
