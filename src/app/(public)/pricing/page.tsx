import Link from "next/link";
import { CheckCircle2, Info } from "lucide-react";

const features = [
  "Create and manage parcel requests",
  "Track parcel delivery progress",
  "View payment history",
  "Secure Stripe Checkout",
];

export default function PricingPage() {
  return (
    <div>
      <section className="bg-slate-950 px-4 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="font-semibold uppercase tracking-widest text-blue-400">
            Pricing
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Simple and Transparent Payments
          </h1>

          <p className="mt-6 leading-8 text-slate-300">
            Pay the delivery fee associated with your parcel
            through our secure online checkout.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border p-8 shadow-sm md:p-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              Pay Per Parcel
            </h2>

            <p className="mt-3 text-muted-foreground">
              No subscription plan required.
            </p>

            <p className="mt-8 text-4xl font-bold">
              BDT
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Delivery fee is provided when creating a parcel.
            </p>
          </div>

          <div className="my-8 border-t" />

          <ul className="space-y-4">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-3 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
            <Info className="h-5 w-5 shrink-0" />

            <p>
              The actual delivery fee is determined during
              parcel creation. SwiftDrop currently does not
              publish a fixed rate calculator.
            </p>
          </div>

          <Link
            href="/register"
            className="mt-8 block rounded-lg bg-slate-950 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}