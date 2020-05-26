import {useState, useEffect} from 'react'
import {sinify, divideScale} from './utils'
export const useAnimatedScale = (scGap, delay) => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale,
        start() {
            if (!animated) {
                setAnimated(true)
                var currScale = scale
                const interval = setInterval(() => {
                    currScale += (scGap / 3)
                    setScale(currScale)
                    if (currScale > 1) {
                        setScale(0)
                        setAnimated(false)
                        clearInterval(interval)
                    }
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w,
        h
    }
}

export const useStyle = (w, h, scale) => {
    const sf = sinify(scale)
    const hSize = h / 3
    const r = Math.min(w, h) / 10
    const getY = (i) => {
        const sf1 = divideScale(sf, 0, 3)
        const si = 1 - 2 * i
        return -sf1 * si * hSize
    }
    const background = '#4CAF50'

    const position = 'absolute'
    return {
        getBallStyle(i) {
            const y = getY(i) -  r
            const x = -r
            const left = `${x}px`
            const top = `${y}px`
            const width = `${2 * r}px`
            const height = `${2 * r}px`
            const borderRadius = '50%'
            return {position, top, left, width, height, background, borderRadius}
        },
        getLineStyle(i) {
            const lSize = Math.min(w, h) / 60
            const y = getY(i) * (1 - i)
            const x = - lSize / 2
            const left = `${x}px`
            const top = `${y}px`
            const width = `${lSize}px`
            const height = `${hSize * divideScale(sf, 0, 3)}px`
            return {position, left, top, width, height, background}
        },
        getMainRotStyle(i) {
            const top = `${h / 2}px`
            const left = `${w / 2}px`
            const sf1 = divideScale(sf, 1, 3)
            const WebkitTransform = `rotate(${45 * (1 - 2 * i) * sf1}deg)`
            return {WebkitTransform, position, top, left}
        }
    }
}
