import React from 'react'

function AddNumber({ me, activeNumbers }) {
  return (
    <div style={{ textAlign: "center", margin: "20px auto" }}>
      <h1>UzgramDevAbu</h1>
      <hr />
      <div>Sizning profileingiz: {me?.username}</div>
      <div>Sizning telifon raqamingiz: {me?.number}</div>
      <hr />
      <h2>Faol raqamlar ro'yxati:</h2>
      {activeNumbers && activeNumbers.data?.map((number, index) => (
        <div key={index} >
          {number.number} {number.status == "active" ? "✅" : "❌"}
        </div>
      )) || <div>Sizda raqamlar mavjud emas ❌</div>
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