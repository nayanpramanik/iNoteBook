import React from 'react'

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-grow" role="status"> </div>
      <span className="text-justify">Wait a moment..</span>
    </div>
  )
}

export default Spinner