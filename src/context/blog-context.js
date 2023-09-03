import { useContext } from 'react'
import createContext from './createContext'

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
    case 'add_blogpost':
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload.title,
          content: action.payload.content,
        },
      ]
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

const addBlogPost = (dispatch) => (title, content, cb) => {
  dispatch({ type: 'add_blogpost', payload: { title, content } })
  cb?.()
}
const deleteBlogPost = (dispatch) => (id) =>
  dispatch({ type: 'delete_blogpost', payload: id })

const editBlogPost = (dispatch) => (id, title, content, cb) => {
  dispatch({ type: 'edit_blogpost', payload: { id, title, content } })
  cb?.()
}

const actions = {
  addBlogPost,
  deleteBlogPost,
  editBlogPost,
}
export const { Context, Provider } = createContext(
  reducer,
  actions,
  initialState
)

export const useBlogContext = () => {
  const value = useContext(Context)
  if (value === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider')
  }
  return value
}
