import React from 'react';

import { FirstStepTemplate } from '@templates/Organization/SignUpTemplate/FirstStepTemplate';

import { Container } from './styles';

export function FirstStep(): JSX.Element {
  return (
    <Container>
      <FirstStepTemplate />
    </Container>
  );
}
