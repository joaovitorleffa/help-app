import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { cepMask } from '@utils/mask';
import i18n from '@assets/locales/i18n';
import { brasilApi } from '@services/api';
import { SecondStepData } from '@dto/sign-up-dto';
import { useSignUpSteps } from '@hooks/useSignUpSteps';

import { ButtonIcon } from '@molecules/ButtonIcon';
import { InputForm } from '@molecules/Form/InputForm';

import { Container, Wrapper, Row, ButtonWrapper } from './styles';

interface SignUpSecondStepProps {
  handleNextStep: (data: SecondStepData) => void;
}

const schema = Yup.object().shape({
  cep: Yup.string().required(i18n.t('errors.fill_cep')).length(8, i18n.t('errors.invalid_cep')),
  number: Yup.string().required(i18n.t('errors.fill_number')),
  city: Yup.string().required(i18n.t('errors.fill_city')),
  district: Yup.string().required(i18n.t('errors.fill_district')),
});

export function SignUpSecondStep({ handleNextStep }: SignUpSecondStepProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { formData, serializeFormData } = useSignUpSteps();

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
    serializeFormData(data);
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
          placeholder={t('common.cep')}
          maxLength={9}
          width="48%"
          defaultValue={formData?.cep}
        />
        <InputForm
          control={control}
          name="number"
          error={errors.number && errors.number.message}
          placeholder={t('common.number')}
          width="48%"
          defaultValue={formData?.number}
        />
      </Row>
      <Wrapper>
        <InputForm
          control={control}
          name="city"
          error={errors.city && errors.city.message}
          placeholder={t('common.city')}
          autoCapitalize="words"
          defaultValue={formData?.city}
        />
      </Wrapper>
      <Wrapper>
        <InputForm
          control={control}
          name="district"
          error={errors.district && errors.district.message}
          placeholder={t('common.district')}
          autoCapitalize="words"
          defaultValue={formData?.district}
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
