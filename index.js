'use strict'
import { renderComments } from './modules/renderComments.js'
import { comments, updateComments } from './modules/comments.js'
import { fetchAndRender } from './modules/fetchAndRender.js'

const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')
const button = document.querySelector('.add-form-button')
const form = document.querySelector('.add-form')
const loadingIndicator = document.createElement('div')
loadingIndicator.className = 'loading'
loadingIndicator.textContent = 'Комментарий добавляется...'
loadingIndicator.style.display = 'none'
form.parentNode.insertBefore(loadingIndicator, form)

document.querySelector('.comments').textContent = 'Загружаем комментарии...'

fetchAndRender()
// fetch('https://wedev-api.sky.pro/api/v1/:vady/comments', {
//     method: 'GET',
// })
//     .then((response) => {
//         return response.json()
//     })
//     .then((data) => {
//         updateComments(data.comments)
//         renderComments(comments)
//     })
button.addEventListener('click', () => {
    const name = nameInput.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    const text = textInput.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')

    if (!name || !text) {
        alert('Пожалуйста, заполните все поля')
        return
    }
    // Показываем индикатор загрузки и скрываем форму
    loadingIndicator.style.display = 'block'
    form.style.display = 'none'

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
    loadingIndicator.style.display = 'none'
    form.style.display = 'block'
    nameInput.value = ''
    textInput.value = ''
})
