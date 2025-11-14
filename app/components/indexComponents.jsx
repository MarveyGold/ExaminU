"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";


export function Auth({className, ...props}) {
    return(
      <div className={`auth-buttons ${className}`} {...props}>
          <button className="login">Login</button>
          <button className="signup">Sign up</button>
      </div>
    )
}


export function Nav() {
    const [style, setstyle] = useState("");
    const [btnText, setbtnText] = useState("≡")

    function changeStyle() {
        setstyle(
            style === "" ? "active" : ""
        );
        setbtnText(
            btnText === "≡" ? " X " : "≡"
        )
    }
    return(
      <>
        <nav>
          <button onClick={changeStyle} className="nav-btn" >{btnText}</button>
          <ul id="list" className={style}>
            <Auth className="mobile"/>
            <li><a href="#">Home</a></li>
            <li><a href="#practice">Curriculum</a></li>
            <li><a href="#contact-us">Feedback</a></li>
            
          </ul>
        </nav>
      </>
    )
}


export function Contact() { 
  const [subject, setsubject] = useState("");
  const [mail, setmail] = useState("");
  const [active, setActive] = useState("mail");
  const router = useRouter();

  function handleChange(e) {
    setmail(e.target.value)
  }

  function submit(e) {
    e.preventDefault();
    console.log(subject);
    console.log(mail);
    if (active === "mail")   {
      router.push(`mailto:examinu05@gmail.com?subject=${subject}&body=${mail}`);
    } else if (active === "number") {
      router.push(`sms:+2349045394806?body=${mail}`);
    } else if (active === "whatsapp") {
      router.push(`https://wa.me/+2349045394806?text=${mail}`);
    }
  }

    return(
        <div className="contact-us" id="contact-us">
          <h3>Send us your feedback</h3>
          <span className="sponsors">
            
            <form  className="form" id="mail" onSubmit={submit}>
              <label htmlFor="message">Name:</label>
              <input type="text" value={subject} onChange={(e) => {setsubject(e.target.value) }} name="message"/>

              <label htmlFor="message">Feedback:</label>
              <textarea type="text" value={mail} onChange={handleChange} name="mail"/>
              <button type="submit" className="btn" >Submit</button>
            </form>
            <p></p>
          </span>
          <div className="sponsors">
            <button onClick={() => setActive("mail")} style={active === "mail" ? { opacity: 2, color: "white", borderRadius: "20px", fontWeight: "bold", width: "30vw" } : { opacity: 0.5, width: "20vw" , borderRadius: "20px" }}><img src="mail.png" alt="mail icon"/></button>
            <button onClick={() => setActive("number")} style={active === "number" ? { opacity: 2, color: "white", borderRadius: "20px", fontWeight: "bold", width: "30vw" } : { opacity: 0.5, width: "20vw" , borderRadius: "20px" }}><img src="number.png" alt="number icon"/></button>
            <button onClick={() => setActive("whatsapp")} style={active === "whatsapp" ? { opacity: 2, color: "white", borderRadius: "20px", fontWeight: "bold", width: "30vw" } : { opacity: 0.5, width: "20vw" , borderRadius: "20px" }}><img src="whatsapp.png" alt="whatsapp icon"/></button>
          </div>
      </div>
    )
}
