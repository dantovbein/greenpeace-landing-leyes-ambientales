"use client"

import React, { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/_components/FeedbackForm/styles.module.css'
import { useAppContext } from "@/app/_contexts/app";
import { headers } from '@/utils/data';
import { validateEmail, validateFirstName, validateFullName, validateLastName } from '@/utils/validator';

declare const window: Window & { dataLayer: Record<string, unknown>[]; };

export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;

export const Component:FC<{}> = () => {
  const { user, submitted, submitting, error, dispatch } = useAppContext();
  const userRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onChangeQuestion = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'UPDATE_FIELD',
        payload: {
          ['answer']: parseInt(evt.currentTarget.value),
        },
      })
    },
    [ dispatch ]
  )

  const onClickQuestion = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault()

      dispatch({
        type: 'UPDATE_FIELD',
        payload: {
          ['answer']: parseInt((evt.currentTarget as any).dataset.value),
        },
      })
    },
    [ dispatch ]
  )

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
  )

  const validate = useCallback(() => {
    let isValid = true;
    const checks = [
      // validateFullName(user.fullName),
      validateFirstName(user.firstName),
      validateLastName(user.lastName),
      // validateCitizenId(user.docNumber),
      // validatePhoneNumber(user.phoneNumber),
      validateEmail(user.email),
      // validateEmptyField(user.province),
    ]

    console.log(checks)

    checks.forEach((check:any) => {
      if(isValid && !check.isValid) {
        isValid = false
        dispatch({
          type: 'ERROR',
          payload: { error: check.errorMessage || null },
        })
        return
      }
    })

    if(isValid) {
      dispatch({
        type: 'ERROR',
        payload: { error: null },
      })
    }

    return isValid
  }, [
    user,
    dispatch,
  ])
  
  const postData = useCallback(async () => {
    if(validate()) {
      if(window.navigator.onLine) {
        dispatch({ type: 'SUBMIT_FORM' });
        
        const signResponse = await fetch(
          `${process.env.NEXT_PUBLIC_GP_API}campaign/salva-las-leyes-ambientales/sign?form_id=${process.env.NEXT_PUBLIC_CONTACT_FORM_ID}&hb_campaign_field=votacion_leyes_ambientales`,
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

        if(signResponse.ok) {
          window.dataLayer.push({
            event: "formSubmission",
          });
          
          dispatch({ type: 'SUBMITTED_FORM' });
        } else {
          const error = await signResponse.json();
          dispatch({
            type: 'FAILURE',
            error: error.errorMessage || 'Error',//'Hubo un error inesperado. Volvé a intentar en unos segundos.'
          });
        }
      } 
    } else {
      console.log('Formulario inválido')
    }
  }, [
    user,
    dispatch,
  ]);

  const onSubmit = useCallback(
    async (evt: React.FormEvent) => {
      console.log('Submit')
      evt.preventDefault();
      postData();
    },
    [ postData ]
  );

  useEffect(() => {
    if(submitted) {
      router.push(`/thank-you`)
    }
  }, [
    submitted,
    router,
  ])

  return useMemo(() => (
    <form id='feedback-form' className={styles.main} onSubmit={onSubmit}>
      <h2 className={styles.subHeading}>Si querés sumar tu apoyo a la campaña y recibir información, completá el siguiente formulario:</h2>
      <div ref={userRef} className={styles.userSection}>
        <div className={styles.row}>
          <div className={styles.column}>
            <label htmlFor='firstName'>
              <input
                name='firstName'
                placeholder='Nombre (*)'
                value={user.firstName}
                minLength={2}
                onChange={onChange}
              />
            </label>
          </div>
          <div className={styles.column}>
            <label htmlFor='lastName'>
              <input
                name='lastName'
                placeholder='Apellido (*)'
                value={user.lastName}
                minLength={2}
                onChange={onChange}
              />
            </label>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label htmlFor='email'>
              <input onChange={onChange} type='email' name='email' placeholder='Correo electrónico (*)' value={user.email} />
            </label>
          </div>
          <div className={styles.column} style={{display: 'none'}}>
            <label htmlFor='phoneNumber'>
              <input onChange={onChange} type='phoneNumber' name='phoneNumber' placeholder='Número de teléfono' value={user.phoneNumber} />
              <small>(*) opcional</small>
            </label>
          </div>
        </div>
      </div>
      <nav className={styles.nav}>
        <button
          className={styles.submitBtn}
          type='submit'
          disabled={(submitting || submitted)}
        >
          {submitting ? 'ENVIANDO FIRMA...' :'FIRMAR'}
        </button>
      </nav>
      {(error) && <span className={styles.error}>{error}</span>}
      <span style={{marginTop: '30px', textAlign: 'center'}}>Al firmar la petición automáticamente le estará llegando un correo a los legisladores con tu reclamo. Compartí para que nuestra presión crezca y podamos salvar las leyes ambientales.</span>
    </form>
  ), [
    user,
    submitting,
    submitted,
    error,
    userRef,
    validate,
    onChange,
    onChangeQuestion,
    onClickQuestion,
    onSubmit,
  ]);
}

Component.displayName = 'FeedbackForm'
export default Component
