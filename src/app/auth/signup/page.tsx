'use client';
import React, {useState} from 'react';
import styles from '../../../styles/auth.module.scss';
import AuthContainer from './components/aunthContainer';
import SignupForm from './components/sigupForm';
import PersonalDetail from './components/PersonalDetail';



const Signup = () => {
  const [step, setStep] = useState<number>(1);


  const renderOnboardingForm = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <SignupForm setStep={setStep}/>;
      case 2:
        return <PersonalDetail setStep={setStep}/>;
      default:
        return <h1>No Form</h1>;
    }
  };

  return (
    <div className={styles.main_container}>
 
      <AuthContainer step={step}>{renderOnboardingForm(step)}</AuthContainer>
      

      
    </div>
  );
};

export default Signup;
