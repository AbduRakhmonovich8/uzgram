function Overlay({ modal }) {
  if (!modal.type) return null;

  return (<>

    {/* LOADER */}
    {modal.type === "loader" && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-white px-6 py-4 rounded-lg flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Iltimos kuting...</span>
        </div>
      </div>
    )}
    {/* NOTE */}
    {modal.type === "note" && (
      <div className="absolute top-1/8 left-1/2 bg-white px-6 py-4 rounded-lg shadow text-center max-w-sm">
        <p>{modal.message}</p>
      </div>
    )}
  </>
  );
}
export default Overlay