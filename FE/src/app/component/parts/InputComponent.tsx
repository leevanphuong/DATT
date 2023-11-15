import React from 'react'

type InputProps = {
  value?: string,
  onChange?: any,
  type?: string
  placeholder?: string
  classes?: string
}

const InputComponent = ({classes,placeholder,onChange, value, type}: InputProps) => {
  return (
    <input className={classes} type={type} placeholder={placeholder} value={value} onChange={onChange} />
  )
}

export default InputComponent