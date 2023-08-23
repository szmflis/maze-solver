import React, { useState, SelectHTMLAttributes, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Icon } from '../Icon/Icon'

const RotatingChevron = styled(Icon)<{ isActive: boolean }>`
  transform: ${({ isActive }) => (isActive ? 'rotate(180deg)' : 'rotate(0deg)')};
`

export interface Option {
  display: string
  value: string
}

export interface RawSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  data: Option[]
  selectedOption: number
  setSelectedOption: (value: React.SetStateAction<number>) => void
  label?: string
}

export const RawSelect: React.FC<RawSelectProps> = ({
    selectedOption, setSelectedOption, data, className,
    disabled
}) => {
    const [isActive, setIsActive] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        const container = containerRef.current

        if (container && !container.contains(event.target as Node)) {
            setIsActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleOptionClick = (index: number) => {
        setSelectedOption(index)
        setIsActive(false)
    }

    const getDisplayName = () => {
        if (data[selectedOption]) {
            console.log('got it')
            return data[selectedOption].display
        } else {
            console.log('not got it')
            return data[0].display
        }
    }

    return (
        <div ref={containerRef} className={className}>
            <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                disabled={disabled}
            >
                {getDisplayName()}
                <RotatingChevron type="chevron" textColor="primary" fontSize={5} isActive={isActive} />
            </button>
            {isActive && (
                <div className="dropdown">
                    {data.map((point: Option, index: number) => (
                        <div className="dropdownOption" key={index} onClick={() => handleOptionClick(index)}>
                            {point.display}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
