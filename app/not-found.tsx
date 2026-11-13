import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-32 text-center">
      <p className="font-display text-8xl font-bold text-brand-red">404</p>
      <h1 className="mt-2 text-4xl font-bold text-brand-green-dark">Page not found</h1>
      <p className="mt-3 text-brand-muted">The page you are looking for has moved. Explore our projects instead.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-red">Go Home</Link>
        <Link href="/projects" className="btn-outline">View Projects</Link>
      </div>
    </section>
  );
}
