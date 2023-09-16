import React from 'react'
import './UrlNotFound.css'

export default function UrlNotFound() {
  return (
    <>
      <div className='unf'>
        <i className="fa-solid fa-face-sad-tear mb-4" ></i> 
        <span className='nft'>Requested Page not found</span>
        <a href='#'><i className="fa-solid fa-arrow-left-long"></i> Back to Home</a>
      </div>
    </>
  )
}
