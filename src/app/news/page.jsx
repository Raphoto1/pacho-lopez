import React from "react";
import NewsLetterSuscriptionForm from "@/components/forms/NewsLetterSuscriptionForm";

export const metadata = {
  title: "Newsletter",
};

export default function page() {
  return (
    <div className='flex min-h-screen justify-center items-center p-4'>
      <NewsLetterSuscriptionForm />
    </div>
  );
}
