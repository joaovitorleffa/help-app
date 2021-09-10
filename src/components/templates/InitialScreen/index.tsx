import React from 'react';

import { SectionHeader } from '@molecules/SectionHeader';
import { InitialScreenFooter } from '@organisms/InitialScreenFooter';

import { Container, Content } from './styles';

interface InitialScreenProps {
  title: string;
  subtitle: string;
}

export function InitialScreen({ title, subtitle }: InitialScreenProps) {
  return (
    <Container>
      <Content>
        <SectionHeader title={title} subtitle={subtitle} />
        <InitialScreenFooter />
      </Content>
    </Container>
  );
}
