import styled from 'styled-components'
import { border, BorderProps, position, PositionProps, space, SpaceProps } from 'styled-system'
import { RawCanvas, RawCanvasProps } from './RawCanvas'
import { color, ColorProps } from '../../styles/colorOverride'

interface CanvasProps extends
    RawCanvasProps,
    SpaceProps,
    BorderProps,
    ColorProps,
    PositionProps {
}

export const Canvas = styled(RawCanvas)<CanvasProps>`
    object-fit: contain;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    ${color};
    ${space};
    ${border};
    ${position};
`
