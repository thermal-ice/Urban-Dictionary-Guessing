//Generally "serviceUnavailableErrorCode" indicates that we've called the API too many times in the period.
const errorCodes = {
    hasErrorCode: function(json: object){
        return json.hasOwnProperty("error_code");
    },
    serviceUnavailableErrorCode: 2,
    nameNotFoundErrorCode: 50,
    timePauseForAPICallMS:500
}

//
// console.log(errorCodes.hasErrorCode({ error_code: 50, error: 'name could not be found' }
// ))

export {errorCodes}