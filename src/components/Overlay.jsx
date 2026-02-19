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
      <div className="fixed top-5 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
        <div className="bg-black/90 backdrop-blur-md border-l-4 shadow-xl rounded-xl px-5 py-4 max-w-sm w-full flex items-start gap-4 pointer-events-auto animate-in slide-in-from-top duration-300">
          <div className="flex-1">
            <h4 className="text-sm text-white mt-0.5 line-clamp-2">
              {modal.message}
            </h4>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
export default Overlay