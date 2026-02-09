// import { useEffect } from "react";
function AddMember() {


  // useEffect(() => {
  //   const eventSource = new EventSource("/api/progress-sse");

  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setProgress(data.progress);
  //   };

  //   return () => eventSource.close();
  // }, []);














  return (
    <form className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Guruh sozlamalari
      </h2>

      {/* Input 1 */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Guruh nomi (Odam olish uchun)
        </label>
        <input
          type="text"
          placeholder="Guruh nomini kiriting..."
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          required
        />
      </div>

      {/* Input 2 */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Guruh nomi (Odam qo'shish uchun)
        </label>
        <input
          type="text"
          placeholder="Guruh nomini kiriting..."
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          required
        />
      </div>

      {/* Input 3 */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Har bir accountdan nechta odam qo‘shilsin?
        </label>
        <input
          type="number"
          placeholder="0 < x < 50"
          min={1}
          max={50}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          required
        />
      </div>

      {/* Input 4 */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Vaqt intervali (soniya)
        </label>
        <input
          type="number"
          placeholder="0 < x < 50"
          min={1}
          max={50}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          required
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-all duration-200"
      >
        Saqlash
      </button>
    </form>

  )
}

export default AddMember;
