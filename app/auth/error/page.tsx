import Link from "next/link";
import React from "react";

function page() {
  return (
    <section className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center z-10">
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Oops! Something went wrong
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/auth"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Back to login
          </Link>
          <a href="#" className="text-sm font-semibold">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default page;
