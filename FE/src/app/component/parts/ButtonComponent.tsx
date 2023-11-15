import React from 'react'

type ButtonProps = {
    onClick?:()=> void,
    children?:React.ReactNode
    classes?: string
}

const ButtonComponent = ({onClick, children,classes}: ButtonProps) => {
  return (
    <button onClick={onClick} className={classes}>
        {children}
    </button>
  )
}

export default ButtonComponent