import { createStore } from 'redux'
import reducer from '../reducer/scores'

const store = createStore(reducer)

export default store
