import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppDispatchType, AppStateType} from 'Store/Store'

export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector