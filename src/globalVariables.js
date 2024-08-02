import styled, { css } from 'styled-components';

// export const breakpoints = {
//   phone: '480px',
//   tablet: '640px',
//   laptop: '1024px',
//   desktop: '1280px',
// };

export const Box = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  align-items: ${(props) => props.$alignItems};
  justify-content: ${(props) => props.$justifyContent};
  gap: ${(props) => props.$gap};
  width: ${(props) => props.$width};
  max-width: ${(props) => props.$maxWidth};
  height: ${(props) => props.$height};
  max-height: ${(props) => props.$maxHeight};
  background-color: ${(props) => props.$backgroundColor};
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
`;

Box.defaultProps = {
  $direction: 'row',
  $alignItems: 'flex-start',
  $justifyContent: 'flex-start',
  $gap: 0,
  $width: '100%',
  $height: '100%',
  $backgroundColor: 'transparent',
  $padding: 0,
  $margin: 0,
};

// SECTIONS/FORMS/HEADINGS TITLE STYLES
const getTitleStyles = (props) => css`
  color: var(--color-white);
  font-size: var(--font-size-2xl);
  letter-spacing: var(--letter-spacing-sm);
  word-spacing: var(--word-spacing-xs);

  ${props.$titleCustomStyles}
`;

export const Title = styled.h3`
  ${getTitleStyles}
`;

Title.defaultProps = {
  $titleCustomStyles: '',
};

// INPUT STYLES
const getInputStyles = (props) => css`
  outline: none;
  border: 0.15rem solid var(--color-gray-dark);
  width: auto;
  color: var(--color-white);
  background-color: transparent;
  font-size: var(--font-size-base);
  padding: calc(var(--padding-sm) / 2) var(--padding-sm);
  border-radius: calc(var(--border-rounded-xs) / 2);
  letter-spacing: var(--letter-spacing-xs);
  transition: all 0.35s ease;

  &::placeholder {
    color: var(--color-gray-light);
  }

  &:disabled {
    border: 0.15rem solid var(--color-gray-dark);
    background-color: rgba(51, 51, 51, 0.35);
    background-color: transparent;
    opacity: 0.75;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    background-color: rgba(30, 27, 75, 0.5);
    caret-color: var(--color-white);
    border-color: var(--color-main-400);
    color: var(--color-white);
  }

  ${props.$inputCustomStyles}
`;

export const Input = styled.input`
  ${getInputStyles}
`;

Input.defaultProps = {
  $inputCustomStyles: '',
};

// LABEL STYLES
const getLabelStyles = (props) => css`
  color: var(--color-white);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-xs);

  ${props.$labelCustomStyles}
`;

export const Label = styled.label`
  ${getLabelStyles}
`;

Label.defaultProps = {
  $labelCustomStyles: '',
};

// BUTTONS STYLES
const getButtonStyles = (props) => css`
  text-align: center;
  outline: none;
  border: 0.15rem solid var(--color-main-400);
  width: 12rem;
  background-color: var(--color-main-950);
  color: var(--color-main-400);
  padding: calc(var(--padding-sm) / 2) 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  border-radius: calc(var(--border-rounded-xs) / 2);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-sm);
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.35s ease;

  &:active {
    transform: translateY(0.2rem);
  }

  &:disabled {
    color: var(--color-white);
    border-color: var(--color-gray-light);
    background-color: var(--color-gray-light);
    opacity: 0.75;
    cursor: not-allowed;
  }

  &:hover {
    color: var(--color-main-500);
    border-color: var(--color-main-500);
  }

  &:hover:disabled {
    background-color: var(--color-gray-dark);
    color: var(--color-white);
  }

  &:focus {
    outline: none;
  }

  ${props.$buttonCustomStyles}
`;

export const Button = styled.button`
  ${getButtonStyles}
`;

Button.defaultProps = {
  $buttonCustomStyles: '',
};
