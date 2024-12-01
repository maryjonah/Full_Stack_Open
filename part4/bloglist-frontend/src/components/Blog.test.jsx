import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'Pig Years',
      author: 'Ellen Gaydos',
      url: 'https://www.npr.org/2024/11/29/1215793964/nprs-book-of-the-day-pig-years-what-the-chicken-knows',
      user: {
        username: 'ekuajonah'
      }
    }

    container = render(<Blog blog={ blog } />).container
  })

  test('at the start only the title of the Blog can be seen, author details hidden until view button clicked', () => {
    // Check that title is visible
    const titleElement = screen.getByText('Pig Years')
    expect(titleElement).toBeDefined()

    // Check that author details are initially hidden
    const otherTextDiv = container.querySelector('.otherBlogInfo')
    expect(otherTextDiv).toHaveStyle('display: none')
  })

  test('when view button is clicked, blog author, likes, and url is displayed', async () => {
    const user = userEvent.setup()
    const viewBtn = screen.getByText('view')
    await user.click(viewBtn)

    const otherBlogDetails = container.querySelector('.otherBlogInfo')
    expect(otherBlogDetails).not.toHaveStyle('display: none')
  })

})

test('clicking the like button two times calls the event handler twice', async () => {

  const blog = {
    title: 'Hello Here',
    author: 'Ellen Gaydos',
    url: 'https://www.npr.org/2024/11/29/1215793964/nprs-book-of-the-day-pig-years-what-the-chicken-knows',
    user: {
      username: 'ekuajonah'
    }
  }

  const mockLikeHandler = vi.fn()
  render(<Blog blog={ blog } updateLikes={ mockLikeHandler } />)

  const user = userEvent.setup()
  const likeBtn = screen.getByText('like post')

  await user.click(likeBtn)
  await user.click(likeBtn)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})
