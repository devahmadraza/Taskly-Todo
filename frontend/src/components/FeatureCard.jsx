function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="card-body items-center text-center">

        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 mb-2">
          <Icon size={24} className="text-primary" />
        </div>

        <h3 className="text-xl font-bold">
          {title}
        </h3>

        <p className="text-base-content/70">
          {description}
        </p>

      </div>
    </div>
  );
}

export default FeatureCard;