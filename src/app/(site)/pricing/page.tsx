import Card from "@/app/components/Card";

const freePlanArr = [
  "1 event type",
  "Connect 1 calendar",
  "Customize availability",
  "Add video conferencing",
  "Customize your booking page",
  "Mobile apps",
  "Browser extensions",
];

const standartPlanArr = [
  "Unlimited event types",
  "Connect multiple calendars",
  "Connect Hubspot, Mailchimp",
  "Connect Stripe, Paypal",
  "Connect with Zapier, webhooks",
  "Atomate reminders",
  "24/7 chat support",
];

const teamsPlanArr = [
  'Send meetings to Salesforce',
  'Share Round-robin meetings',
  'Qualify & route leads',
  'Connect Hubspot, Marketo, Pardot',
  'Advanced admin features',
]

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <h1 className="my-8 text-5xl font-bold text-cyan-900 text-center">
        Pick the perfect plan for you
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        <Card
          title="Free"
          subtitle="For personal use"
          price="Free"
          addons="Free features"
          planArr={freePlanArr}
        />
        <Card
          title="Standart"
          subtitle="For professionals"
          price="$10"
          addons="Free features, plus"
          planArr={standartPlanArr}
        />
        <Card
          title="Teams"
          subtitle="For growing businesses"
          price="$16"
          addons="Standard features, plus"
          planArr={teamsPlanArr}
          addtitionalTitle="Sequrity add-on"
          additionalArr={['Single Sign-On']}
        />
      </div>
    </div>
  );
}
