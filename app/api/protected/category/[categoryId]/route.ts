import { HttpCodes } from "@/constants";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  const categoryId = (await params).categoryId;
  const supabase = await createClient();
  const { icon, name } = await request.json();
  try {
    const { data, error } = await supabase
      .from("categories")
      .update({ icon, name })
      .eq("id", categoryId)
      .select();
    if (error) {
      return Response.json({ error });
    }
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: HttpCodes.InternalServerError });
  }
}
