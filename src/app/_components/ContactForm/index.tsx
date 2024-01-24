"use client"

import React, { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useMemo } from 'react';
import { useAppContext } from "@/app/_contexts/app";
import { headers } from '@/utils/data';
import styles from '@/app/_components/ContactForm/styles.module.css'

export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;

export const Component:FC<{}> = () => {
  const { user, submitted, submitting, error, dispatch } = useAppContext();
  
  const postData = useCallback(async () => {
    dispatch({ type: 'SUBMIT_FORM' });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GP_API}forma/form/${process.env.NEXT_PUBLIC_EXTRA_CONTACT_FORM_ID}/record`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber || '',
          userAgent: window.navigator.userAgent.replace(/;/g, '').replace(/,/g, ''),
          fromUrl: window.location.search || '?',
        }),
      }
    );

    if(response.ok) {
      dispatch({ type: 'SUBMITTED_FORM' });
    } else {
      const error = await response.json();
      dispatch({
        type: 'FAILURE',
        error: error.errorMessage || 'Error',
      });
    }
  }, [
    user,
    dispatch,
  ]);

  const onChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      evt.preventDefault();
      dispatch({
        type: 'UPDATE_FIELD',
        payload: {
          [`${evt.currentTarget.name}`]: evt.currentTarget.value,
        },
      })
    },
    [ dispatch ]
  );
  
  const onSubmit = useCallback(
    async (evt: React.FormEvent) => {
      console.log('Submit')
      evt.preventDefault();
      postData();
    },
    [ postData ]
  );

  useEffect(() => {
    dispatch({type: 'RESET_FORM'});
  }, []);

  return useMemo(() => (
    <div className={styles.main}>
      <h3>Déjanos tu número de teléfono o WhatsApp para enviarte más información de la campaña</h3>
      {submitted ? (
        <p className={styles.message}>Datos enviados correctamente.</p>
      ) : (
        <form id='contact-form' className={styles.main} onSubmit={onSubmit}>
          <input name='phoneNumber' type="text" value={user.phoneNumber} onChange={onChange} placeholder='Número telefónico'/>
          <nav className={styles.nav}>
            <button
              className={styles.submitBtn}
              type='submit'
              disabled={(submitting || submitted)}
            >
              {(submitting && !submitted) ? 'ENVIANDO...' :'ENVIAR'}
            </button>
          </nav>
        </form>
      )}
     </div>
  ), [
    user,
    submitting,
    submitted,
    error,
    postData,
    onChange,
    onSubmit,
  ]);
}

Component.displayName = 'ContactForm'
export default Component

