import contentLayoutCss from "@/styles/layout/content.module.scss"

export default function ContentLayout({children}) {
    return <>
    <div className={contentLayoutCss.contentLayout}>
        <div className={`container-xl`}>
            {children}
        </div>
    </div>

    </>
}