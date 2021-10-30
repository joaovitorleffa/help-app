import React from 'react';

import { SectionHeader } from '@molecules/SectionHeader';
import { InitialScreenFooter } from '@organisms/Common/InitialScreenFooter';

import { Container, Content } from './styles';

interface InitialScreenProps {
  title: string;
  subtitle: string;
}

export function InitialScreen({ title, subtitle }: InitialScreenProps): JSX.Element {
  return (
    <Container>
      <Content>
        <SectionHeader title={title} subtitle={subtitle} />
        <InitialScreenFooter />
      </Content>
    </Container>
  );
}
