'use client'

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import styles from '@/app/_components/Accordion/styles.module.css';

type ItemType = {heading: string, content: string};

const data: Array<ItemType> = [
  {
    heading: 'Ley de Bosques',
    content: `
      <h2>¿Cómo podría afectar el proyecto de Ley Ómnibus si se aprueba?</h2>
      <p>Desde la sanción de la Ley de Bosques (2007), la deforestación disminuyó notoriamente comparado a la década previa a la ley, cuando se desmontaban anualmente 300.000 hectáreas.</p>
      <p>En la actualidad continúan los desmontes ilegales en un menor porcentaje previo a la Ley de Bosques. Por esta razón, durante el 2023 realizamos una Consulta Popular para saber si  queremos que los empresarios y especuladores se tomen la Ley de Bosques en serio y paguen por sus crímenes en la cárcel. El 99% de un total de 260 mil votos se manifestó a favor de condenar la deforestación ilegal como un crimen ambiental.</p>
      <p>La solución no es autorizar más desmontes de bosques nativos, ni blanquear crímenes ambientales promoviendo la desaparición de especies en peligro de extinción.</p>
      <p>La solución no es desmantelar o reducir la ley haciendo legal lo que hoy es ilegal, sino implementar mayores controles y sanciones a quienes desmontan. Sin ley, retrocedemos.</p>
      <p>Sin ley, no habrá bosques. Sin bosques, estaremos más cerca de nuestra propia extinción. Es urgente frenar su destrucción.</p>
      <p>Las cuestiones ambientales consideradas en la Ley Ómnibus que el gobierno ha entregado al Congreso contienen regresiones ambientales inaceptables que liquidan el trabajo de cientos de miles de personas que han ayudado a conservar el medio ambiente y el patrimonio ambiental de Argentina.</p>
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
        <button>Ver {isOpen ? 'menos' : 'más'}</button>
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
