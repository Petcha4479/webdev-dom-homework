import { comments, updateComments } from './comments.js'
import { renderComments } from './renderComments.js'

export const fetchAndRender = () => {
    fetch('https://wedev-api.sky.pro/api/v1/:vady/comments', {
        method: 'GET',
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments(comments)
        })
}
