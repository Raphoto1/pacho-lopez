import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import SignOutButton from "@/components/auth/SignOutButton";
import EventManager from "@/components/admin/EventManager";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <section className='container mx-auto px-4 py-20'>
      <div className='max-w-xl rounded-2xl border border-base-content/20 bg-base-100/70 p-8 shadow-lg backdrop-blur'>
        <h1 className='text-3xl font-bold mb-2'>Panel de administración</h1>
        <p className='mb-6'>Sesión iniciada como {session.user.name}</p>
        <SignOutButton />
      </div>
      <EventManager />
    </section>
  );
}
