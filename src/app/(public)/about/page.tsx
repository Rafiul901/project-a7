import {
  Target,
  Eye,
  HeartHandshake,
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Make parcel delivery simple, accessible, and reliable for everyone.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "Build a connected delivery experience where customers and agents work together seamlessly.",
  },
  {
    icon: HeartHandshake,
    title: "Our Commitment",
    description:
      "Provide transparent tracking, secure payments, and a smooth delivery management experience.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-slate-950 px-4 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="font-semibold uppercase tracking-widest text-blue-400">
            About SwiftDrop
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Making Every Delivery Simpler
          </h1>

          <p className="mt-6 leading-8 text-slate-300">
            SwiftDrop is a courier and logistics management
            platform designed to connect customers,
            delivery agents, and administrators through
            one convenient system.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Who We Are
            </h2>

            <p className="mt-6 leading-8 text-muted-foreground">
              Our platform brings parcel booking, delivery
              assignment, shipment tracking, and payment
              management together. Customers can manage
              their shipments, agents can handle assigned
              deliveries, and administrators can oversee
              platform activity.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-xl border p-8 text-center shadow-sm"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}