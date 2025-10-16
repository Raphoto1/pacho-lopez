"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Aquí puedes agregar la lógica para enviar el formulario
      // Por ejemplo, enviar a una API route o servicio externo
      console.log("Datos del formulario:", formData);

      // Simulación de envío
      fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSubmitStatus("¡Mensaje enviado correctamente!");
          setFormData({ name: "", email: "", message: "" });
        })
        .catch((error) => {
          setSubmitStatus("Error al enviar el mensaje. Inténtalo de nuevo.");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } catch (error) {
      console.error("Error enviando el formulario:", error);
      setSubmitStatus("Error al enviar el mensaje. Inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  };
  return (
    <div className='flex min-h-screen py-12 px-4 sm:px-6 md:px-8 w-full justify-center items-center'>
      <div className=' bg-white rounded-lg shadow-md p-6'>
        <h1 className='text-2xl font-bold text-gray-900 text-center mb-8'>Contacto</h1>

        <form onSubmit={handleSubmit} className='space-y-6 w-full md:w-96'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
              Nombre *
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Tu nombre completo'
            />
          </div>

          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
              Email *
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='tu@email.com'
            />
          </div>

          <div>
            <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>
              Mensaje *
            </label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical text-black'
              placeholder='Escribe tu mensaje aquí...'
            />
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200'>
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </button>

          {submitStatus && <div className={`text-center text-sm ${submitStatus.includes("Error") ? "text-red-600" : "text-green-600"}`}>{submitStatus}</div>}
        </form>
      </div>
      <div className='bottom-10 w-20 fixed right-10 flex flex-col gap-4'>
        <a href='https://wa.me/5214731520717?' target='_blank'>
          <img src='/icons/WhatsApp.svg.webp' alt='' />
        </a>
      </div>
    </div>
  );
}
