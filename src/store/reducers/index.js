import {combineReducers} from 'redux'
import {reducer,reducer2} from './reducer'
const reducers=combineReducers({
    Registration:reducer,
    Login:reducer2
})
export default reducers