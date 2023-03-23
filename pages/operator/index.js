import PageLayout from "@/layout/pageLayout";
import ContentLayout from "../../layout/contentLayout";
import style from "@/styles/operator/index.module.scss"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image"
import searchOp, * as operatorActions from '@/store/modules/searchOp'
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from "react";
import axios from "axios";
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'


export default function OperatorPage() {
    const router = useRouter();
    const dispatch = useDispatch()
    const searchOpValue = useSelector(({ searchOp }) => searchOp)
    const [searchProfession, setSearchProfession] = useState(searchOpValue.searchOption.profession)
    const [searchRarity, setSearchRarity] = useState(searchOpValue.searchOption.rarity)
    const [hasMore, setHasMoer] = useState(false)
    let checkEndApi = true

    const searchOpApi = async () => {
        if(checkEndApi) {
            checkEndApi = false
            const params = {...searchOpValue.searchOption}
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/operator/list`, {
                params
            }).then((response) => {
                checkEndApi = true
                if(response.data.last_page === searchOpValue.searchOption.page) {
                    setHasMoer(false)
                } else {
                    setHasMoer(true)
                }
                if(searchOpValue.searchOption.page > 1) {
                    dispatch(operatorActions.setOperatorList([...searchOpValue.operatorList , ...response.data.data]))
                } else {
                    dispatch(operatorActions.setOperatorList(response.data.data))
                }
                dispatch(operatorActions.setLastSearchOption())
            })
        }
        
    }

    useEffect(() => {
        if(searchOpValue.lastSearchOption.name !== searchOpValue.searchOption.name) {
            setFirstPage()
        }
        if(searchOpValue.operatorList.length === 0 || !_.isEqual(searchOpValue.searchOption, searchOpValue.lastSearchOption)) {
            searchOpApi()
        }
    }, [router.query, searchOpValue.searchOption.page, searchOpValue.searchOption.rarity, searchOpValue.searchOption.profession])


    // 다음 페이지로 처리
    const setNextPage = () => {
        if(hasMore) {
            let nowPage = searchOpValue.searchOption.page
            dispatch(operatorActions.setPage(nowPage+1))
        }
    }

    // 검색 조건 적용시 현재 페이지로 처리 해야 함
    const setFirstPage = useCallback(() => {
        dispatch(operatorActions.setPage(1))
    }, [dispatch]);

    // 등급 선택시 Filter 적용
    const setSelectedFilterRarity = (item) => {
        setFirstPage()
        const index = searchRarity.indexOf(item.value)
        if (index !== -1) {
            setSearchRarity((current) => {
                let tempResult = [...current]
                tempResult.splice(index, 1)
                return tempResult
            })
        } else {
            setSearchRarity((current) => {
                return [...current, item.value]
            })
        }
    }

    const setSearchRarityCallback = useCallback(() => {
        dispatch(operatorActions.setSearchOptionRarity(searchRarity))
    })

    useEffect(() => {
        setSearchRarityCallback()
    }, [searchRarity])

    // 포지션 선택시 Filter 적용
    const setProfessionFilterEvent = (item) => {
        setFirstPage()
        const index = searchProfession.indexOf(item.value)
        if (index !== -1) {
            setSearchProfession((current) => {
                let tempResult = [...current]
                tempResult.splice(index, 1)
                return tempResult
            })
        } else {
            setSearchProfession((current) => {
                return [...current, item.value]
            })
        }
    }

    const setProfessionFilterCallback = useCallback(() => {
        dispatch(operatorActions.setSearchOptionProfession(searchProfession))
    })

    useEffect(() => {
        setProfessionFilterCallback()
    }, [searchProfession])

    const [filterOn, setFilterOn] = useState(true)
    const printFilterList = [
        {
            name: "등급",
            objName: "rarity",
            appendClass: '',
            clickEvent: (item) => setSelectedFilterRarity(item),
            filterItem: [
                {
                    printValue: 1,
                    value: 0,
                    appendClass: 'rarity0'
                },
                {
                    printValue: 2,
                    value: 1,
                    appendClass: 'rarity1'
                },
                {
                    printValue: 3,
                    value: 2,
                    appendClass: 'rarity2'
                },
                {
                    printValue: 4,
                    value: 3,
                    appendClass: 'rarity3'
                },
                {
                    printValue: 5,
                    value: 4,
                    appendClass: 'rarity4'
                },
                {
                    printValue: 6,
                    value: 5,
                    appendClass: 'rarity5'
                },
            ]
        },
        {
            name: "포지션",
            objName: "profession",
            appendClass: '',
            clickEvent: (item) => setProfessionFilterEvent(item),
            filterItem: [
                {
                    printValue: "뱅가드",
                    value: "PIONEER",
                    appendClass: ''
                },
                {
                    printValue: "가드",
                    value: "WARRIOR",
                    appendClass: ''
                },
                {
                    printValue: "디펜더",
                    value: "TANK",
                    appendClass: ''
                },
                {
                    printValue: "스나이퍼",
                    value: "SNIPER",
                    appendClass: ''
                },
                {
                    printValue: "캐스터",
                    value: "CASTER",
                    appendClass: ''
                },
                {
                    printValue: "메딕",
                    value: "MEDIC",
                    appendClass: ''
                },
                {
                    printValue: "서포터",
                    value: "SUPPORT",
                    appendClass: ''
                },
                {
                    printValue: "스페셜리스트",
                    value: "SPECIAL",
                    appendClass: ''
                },
            ]
        }
    ]

    const clearFilter = useCallback(() => {
        dispatch(operatorActions.setClearSearchOption());
        setSearchProfession([])
        setSearchRarity([])
    }, [dispatch]);


    const setFilterOnEvent = () => {
        setFilterOn((current) => { return !current })
    }

    const printOpListJsx = searchOpValue.operatorList.map((item) => {
        const rarityClass = style["rarity"+item.rarity]
        return <>
            <div key={item._id} className={`${style.operatorItem} ${rarityClass}`}>
                <div>
                    <Image width="180" height="180" src={item.default_avartar_img} alt="Operator Img"></Image>
                </div>
                <div className={style.operatorName}>{item.name}</div>
            </div>
        </>
    })

    const printfilterJsx = printFilterList.map((filterGroup) => {
        return <>
            <div key={filterGroup.name} className={style.filterItemList}>
                <div className={style.filterTitle}>{filterGroup.name}</div>
                <div className={style.filterItem}>
                    {filterGroup.filterItem.map((filter) => {
                        return <>
                            <div key={filter.value} onClick={() => filterGroup.clickEvent(filter)} className={`${style.filter} ${searchOpValue.searchOption[filterGroup.objName].indexOf(filter.value) === -1 ? '' : style.selected}`}>{filter.printValue}</div>

                        </>
                    })}
                </div>
            </div>
        </>
    })

    return <>
        <PageLayout>
            <ContentLayout>
                <div className={style.filterWrap}>

                    <div className={style.filterHeader}>
                        <span ><i className="bi bi-funnel"></i></span>
                        <span onClick={setFilterOnEvent} className={`${style.filetrOnOff} ${filterOn ? style.filterOpen : ''}`}><i className="bi bi-caret-down-fill"></i></span>
                    </div>

                    <div className={`${style.filterContentWrap} ${filterOn ? '' : style.filterClose}`}>
                        <div className={`${style.filterList} ${filterOn ? '' : style.filterClose}`}>
                            {printfilterJsx}
                        </div>

                        <div className={style.filterFooter}>
                            <button onClick={() => clearFilter()}>초기화</button>
                            
                        </div>
                    </div>
                </div>
                
                    <InfiniteScroll
                    className={style.operatorListWrap}
                    dataLength={searchOpValue.operatorList.length}
                    next={setNextPage}
                    hasMore={hasMore}
                    >
                        {printOpListJsx}
                    </InfiniteScroll>


            </ContentLayout>
        </PageLayout>
    </>
}