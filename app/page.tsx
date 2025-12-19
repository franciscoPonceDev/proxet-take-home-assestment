import { DataList } from "@/components/data-list/DataList";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center bg-slate-50 p-4">
      <div className="w-full max-w-5xl space-y-4">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Paginated Users DataList
          </h1>
          <p className="text-sm text-slate-600">
            This app fetches a large user dataset from an external API and
            displays it with client-side pagination (20 users per page).
          </p>
        </header>

        <DataList />
      </div>
    </main>
  );
}
