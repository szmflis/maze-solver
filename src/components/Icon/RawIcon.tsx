import React, { HTMLAttributes } from 'react'
import { icons } from './icons'
import { FlexBox } from '../FlexBox/FlexBox'

/* getting type of each icon for code suggestions */
export type IconType = keyof typeof icons

export interface RawIconProps extends HTMLAttributes<HTMLDivElement> {
  type: IconType

}

export const RawIcon: React.FC<RawIconProps> = (props: RawIconProps) => {
    return (
        <FlexBox className={props.className} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            {icons[props.type]}
        </FlexBox>
    )
}
