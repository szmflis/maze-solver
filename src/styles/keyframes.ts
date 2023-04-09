import { keyframes } from 'styled-components'

const FadeIn = keyframes`
  from {
    opacity: 0.3;
  }

  to {
    opacity: 1;
  }
`

const RotationClockwise = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

const RotationCounterclockwise = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-360deg);
  }
`

const FadeInScale = keyframes`
  from {
    opacity: 0.3;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`

const FadeInTranslateY = keyframes`
  from {
    opacity: 0.3;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const RotateTopBottom = keyframes`
  from {
    transform(rotate(0deg));
  }
  to {
    transform(rotate(180deg));
  }
`

export default {
    fadeIn: FadeIn,
    fadeInScale: FadeInScale,
    fadeInTranslateY: FadeInTranslateY,
    rotateTopBottom: RotateTopBottom,
    rotationClockwise: RotationClockwise,
    rotationCounterclockwise: RotationCounterclockwise
}
