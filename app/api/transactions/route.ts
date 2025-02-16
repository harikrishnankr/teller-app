import { HttpCodes } from "@/constants";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const user = request.headers.get("x-user-info");
  if (!user) {
    return Response.json(
      { data: [], error: "Unauthorized user" },
      { status: HttpCodes.UnAuthorized }
    );
  }
  try {
    const { id } = JSON.parse(user);
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
      .gte("date", new Date(from).toISOString()) // Filter by timestamp >= from
      .lte("date", new Date(to).toISOString())
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
  const user = request.headers.get("x-user-info");
  if (!user) {
    return Response.json(
      { data: [], error: "Unauthorized user" },
      { status: HttpCodes.UnAuthorized }
    );
  }
  try {
    const { id } = JSON.parse(user);
    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          category_id: category,
          date: new Date(date),
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
    return Response.json({ error }, { status: HttpCodes.InternalServerError });
  }
}
