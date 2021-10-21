import { Text } from '@atoms/Text';
import React from 'react';

import { useTheme } from 'styled-components';

import { Container } from './styles';

interface ImageViewerFooterProps {
  imageIndex: number;
  total: number;
}

const ImageViewerFooter = ({ imageIndex, total }: ImageViewerFooterProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Container>
      <Text fontFamily="medium" color={theme.colors.title_secondary}>
        {imageIndex + 1}
      </Text>
      <Text fontFamily="medium" color={theme.colors.title_secondary}>
        /
      </Text>
      <Text fontFamily="medium" color={theme.colors.title_secondary}>
        {total}
      </Text>
    </Container>
  );
};

export default ImageViewerFooter;
