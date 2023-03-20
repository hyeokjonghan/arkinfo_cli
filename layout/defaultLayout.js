import Footer from "../components/footer"
import CommonNav from "../components/commonNav";

export default function DefaultLayout({children}) {
    return (
        <div>
            <CommonNav/>
            {children}
            <Footer/>
        </div>
    )
}