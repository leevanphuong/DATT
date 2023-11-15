import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '~/app/store/hooks'
import { actions as authorActions } from "../reducer/authorSlice/authorSilce"
import { getAllAuthor, getOneAuthor } from '../reducer/authorSlice/thunk/author.thunk'
export const useAuthorRedux = () => {
    const data = useAppSelector((state: any) => state.client.authorReducer as any, shallowEqual)
    const dispatch = useAppDispatch()
    const allActions = {
        ...authorActions,
        getAllAuthor,
        getOneAuthor
    }
    const actions = useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
    return {
        data,
        actions
    }
}