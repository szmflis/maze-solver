import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { SpaceProps, space } from 'styled-system'
import { theme } from '../../styles/theme'
import sliders from '../../styles/variants/sliders'

interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const Slider: React.FC<SliderProps> = (props: SliderProps) => {
    return (
        <div className={props.className}>
            {props.label && <label>{props.label}</label>}
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={props.onChange}
                step={props.step}
                disabled={props.disabled}
            />
        </div>
    )
}

export interface StyledSliderProps extends SliderProps, SpaceProps {}

export const StyledSlider = styled(Slider)<StyledSliderProps>`
    display: flex;
    flex-direction: column;
    width: 100%;

    input {
        -webkit-appearance: none;
        appearance: none;
        cursor: pointer;

        width: 100%;
        height: 10px;
        background-color: ${theme.colors.greyLight};

        outline: none;
        opacity: 0.9;
        border-radius: 1rem;

        -webkit-transition: 0.2s;
        transition: opacity 0.2s;

        &:hover {
            opacity: 1;
        }

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            cursor: pointer;

            width: 20px;
            height: 20px;

            background-color: ${theme.colors.primary};
            border-radius: 1rem;
        }

        &::-moz-range-thumb {
            cursor: pointer;

            width: 20px;
            height: 20px;

            background-color: ${theme.colors.primary};
            border-radius: 1rem;
        }
    }

    label {
        margin-bottom: ${theme.space[1]};
    }

    
    ${space};

    ${(props) => props.disabled && sliders.disabled}
`
