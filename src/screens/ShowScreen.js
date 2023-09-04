import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useBlogContext } from '../context/blog-context'

const ShowScreen = ({ route }) => {
  const id = route.params.id
  const { state } = useBlogContext()

  const blogPost = useMemo(() => {
    return state.find((blogPost) => blogPost.id === id)
  }, [id, state])

  if (!blogPost) {
    return null
  }
  return (
    <View>
      <Text>{blogPost.title}</Text>
    </View>
  )
}

export default ShowScreen
