import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { BsPlayCircle } from 'react-icons/bs';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const Slider = styled.div`
  display: flex;
  position: relative;
  max-width: 92rem;
  max-height: 56rem;
  overflow: hidden;
`;

const Item = styled.div`
  --width: 100%;
  --height: 56rem;
  --padding: 2rem;

  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
  flex-grow: 0;
  gap: 2rem;
  width: var(--width);
  height: var(--height);
  padding: var(--padding);
  cursor: pointer;

  div {
    --font-size-h4: 2.8rem;
    --font-size-p: 1.6rem;
    --font-size-svg: 6.8rem;

    display: flex;
    align-items: flex-start;
    gap: 1.6rem;

    div {
      flex-direction: column;
      gap: 0.4rem;
    }

    svg {
      align-self: center;
      color: var(--color-white);
      font-size: var(--font-size-svg);
      transition: color 0.35s ease;
    }

    h4 {
      color: var(--color-white);
      font-size: var(--font-size-h4);
      letter-spacing: var(--letter-spacing-xs);
      word-spacing: var(--word-spacing-xs);
    }

    p {
      color: var(--color-gray-light);
      font-size: var(--font-size-p);
      letter-spacing: var(--letter-spacing-xs);
      word-spacing: var(--word-spacing-xs);
    }
  }

  &:hover > div > svg,
  &:active > div > svg {
    color: #fab005;
  }
`;

const Poster = styled.img`
  --width: calc(16rem + 2rem);
  --height: 28rem;

  width: var(--width);
  height: var(--height);
  background: no-repeat center / cover;
`;

const Button = styled.button`
  outline: none;
  border: 0.1rem solid var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6.8rem;
  width: 4.8rem;
  position: absolute;
  top: 25%;
  font-size: var(--font-size-3xl);
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: calc(var(--border-rounded-xs) / 2);
  cursor: pointer;
  transition: all 0.35s ease;

  svg {
    color: var(--color-white);
  }

  &:focus {
    outline: none;
  }

  &:hover {
    svg {
      color: #fab005;
    }
  }
`;

function MainSlider({ data, currentIndex, setCurrentIndex }) {
  const navigate = useNavigate();

  function prevSlide() {
    setCurrentIndex((index) => {
      if (index === 0) return data.length - 1;
      return index - 1;
    });
  }

  function nextSlide() {
    setCurrentIndex((index) => {
      if (index === data.length - 1) return 0;
      return index + 1;
    });
  }

  function handleWatchTrailer() {
    navigate(
      `/title-id/${data[currentIndex].id}/trailer-id/${data[currentIndex].movieName}`
    );
  }

  return (
    <Slider>
      {data.map((item, index) => (
        <Item
          key={index}
          onClick={handleWatchTrailer}
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0),
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.75),
              rgba(0, 0, 0, 0.95),
              rgba(0, 0, 0, 1)
              ), url(${item.movieBg}) no-repeat center / cover`,
            translate: `${-100 * currentIndex}%`,
            transition: 'translate 0.35s ease-in-out',
          }}
        >
          <Poster
            src={item.moviePoster}
            alt={`Poster of ${item.movieName}`}
          />

          <div>
            <BsPlayCircle />

            <div>
              <h4>
                {item.movieStars[0]}&nbsp;in&nbsp;"{item.movieName}"
              </h4>

              <p>Watch the Trailer</p>
            </div>
          </div>
        </Item>
      ))}

      <Button
        onClick={prevSlide}
        style={{ left: 0 }}
      >
        <MdNavigateBefore />
      </Button>

      <Button
        onClick={nextSlide}
        style={{ right: 0 }}
      >
        <MdNavigateNext />
      </Button>
    </Slider>
  );
}

export default MainSlider;
