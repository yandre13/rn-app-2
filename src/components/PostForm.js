import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const PostForm = ({
  onSubmit,
  initialValues = { title: '', content: '' },
  edit = false,
}) => {
  const [title, setTitle] = useState(initialValues.title)
  const [content, setContent] = useState(initialValues.content)

  const onSubmitForm = () => {
    onSubmit(title, content)
  }
  return (
    <View>
      <Text style={styles.label}>{edit ? 'Edit' : 'Enter'} title:</Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Title"
        style={styles.input}
      />
      <Text style={styles.label}>{edit ? 'Edit' : 'Enter'} Content:</Text>
      <TextInput
        value={content}
        onChangeText={(text) => setContent(text)}
        placeholder="Content"
        style={styles.input}
      />
      <Button title="Edit Blog Post" onPress={onSubmitForm} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 16,
    padding: 8,
    margin: 8,
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 8,
  },
})

export default PostForm
