const cookieFunction = {
	setCookie(key, value, time) {
		const expires = time * 60 * 1000;
		const date = new Date(+new Date() + expires);
		document.cookie = key + '=' + value + ';expires=' + date.toUTCString();
	},
	getCookie(sName) {
		var aCookie = document.cookie.split('; ');
		for (var i = 0; i < aCookie.length; i++) {
			var aCrumb = aCookie[i].split('=');
			if (sName == aCrumb[0]) return aCrumb[1];
		}
		return null;
	},
	delCookie(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
	}
};

export default cookieFunction;
