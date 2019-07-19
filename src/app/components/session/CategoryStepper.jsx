import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Session } from '../../types';

type Props = {
  activeStep: number,
  session: Session,
};

const CategoryStepper = (props: Props) => {
  const { activeStep, session } = props;
  const categoryTitles = session.categories.map(category => category.title);

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {categoryTitles.map(title => (
        <Step key={title}>
          <StepLabel>{title}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CategoryStepper;
