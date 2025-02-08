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
  let { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("updated_at", { ascending: false });
  return Response.json({ data: categories || [] });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { icon, name } = await request.json();
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
      .from("categories")
      .insert([{ icon, name, type: "expense", user_id: id }])
      .select();
    if (error) {
      return Response.json({ error });
    }
  } catch (error) {
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
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", ids);
  if (error) {
    return Response.json({ error });
  }
  return Response.json({
    data: {
      ids,
    },
  });
}
