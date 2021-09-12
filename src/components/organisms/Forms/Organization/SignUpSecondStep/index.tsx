import React, { useEffect } from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { ButtonIcon } from '@molecules/ButtonIcon';

import { Container, Wrapper, Row, ButtonWrapper } from './styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputForm } from '@molecules/Form/InputForm';
import { SecondStepData } from '@dto/sign-up-dto';
import { brasilApi } from '../../../../../services/api';
import { cepMask } from '@utils/mask';

interface SignUpSecondStepProps {
  handleNextStep: (data: SecondStepData) => void;
}

const schema = Yup.object().shape({
  cep: Yup.string().required('O CEP é obrigatório!').length(8, 'CEP inválido 1!'),
  number: Yup.string().required('O número é obrigatório'),
  city: Yup.string().required('A cidade é obrigatória!'),
  district: Yup.string().required('O bairro é obrigatório!'),
});

export function SignUpSecondStep({ handleNextStep }: SignUpSecondStepProps) {
  const rem = useRem();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const cep = watch('cep');

  const onSubmit = (data: SecondStepData) => {
    handleNextStep(data);
  };

  const fetchCep = async () => {
    try {
      const { data } = await brasilApi.get(`/cep/v1/${cep}`);
      if (isCep()) {
        setValue('city', data.city);
        setValue('district', data.neighborhood);
        clearErrors('city');
      }
    } catch (error) {
      console.log('[fetchCep] error:', error);
    }
  };

  const isCep = () => {
    return cep?.length === 8;
  };

  useEffect(() => {
    if (isCep()) {
      fetchCep();
    }
  }, [cep]);

  return (
    <Container>
      <Row>
        <InputForm
          control={control}
          name="cep"
          mask={cepMask}
          error={errors.cep && errors.cep.message}
          placeholder="CEP"
          maxLength={9}
          width="48%"
        />
        <InputForm
          control={control}
          name="number"
          error={errors.number && errors.number.message}
          placeholder="Número"
          width="48%"
        />
      </Row>
      <Wrapper>
        <InputForm
          control={control}
          name="city"
          error={errors.city && errors.city.message}
          placeholder="Cidade"
          autoCapitalize="words"
        />
      </Wrapper>
      <Wrapper>
        <InputForm
          control={control}
          name="district"
          error={errors.district && errors.district.message}
          placeholder="Bairro"
          autoCapitalize="words"
        />
      </Wrapper>

      {/* <Text fontFamily="regular">Horário de atendimento</Text>

      <Row style={{ marginTop: rem(0.4) }}>
        <Input placeholder="Início" width="48%" />
        <Input placeholder="Fim" width="48%" />
      </Row> */}

      <ButtonWrapper>
        <ButtonIcon
          title="Próximo"
          color={theme.colors.primary}
          textColor={theme.colors.title_secondary}
          onPress={handleSubmit(onSubmit)}
        />
      </ButtonWrapper>
    </Container>
  );
}
