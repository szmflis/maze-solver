import React, { CanvasHTMLAttributes } from 'react'

export interface RawCanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
    innerref?: React.MutableRefObject<HTMLCanvasElement>
}

export const RawCanvas: React.FC<RawCanvasProps> = (props) => {
    return <canvas {...props} ref={props.innerref}/>
}
