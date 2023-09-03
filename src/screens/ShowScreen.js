import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { Feather } from '@expo/vector-icons'
import { useBlogContext } from '../context/blog-context'

const ShowScreen = ({ navigation }) => {
  const id = navigation.getParam('id')
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

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Edit', { id: navigation.getParam('id') })
        }}
      >
        <Feather name="edit" size={24} />
      </TouchableOpacity>
    ),
  }
}

export default ShowScreen
