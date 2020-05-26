import React from 'react'
import {useStyle} from './hooks'

const BallLine = ({i, w, h, scale}) => {
    const {getBallStyle, getLineStyle} = useStyle(w, h, scale)

    return <div>
        <div style = {getBallStyle(i)}></div>
        <div style = {getLineStyle(i)}></div>
    </div>
}

const CrossBallLine = ({i, w, h, scale}) => {
    const {getMainRotStyle} = useStyle(w, h, scale)
    return <div style = {getMainRotStyle(i)}>
      {[0, 1].map(j => <BallLine key = {`ballLine_${i}_${j}`} i = {j} w = {w} h = {h} scale = {scale}/>)}
    </div>
}

const CrossLineBallPresentational = ({onClick, w, h, scale}) => {
    return <div onClick = {onClick}>
        {[0, 1].map(i => <CrossBallLine i = {i} w = {w} h = {h} scale = {scale}/>)}
    </div>
}

export default CrossLineBallPresentational
