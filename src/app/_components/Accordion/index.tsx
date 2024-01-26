'use client'

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import styles from '@/app/_components/Accordion/styles.module.css';
import Image from "next/image";

type ItemType = {heading: string, content: string};

const data: Array<ItemType> = [
  {
    heading: 'Ley de Bosques',
    content: `
      <h2>¿Cómo podría afectar el proyecto de Ley Ómnibus si se aprueba?</h2>
      <p>Desde la sanción de la Ley de Bosques (2007) la deforestación bajó un 40% comparado a la década anterior. Gracias a la norma, en el 80% de los bosques del país se prohíben autorizar desmontes (Categorías rojo y amarillo).</p>
      <p>Se deben hacer estudios de impacto ambiental y audiencias públicas antes de aprobar un desmonte (en Categoría verde), y no se permite deforestar en territorios indígenas. Sin embargo, la mitad de los desmontes son ilegales.</p>
      <p>Las multas no están sirviendo para frenarlos. Ante esto, en 2023, mediante una Consulta Popular el 99% de un total de 260 mil argentinos se manifestó a favor de penalizar desmontes ilegales e incendios.</p>
      <p>Gracias a la presión de la gente y de organizaciones sociales de todo el país, el nuevo proyecto de Ley Ómnibus deja de permitir que los gobiernos provinciales autoricen desmontes donde hoy está prohibido, y arrasar impunemente bosques para producción agropecuaria (soja y ganadería) y desarrollos inmobiliarios.</p>
      <p>Pero en el nuevo proyecto se desfinancia la ley, lo que repercutirá seriamente en los controles al desmonte ilegal y los incendios forestales, y en el fomento de actividades sustentables en los bosques. </p>
      <p>La ley es una herramienta clave para salvar los bosques. No podemos permitir su destrucción.</p>
    `,
  },
  {
    heading: 'Ley de Glaciares',
    content: `
      <h2>¿Cómo podría afectar el proyecto de Ley Ómnibus si se aprueba?</h2>
      <p>La Ley Nacional de Glaciares sancionada por el Congreso en el año 2010 tiene como objetivo la protección de los glaciares y del ambiente periglacial. Al definir a los glaciares como bienes de carácter público, la ley busca: preservarlos como reservas estratégicas de agua, proteger la biodiversidad, cuidarlos como fuente de información científica y valorarlos también en su potencial turístico.</p>
      <h2>¿En qué afecta el proyecto de Ley?</h2>
      <p>El proyecto ley ómnibus cambiaría los artículos 1 y 2 de la ley para la preservación de los glaciares y del ambiente periglacial. Se realizaría una modificación en la ley a fin de habilitar la actividad económica en la zona periglaciar, es decir, el entorno que se encuentra alrededor del glaciar y que permite que éste exista.</p>
      <p>La actual protección prohíbe la actividad minera y petrolera en zonas periglaciares.  Este proyecto de ley ómnibus, elimina esa prohibición, con lo cual, no garantiza la protección de un ambiente complejo, que es resguardo de agua dulce y al que ya el calentamiento global puso en jaque. </p>
      <p>Muchos creen que para poder tener un desarrollo se debe explotar y terminar con nuestro planeta, pero eso es lo que las industrias quieren hacernos creer.</p>
      <p>La solución no es desmantelar la ley haciendo legal lo que hoy es ilegal, sino promover mayores controles y sanciones en pos de la protección del medio ambiente.</p>
    `,
  }
];

const AccordionTab: FC<ItemType> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen]);

  return useMemo(() => (
    <div className={`${styles.accordionTab} ${isOpen ? styles.open : ''}`}>
      <div className={styles.accordionTabButton} onClick={onClick}>
        <h1 className={styles.accordionTabHeading}>{props.heading}</h1>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/icons/right-arrow.svg`}
          alt={`Ver ${isOpen ? 'menos' : 'más'}`}
          width={20}
          height={20}
        />
      </div>
      <div className={styles.accordionTabContent} dangerouslySetInnerHTML={{__html: props.content}}/>
    </div>
  ), [isOpen])
};

const Accordion: FC<{}> = () => {
  return useMemo(
    () => (
      <div className={styles.accordion}>
        {data.map((item: ItemType, idx: number) => <AccordionTab key={idx} {...item} />)}
      </div>    
    ), [
    ]
  )
}

Accordion.displayName = 'Accordion';
export default Accordion;
