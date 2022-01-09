import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Togglable />', () => {

    let component

    beforeEach(() => {
        const blog = {
        title: "Blogi2",
        author: "Jaakko",
        url: "www.jaakkoblogi2.com",
        user:{
            "username": "Jees",
            "name": "jeppis maakki",
            "id": "61d9795c497155eb245235d5"
            },
        id: "61d979b6497155eb245235de"
        }

    const user = {
            username: "Jees",
            name: "jeppis maakki",
            id: "61d9795c497155eb245235d5"
        }

    component = render(
                    <Blog blog={blog} user={user} />
                    )
    })


    test("blog renders the blog's title and author and view button by default", () => {

        expect(component.container).toHaveTextContent(
            'Blogi2 Jaakko view'
        )

    })


    test("blog renders details when view is clicked", () => {

        const mockHandler = jest.fn()

        const button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent('Blogi2 Jaakko hidewww.jaakkoblogi2.comLikes: likejeppis maakkijeppis maakki delete')

    })

})