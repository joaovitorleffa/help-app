import { AccountInfo } from '@molecules/AccountInfo';
import React from 'react';

import { Container } from './styles';

export function ProfileDescription() {
  return (
    <Container>
      <AccountInfo name="Ong 01" email="ong01@gmail.com" onLogout={() => {}} />
    </Container>
  );
}
