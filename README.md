# jquery.progressBarTimer

### A simple countdown timer using boostrap 4 progress bar

This plugin provides a simple jquery timer using bootstrap 4 progress bar

## Basic Usage

1. Include jQuery:

	```html
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	```

2. Include bootstrap:

	```html
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
	```

3. Include plugin's code:

	```html
	<script src="dist/jquery.progressBarTimer.min.js"></script>
	```    

3. Include the plugin container in your HTML:

  ```html
  <div id="countdown"></div>
  ```    

4. Call the plugin:

  ```javascript
  $("#countdown").progressBarTimer({
	timeLimit: 60,
	warningThreshold: 5,
    autostart: false,
    onFinish  : function () { console.log('completed') }
  }).start()
  `
  
  ## Default Options

```javascript
{
    timeLimit: 60, //total number of seconds
    warningThreshold: 5, //seconds remaining triggering switch to warning color
    autoStart: true, // start the countdown automatically
    onFinish: function() {}, //invoked once the timer expires
    baseStyle: '', //bootstrap progress bar style at the beginning of the timer
    warningStyle: 'bg-danger', //bootstrap progress bar style in the warning phase
    smooth: false, // should the timer be smooth or stepping
    completeStyle: 'bg-success' //bootstrap progress bar style at completion of timer
}
```
