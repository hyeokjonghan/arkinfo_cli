import ContentLayout from "@/layout/contentLayout"
import PageLayout from "@/layout/pageLayout"
import { useRouter } from "next/router"
import style from "@/styles/operator/detail.module.scss"
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"

export default function OperatorDetail({ results }) {
    const router = useRouter()
    const [korFontsize, setKorFontSize] = useState('36px')
    const [korLetterSpacing, setKorLetterSpacing] = useState('-0.5px')
    const settingRangegrid = []
    const [printRangeJsx, setPrintRnageJsx] = useState([])
    const [operator, setOperator] = useState([])
    const [previewImage, setPreviewImage] = useState(``)
    const [classImage, setClassImage] = useState(``)
    const [nowRange, setNowRange] = useState({})
    const [chooseElite, setChooseElite] = useState(0)
    const [nowPhases, setNowPhases] = useState({})

    const rangeGrideInfo = {
        minRow: 0,
        minCol: 0,
        maxRow: 0,
        maxCol: 0,
        rangeInfo: {}
    }

    // const testRange = { "_id": "641dacd46f49b72c7a0d3a19", "id": "4-3", "direction": 1, "grids": [{ "row": 2, "col": 2 }, { "row": 2, "col": 3 }, { "row": 1, "col": 2 }, { "row": 1, "col": 3 }, { "row": 1, "col": 4 }, { "row": 0, "col": 2 }, { "row": 0, "col": 3 }, { "row": 0, "col": 4 }, { "row": -1, "col": 2 }, { "row": -1, "col": 3 }, { "row": -1, "col": 4 }, { "row": -2, "col": 2 }, { "row": -2, "col": 3 }] }
    const transferPosition = (position) => {
        switch (position) {
            case 'MELEE':
                return '근거리'
                break;
            case 'RANGED':
                return '원거리'
                break;
            default:
                break;
        }
    }

    const changeSkinPrevie = (skinInfo) => {
        setPreviewImage(`url('${process.env.NEXT_PUBLIC_CLOUD_URL}characters/${skinInfo['portraitId'].replace('#', '%23')}.png')`)
    }

    const clickEliteEvent = (elite) => {
        setChooseElite(elite)
        changeElite(elite)
    }

    const changeElite = (elite) => {
        switch(elite) {
            case 0:
                setNowPhases(operator.phases[0])
            break;
            case 1:
                setNowPhases(operator.phases[1])
            break;
            case 2:
                setNowPhases(operator.phases[2])
            break;
        }
        changeRangeElite(elite)
    }

    const changeRangeElite = (elite) => {
        operator.rangeInfo.map((range) => {
            if (range.id === operator.phases[elite].rangeId) {
                setNowRange(range)
                return false
            }
        })
    }

    useEffect(() => {
        console.dir(operator)
        if(operator.phases) {
            setNowPhases(operator.phases[0])
        }

        if (operator.skinInfo) {
            setPreviewImage(`url('${process.env.NEXT_PUBLIC_CLOUD_URL}characters/${operator.skinInfo[0]['portraitId'].replace('#', '%23')}.png')`)
        }

        if (operator.profession) {
            let tempProfession = operator.profession
            switch (tempProfession) {
                case 'TANK':
                    tempProfession = 'defender'
                    break;
                case 'MEDIC':
                    tempProfession = 'medic'
                    break;
                case 'WARRIOR':
                    tempProfession = 'guard'
                    break;
                case 'SPECIAL':
                    tempProfession = 'specialist'
                    break;
                case 'PIONEER':
                    tempProfession = 'vanguard'
                    break;
                case 'SNIPER':
                    tempProfession = 'sniper'
                    break;
                case 'CASTER':
                    tempProfession = 'caster'
                    break;
                case 'SUPPORT':
                    tempProfession = 'supporter'
                    break; F
            }
            setClassImage(`url('${process.env.NEXT_PUBLIC_CLOUD_URL}classes/class_${tempProfession}.png')`)
        }


        if (operator.name) {
            if (operator.name.length > 10) {
                setKorFontSize('30px')
                setKorLetterSpacing('-4px')
            }
        }

        if (operator.rangeInfo) {
            changeRangeElite(0)
        }

    }, [operator])

    useEffect(() => {
        setPrintRnageJsx([])
        if (nowRange._id) {
            rangeGrideInfo.rangeInfo = nowRange
            nowRange.grids.forEach((range) => {
                if (range.col > rangeGrideInfo.maxCol) {
                    rangeGrideInfo.maxCol = range.col
                }
                if (range.col < rangeGrideInfo.minCol) {
                    rangeGrideInfo.minCol = range.col
                }
                if (range.row > rangeGrideInfo.maxRow) {
                    rangeGrideInfo.maxRow = range.row
                }
                if (range.row < rangeGrideInfo.minRow) {
                    rangeGrideInfo.minRow = range.row
                }
            })


            for (let row = rangeGrideInfo.minRow; row <= rangeGrideInfo.maxRow; row++) {
                settingRangegrid[row] = []
                for (let col = rangeGrideInfo.minCol; col <= rangeGrideInfo.maxCol; col++) {
                    if (row === 0 && col === 0) {
                        settingRangegrid[row][col] = 'o'
                    } else {
                        settingRangegrid[row][col] = 0
                    }
                }
            }

            rangeGrideInfo.rangeInfo.grids.map((item) => {
                if (settingRangegrid[item.row][item.col] !== 'o') {
                    settingRangegrid[item.row][item.col] = 1
                }
            })


            for (let row = rangeGrideInfo.minRow; row <= rangeGrideInfo.maxRow; row++) {


                setPrintRnageJsx((current) => {
                    return [...current, settingRangegrid[row]]
                })

            }
        }

    }, [nowRange])

    useEffect(() => {
        setPrintRnageJsx([])
        // 데이터 가져오기
        // Loading ==> Store로 처리 가능 하지 않낭? 다 끝나면 구현 하기
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/operator/${router.query._id}`).then((result) => {
            // end Loading
            setOperator(result.data)

        }).catch((error) => {
            // end Loading
            console.dir(error)
            // alert('잘못된 접근입니다.')
            // router.push('/operator')
        })


    }, [])



    return <>
        <PageLayout>
            <ContentLayout>
                <div className={style.operatorDetailWrap}>
                    {/* 스킨 */}
                    <div className={style.skinDefaultInfoWrap}>
                        <div className={style.operatorSkinWrap}>
                            {/* <div className={style.logoWrap} style={{backgroundImage: `url('/sample/logo_siracusa.png')`}}></div> */}
                            <div className={style.operatorSkinPreviewWrap}>
                                {
                                    operator.skinInfo ?
                                        <div className={style.operatorSkin} id="skinPreview" style={{ backgroundImage: previewImage }}></div>
                                        : <>

                                        </>
                                }


                            </div>

                            <div className={style.operatorSkinList}>
                                <ul>
                                    {
                                        operator.skinInfo ? operator.skinInfo.map((item) => {
                                            return <>
                                                <li className={style.operatorSkinItem} key={item._id} style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_CLOUD_URL}avatars/${item['avatarId'].replace('#', '%23')}.png')` }} onClick={() => changeSkinPrevie(item)}></li>
                                            </>
                                        }) : <></>
                                    }

                                </ul>
                            </div>

                        </div>

                        <div className={style.defaultInfoWrap}>

                            <div className={style.rankWrap}>
                                {
                                    operator.rarity ? Array.apply(null, { length: operator.rarity + 1 }).map((e, i) => {
                                        return <>
                                            <div className={style.starwrap} key={i}>
                                                <i className="bi bi-star-fill"></i>
                                            </div>
                                        </>
                                    }) : ''
                                }


                            </div>
                            <div className={style.nameWrap}>
                                <div className={style.appellation}>{operator.appellation}</div>
                                <div className={style.name} style={{ letterSpacing: korLetterSpacing, fontSize: korFontsize }}>{operator.name}</div>
                            </div>

                            {
                                operator.phases?<>
                                <div className={style.choosePhasesWrap}>
                                    <ul>
                                        {operator.phases.length >= 1 ? <li className={chooseElite===0?style.active:''}><Image src="/sample/elite/0-s.png" width={40} height={40} alt="elite-0" onClick={() => clickEliteEvent(0)}></Image></li>:<></>}
                                        {operator.phases.length >= 2 ? <li className={chooseElite===1?style.active:''}><Image src="/sample/elite/1-s.png" width={40} height={40} alt="elite-1" onClick={() => clickEliteEvent(1)}></Image></li>:<></>}
                                        {operator.phases.length >= 3 ? <li className={chooseElite===2?style.active:''}><Image src="/sample/elite/2-s.png" width={40} height={40} alt="elite-2" onClick={() => clickEliteEvent(2)}></Image></li>:<></>}
                                    </ul>
                                </div>   
                                </>:<></>
                            }

                            <div className={style.defaultInfo}>

                                <div className={style.prefession} style={{ backgroundImage: `${classImage}` }}></div>

                                <div className={style.rangeWrap}>
                                    <div className={style.range}>

                                        <table className={style.rangeTable}>
                                            <tbody>
                                                {printRangeJsx.map((row) => {
                                                    return <>
                                                        <tr>
                                                            {
                                                                row.map((col) => {
                                                                    if (col === 1) {
                                                                        return <><td className={style.rangeTarget}></td></>
                                                                    } else if (col === 'o') {
                                                                        return <><td className={style.rangeOrigin}></td></>
                                                                    } else {
                                                                        return <><td></td></>
                                                                    }
                                                                })
                                                            }
                                                        </tr>
                                                    </>

                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>공격범위</div>
                                </div>
                                <div className={style.positionTagWrap}>
                                    <div className={style.positionWrap}>
                                        {
                                            operator.position ? transferPosition(operator.position) : ''
                                        }
                                    </div>
                                    <div className={style.tagWrap}>
                                        {operator.tagList ? <>
                                            {
                                                operator.tagList.map((tag) => {
                                                    return <>
                                                        <span key={tag}>{tag}</span>
                                                    </>
                                                })
                                            }
                                        </> : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* 기본정보 */}
                    {/* <div className={style.operatorBasicInfoWrap}>
                        <div>
                            <div>
                                레벨에 따른 기본 능력치 처리
                                1정예 2정예 3정예
                                공격범위 존재 해야 하고
                                정예화시 들어가는 재료 호출 해야 함
                            </div>
                        </div>
                        <div>
                            <div>
                                특성, 잠재, 신뢰도에 따른 능력치
                            </div>
                            <div>
                                재능
                            </div>
                        </div>
                        <div>
                            <div>인프라 스킬</div>
                        </div>
                        <div>
                            <div>
                                스킬 1,2,3스킬
                                스킬 업 할 때 들어가는 재료
                            </div>
                        </div>
                        <div>
                            <div>
                                모듈 (Origin, X, Y)
                                모듈 Up 시 소비 재료
                                모듈 기본 능력, 모듈 상세 능력
                            </div>
                        </div>
                    </div> */}

                </div>
            </ContentLayout>
        </PageLayout>
    </>
}

export async function getServerSideProps() {

    // const tagList = await(await axios.get(`http://localhost:8000/api/operator/ss`)).data

    return {
        props: {
            results: {

            }
        }
    }
}