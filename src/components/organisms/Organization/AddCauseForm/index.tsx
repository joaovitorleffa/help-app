import React from 'react';
import { Control } from 'react-hook-form';
import { useRem } from 'responsive-native';
import { useTranslation } from 'react-i18next';

import { UpdateCauseDto } from '@dto/update-cause-dto';
import { InputForm } from '@molecules/Form/InputForm';

import { Container } from './styles';

interface AddCauseFormProps {
  control: Control;
  defaultValues?: UpdateCauseDto;
  errors: { [x: string]: any };
}

export function AddCauseForm({ control, defaultValues, errors }: AddCauseFormProps): JSX.Element {
  const { t } = useTranslation();

  const rem = useRem();

  return (
    <Container>
      <InputForm
        defaultValue={defaultValues?.title}
        style={{ marginTop: 24 }}
        name="title"
        control={control}
        error={errors?.title?.message}
        placeholder={t('common.title')}
      />
      <InputForm
        defaultValue={defaultValues?.description}
        style={{ marginTop: rem(0.8) }}
        name="description"
        control={control}
        error={errors?.description?.message}
        placeholder={t('common.description')}
        inputType="textArea"
      />
      <InputForm
        style={{ marginTop: rem(0.8) }}
        defaultValue={defaultValues?.type}
        name="type"
        control={control}
        items={[
          {
            value: 'donation',
            label: t('common.donation'),
          },
          {
            value: 'voluntary_work',
            label: t('common.voluntary_work'),
          },
        ]}
        error={errors?.type?.message}
        placeholder={t('common.type')}
        inputType="select"
      />
      <InputForm
        defaultValue={defaultValues?.endAt}
        style={{ marginTop: rem(0.8) }}
        name="endAt"
        control={control}
        error={errors?.end_at?.message}
        placeholder={t('common.end_at')}
        inputType="date"
      />
    </Container>
  );
}
