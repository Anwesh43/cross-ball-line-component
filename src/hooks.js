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
                    currScale += scGap
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
        const sf1 = divideScale(sf, 0, 2)
        const si = 1 - 2 * i
        return h / 2 - sf1 * si * hSize
    }
    const background = '#4CAF50'
    return {
        getBallSize(i) {
            const y = getY(i) - 2 * r
            const x = w / 2 - r
            const position = 'absolute'
            const left = `${x}px`
            const top = `${y}px`
            const width = `${2 * r}px`
            const height = `${2 * r}px`
            const borderRadius = '50%'
            return {position, top, left, width, height, background, borderRadius}
        },
        getLineStyle(i) {
            const lSize = Math.min(w, h) / 60
            const y = getY(i)
            const x = w / 2 - lSize / 2
            const position = 'absolute'
            const left = `${x}px`
            const top = `${y}px`
            const width = `${lSize}px`
            const height = `${hSize * divideScale(sf, 0, 2)}px`
            return {position, left, top, width, height, background}
        }
    }
}
