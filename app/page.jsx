import { Nav, Contact, Auth } from "./components/indexComponents";
import Link from "next/link";
import Logo from "./components/logo";

export default function Index() {

  return (
<div className="index">
  <header className="indexHeader">
    <img className="uniben" src="favicon.ico" alt="examinu" />
    <div className="logo">ExaminU</div>
    <Nav/>
    <Auth className="desktop"/>
  </header>  
  <section className="hero">
    <div className="background">
      <div className="hero-text">
        <h1>Get Started with your mock Exam Practice</h1>
        <p>Prepare for your exams in a smarter way</p>
        <Link href="/app"> <button>Get Started</button></Link>
      
      </div>
      <div className="hero-image">
        <img className="book float" src="3d-illustration-reading-with-book-esssential_23-2151295086.png"/>
        <img className="man float" src="man-removebg-preview.png" alt="3D students illustration" />
     
      </div>
    </div>
  <div className="others">
    <div className="practice" id="practice">
 <img className="imgdesc" src="857524.png" alt="null" />
      <div className="title1">
        <h3>Browse Courses</h3>
      <div className="bod">find and browse over 20 available courses with ease</div>
      </div>
    </div>
    <div className="practice" >
 <img className="imgdesc" src="4690558-200.png" alt="null" />
      <div className="title2">
      <h3>Practice PQ</h3>
       <div className="bod">answer previous sessions' questions on one click</div>
      </div>
     
    </div>
  </div>
  <Contact/>
  
</section>
</div>
  )
}
