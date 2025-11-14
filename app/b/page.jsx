"use client";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "../styles/button.module.css";
import Link from "next/link";

export default function SwipeableCarousel() {
  const facultyList = ['PSC', 'LSC', 'BMS', 'ENG', 'AGR', 'DEN', 'EDU', 'ENV', 'MED', 'MGS', 'PHA', 'SPESSE', 'VNM'];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("");
  const [animating, setAnimating] = useState(false);

  const prevSlide = () => {
    if (animating) return;
    setDirection("right");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? facultyList.length - 1 : prev - 1));
      setAnimating(false);
    }, 300);
  };

  const nextSlide = () => {
    if (animating) return;
    setDirection("left");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev === facultyList.length - 1 ? 0 : prev + 1));
      setAnimating(false);
    }, 300);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  facultyList[-1] = "VNM";

  return (
    <main className="main">    
      <h4>Select Faculty</h4><div className={styles.container}>
            <div {...handlers} className="faculties">
              <span
                className={`${styles.slideContent} ${
                  direction === "left" && animating
                    ? styles.slideLeft
                    : direction === "right" && animating
                    ? styles.slideRight
                    : ""
                }`}
              >
                 <span className={`${styles.card} ${styles.left}`}>
        <span className={styles.slideContent}><h3>{facultyList[current -1]}</h3></span>
         
    </span>
    <span  {...handlers} className={styles.mainCard}>
        <span className={styles.slideContent}><h3>{facultyList[current]}</h3></span>
         
    </span>
    <span className={`${styles.card} ${styles.right}`}>
        <span className={styles.slideContent}><h3>{facultyList[current +1]}</h3></span>
         
    </span>
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
    </main>

  );
}
