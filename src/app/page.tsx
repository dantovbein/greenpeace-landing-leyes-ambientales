'use client'

import FeedbackForm from '@/app/_components/FeedbackForm'
import { useAppContext } from './_contexts/app'
import { useEffect } from 'react';
import styles from '@/app/page.module.css'
import Stats from '@/app/_components/Stats'
import Accordion from './_components/Accordion';

export default function Home() {
  const { fetchSigns } = useAppContext();

  useEffect(() => {
    fetchSigns()
  }, [])
  
  return (
    <section className={styles.main}>
      <Stats />
      <p>El proyecto de Ley Ómnibus, recientemente enviado por el Poder Ejecutivo al Congreso de la Nación, incluye modificaciones a varias leyes ambientales, como las de bosques y glaciares, que se lograron por la fuerte presión de la sociedad. Los cambios propuestos ponen en serio riesgo el futuro de ecosistemas vitales para enfrentar la actual crisis climática y de biodiversidad en la que nos encontramos.</p>
      <p>Esta regresión de derechos ambientales conquistados es completamente inadmisible. Las normas que pretenden modificarse fueron el resultado de largos debates democráticos y no deben cambiarse en beneficio de sectores corporativos, lo que provocará la destrucción impune de bosques y glaciares, entre otros ecosistemas.</p>
      <p><strong>¡Exigí a los legisladores que no modifiquen las leyes ambientales incluidas en el proyecto de Ley Ómnibus!</strong></p>
      <Accordion />
      <FeedbackForm />
    </section>
  )
}

