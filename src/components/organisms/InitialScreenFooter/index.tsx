import React from 'react';

import { Button } from '../../molecules/Button';

import { Container, Wrapper } from './styles';

export function InitialScreenFooter() {
  return (
    <Container>
      <Wrapper>
        <Button title="Entrar" />
      </Wrapper>
      <Button title="Cadastrar" />
    </Container>
  );
}
