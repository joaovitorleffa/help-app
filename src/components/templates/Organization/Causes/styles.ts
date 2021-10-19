import { CauseDto } from '@dto/cause-dto';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const List = styled(FlatList as new () => FlatList<CauseDto>)``;
