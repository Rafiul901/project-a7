import Link from "next/link";
import {
  ArrowRight,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Easy Parcel Booking",
    description:
      "Create delivery requests and manage your parcels from one place.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "Track your parcel as delivery agents move it toward its destination.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Pay securely through our integrated Stripe checkout.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-slate-950 px-4 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-5 font-semibold uppercase tracking-widest text-blue-400">
              Courier & Logistics Platform
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Deliver Anything.
              <span className="block text-blue-400">
                Anywhere. Anytime.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Send parcels with confidence. Book deliveries,
              track shipments, and manage everything from
              one simple platform.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/login"
                className="rounded-lg border border-slate-500 px-6 py-3 font-semibold transition hover:bg-slate-800"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold">
              Delivery Made Simple
            </h2>

            <p className="mt-4 text-muted-foreground">
              Everything you need to send and manage parcels
              efficiently.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-xl border bg-card p-8 shadow-sm"
                >
                  <div className="mb-5 inline-flex rounded-lg bg-blue-100 p-3 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-4 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold">
              Ready to send your first parcel?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Create your account and get started today.
            </p>
          </div>

          <Link
            href="/register"
            className="rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
}