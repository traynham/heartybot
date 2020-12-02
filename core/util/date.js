/*

	A collection of date and time functions.

*/

const payload_obj = require('@core/util/payload')

module.exports = {
//THIS IS NOW OBSOLETE.	
	// RETURN DURATION IN MINUTES
	duration: (startDate, endDate) => {
	
		let payload = payload_obj()

		payload.startDate = startDate
		payload.endDate = endDate

		if(startDate == null || endDate == null){
			payload.error = true
			payload.error_message = 'startDate or endDate param is missing.'
			return payload
		} 

		payload.value = Math.round((endDate - startDate) / 1000 / 60)

		return payload

	}


} //MODULE.EXPORTS