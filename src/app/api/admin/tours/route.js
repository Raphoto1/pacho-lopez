import { NextResponse } from "next/server";
import {
	createEventDate,
	deleteEventDate,
	getAllEventDates,
	getEventDateById,
	updateEventDate
} from "@/dao/dao";

const requiredFields = ["lugar", "fecha", "ciudad"];
const allowedFields = ["lugar", "fecha", "ciudad", "cartel"];

const hasAllRequiredFields = (payload) => {
	return requiredFields.every((field) => payload?.[field]);
};

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (id) {
			const eventDate = await getEventDateById(id);

			if (!eventDate) {
				return NextResponse.json({ message: "Event not found" }, { status: 404 });
			}

			return NextResponse.json({ eventDate }, { status: 200 });
		}

		const eventDates = await getAllEventDates();
		return NextResponse.json({ eventDates }, { status: 200 });
	} catch (error) {
		console.error("Error getting event dates:", error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}

export async function POST(request) {
	try {
		const payload = await request.json();

		if (!hasAllRequiredFields(payload)) {
			return NextResponse.json(
				{ message: "lugar, fecha y ciudad son requeridos" },
				{ status: 400 }
			);
		}

		const result = await createEventDate(payload);
		return NextResponse.json({ message: "Event created", id: result.insertedId }, { status: 201 });
	} catch (error) {
		console.error("Error creating event date:", error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}

export async function PUT(request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({ message: "id is required" }, { status: 400 });
		}

		const payload = await request.json();
		const hasAnyAllowedField = allowedFields.some((field) => payload?.[field] !== undefined);

		if (!hasAnyAllowedField) {
			return NextResponse.json(
				{ message: "At least one field is required: lugar, fecha, ciudad, cartel" },
				{ status: 400 }
			);
		}

		const result = await updateEventDate(id, payload);

		if (result.matchedCount === 0) {
			return NextResponse.json({ message: "Event not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Event updated" }, { status: 200 });
	} catch (error) {
		console.error("Error updating event date:", error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}

export async function DELETE(request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({ message: "id is required" }, { status: 400 });
		}

		const result = await deleteEventDate(id);

		if (result.deletedCount === 0) {
			return NextResponse.json({ message: "Event not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Event deleted" }, { status: 200 });
	} catch (error) {
		console.error("Error deleting event date:", error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
