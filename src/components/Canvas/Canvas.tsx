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
    /* background-color: rgba(255,255,255,0.45); */
    width: 100%;
    ${color};
    ${space};
    ${border};
    ${position};
`
