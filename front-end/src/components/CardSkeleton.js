import React from 'react'
import Skeleton from 'react-loading-skeleton'

const CardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div className='card_skeleton' key={i}>
        <Skeleton />
        <Skeleton count={3} />
      </div>
    ))
    
}

export default CardSkeleton