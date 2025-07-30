'use strict'
import { renderComments } from './modules/renderComments.js'
import { comments, updateComments } from './modules/comments.js'

const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')
const button = document.querySelector('.add-form-button')

fetch('https://wedev-api.sky.pro/api/v1/vadim-petcha/comments', {
    method: 'GET',
})
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        updateComments(data.comments)
        renderComments(comments)
    })

button.addEventListener('click', () => {
    const name = nameInput.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    const text = textInput.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')

    if (!name || !text) {
        alert('Пожалуйста, заполните все поля')
        return
    }

    const newComment = {
        author: { name: name },
        date: new Date(),
        text: text,
        likes: 0,
        isLiked: false,
    }
    comments.push(newComment)

    renderComments(comments)

    nameInput.value = ''
    textInput.value = ''
})
