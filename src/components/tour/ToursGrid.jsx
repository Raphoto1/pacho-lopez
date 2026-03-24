import React from "react";
import TourDate from "./TourDate";
import TourPageHeader from "./TourPageHeader";
import NoPublishedDates from "./NoPublishedDates";
import { getAllEventDates } from "@/dao/dao";

export default async function ToursGrid() {
  let eventDates = [];

  try {
    eventDates = await getAllEventDates();
  } catch (error) {
    console.error("Error loading tour dates:", error);
  }

  return (
    <div className='container mx-auto p-4 flex flex-col items-center'>
      <TourPageHeader />
      <div className='grid w-full md:grid-cols-3 gap-4 p-4'>
        {eventDates.length === 0 && <NoPublishedDates />}

        {eventDates.map((eventDate) => (
          <TourDate
            key={String(eventDate._id)}
            lugar={eventDate.lugar || "Lugar por confirmar"}
            rawFecha={eventDate.fecha ? String(eventDate.fecha) : ""}
            ciudad={eventDate.ciudad || "Ciudad por confirmar"}
            cartel={eventDate.cartel || ""}
            soldOut={Boolean(eventDate.soldOut)}
            buyLink={eventDate.buyLink || ""}
          />
        ))}
      </div>
    </div>
  );
}
