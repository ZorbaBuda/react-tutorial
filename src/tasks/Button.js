import React from 'react'

const Button = ({buttonText, reqType, setReqType}) => {
  return (
   <button
     type="button"
     onClick={() => setReqType(buttonText)}
   >
     {buttonText}

   </button>
  )
}

export default Button