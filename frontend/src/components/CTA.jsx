import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl bg-primary text-primary-content px-6 py-16 md:px-12 text-center shadow-lg">

          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Get Organized?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-primary-content/80 text-lg">
            Start managing your tasks today and stay on top of everything
            that matters.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

            <Link
              to="/register"
              className="btn bg-base-100 text-primary hover:bg-base-200 border-none"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="btn btn-outline border-primary-content text-primary-content hover:bg-primary-content hover:text-primary"
            >
              Login
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}

export default CTA;