## CONFIGURACION DEL HEAD PARA SCRIPT TOUCH ##

	 <meta name="viewport" content="minimum-scale=1.0, maximum-scale=1.0, width=device-width, user-scalable=no">
	 <meta name="apple-mobile-web-app-capable" content="yes">
	 <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

--------------------------------------------------------------------------------------------------------------------------

## SCRIPT DE USO ##

	function processingRoutine() {
		var swipedElement = document.getElementById(triggerElementID);
		if ( swipeDirection == 'left' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'orange';
		} else if ( swipeDirection == 'right' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'green';
		} else if ( swipeDirection == 'up' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'maroon';
		} else if ( swipeDirection == 'down' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'purple';
		}
	}

--------------------------------------------------------------------------------------------------------------------------