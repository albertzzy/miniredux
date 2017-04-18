## a simple state manager highly inspired by redux

state
	dispatch(actionPayload,callback[prev,cur]) 
		reducer => curState
	subscribe // global watch

combineReducer