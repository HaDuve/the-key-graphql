import React from 'react'

const ScrollView = ({ children }: any) => {
  return (
    <div
      style={{
        width: '80vw',
        height: '80vh',
        overflowY: 'scroll',
        // margin and shadows
        margin: 'auto',
        marginTop: '2vh',
        marginBottom: '2vh',
        marginLeft: '2vw',
        boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.75)',
        //border
        borderRadius: '15px',
        border: '1px solid black',
      }}
    >
      {children}
    </div>
  )
}

export default ScrollView
