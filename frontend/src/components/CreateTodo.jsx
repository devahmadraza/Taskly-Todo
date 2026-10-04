function CreateTodo({
  title,
  description,
  setTitle,
  setDescription,
  handleCreateTodo,
}) {
  return (
        <form
  onSubmit={handleCreateTodo}
  className="card bg-base-100 border border-base-300 shadow-sm p-6 mt-6"
>
  <h2 className="text-xl font-semibold mb-4">
    Create New Todo
  </h2>

  {/* Title */}
  <fieldset className="fieldset">
    <label className="fieldset-legend">
      Title
    </label>

    <input
      type="text"
      placeholder="Enter todo title"
      className="input w-full"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </fieldset>

  {/* Description */}
  <fieldset className="fieldset">
    <label className="fieldset-legend">
      Description
    </label>

    <textarea
      placeholder="Enter todo description"
      className="textarea w-full"
      rows="4"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </fieldset>

  {/* Button */}
  <button
    type="submit"
    className="btn btn-primary mt-4"
  >
    Create Todo
  </button>
</form>
  );
}

export default CreateTodo;