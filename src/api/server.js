const apiServer = () => {
  const url = 'https://2c64-38-25-28-3.ngrok-free.app/blogposts'
  const getPosts = async () => {
    const response = await fetch(url)
    const posts = await response.json()
    return posts
  }
  const getPost = async (id) => {
    const response = await fetch(`${url}/${id}`)
    const post = await response.json()
    return post
  }
  const createPost = async (post) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    const newPost = await response.json()
    return newPost
  }
  const deletePost = async (id) => {
    const response = await fetch(`${url}/${id}`, { method: 'DELETE' })
    const deletedPost = await response.json()
    return deletedPost
  }
  const updatePost = async (id, post) => {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    const updatedPost = await response.json()
    return updatedPost
  }
  return { getPosts, getPost, createPost, deletePost, updatePost }
}

export default apiServer
