ToastJS is a javascript implementation of adroid style Toast (pop up) messages.

Usage:
	Syntax Toast(<string text here>, <int length here in ms>).show(TOAST_BOTTOM/TOAST_TOP/TOAST_LEFT/TOAST_RIGHT/<dom element>)

	new Toast('Some text here').show();
	new Toast('Some more text here', TOAST_LONG).show(TOAST_TOP);
	
	var valueInput = document.getElementById('value_input_field');
	new Toast('Value is required!', TOAST_LONG).show(valueInput);
