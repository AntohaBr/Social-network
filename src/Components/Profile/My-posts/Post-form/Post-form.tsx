import React, {ChangeEvent, useState} from 'react'
import {useAppDispatch} from 'Utils'
import {SubmitHandler, useForm} from 'react-hook-form'
import {profileActions} from 'Redux/Profile-reducer/Profile-reducer'

export const PostsForm = () => {
    const dispatch = useAppDispatch()

    const [post, setPost] = useState('')

    const {register, formState: {errors}, handleSubmit} = useForm<{ post: string }>({
        defaultValues: {
            post: '',
        },
        mode: "onSubmit"
    })

    const onSubmit: SubmitHandler<{ post: string }> = ({post}) => {
        dispatch(profileActions.addPost(post))
        setPost('')
    }

    const onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPost(e.currentTarget.value)
        dispatch(profileActions.updateNewPostText(e.currentTarget.value))
    }

    const onEnterPress = (key: string) => {
        key === 'Enter' && handleSubmit(onSubmit)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} onKeyPress={(e) => onEnterPress(e.key)}>
                <div>
                    <textarea
                        placeholder='Write you want to say'
                        {...register('post', {
                            required: {
                                value: true,
                                message: 'Write something',
                            },
                            maxLength: {
                                value: 300,
                                message: "Don't overdo it, 300 characters should be more than enough!"
                            }
                        })}
                        value={post}
                        onChange={onPostChangeHandler}
                    />
                </div>
                {errors.post && <div> {Object.values(errors).map((e, idx) => {
                    return (<p key={idx}>{e.message}</p>)
                })}</div>
                }
                <div>
                    <button type="submit">Add post</button>
                </div>
            </form>
        </div>
    )
}
