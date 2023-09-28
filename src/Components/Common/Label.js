import React from 'react'

export default function Label({
  text,
  helpText,
  isRequired = false,
  className = "",
  fontSize = "12px",
  bold = false,
  width }) {
  return (
    <>
      <label 
      className={className} 
      style={{ fontSize: fontSize, fontWeight: bold ? 'bold' : '', width: width }}>{text===undefined?"":text} {isRequired && <strong className='text-danger'>*</strong>}</label>
      {helpText !== undefined && helpText !== "" && <i title={helpText} data-toggle="tooltip" style={{ cursor: "pointer" }} className="bi bi-patch-question-fill"></i>}
    </>
  )
}
