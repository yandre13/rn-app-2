import React, { useMemo } from 'react'
import { useBlogContext } from '../context/blog-context'
import PostForm from '../components/PostForm'

const EditScreen = ({ navigation, route }) => {
  const id = route.params.id
  const { state, editBlogPost } = useBlogContext()

  const blogPost = useMemo(() => {
    return state.find((blogPost) => blogPost.id === id)
  }, [id, state])

  const onSubmit = (title, content) => {
    editBlogPost(id, title, content, () => navigation.pop())
  }

  if (!blogPost) {
    return null
  }
  return (
    <PostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={onSubmit}
      edit
    />
  )
}

export default EditScreen
