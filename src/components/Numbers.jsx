import React from 'react'

function Numbers({ activeNumbers }) {
  return (
    <div className='card' style={{ textAlign: "center" }}>
      <h2>Faol raqamlar ro'yxati:</h2>
      {activeNumbers && activeNumbers.data?.map((number, index) => (
        <div key={index} >
          {number.number} {number.status == "active" ? "✅" : "❌"}
        </div>
      )) || <div>Sizda ulangan raqamlar mavjud emas ❌</div>
      }
    </div>
  );
}


export default Numbers