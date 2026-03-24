"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const initialForm = {
  lugar: "",
  fecha: "",
  ciudad: "",
  cartel: "",
  buyLink: "",
  soldOut: false
};

export default function EventManager() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/tours", {
        method: "GET"
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "No se pudieron cargar los eventos");
      }

      const data = await response.json();
      setEvents(data?.eventDates || []);
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Error cargando eventos" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId("");
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    const payload = {
      lugar: formData.lugar.trim(),
      fecha: formData.fecha.trim(),
      ciudad: formData.ciudad.trim(),
      cartel: formData.cartel.trim(),
      buyLink: formData.buyLink.trim(),
      soldOut: Boolean(formData.soldOut)
    };

    if (!payload.cartel) {
      delete payload.cartel;
    }

    if (!payload.buyLink) {
      delete payload.buyLink;
    }

    const endpoint = isEditing ? `/api/admin/tours?id=${editingId}` : "/api/admin/tours";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "No se pudo guardar el evento");
      }

      setFeedback({
        type: "success",
        message: isEditing ? "Evento actualizado correctamente" : "Evento creado correctamente"
      });
      resetForm();
      await fetchEvents();
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Error guardando evento" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (eventDate) => {
    const id = String(eventDate?._id || "");

    setEditingId(id);
    setFormData({
      lugar: eventDate?.lugar || "",
      fecha: eventDate?.fecha || "",
      ciudad: eventDate?.ciudad || "",
      cartel: eventDate?.cartel || "",
      buyLink: eventDate?.buyLink || "",
      soldOut: Boolean(eventDate?.soldOut)
    });
    setFeedback({ type: "", message: "" });
  };

  const deleteEvent = async (id) => {
    const confirmed = window.confirm("¿Seguro que deseas eliminar este evento?");

    if (!confirmed) {
      return;
    }

    setFeedback({ type: "", message: "" });

    try {
      const response = await fetch(`/api/admin/tours?id=${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "No se pudo eliminar el evento");
      }

      if (editingId === id) {
        resetForm();
      }

      setFeedback({ type: "success", message: "Evento eliminado correctamente" });
      await fetchEvents();
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Error eliminando evento" });
    }
  };

  return (
    <div className='mt-8 rounded-2xl border border-base-content/20 bg-base-100/70 p-6 shadow-lg backdrop-blur'>
      <h2 className='text-2xl font-semibold mb-4'>Manager de Tour</h2>

      {feedback.message && (
        <p className={`mb-4 text-sm ${feedback.type === "error" ? "text-error" : "text-success"}`}>
          {feedback.message}
        </p>
      )}

      <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        <label className='form-control'>
          <span className='label-text mb-2'>Lugar</span>
          <input
            name='lugar'
            value={formData.lugar}
            onChange={handleInputChange}
            className='input input-bordered w-full'
            required
          />
        </label>

        <label className='form-control'>
          <span className='label-text mb-2'>Fecha</span>
          <input
            name='fecha'
            type='date'
            value={formData.fecha}
            onChange={handleInputChange}
            className='input input-bordered w-full'
            required
          />
        </label>

        <label className='form-control'>
          <span className='label-text mb-2'>Pais/Ciudad</span>
          <input
            name='ciudad'
            value={formData.ciudad}
            onChange={handleInputChange}
            className='input input-bordered w-full'
            required
          />
        </label>

        <label className='form-control'>
          <span className='label-text mb-2'>Cartel (opcional)</span>
          <input
            name='cartel'
            value={formData.cartel}
            onChange={handleInputChange}
            className='input input-bordered w-full'
            placeholder='URL o referencia'
          />
        </label>

        <label className='form-control'>
          <span className='label-text mb-2'>Link de compra de boletas (opcional)</span>
          <input
            name='buyLink'
            value={formData.buyLink}
            onChange={handleInputChange}
            className='input input-bordered w-full'
            placeholder='https://...'
            type='url'
          />
        </label>

        <label className='label cursor-pointer justify-start gap-3 md:col-span-2'>
          <input
            name='soldOut'
            type='checkbox'
            className='checkbox checkbox-error'
            checked={formData.soldOut}
            onChange={handleInputChange}
          />
          <span className='label-text'>Marcar evento como Sold Out</span>
        </label>

        <div className='md:col-span-2 flex flex-wrap gap-3'>
          <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : isEditing ? "Actualizar evento" : "Crear evento"}
          </button>
          {isEditing && (
            <button
              type='button'
              className='btn btn-ghost'
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      <div className='overflow-x-auto'>
        <table className='table table-zebra w-full'>
          <thead>
            <tr>
              <th>Lugar</th>
              <th>Fecha</th>
              <th>Ciudad</th>
              <th>Cartel</th>
              <th>Link Boletas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7}>Cargando eventos...</td>
              </tr>
            )}

            {!isLoading && events.length === 0 && (
              <tr>
                <td colSpan={7}>No hay eventos cargados todavía.</td>
              </tr>
            )}

            {!isLoading &&
              events.map((eventDate) => {
                const id = String(eventDate?._id || "");

                return (
                  <tr key={id}>
                    <td>{eventDate?.lugar || "-"}</td>
                    <td>{eventDate?.fecha || "-"}</td>
                    <td>{eventDate?.ciudad || "-"}</td>
                    <td>{eventDate?.cartel || "-"}</td>
                    <td>
                      {eventDate?.buyLink ? (
                        <a href={eventDate.buyLink} target='_blank' rel='noopener noreferrer' className='link link-primary text-xs'>
                          Ver
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {eventDate?.soldOut ? (
                        <span className='badge badge-error'>Sold Out</span>
                      ) : (
                        <span className='badge badge-success badge-outline'>Disponible</span>
                      )}
                    </td>
                    <td className='flex gap-2'>
                      <button type='button' className='btn btn-sm' onClick={() => startEdit(eventDate)}>
                        Editar
                      </button>
                      <button
                        type='button'
                        className='btn btn-sm btn-error btn-outline'
                        onClick={() => deleteEvent(id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
