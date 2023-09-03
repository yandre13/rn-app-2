import { createContext, useReducer } from 'react'

export default (reducer, actions, initialState) => {
  const Context = createContext()

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const boundActions = Object.keys(actions).reduce((acc, key) => {
      acc[key] = actions[key](dispatch)
      return acc
    }, {})

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    )
  }

  return { Context, Provider }
}
