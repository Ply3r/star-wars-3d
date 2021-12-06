import React, { useContext } from 'react';
import { myContext } from '../context/MyProvider';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Info = () => {
  const { data, actualPosition, setActualPosition } = useContext(myContext)

  const renderName = () => {
    const { name } = data[actualPosition]

    return (
      <div className="change_position">
        <button
          onClick={ () => {
            let prevPos = actualPosition - 1
            if (prevPos < 0) {
              prevPos = data.length - 1
            }
            setActualPosition(prevPos)
          } }
        > 
          <FaAngleLeft /> 
        </button>
        <h1>{ name }</h1>
        <button
          onClick={ () => {
            let nextPos = actualPosition + 1
            if (nextPos > data.length - 1) {
              nextPos = 0
            }
            setActualPosition(nextPos)
          } }
        > 
          <FaAngleRight /> 
        </button>
      </div>
    )
  }

  const renderInfo = () => {
    const planetInfo = data[actualPosition]
    const entries = Object.entries(planetInfo)
    const elements = entries.map((info) => {
      const title = info[0].split('_').join(' ')

      return (
        <h1>
          { title }
          <span>{ `: ${info[1]}` }</span>
        </h1>
      )
    })

    return (
      <div className="information">
        { elements }
      </div>
    )
  }

  return (
    <>
      { !!data.length && renderName() }
      { !!data.length && renderInfo() }
    </>
  )
}

export default Info;
