import CrossLineBallPresentational from './CrossLineBallPresentational'
import {useAnimatedScale, useDimension} from './hooks'
import React from 'react'

const CrossBallLineComponent = (props) => {
    const {w, h} = useDimension()
    const {scale, start} = useAnimatedScale(0.02, 20)
    return <CrossLineBallPresentational w = {w} h = {h} scale = {scale} onClick = {start}>
    </CrossLineBallPresentational>
}

export default CrossBallLineComponent
