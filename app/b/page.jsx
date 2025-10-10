"use client";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "../styles/button.module.css";
import Link from "next/link";

export default function SwipeableCarousel() {
  const facultyList = ['PSC', 'LSC', 'BMS', 'ENG', 'AGR', 'DEN', 'EDU', 'ENV', 'MED', 'MGS', 'PHA', 'SPESSE', 'VNM'];
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? facultyList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === facultyList.length - 1 ? 0 : prev + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  facultyList[-1] = "VNM";

  return (
    <>    
    
    <div className={styles.container}>
      <h4>Select Faculty</h4>
      <div className="faculties">
      <span className={`${styles.card} ${styles.left}`}>
        <span className={styles.slideContent}><h3>{facultyList[current -1]}</h3></span>
         
    </span>
    <span  {...handlers} className={styles.mainCard}>
        <span className={styles.slideContent}><h3>{facultyList[current]}</h3></span>
         
    </span>
    <span className={`${styles.card} ${styles.right}`}>
        <span className={styles.slideContent}><h3>{facultyList[current +1]}</h3></span>
         
    </span>
    </div>
    {/* Left Button */}
        <button onClick={prevSlide} className={`${styles.navButton} ${styles.left}`}>
          &#8592;
        </button>

        {/* Right Button */}
        <button onClick={nextSlide} className={`${styles.navButton} ${styles.right}`}>
          &#8594;
        </button>
       
      

      <p className={styles.counter}>
        
        {current + 1} of {facultyList.length}
      </p>
      <footer>
      <Link href={facultyList[current]}> <button className="footerButton">Get Started</button></Link>
      </footer>
    </div>
    </>

  );
}
