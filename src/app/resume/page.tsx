import { getPortfolioData } from "@/lib/data";

export default async function ResumePage() {
  const { profile } = await getPortfolioData();

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-emerald-300">Resume</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Chris Martindale Resume</h1>
        </div>
        {profile.resume_url ? (
          <a
            href={profile.resume_url}
            className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/10"
            target="_blank"
            rel="noreferrer"
          >
            Open PDF
          </a>
        ) : null}
      </div>

      {profile.resume_url ? (
        <object
          data={profile.resume_url}
          type="application/pdf"
          className="h-[82vh] w-full rounded-lg border border-white/10 bg-zinc-900"
        >
          <iframe
            src={profile.resume_url}
            className="h-[82vh] w-full rounded-lg border border-white/10 bg-zinc-900"
            title="Chris Martindale Resume"
          />
        </object>
      ) : (
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 text-zinc-300">
          Add a Supabase Storage public PDF URL in `/admin` to show the resume here.
        </div>
      )}
    </section>
  );
}
