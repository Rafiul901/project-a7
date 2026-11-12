import Link from "next/link";
import {
  Mail,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

const contactOptions = [
  {
    icon: Mail,
    title: "Account Assistance",
    description:
      "Need help accessing your account? You can sign in or create a new account.",
  },
  {
    icon: MessageCircle,
    title: "Parcel Assistance",
    description:
      "Customers can review parcel information and delivery progress from their dashboard.",
  },
  {
    icon: HelpCircle,
    title: "Payment Assistance",
    description:
      "Review payment status and transaction details through your payment dashboard.",
  },
];

export default function ContactPage() {
  return (
    <div>
      <section className="bg-slate-950 px-4 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="font-semibold uppercase tracking-widest text-blue-400">
            Contact & Support
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            How Can We Help You?
          </h1>

          <p className="mt-6 leading-8 text-slate-300">
            Find the right place to manage your account,
            parcel deliveries, and payments.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {contactOptions.map((option) => {
            const Icon = option.icon;

            return (
              <div
                key={option.title}
                className="rounded-xl border p-8 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-semibold">
                  {option.title}
                </h2>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {option.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-xl bg-slate-100 p-8 text-center">
          <h2 className="text-2xl font-bold">
            Ready to get started?
          </h2>

          <p className="mt-3 text-muted-foreground">
            Access your SwiftDrop account to manage your
            delivery activities.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
}