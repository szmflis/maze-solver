import React, { ButtonHTMLAttributes } from 'react'
import { Caption } from '../Typography/Typography'

export interface RawButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export const RawButton: React.FC<RawButtonProps> = (props: RawButtonProps) => {
    const { onClick, className, children, disabled, type, title } = props
    const onClickHandler = !disabled ? onClick : undefined

    return (
        <button className={className} onClick={onClickHandler} disabled={disabled} type={type} title={title}>
            <Caption>{children}</Caption>
        </button>
    )
}
