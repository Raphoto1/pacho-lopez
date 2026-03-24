"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";

export default function TourDate({ lugar, rawFecha, ciudad, cartel, soldOut, buyLink }) {
  const t = useTranslations("Tour");
  const locale = useLocale();
  const posterSrc = cartel || "/img/posters/posterWide.png";

  // Parsear y comparar fecha cruda (formato YYYY-MM-DD o ISO)
  const dateObj = rawFecha ? new Date(rawFecha.slice(0, 10) + "T00:00:00") : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventPassed = dateObj ? dateObj < today : false;

  // Formatear fecha según el locale activo
  const fecha = dateObj && !isNaN(dateObj)
    ? dateObj.toLocaleDateString(locale === "en" ? "en-US" : "es-CO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : rawFecha || "Fecha por confirmar";

  return (
    <article className={`card group bg-base-100 shadow-xl border overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl focus-within:-translate-y-1 focus-within:shadow-2xl ${soldOut || eventPassed ? "border-error/40" : "border-base-content/10 hover:border-primary/40"}`}>
      <figure className='relative h-56 bg-base-200 overflow-hidden'>
        <img
          src={posterSrc}
          alt={`Poster del evento en ${lugar}`}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 hover:scale-105 ${soldOut || eventPassed ? "grayscale" : ""}`}
          loading='lazy'
        />

        {soldOut && (
          <div className='absolute inset-0 bg-gradient-to-r from-error/90 via-error/80 to-transparent opacity-95 flex items-center justify-center transform -skew-x-12'>
            <div className='text-center text-white drop-shadow-lg'>
              <p className='text-3xl font-bold mb-2'>{t("soldOut")}</p>
              <p className='text-sm md:text-base font-semibold'>{t("thankYouForBelieving")}</p>
            </div>
          </div>
        )}

        {!soldOut && eventPassed && (
          <div className='absolute inset-0 bg-gradient-to-r from-success/90 via-success/80 to-transparent opacity-95 flex items-center justify-center transform -skew-x-12'>
            <div className='text-center text-white drop-shadow-lg'>
              <p className='text-3xl font-bold mb-2'>{t("eventPassed")}</p>
              <p className='text-sm md:text-base font-semibold'>{t("joinUsNextTime")}</p>
            </div>
          </div>
        )}
      </figure>

      <div className='card-body gap-3'>
        <div className='flex items-center justify-between gap-2'>
          <span className={`badge ${soldOut || eventPassed ? "badge-error" : "badge-outline"}`}>
            {soldOut ? t("soldOut") : eventPassed ? t("eventPassed") : t("live")}
          </span>
          <span className='badge badge-primary badge-soft'>{fecha}</span>
        </div>

        <h2 className='card-title leading-tight'>{lugar}</h2>
        <p className='text-base-content/80'>{ciudad}</p>

        {!soldOut && !eventPassed && buyLink && (
          <a href={buyLink} target='_blank' rel='noopener noreferrer' className='btn btn-primary btn-sm mt-2'>
            {t('buyTickets')}
          </a>
        )}
      </div>
    </article>
  );
}
