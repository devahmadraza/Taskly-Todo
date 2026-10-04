const MyTodosHeader = ({ onCreate}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-10 mb-6">

      {/* Left side */}
      <div>
        <h2 className="text-2xl font-bold text-base-content">
          My Todos
        </h2>

        <p className="text-sm text-base-content/60 mt-1">
          Keep track of your tasks and stay organized.
        </p>
      </div>

      {/* Right side */}
      <button className="btn btn-primary"
      onClick={onCreate}
      >
        + Create Todo
      </button>

    </div>
  );
};

export default MyTodosHeader;