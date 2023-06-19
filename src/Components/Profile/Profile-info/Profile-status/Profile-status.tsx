import React, {ChangeEvent, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from 'Utils'
import {selectProfileStatus} from 'Store/Selectors'
import {updateStatus} from 'Redux/Profile-reducer'

export const ProfileStatus = () => {
    const dispatch = useAppDispatch()
    const profileStatus = useAppSelector(selectProfileStatus)

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(profileStatus)

    useEffect(() => {
        setStatus(profileStatus)
    }, [profileStatus])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus(status))
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status</b>: <span onDoubleClick={activateEditMode}>{profileStatus || '------'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                </div>
            }
        </div>
    )
}