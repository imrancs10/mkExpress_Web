import React from 'react'

export default function TableToolbar({ option }) {
    if (option?.length === 0)
        return <></>
    return (
        <>
          <div className="btn-group btn-group-sm my-2" role="group" ariaLabel="Basic example">
                    {
                        option?.map((ele, index) => {
                            return <button key={index} type="button" title={ele?.title} onClick={ele?.handler} className={`btn ${ele?.className===undefined?"btn-secondary":ele?.className}`}><i className={ele?.icon} /></button>
                        })
                    }
                </div>
        </>
    )
}
