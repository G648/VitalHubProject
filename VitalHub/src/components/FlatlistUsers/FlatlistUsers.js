import { FlatList } from "react-native";
import styled from "styled-components/native";

export const FlatlistInfos = styled(FlatList)`
    width: ${({ width = '90%'}) => width};
    margin-top:2%;
    flex: 1;
`   