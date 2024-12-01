import { render, screen } from '@testing-library/react'
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
})
