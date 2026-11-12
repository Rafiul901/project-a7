import {
  PackagePlus,
  MapPin,
  CreditCard,
  ClipboardList,
} from "lucide-react";

const services = [
  {
    icon: PackagePlus,
    title: "Parcel Booking",
    description:
      "Create delivery requests by providing receiver details, pickup address, delivery address, and parcel information.",
  },
  {
    icon: MapPin,
    title: "Parcel Tracking",
    description:
      "Follow your parcel's delivery progress through tracking updates provided by delivery agents.",
  },
  {
    icon: CreditCard,
    title: "Online Payments",
    description:
      "Pay your delivery fees through a secure Stripe Checkout payment process.",
  },
  {
    icon: ClipboardList,
    title: "Delivery Management",
    description:
      "Delivery agents can view available parcels, accept assignments, and update delivery statuses.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-slate-950 px-4 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="font-semibold uppercase tracking-widest text-blue-400">
            Our Services
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Everything You Need for Delivery
          </h1>

          <p className="mt-6 leading-8 text-slate-300">
            From booking a parcel to tracking its delivery,
            SwiftDrop brings the essential delivery tools
            together.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="flex gap-5 rounded-xl border p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    {service.title}
                  </h2>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}