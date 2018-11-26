import React from 'react'

const Osa = ({ courseSection }) => {
  return (
    <p>{courseSection.nimi} {courseSection.tehtavia}</p>
  )
}

export default Osa
