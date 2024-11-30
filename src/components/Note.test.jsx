import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const { container } = render(<Note note={note} />)
    const element = screen.getByText('Component testing is done with react-testing-library')

    screen.debug(element)

    const div = container.querySelector('.note')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})
