'use client'

import { FC, useMemo } from "react";
import styles from '@/app/_components/Stats/styles.module.css';
import { useAppContext } from "@/app/_contexts/app";
import Image from "next/image";

const Component: FC<{}> = () => {
  const { signs: { totalSigns}, fetched, fetching, fetchSigns, dispatch } = useAppContext();

  return useMemo(
    () => (
      <div className={styles.main}>
        {fetching && !fetched && (
          <>
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/icons/preloader.svg`} alt="Cargando" width={32} height={32} />
          </>
        )}
        <div className={styles.wrapper}>
          
          {!fetching && fetched && (
            <>
              <span>Ya firmaron <strong>{totalSigns}</strong> personas</span>
            </>
          )}
        </div>
      </div>    
    ), [
      totalSigns,
      fetching,
      fetched,
      fetchSigns,
      dispatch,
    ]
  )
}

export default Component;
