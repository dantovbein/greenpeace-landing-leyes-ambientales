'use client'

import { FC, useEffect, useMemo, useState } from "react";
import styles from '@/app/_components/Logos/styles.module.css';

type LogoType = {name: string, image: string, url: string};

const Component: FC<{}> = () => {
  const [data, setData] = useState<Array<LogoType>>([]); 

  useEffect(() => {
    (async () => {
      const res = await (await fetch(`${process.env.NEXT_PUBLIC_GP_API}/campaign/salva-las-leyes-ambientales/ngo/list`)).json();
      if(res.data) {
        console.log(res.data)
        setData(res.data);
      }
      // ;
    })();
  }, []);

  return useMemo(
    () => (
      <section className={styles.main}>
        <h2>Promueven esta iniciativa</h2>
        <div className={styles.logos}>
          {data.map((logo: LogoType, idx: number) => {
            return <div
              key={idx}
              className={styles.logo}
              style={{backgroundImage: `url(${logo.image})`}}
            />
          })}
        </div>
      </section>
    ), [
      data,
    ]
  )
}

Component.displayName = 'Logos';
export default Component;
