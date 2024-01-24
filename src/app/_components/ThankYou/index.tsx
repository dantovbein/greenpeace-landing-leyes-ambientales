'use client'

import { FC, useCallback } from "react";
import styles from '@/app/_components/ThankYou/styles.module.css';
import { useAppContext } from "@/app/_contexts/app";
import SocialShareNav from '@/app/_components/SocialShareNav'
import ContactForm from '@/app/_components/ContactForm'

interface IProps {
  children?: React.ReactNode;
}

export const Component:FC<IProps> = ({ children }) => {
  const { user, submitted, submitting, error, dispatch } = useAppContext();

  // const postData = useCallback(async () => {
  //   if(validate()) {
  //     if(window.navigator.onLine) {
  //       dispatch({ type: 'SUBMIT_FORM' });
        
  //       window.dataLayer.push({
  //         event: "formSubmission",
  //       });

  //       const signResponse = await fetch(
  //         `${process.env.NEXT_PUBLIC_GP_API}campaign/salva-las-leyes-ambientales/sign?form_id=${process.env.NEXT_PUBLIC_CONTACT_FORM_ID}&hb_campaign_field=votacion_leyes_ambientales`,
  //         {
  //           method: 'POST',
  //           headers,
  //           body: JSON.stringify({
  //             email: user.email,
  //             firstName: user.firstName,
  //             lastName: user.lastName,
  //             phoneNumber: user.phoneNumber || '',
  //             userAgent: window.navigator.userAgent.replace(/;/g, '').replace(/,/g, ''),
  //             fromUrl: window.location.search || '?',
  //           }),
  //         }
  //       );

  //       if(signResponse.ok) {
  //         dispatch({ type: 'SUBMITTED_FORM' });
  //       } else {
  //         const error = await signResponse.json();
  //         dispatch({
  //           type: 'FAILURE',
  //           error: error.errorMessage || 'Error',//'Hubo un error inesperado. Volvé a intentar en unos segundos.'
  //         });
  //       }
  //     } 
  //   } else {
  //     console.log('Formulario inválido')
  //   }
  // }, [
  //   user,
  //   dispatch,
  // ]);

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

  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>Gracias <span className={styles.highlighted}>{user.firstName || ''}</span> por tu firma.</h2>
      {/* { children } */}
      <ContactForm />
      {/* <div className={styles.contactForm}>
        <h3>Déjanos tu número de teléfono o WhatsApp para enviarte más información de la campaña</h3>
        <form>
          <input name='phoneNumber' type="text" value={user.phoneNumber} onChange={onChange}/>
          <nav className={styles.nav}>
            <button
              className={styles.submitBtn}
              type='submit'
              disabled={(submitting || submitted)}
            >
              {submitting ? 'ENVIANDO FIRMA...' :'FIRMAR'}
            </button>
          </nav>
        </form>
      </div> */}
      <SocialShareNav />
    </div>
  )
}

export default Component;
