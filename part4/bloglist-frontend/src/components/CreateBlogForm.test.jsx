import { render, screen } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

describe('<CreateBlogForm />', () => {
  test('creating a new post receives props', async () => {

    const handleSubmit = vi.fn()
    const handleTitle = vi.fn()
    const handleAuthor = vi.fn()
    const handleUrl = vi.fn()

    const user = userEvent.setup()

    render(<CreateBlogForm handleSubmit={ handleSubmit } handleTitle={ handleTitle } handleAuthor={ handleAuthor } handleUrl={ handleUrl } />)

    const title = screen.getByPlaceholderText('title of post goes here')
    const author = screen.getByPlaceholderText('name of the author')
    const url = screen.getByPlaceholderText('amazon link to book')
    const createBtn = screen.getByText('create new blog')

    await user.type(title, 'Now or Never')
    await user.type(author, 'Janet Evanovich')
    await user.type(url, 'https://bookoftheday.org/now-or-never-janet-evanovich/')
    await user.click(createBtn)

    expect(handleSubmit.mock.calls).toHaveLength(1)

    console.log(handleSubmit.mock.calls) //[0][0]) //.title).toBe('Now or Never')
    // expect(handleSubmit.mock.calls[0][0].author).toBe('Janet Evanovich')
    // expect(handleSubmit.mock.calls[0][0].url).toBe('https://bookoftheday.org/now-or-never-janet-evanovich/')
  })
})
