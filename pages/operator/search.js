import ContentLayout from "@/layout/contentLayout";
import PageLayout from "@/layout/pageLayout";
import { useRouter } from "next/router";
import * as operatorActions from '@/store/modules/searchOp'
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from "react";

export default function OperatorSaerch() {
    const router = useRouter()
    console.dir(router)

    const dispatch = useDispatch();
    const setFirstPage = useCallback(({}) => {
        dispatch(operatorActions.setPage(1));
    }, [dispatch]);

    const searchOpValue = useSelector(({searchOp}) => searchOp)

    const setNextPage = useCallback(({}) => {
        dispatch(operatorActions.setPage(1));
    }, [dispatch])


    return <>
        <PageLayout>
            <ContentLayout>
                <button onClick={() => setFirstPage()}>TEST</button>
            </ContentLayout>
        </PageLayout>
    </>
}