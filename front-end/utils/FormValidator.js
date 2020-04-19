export const parsePhoneNumber = phone => {
	let parsedPhone = phone;
	if (phone.startsWith("0")) {
		parsedPhone = parsedPhone.substring(1);
	} else if (phone.startsWith("90")) {
		parsedPhone = parsedPhone.substring(2);
	} else if (phone.startsWith("+90")) {
		parsedPhone = parsedPhone.substring(3);
	}
	
	return parsedPhone;
}
