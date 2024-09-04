import { defineStore } from 'pinia'

// set defaults. Mostly necessary for radio buttons.
const defaults = () => ({
    name: '',
    email: '',
    liveInNewYork: 'Yes',
    whereDoYouLive: '',
    whyDoYouLikeIt: ''
})

const getAnswers = () => {
    const answers = localStorage.getItem('answers')
    return answers ? JSON.parse(answers) : defaults()
}

export const useAnswerStore = defineStore('answers', {

    state: () => ({
        answers: getAnswers()
    }),
    actions: {
        updateAnswers(partialAnswers) {
            this.answers = {
                ...this.answers,
                ...partialAnswers
            }

            // store itesm to local storage so refreshing the page doesn't kill all the unpersisted pinia data
            localStorage.setItem('answers', JSON.stringify(this.answers))
        }
    }
})