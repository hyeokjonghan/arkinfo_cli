import ContentLayout from "@/layout/contentLayout"
import PageLayout from "@/layout/pageLayout"
import { useRouter } from "next/router"
import style from "@/styles/operator/detail.module.scss"
import { useEffect, useState } from "react"
import axios from "axios";

export default function OperatorDetail({ results }) {
    const router = useRouter()
    const operatorId = router.query._id
    const [korFontsize, setKorFontSize] = useState('36px')
    const [korLetterSpacing, setKorLetterSpacing] = useState('-0.5px')
    const settingRangegrid = []
    const [printRangeJsx,setPrintRnageJsx] = useState([])
    let printRangeItemJsx = []
    
    const rangeGrideInfo = {
        minRow: 0,
        minCol: 0,
        maxRow: 0,
        maxCol: 0,
        rangeInfo: {}
    }

    // const testName = "니어 더 래디언트 나이트"
    const testName = "씬"
    const testRange = {"_id":"641dacd46f49b72c7a0d3a19","id":"4-3","direction":1,"grids":[{"row":2,"col":2},{"row":2,"col":3},{"row":1,"col":2},{"row":1,"col":3},{"row":1,"col":4},{"row":0,"col":2},{"row":0,"col":3},{"row":0,"col":4},{"row":-1,"col":2},{"row":-1,"col":3},{"row":-1,"col":4},{"row":-2,"col":2},{"row":-2,"col":3}]}
    useEffect(() => {
        if(testName.length > 10) {
            setKorFontSize('30px')
            setKorLetterSpacing('-4px')
        }
    },[testName])

    useEffect(() => {
        setPrintRnageJsx([])
        rangeGrideInfo.rangeInfo = testRange
        testRange.grids.forEach((range) => {
            if(range.col > rangeGrideInfo.maxCol) {
                rangeGrideInfo.maxCol = range.col
            } 
            if(range.col < rangeGrideInfo.minCol) {
                rangeGrideInfo.minCol = range.col
            }
            if(range.row > rangeGrideInfo.maxRow) {
                rangeGrideInfo.maxRow = range.row
            } 
            if(range.row < rangeGrideInfo.minRow) {
                rangeGrideInfo.minRow = range.row
            }
        })

        
        for(let row = rangeGrideInfo.minRow; row <= rangeGrideInfo.maxRow; row++) {
            settingRangegrid[row] = []
            for(let col = rangeGrideInfo.minCol; col <= rangeGrideInfo.maxCol; col++) {
                if(row === 0 && col === 0) {
                    settingRangegrid[row][col] = 'o'
                } else {
                    settingRangegrid[row][col] = 0
                }
            }
        }

        rangeGrideInfo.rangeInfo.grids.map((item) => {
            if(settingRangegrid[item.row][item.col] !== 'o') {
                settingRangegrid[item.row][item.col] = 1
            }
        })
        
        
        for(let row = rangeGrideInfo.minRow; row <= rangeGrideInfo.maxRow; row++) {
            
            
            setPrintRnageJsx((current) => {
                return [...current, settingRangegrid[row]]
            })
            
        }
        
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
                                <div className={style.operatorSkin} style={{ backgroundImage: `url('/sample/characters/char_336_folivo_epoque%2322.png')` }}></div>
                            </div>

                            <div className={style.operatorSkinList}>
                                <ul>
                                    <li className={style.operatorSkinItem} style={{ backgroundImage: `url('/sample/char_336_folivo.png')` }}></li>
                                    <li className={style.operatorSkinItem} style={{ backgroundImage: `url('/sample/char_336_folivo_2.png')` }}></li>
                                    <li className={style.operatorSkinItem} style={{ backgroundImage: `url('/sample/char_336_folivo_epoque%2322.png')` }}></li>
                                </ul>
                            </div>

                        </div>

                        <div className={style.defaultInfoWrap}>

                                <div className={style.rankWrap}>
                                    <div className={style.starwrap}>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                    <div className={style.starwrap}>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                    <div className={style.starwrap}>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                    <div className={style.starwrap}>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                    <div className={style.starwrap}>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                    <div className={style.starwrap}>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                </div>
                                <div className={style.nameWrap}>
                                    <div className={style.appellation}>Sence</div>
                                    <div className={style.name} style={{letterSpacing: korLetterSpacing, fontSize: korFontsize}}>{testName}</div>
                                </div>

                                <div className={style.defaultInfo}>
                                    <div className={style.prefession} style={{ backgroundImage: `url('/sample/class_supporter.png')` }}></div>
                                    <div className={style.rangeWrap}>
                                        <div className={style.range}>
                                            
                                            <table className={style.rangeTable}>
                                                <tbody>
                                                    {printRangeJsx.map((row) => {
                                                        return <>
                                                            <tr>
                                                                {
                                                                    row.map((col) => {
                                                                        if(col === 1) {
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
                                        <div className={style.positionWrap}>원거리</div>
                                        <div className={style.tagWrap}>
                                            <span>누커</span>
                                            <span>딜러</span>
                                            <span>범위공격</span>
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