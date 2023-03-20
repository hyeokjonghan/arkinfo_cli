import PropTypes from 'prop-types'
import style from "@/styles/component/card/indexCard.module.scss"
import { useRouter } from 'next/router'
export default function IndexCard({ cardInfo }) {
    const router = useRouter();
    const movePage = () => {
        router.push({
            pathname:cardInfo.path
        })
    }
    return <>
        <div className={style.indexCardWrap} onClick={movePage}>
                <div className={style.indexCardImg} style={{backgroundImage:`url(${cardInfo.image})`}}>
                    <div className={style.indexCardBack}></div>
                </div>
            <div className={style.indexCardInfo}>
                <div className={style.indexCardTitle}>{cardInfo.title}</div>
                <ul className={style.indexCardContent}>
                {
                            cardInfo.content.map((content,i) => {
                                return <>
                                <li key={i}>· {content}</li>
                            </>
                            })
                            
                        }
                </ul>
            </div>
        </div>
    </>
}

IndexCard.propTypes = {
    cardInfo: PropTypes.object.isRequired
}