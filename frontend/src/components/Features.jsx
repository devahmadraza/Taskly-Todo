import { Plus, Bell, Calendar } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Plus,
    title: "Create Tasks",
    description: "Quickly create tasks and keep everything in one place.",
  },
  {
    icon: Bell,
    title: "Reminders",
    description: "Get notified before deadlines so nothing slips through.",
  },
  {
    icon: Calendar,
    title: "Scheduling",
    description: "Plan your day, week, or month at a glance.",
  },
];

function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Features;
