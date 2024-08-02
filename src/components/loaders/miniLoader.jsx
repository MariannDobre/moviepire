import styled, { keyframes } from 'styled-components';
import { ImSpinner11 } from 'react-icons/im';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const MiniLoader = styled(ImSpinner11)`
  width: 1.4rem;
  height: 1.4rem;
  animation: ${rotate} 1.5s infinite linear;
`;

export default MiniLoader;
