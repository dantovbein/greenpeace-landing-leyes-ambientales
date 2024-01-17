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
      <div className={styles.ctaBtn} onClick={() => {
        const el = document.getElementById("feedback-form");
        if(el) el.scrollIntoView({
          behavior: 'smooth',
        });
      }}>FIRMAR AHORA</div>
      <br/><br/>
      <p>El proyecto de Ley Ómnibus, recientemente enviado por el Poder Ejecutivo al Congreso de la Nación, incluye modificaciones a varias leyes ambientales, como las de bosques y glaciares, que se lograron por la fuerte presión de la sociedad. Los cambios propuestos ponen en serio riesgo el futuro de ecosistemas vitales para enfrentar la actual crisis climática y de biodiversidad en la que nos encontramos.</p>
      <p>Esta regresión de derechos ambientales conquistados es completamente inadmisible. Las normas que pretenden modificarse fueron el resultado de largos debates democráticos y no deben cambiarse en beneficio de sectores corporativos, lo que provocará la destrucción impune de bosques y glaciares, entre otros ecosistemas.</p>
      <p><strong>¡Exigí a los legisladores que no modifiquen las leyes ambientales incluidas en el proyecto de Ley Ómnibus!</strong></p>
      <FeedbackForm/>
      <Accordion />
      <section className={styles.ngosWrapper}>
        <h2>Promueven esta iniciativa</h2>
        <div className={styles.logos}>
          {[
            '89fa5fe1-a7be-472c-f019-b01016bf0100',
            '361dc8ad-558c-4ef2-a666-f9e9c77a3300',
            '2d341705-3b0d-47b7-7f07-310d9458bf00',
            '3fc6346a-57ed-4dc5-1a33-f91c4f679a00',
            '25d9ba6b-4341-44b4-9dcd-9c59788a7500',
            '191561c8-fea6-408d-59e0-206f602ec200',
            '23a11a92-867b-4823-f9d9-6f7ebb23a500',
            'cd5a8b16-9122-4ca7-72d7-9a306a744e00',
            '02e29d87-7435-4287-6580-ccd24eceb200',
            'cddbf9c0-bb80-410d-72cb-32826928c500',
            '21b6a2bb-fded-4f83-7ffe-0279623e4a00',
            '40c4499c-88b2-43c3-6628-2ade03663600',
            'd2af474b-c9fa-4257-ebde-1027b14fc800',
            '41f90765-02d7-447a-125e-255689029700',
            'a21ede4d-d93a-451e-5595-17a69dbf4000',
            'ef5422ad-2157-468f-d761-abc1f202c700',
            '1b371110-5435-47c6-e6a9-6b29939aae00',
            'ba870d0e-6ddf-43f3-5aa6-f2378fda7c00',
            '0d3be854-8849-408e-c5b5-93c5dffc7d00',
            'fe8d1544-ee19-4206-0564-5963499e3600',
            'c2fd9752-2fd7-4c04-5eb4-ec4a75d61300',
            '2f95adf8-69dc-4008-05d9-d44771e6a500',
            'd69f5ef7-a294-44c0-a058-b88860ec5100',
            '052748a0-9ae1-4c50-e79b-8942b28fd900',
            'e37fcf9c-30f9-42ca-516d-32a583f1cc00',
            '02fa065d-a9e0-45f6-de21-2f508ca2cb00',
            '85e2cb91-e0a8-4da1-c595-398f6a989c00',
            'a3aec85e-4bb0-4d74-c650-5cd2271c6900',
            'ffa3e008-1bd5-484b-7d9a-9be67cc35300',
            '1fc87741-0927-4f1b-501e-6f5c7d316a00',
            'f64f89c9-35ef-471b-bffb-35b2a1ec2000',
            '34386ac1-b507-4b21-d2cb-dfed47398e00',
          ].map((logo: string) => {
            return <div
              key={logo}
              className={styles.logo}
              style={{backgroundImage: `url(https://imagedelivery.net/4UjGyQauyQ4cqduHdPPkww/${logo}/public)`}}
            />
          })}
        </div>
      </section>
    </section>
  )
}

