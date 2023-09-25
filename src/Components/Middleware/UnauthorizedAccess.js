import React from 'react'
import './UrlNotFound/UrlNotFound.css'
export default function UnauthorizedAccess() {
  return (
    <>
    <div className='text-center text404'><span>401</span></div>
    <div className='text-center'><img style={{width:'150px'}} src='assets/images/icons/scissor.png'/> </div>
    <div className='text-center fs-6 mt-5'><span className='nft'>You are unauthorized to access this page!</span></div>
    </>
  )
}
