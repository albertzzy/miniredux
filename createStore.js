export default function createStore(reducer,preloadedState){
	let listeners = [];
	let currentState = preloadedState;
	let currentReducer = reducer;


	getState(){
		return currentState;
	}


	dispatch(actionPayload,callback){
		if(typeof actionPayload === 'function'){
			return new Promise(actionPayload()).then((res)=>{
				currentState = currentReducer(currentState);
				callback(currentState,res);
			}).catch((err)=>{
				callback(currentState,err);
			})

		}else{
			currentReducer(actionPayload,currentState)
		}
	}



	subscribe(listener){

		if(typeof listener !== 'function'){
			throw new Error('listener should be a function');
		}	

		listeners.push(listener);

		return unSubscribe(){
			let index = listener.indexOf(listeners);

			listeners.splice(index,1);
		}

	}



	return {
		dispatch,
		getState,
		subscribe
	}

}