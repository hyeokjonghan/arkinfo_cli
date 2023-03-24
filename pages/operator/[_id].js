import ContentLayout from "@/layout/contentLayout"
import PageLayout from "@/layout/pageLayout"
import { useRouter } from "next/router"
import style from "@/styles/operator/detail.module.scss"

export default function OperatorDetail({results}) {
    const router = useRouter()
    const operatorId = router.query._id
    console.dir(results)
    return <>
        <PageLayout>
            <ContentLayout>
                <div className={style.operatorDetailWrap}>
                    {/* 스킨 */}
                    <div className={style.operatorSkinWrap}>
                        <div className={style.operatorSkinPreview}>스킨 프리뷰 영역</div>
                        <div className={style.operatorSkinList}>
                            스킨 리스트 영역
                        </div>
                    </div>

                    {/* 기본정보 */}
                    <div className={style.operatorBasicInfoWrap}>
                        <div>
                            <div>
                                이름,등급,직군,서브직군,소속, range, tag
                            </div>
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
                    </div>

                </div>
            </ContentLayout>
        </PageLayout>
    </>
}

export async function getServerSideProps() {
    
    return {
        props: {
            results:{
                
            }
        }
    }
}