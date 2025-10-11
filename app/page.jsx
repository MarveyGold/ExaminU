"use client";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./styles/home.module.css";
import Link from "next/link";

export default function SwipeableCarousel() {
  const slides = ["School Exam", "Post Utme"];
  const links = ['b', 'asp']
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <>    
    <div className={styles.container}>
    <h4>Select Exam</h4>
      
      <div {...handlers} className={styles.card}>
        <span className={styles.slideContent}><h3>{slides[current]}</h3></span>
    </div>
        <button onClick={prevSlide} className={`${styles.navButton} ${styles.left}`}>
          &#8592;
        </button>

        <button onClick={nextSlide} className={`${styles.navButton} ${styles.right}`}>
          &#8594;
        </button>
      

      <p className={styles.counter}>
        {current + 1} of {slides.length}
      </p>
      <footer>
      <Link href={links[current]}> <button className="footerButton">Get Started</button></Link>
      </footer>
    </div>
    </>

  );
}
