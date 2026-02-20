import { deleteNumber } from "../Functions/forBackend";




function Numbers({ activeNumbers, me, setActiveNumbers, setModal }) {

  const handleDelete = async (number) => {

    try {
      const numbers = []
      const numbersobj = []
      activeNumbers?.data.map((e) => e.number != number ? numbers.push(e.number) : "");
      activeNumbers?.data.map((e) => e.number != number ? numbersobj.push(e) : "");
      console.log("Updated numbers:", numbers);

      const data = await deleteNumber(me?.user_id, numbers);
      console.log("Delete response:", data);
      setModal({ type: "note", message: "Muovafiqiyatli o'chirildi" })
      setActiveNumbers(numbersobj)

    } catch (error) {
      console.error("Error deleting number:", error);
    }
  };
  return (
    <div className='card' style={{ textAlign: "center" }}>
      <h2 className="text-white">Faol raqamlar ro'yxati:</h2>
      {activeNumbers && activeNumbers.data?.map((number, index) => (
        <div key={index} >
          <p className="text-white">{number.number}
            {number.status === "active" ? (
              "✅"
            ) : (
              <>
                ❌ <button className="button" onClick={() => handleDelete(number.number)}>Delete</button>
              </>
            )}</p>

        </div>
      )) || <div className="text-white">Sizda ulangan raqamlar mavjud emas ❌</div>
      }
    </div>
  );
}


export default Numbers