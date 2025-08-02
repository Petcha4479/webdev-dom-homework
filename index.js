'use strict'
import { renderComments } from './modules/renderComments.js'
import { comments, updateComments } from './modules/comments.js'

const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')
const button = document.querySelector('.add-form-button')

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

button.addEventListener('click', () => {
    const name = nameInput.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    const text = textInput.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')

    if (!name || !text) {
        alert('Пожалуйста, заполните все поля')
        return
    }
    let newComment = {
        name: name,
        date: new Date(),
        text: text,
        likes: 0,
        isLiked: false,
    }

    fetch('https://wedev-api.sky.pro/api/v1/:vady/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
    })
        .then(() => {
            return fetch('https://wedev-api.sky.pro/api/v1/:vady/comments')
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments(comments)
        })
    nameInput.value = ''
    textInput.value = ''
})
