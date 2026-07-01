import { getAllSubscriptions } from "@/dao/dao";

export default async function NewsLetterList() {
  let subscribersCount = 0;
  let hasError = false;

  try {
    const subscriptions = await getAllSubscriptions();
    subscribersCount = subscriptions.length;
  } catch (error) {
    console.error("Error loading newsletter subscriptions:", error);
    hasError = true;
  }

  return (
    <div className='rounded-2xl border border-base-content/20 bg-base-100/70 p-8 shadow-lg backdrop-blur md:justify-self-end'>
      <p className='text-sm uppercase tracking-[0.2em] text-base-content/60'>Newsletter</p>
      <h2 className='mt-2 text-3xl font-bold'>
        {hasError ? "No disponible" : subscribersCount}
      </h2>
      <p className='mt-2 text-sm text-base-content/70'>
        {hasError
          ? "No se pudo cargar la cantidad de suscriptores."
          : `${subscribersCount} suscriptores activos en la mailing list.`}
      </p>
      <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
        <a
          className={`btn btn-primary ${hasError ? "btn-disabled pointer-events-none" : ""}`}
          href='/api/newsletter?format=csv'
        >
          Descargar CSV
        </a>
        <a
          className={`btn btn-outline ${hasError ? "btn-disabled pointer-events-none" : ""}`}
          href='/api/newsletter?format=xlsx'
        >
          Descargar XLSX
        </a>
      </div>
    </div>
  );
}
