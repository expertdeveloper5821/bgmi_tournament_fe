'use client';
import TeamDetails from '@/Components/pageComponents/auth/TeamDetails/TeamDetails';
import AuthContainer from '@/Components/pageComponents/auth/authContainer';
import { onbStepType } from '@/Components/pageComponents/auth/authInterfaces';
import PersonalDetail from '@/Components/pageComponents/auth/personalDetails';
import SignupForm from '@/Components/pageComponents/auth/signup';

import React, { useState } from 'react';

const onbStepData: onbStepType[] = [
  {
    id: 1,
    title: 'Create Account',
    subTitle: 'Create account! Please enter your details',
  },
  {
    id: 2,
    title: 'Personal Detail',
    subTitle: 'To proceed further! Please enter all details',
  },
  {
    id: 3,
    title: 'Team Details',
    subTitle: 'To proceed further! Please enter all details',
  },
];

const Signup = () => {
  const [currentStep, setCurrentStep] = useState<onbStepType>({
    id: 1,
    title: 'Create Account',
    subTitle: 'Create account! Please enter your details',
  });

  const handleStepChange = (stepId: number) => {
    setCurrentStep(onbStepData.find((curStep: onbStepType) => curStep.id === stepId));
  };

  const renderOnboardingForm = (curStep: number) => {

    if(curStep > 3){
      return <h1>Thanks for the resitration</h1>
    }
    switch (curStep) {
      case 1:
        return <SignupForm handleStepChange={handleStepChange} currentStep={currentStep?.id} />;
      case 2:
        return <PersonalDetail handleStepChange={handleStepChange} currentStep={currentStep?.id} />;
      case 3:
        return <TeamDetails handleStepChange={handleStepChange} currentStep={currentStep?.id} />;
      default:
        return ;
    }
  };

  return (
    <AuthContainer title={currentStep?.title} subTitle={currentStep?.subTitle}>
      {renderOnboardingForm(currentStep?.id)}
    </AuthContainer>
  );
};

export default Signup;
