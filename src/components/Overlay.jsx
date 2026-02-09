function Overlay({ modal }) {
  if (!modal.type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* LOADER */}
      {modal.type === "loader" && (
        <div className="bg-white px-6 py-4 rounded-lg flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Iltimos kuting...</span>
        </div>
      )}

      {/* NOTE */}
      {modal.type === "note" && (
        <div className="bg-white px-6 py-4 rounded-lg shadow text-center max-w-sm">
          <p>{modal.message}</p>
        </div>
      )}
    </div>
  );
}
export default Overlay