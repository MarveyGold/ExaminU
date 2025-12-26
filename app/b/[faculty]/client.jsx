"use client";
import Link from "next/link";
import { useState } from "react";
export default function DepartmentList({ departmentList, departmentNames, faculty }) {
  const [selected, setSelected] = useState()

  try {
    return (
      <>
        <div className="list">
          {departmentList.map((item, index) => (
            <button
              key={index}
              className={`course selector ${selected == item ? 'selected' : ''} `}
              onClick={() => setSelected(item)}
            >
              {departmentNames[index]}
            </button>

          )
          )}
        </div>
        <footer>
          <Link href={`/b`}><button className={selected ? 'left-footerButton' : 'footerButton'}>Change Faculty</button></Link>
          {selected && <Link href={`/b/${faculty}/${selected} `}><button className="footerButton">Continue to Department</button></Link>
          }
        </footer>
      </>
    )
  } catch (error) {
    return (
      <>
        <h3>Not Available</h3>
      </>
    )
  }
}
