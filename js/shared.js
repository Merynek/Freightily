var param = function(obj) {
		var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

		for(name in obj) {
		value = obj[name];

		if(value instanceof Array) {
			for(i=0; i<value.length; ++i) {
			subValue = value[i];
			fullSubName = name + '[' + i + ']';
			innerObj = {};
			innerObj[fullSubName] = subValue;
			query += param(innerObj) + '&';
			}
		}
		else if(value instanceof Object) {
			for(subName in value) {
			subValue = value[subName];
			fullSubName = name + '[' + subName + ']';
			innerObj = {};
			innerObj[fullSubName] = subValue;
			query += param(innerObj) + '&';
			}
		}
		else if(value !== undefined && value !== null)
			query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
		}

		return query.length ? query.substr(0, query.length - 1) : query;
  };

function getErrorKeyByCode(error) {
	var errorData = error.data,
		code;

	if (error.status === 401) {
        return 'errors.codes.unauthorized';
	}

	if(errorData.error === "invalid_grant") {
		return 'errors.wrong_login';
	}

	if (errorData && errorData.errorCode) {
        code = errorData.errorCode;
        return 'errors.codes.' + code;
	}
    return 'errors.codes.fatal';
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValueNumber(value) {
	var val = value.replace(/ /g,'');

	return $.isNumeric(val);
}

function getTokenFromStorage() {
	return {
        'Authorization': "Bearer " + window.localStorage.getItem("access_token")
    };
}

var checkListAuctionRunning = false;
var checkFavouriteAuctionRunning = false;
var checkBidsAuctionRunning = false;