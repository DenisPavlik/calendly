import { connectToDB } from "@/libs/connectToDB";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const email = await session().get("email");
    if (!email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const data = await req.json();

    const eventTypeDoc = await EventTypeModel.create({ email, ...data });
    return Response.json(eventTypeDoc);
  } catch (err) {
    console.error("Error in POST /event-types", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const email = await session().get("email");
    if (!email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const id = data.id;

    if (id) {
      await EventTypeModel.updateOne(
        { email, _id: id },
        data
      );
      return Response.json({ success: true });
    }
    return new Response("Missing ID", { status: 400 });
  } catch (err) {
    console.error("Error in PUT /event-types", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const email = await session().get("email");
    if (!email) {
      return new Response("Unauthorized", { status: 401 });
    }
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (id) {
      await EventTypeModel.deleteOne({ _id: id, email });
      return Response.json({ success: true });
    }
    return new Response("Missing ID", { status: 400 });
  } catch (err) {
    console.error("Error in DELETE /api/event-types:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
