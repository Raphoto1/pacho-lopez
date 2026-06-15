import { NextResponse } from "next/server";
import { clearHeroVideo, getHeroVideo, setHeroVideo } from "@/dao/dao";

function getYoutubeVideoId(urlString) {
  try {
    const url = new URL(urlString);
    const host = url.hostname.replace("www.", "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }

      if (url.pathname.startsWith("/embed/")) {
        const parts = url.pathname.split("/").filter(Boolean);
        return parts[1] || null;
      }

      if (url.pathname.startsWith("/shorts/")) {
        const parts = url.pathname.split("/").filter(Boolean);
        return parts[1] || null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const heroVideo = await getHeroVideo();
    return NextResponse.json({ heroVideo: heroVideo || null }, { status: 200 });
  } catch (error) {
    console.error("Error getting hero video:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const url = body?.url?.trim();

    if (!url) {
      return NextResponse.json({ message: "Se requiere una URL de YouTube" }, { status: 400 });
    }

    const videoId = getYoutubeVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { message: "La URL no es valida o no corresponde a YouTube" },
        { status: 400 }
      );
    }

    const result = await setHeroVideo(url);

    return NextResponse.json(
      {
        message: "Video del hero guardado",
        id: result.insertedId,
        url,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving hero video:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await clearHeroVideo();
    return NextResponse.json({ message: "Video del hero eliminado" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting hero video:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
