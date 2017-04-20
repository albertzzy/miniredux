const isWindow(obj){
	return obj!== null && obj === obj.window;
}

const isObject(obj){
	return typeof obj === 'object';
}

const isplainObject(obj){
	return !isWindow(obj) && isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}

export default function combineReducers(reducers){
	if(isplainObject(reducers)){
		throw new Error('param should be a plain object');
	}


	var reducersKeys = Object.keys(reducers);

	return function(state={},action){

		for(var i=0;i<reducersKeys.length;i++){

			var reducerKey = reducersKeys[i];
			var reducer = reducers[reducerKey];

			if(typeof reducer !== 'function'){

				throw new Error('param should be a function.');
			}


			var previousStateForKey = state[reducerKey];
			var currentStateForKey = reducer(previousStateForKey,action);

			if(previousStateForKey!== currentStateForKey){
				state[reducerKey] = currentStateForKey;
			}

		}

		return state;

	}

}