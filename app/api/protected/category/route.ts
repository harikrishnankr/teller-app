import { HttpCodes } from "@/constants";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const user = getUser(request);
  try {
    const { id } = user;
    let { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .or(`user_id.is.null,user_id.eq.${id}`)
      .order("updated_at", { ascending: false });
    return Response.json({ data: categories || [] });
  } catch {
    return Response.json({ data: [] });
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { icon, name } = await request.json();
  const user = getUser(request);
  try {
    const { id } = user;
    const { data, error } = await supabase
      .from("categories")
      .insert([{ icon, name, type: "expense", user_id: id }])
      .select();
    console.log(data, error);
    if (error) {
      return Response.json({ error });
    }
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: HttpCodes.InternalServerError });
  }

  return Response.json({ data: {} });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { ids } = await request.json();
  const user = request.headers.get("x-user-info");
  if (!user) {
    return Response.json(
      { data: [], error: "Unauthorized user" },
      { status: HttpCodes.UnAuthorized }
    );
  }
  const { error } = await supabase.from("categories").delete().eq("id", ids);
  if (error) {
    return Response.json({ error });
  }
  return Response.json({
    data: {
      ids,
    },
  });
}
