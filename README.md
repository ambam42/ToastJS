ToastJS is a javascript implementation of adroid style Toast (pop up) messages.

Syntax:

	Toast('String goes here', TOAST_LONG/TOAST_SHORT/TOAST_STICK/[int]).show(TOAST_BOTTOM/TOAST_TOP/TOAST_LEFT/TOAST_RIGHT/[dom element])

Usage:

	new Toast('Some text here').show();
	new Toast('Some more text here', TOAST_LONG).show(TOAST_TOP);
	var toast = new Toast('Got toast?');

	toast.show(TOAST_LEFT);
	toast.show(TOAST_RIGHT);	
	toast.show(TOAST_CENTER);

	var valueInput = document.getElementById('value_input_field');
	new Toast('Value is required!', TOAST_LONG).show(valueInput);
