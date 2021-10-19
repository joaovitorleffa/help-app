import React from 'react';

import { Text } from '@atoms/Text';

import { Container, Page } from './styles';
import { useTheme } from 'styled-components';

interface PaginationProps {
  currentPage: number;
  pages: number;
  maxPages: number;
  maxPagesLeft: number;
  onChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  maxPages,
  maxPagesLeft,
  pages,
  onChange,
}: PaginationProps): JSX.Element => {
  const theme = useTheme();

  const maxFirst = Math.max(pages - (maxPages - 1), 1);
  const first = Math.min(Math.max(currentPage - maxPagesLeft, 1), maxFirst);

  return (
    <Container>
      {Array.from({ length: Math.min(maxPages, pages) })
        .map((_, index) => index + first)
        .map((page) => (
          <Page key={page} isActive={page === currentPage} onPress={() => onChange(page)}>
            <Text color={page === currentPage ? theme.colors.title_secondary : theme.colors.title}>
              {page}
            </Text>
          </Page>
        ))}
    </Container>
  );
};
