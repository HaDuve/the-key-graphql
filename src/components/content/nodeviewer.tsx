import React from 'react'
import useLayout from '../../hooks/useLayout.ts'
import DraggableList from './draggableList.tsx'
import LoadingSpinner from '../generic/LoadingSpinner/LoadingSpinner.tsx'

const NodeViewer = ({ onLogout }) => {
  const { loading, nodes, thresholdElementRef, error } = useLayout()

  // without this loading return, DraggableList will not render correctly
  if (loading) return <LoadingSpinner />

  if (error) {
    // if 401 error logout
    if (error.message.includes('401') && onLogout) {
      onLogout()
      return null
    }
    return <p>Error: {error.message}</p>
  }

  const items: { string: string; ref?: React.RefObject<HTMLDivElement> }[] =
    nodes?.map((edge, index) => {
      return {
        string: edge.node?.structureDefinition?.title || '',
        ref: nodes.length === index + 1 ? thresholdElementRef : undefined,
      }
    }) || []

  return <DraggableList items={items} />
}

export default NodeViewer
