import React from 'react'

interface Props{
  children : any
}

const NumberPad = ({children}:Props) => {
  return (
    <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
    <div className="btn-group me-2" role="group" aria-label="First group">
    <button type="button" className="btn btn-outline-secondary">{children}</button>
    </div>
    </div>
  )
}

export default NumberPad