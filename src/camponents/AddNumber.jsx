import React from 'react'

function AddNumber({ me, activeNumbers }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>UzgramDevAbu</h1>
      <hr />
      <div>Sizning profileingiz: {me?.full_name}</div>
      <div>Sizning telifon raqamingiz: {me?.number}</div>
      <hr />
      <h2>Faol raqamlar ro'yxati:</h2>
      {activeNumbers && activeNumbers.data?.map((number, index) => (
        <div key={index} >
          {number.number} {number.status == "active" ? "✅" : "❌"}
        </div>
      ))
      }
      <hr />
      <span>Bu menyu orqali siz raqam qoshishingiz mumkin !</span>
      <br />
      <br />
      <button>Raqam qo'shish</button>
      <hr />
      <span>Bu menu orqali siz guruhga odam qoshishingiz mumkin</span>
      <br />
      <br />
      <button>Guruhga odam qo'shish</button>
    </div>
  );
}


export default AddNumber