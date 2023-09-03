import { StyleSheet } from 'react-native'
import React from 'react'
import { useBlogContext } from '../context/blog-context'
import PostForm from '../components/PostForm'

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useBlogContext()

  const onSubmit = (title, content) => {
    addBlogPost(title, content, () => {
      navigation.navigate('Index')
    })
  }

  return <PostForm onSubmit={onSubmit} />
}

const styles = StyleSheet.create({})

export default CreateScreen
