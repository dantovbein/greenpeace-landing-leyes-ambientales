'use client'

import FeedbackForm from '@/app/_components/FeedbackForm'
import { useAppContext } from './_contexts/app'
import { useEffect } from 'react';
import styles from '@/app/page.module.css'
import Stats from '@/app/_components/Stats'

export default function Home() {
  const { fetchVotes, quiz: { totalVotes}, fetched } = useAppContext();

  useEffect(() => {
    fetchVotes()
  }, [])
  
  return (
    <section className={styles.main}>
      {/* <h1 style={{textAlign: 'center'}}></h1><br/> */}
      {/* <p>Ante la pregunta <strong>¿Estás de acuerdo con que se establezcan penas de prisión para los responsables de desmontes ilegales e incendios forestales?</strong> <strong className={styles.highlighted}>el 99% de las personas votaron a favor</strong>.</p> */}
      {/* <Stats /> */}
      <p>El proyecto de Ley Ómnibus, recientemente enviado por el Poder Ejecutivo al Congreso de la Nación, incluye modificaciones a varias leyes ambientales, como las de bosques y glaciares, que se lograron por la fuerte presión de la sociedad. Los cambios propuestos ponen en serio riesgo el futuro de ecosistemas vitales para enfrentar la actual crisis climática y de biodiversidad en la que nos encontramos.</p>
      <p>Esta regresión de derechos ambientales conquistados es completamente inadmisible. Las normas que pretenden modificarse fueron el resultado de largos debates democráticos y no deben cambiarse en beneficio de sectores corporativos, lo que provocará la destrucción impune de bosques y glaciares, entre otros ecosistemas.</p>
      <p><strong>¡Exigí a los legisladores que no modifiquen las leyes ambientales incluidas en el proyecto de Ley Ómnibus!</strong></p>
      <FeedbackForm />
      <p className={styles.secondary}>Al firmar la petición automáticamente le estará llegando un correo a los legisladores con tu reclamo. Compartí para que nuestra presión crezca y podamos salvar las leyes ambientales.</p>
      {/* <div className={styles.logo} style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_ASSET_PREFIX}images/gp-bosques-logo.svg)`}}/> */}
    </section>
  )
}

