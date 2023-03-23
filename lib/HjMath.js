export const isSubSet = (superSet, setA) => {
    let result = true
    setA.forEach(e => {
        if(!superSet.has(e)) result = false
    })
    return result
}

export const interSectSets = (setA, setB) => {
    let intersection = []
    setB.forEach(e=> {
        if(setA.has(e)) intersection.push(e)
    })

    return intersection
}

export const getCombinations = (targetArr) => {
    let result = []
    let f = (tempArr, targetArr) => {
        for(let i = 0; i < targetArr.length; i++) {
            result = [...result, [...tempArr, targetArr[i]]]
            f([...tempArr, targetArr[i]], targetArr.slice(i+1))
        }
    }
    f([],targetArr)
    return result
}
