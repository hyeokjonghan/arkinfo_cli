import ContentLayout from "../layout/contentLayout";
import PageLayout from "../layout/pageLayout";
import style from "@/styles/recruitment/recruitment.module.scss"
import OperatorCard from "../components/card/operator";
import { useEffect, useState } from "react";
import OperatorLabel from "@/components/label/operator";

export default function RecruimentPage({results}) {
    const tagList = results.tagList
    const opList = results.opList
    const tagIndexList = {}
    tagList.map((item) => {
        tagIndexList[item.tag_code] = item
    })
    
    const printTagList = {}
    tagList.map((item) => {
        if(!printTagList[item.type]) {
            printTagList[item.type] = []
        }
        printTagList[item.type] = [...printTagList[item.type], item]
    })
    
    const [selectTag, setSelectTag] = useState([])
    const [selectOp, setSelectOp] = useState([])
    const [printHightOp, setPrintHeightOp] = useState(false)
    const [printImg, setPrintImg] = useState(true)

    const setPrintHeightOpEvent = () => {
        setPrintHeightOp(current => !current)
    }

    const setPrintImgEvent = () => {
        setPrintImg(current => !current)
    }

    const isSubSet = (superSet, setA) => {
        let result = true
        setA.forEach(e => {
            if(!superSet.has(e)) result = false
        })
        return result
    }

    const interSectSets = (setA, setB) => {
        let intersection = []
        setB.forEach(e=> {
            if(setA.has(e)) intersection.push(e)
        })

        return intersection
    }

    const setSelectTagEvent = (e) => {
        let tagNo = e.target.dataset.tagNo
        if(typeof tagNo === "string") {
            tagNo = Number(tagNo)
        }
        setSelectTag((current) => {
            
            if(selectTag.includes(tagNo)) {
                let returnTagList = current.filter((e) => { return e !== tagNo })
                return returnTagList
            } else {
                if(current.length < 5) {
                    return [...current, tagNo]
                } else {
                    return current
                }
                
            }
        })
    }

    const setSelectTagClear = () => {
        setSelectTag(() => {
            return []
        })
    }

    const setOpListEvent = () => {
        let matchOpList = {}
        if(selectTag.length > 0) {
            let selectTagSet = new Set(selectTag)
            getCombinations(selectTag).map((matchOpIndex) => {
                matchOpList[matchOpIndex] = {
                    tagInfo:matchOpIndex,
                    tagInfoSet:new Set(matchOpIndex),
                    opList:[],
                    minRarity:false
                }
            })
            

            opList.map((item) => {
                let opTaglist = new Set(item.recruitmentTagCodeList)
                if(interSectSets(selectTagSet, opTaglist).length > 0) {
                    Object.keys(matchOpList).map((matchTag) => {
                        if(isSubSet(opTaglist, matchOpList[matchTag].tagInfoSet)) {
                            if((matchOpList[matchTag].tagInfoSet.has(30) && item.rarity === 5) || (!matchOpList[matchTag].tagInfoSet.has(30)) && item.rarity < 5)
                                matchOpList[matchTag].opList = [...matchOpList[matchTag].opList, item]
                            
                            

                            if(!matchOpList[matchTag].minRarity) {
                                if(item.rarity !== 0) {
                                    matchOpList[matchTag].minRarity = item.rarity
                                }
                            } else {
                                if(matchOpList[matchTag].minRarity > item.rarity) {
                                    matchOpList[matchTag].minRarity = item.rarity
                                }
                            }
                            
                        }
                    })
                }
                

            })
    
            // Object 정렬
            let objectIndexRemoved = []
            Object.keys(matchOpList).map((index) => {
                // 없는거 삭제
                if(matchOpList[index].opList.length > 0) {
                    objectIndexRemoved.push(matchOpList[index])
                }
                
            })
            
            let sortedOpList = objectIndexRemoved.sort(function (a,b) {
                return b.minRarity - a.minRarity
            })
    
            sortedOpList.sort(function (a,b) {
                if(a.minRarity === b.minRarity) {
                    return b.tagInfo.length - a.tagInfo.length
                } else {
                    return b.minRarity - a.minRarity
                }
            })
    
    
            sortedOpList.map((item) => {
                item.opList.sort(function(a,b) {
                    return b.rarity - a.rarity
                })
            })
            
            setSelectOp(sortedOpList)
        } else {
            setSelectOp([])
        }
        

    }

    // 모든 경우의 수 반환..
    const getCombinations = (targetArr) => {
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

    useEffect(() => {
        setOpListEvent()
    }, [selectTag])

    const printTagListJsx = Object.keys(printTagList).map((opClass) => {
        if(opClass !=="sex") {
            return <>
            <div className={style.tagPickerListWrap}>
                <div className={style.tagPickerList}>
                    {printTagList[opClass].map((item) => {
                        return <>
                            <div key={item.tag_code} className={`${style.tag} ${selectTag.includes(item.tag_code)? style.selected:''}`} data-tag-no={item.tag_code} onClick={setSelectTagEvent}>{selectTag.includes(item.tag_code)}{item.name.kr}</div>
                        </>
                    })}
                </div>
            </div>
        </>
        }
    })

    
    const printMatchOpJsx = selectOp.map((item) => {
        if(!printHightOp || (printHightOp && item.minRarity >=3)) {
            return <>
            <div className={style.resultWrap} key={item.tagInfo}>
                <div className={style.resultInnerWrap}>
                    <div className={style.pickerTagWrap}>
                        {item.tagInfo.map((tag) => {
                            let matchTagInfo = tagIndexList[tag]
                            return <>
                                <div key={matchTagInfo.tag_code} className={style.pickterTag}>{matchTagInfo.name.kr}</div>
                            </>
                        })}
                        

                    </div>
                    <div className={style.resultOpWrap}>
                        {item.opList.map((op => {
                                if(printImg) {
                                    return <>
                                        <OperatorCard key={op._id} opInfo={op}></OperatorCard>
                                    </>
                                } else {
                                    return <>
                                        <OperatorLabel key={op.id} opInfo={op}></OperatorLabel>
                                    </>
                                }
                            
                        }))}
                    </div>
                </div>
            </div>
        </>
        }
        
    })

    return <>
        <PageLayout>
            <ContentLayout>
                <div>
                    <div className={style.tagPicker}>

                        {printTagListJsx}

                        <div className={style.btnListWrap}>
                            <button onClick={setSelectTagClear}>초기화</button>
                            <button onClick={setPrintImgEvent} className={printImg? style.active: ``}>이미지노출</button>
                            <button onClick={setPrintHeightOpEvent} className={printHightOp? style.active: ``}>4성 이상 확정</button>
                        </div>
                        
                    </div>

                    {printMatchOpJsx}

                    
                </div>

            </ContentLayout>
        </PageLayout>
    </>
}

// 일단 심플하게 fetch쪽으로 처리, 다음에 Store 처리..
export async function getServerSideProps() {
    const tagList = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recruitment/tag/list`)).json()
    const opList = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recruitment/op/list`)).json()
    return {
        props: {
            results:{
                tagList:tagList,
                opList:opList
            }
        }
    }
}