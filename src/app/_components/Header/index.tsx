"use client"

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '@/app/_components/Header/styles.module.css'

const pictures: Array<string> = [
  // 'https://imagedelivery.net/4UjGyQauyQ4cqduHdPPkww/acdc174d-5c4a-4b41-af3a-d87756472200/public',
  // 'https://imagedelivery.net/4UjGyQauyQ4cqduHdPPkww/04fe415b-9269-443f-434b-395060692400/public',
];

export default function Header() {
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [windowInnerWidth, setWindowInnerWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowInnerWidth(window.innerWidth);
    }

    const interval = setInterval(() => {
      setCurrentSlide(i => i === pictures.length - 1 ? 0 : ++i);
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return useMemo(() => (
    <header className={styles.main}>
      <div className={styles.topBar}>
        <h4>#SalvaLasLeyesAmbientales</h4>
      </div>

      {/* <div className={styles.slider}>
        <div
          ref={sliderWrapperRef}
          className={styles.sliderWrapper}
          style={
            {
              width: `${pictures.length*100}%`,
              transform: `translateX(-${windowInnerWidth*currentSlide}px)`,
            }
          }>
          {pictures.map((picture: string, index: number) => (
            <div 
              key={index}
              className={styles.sliderItem} 
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${picture})`}}
            />
          ))}
        </div>
      </div> */}
      <div className={styles.videoPlayer}>
      <iframe width="800" height="500" src="https://www.youtube.com/embed/7VaSqZ_jniY?si=G0AXlUpi1ErQCr2O" title="Salva las Leyes Ambientales" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
      {/* <div className={styles.headerText}>
        <div className={styles.urgentIcon} />
        <h1 className={styles.heading}><span className={styles.highlighted}>BOSQUES Y GLACIARES EN PELIGRO</span></h1>
      </div> */}
    </header>
  ), [
    currentSlide,
    windowInnerWidth,
  ]);
}
