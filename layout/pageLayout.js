import pageLayoutCss from "@/styles/layout/page.module.scss"
export default function PageLayout({children}) {
    return <>
        <div className={pageLayoutCss.pageLayoutWrap}>
            {children}
        </div>
    </>
}