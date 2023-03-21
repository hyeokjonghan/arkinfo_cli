import { useRouter } from "next/router"
import Link from "next/link";
import navStyle from "@/styles/commonNav.module.scss"

export default function CommonNav() {
    const router = useRouter();
    const menuList = [
        {
            name:"공개모집 계산기",
            path:"/recruitment",
            is_menu:true
        },
        {
            name:"오퍼레이터",
            path:"/operator",
            is_menu:true
        },
        {
            name:"재료",
            path:"/material",
            is_menu:true
        },
        {
            name:"적 정보",
            path:"/enemy",
            is_menu:true
        }
    ];
    
    const menuPrint = menuList.map((menu, index) => {
        if(menu.is_menu) {
            return <li key={index}><Link className={router.pathname.includes(menu.path)? navStyle.active:""} href={menu.path}>{menu.name}</Link></li>
        }
    })

    const searchWrapBackgruond = [
        `${process.env.NEXT_PUBLIC_CLOUD_URL}images/27_i27.png`,
        `${process.env.NEXT_PUBLIC_CLOUD_URL}images/28_i12.png`,
        `${process.env.NEXT_PUBLIC_CLOUD_URL}images/35_i05.png`,
        `${process.env.NEXT_PUBLIC_CLOUD_URL}images/33_i11.png`
    ];
    const randomBack = searchWrapBackgruond[Math.floor(Math.random() * searchWrapBackgruond.length)]
    const moveSearchPage = () => {
        const searchValue = document.getElementById('searchOp').value
        router.push({
            pathname: '/operator/search',
            query:{name:`${searchValue}`}
        }, `/operator/search`)
    }

    const moveSearchPageKey = (e) => {
        if(e.keyCode === 13) {
            moveSearchPage()
        }
    }


    return <>
        <nav className={navStyle.commonNavWrap}>
                <div className={navStyle.operatorSearchWrap}>
                    <div className={navStyle.topHeader}>
                        <div className="container-xl">
                        <div><Link href='/'>ARKINFO</Link></div>
                        </div>
                    </div>
                    <div className={navStyle.operatorSearchWrapBack} style={{backgroundImage:`url(${randomBack})`}}>
                        <div className={navStyle.operatorSearchWrapBackOver}>
                        </div>
                        <div className={`container-xl ${navStyle.searchWrap}`}>
                            <div>
                                <div className={navStyle.form}>
                                    <input type="text" placeholder="오퍼레이터 검색" onKeyUp={moveSearchPageKey} id="searchOp"></input>
                                    <button onClick={moveSearchPage}><i className="bi bi-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={navStyle.navMenuWrap}>
                    <div className="container-xl">
                    <ul className={navStyle.navMenu}>
                        {menuPrint}
                    </ul>
                    </div>
                </div>
            
        </nav>
    </>
}

// export async function getServerSideProps() {

//     return {
//         props: {
            
//         }
//     }
// }