import DevelopingLayout from "@/layout/developingLayout";
import { useRouter } from "next/router";

export default function operatorSaerch() {
    const router = useRouter()
    console.log(router.query)
    return <>
        <DevelopingLayout></DevelopingLayout>
        
    </>
}