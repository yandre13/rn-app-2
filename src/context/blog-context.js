import { useContext } from 'react'
import createContext from './createContext'
import apiServer from '../api/server'

const initialState = [
  {
    id: 1,
    title: 'Blog Post #1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    title: 'Blog Post #2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]

const reducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload
    // case 'add_blogpost':
    //   return [
    //     ...state,
    //     {
    //       id: action.payload.id,
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ]
    case 'delete_blogpost':
      return state.filter((blogPost) => blogPost.id !== action.payload)
    case 'edit_blogpost':
      return state.map((blogPost) => {
        if (blogPost.id === action.payload.id) {
          return action.payload
        }
        return blogPost
      })
    default:
      return state
  }
}

const getBlogPosts = (dispatch) => async () => {
  const response = await apiServer().getPosts()
  dispatch({ type: 'get_blogposts', payload: response })
}
const addBlogPost = (dispatch) => async (title, content, cb) => {
  const response = await apiServer().createPost({ title, content })
  // dispatch({ type: 'add_blogpost', payload: response })
  cb?.()
}
const deleteBlogPost = (dispatch) => async (id) => {
  const response = await apiServer().deletePost(id)
  dispatch({ type: 'delete_blogpost', payload: id })
}

const editBlogPost = (dispatch) => async (id, title, content, cb) => {
  const response = await apiServer().updatePost(id, { title, content })
  dispatch({ type: 'edit_blogpost', payload: { id, title, content } })
  cb?.()
}

const actions = {
  getBlogPosts,
  addBlogPost,
  deleteBlogPost,
  editBlogPost,
}
export const { Context, Provider } = createContext(reducer, actions, [])

export const useBlogContext = () => {
  const value = useContext(Context)
  if (value === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider')
  }
  return value
}
