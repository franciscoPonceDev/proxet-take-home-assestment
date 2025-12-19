import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center bg-slate-50 p-4">
      <div className="w-full max-w-5xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Paginated Users DataList
        </h1>
        <p className="text-sm text-slate-600">
          This app will fetch a large user dataset from an external API and
          display it with client-side pagination (20 users per page).
        </p>
      </div>
    </main>
  );
}
