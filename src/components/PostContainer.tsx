import React, { useState } from "react"
import { postAPI } from "../services/PostService"
import PostItem from "./PostItem"
import { IPost } from "../models/IPost";

const PostContainer = () => {
    const [limit, setLimit] = useState(50);
    const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(limit, {
        pollingInterval: 5000
    })
    const [createPost, { }] = postAPI.useCreatePostsMutation()
    const [updatePost, { }] = postAPI.useUpdatePostMutation()
    const [deletePost, { }] = postAPI.useDeletePostMutation()

    const handleCreate = async () => {
        const title = prompt()
        await createPost({ title, body: title } as IPost)
    }

    const handleRemove = (post: IPost) => {
        deletePost(post)
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post);
    }

    return (
        <div>
            <div className="post__list">
                <button onClick={handleCreate}>Add new post</button>
                {isLoading && <h1>Идет загрузка...</h1>}
                {error && <h1>Произошла ошибка при загрузке</h1>}
                {posts && posts.map(post =>
                    <PostItem key={post.id} post={post} remove={handleRemove} update={handleUpdate} />
                )}
            </div>
        </div >
    )
}

export default PostContainer