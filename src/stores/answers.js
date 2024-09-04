import { defineStore } from 'pinia'

// set defaults. Mostly necessary for radio buttons.
const defaults = () => ({
    name: '',
    email: '',
    liveInNewYork: 'Yes',
    whereDoYouLive: '',
    whyDoYouLikeIt: '',
    typeOfPets: []
})

// Get either the answers submitted from field components or the defaults if there's no data pushed from components
const getAnswers = () => {
    const answers = localStorage.getItem('answers')
    return answers ? JSON.parse(answers) : defaults()
}

export const useAnswerStore = defineStore('answers', {

    state: () => ({
        // set the state based on getAnswers() results
        answers: getAnswers()
    }),
    actions: {
        // grab current answers and submit any additional answers submitted by components
        updateAnswers(partialAnswers) {
            this.answers = {
                ...this.answers,
                ...partialAnswers
            }

            // store items to local storage so refreshing the page doesn't kill all the un-persisted pinia data
            localStorage.setItem('answers', JSON.stringify(this.answers))
        }
    }
})