/* 
 * JQuery ProgressBarTimer - v 1.0
 * A simple countdown timer using bootstrap 4 progress bar component.
 *
 *
 * Requires: bootstrap >= 4, jquery >=3
 * Made by Jacob malliaros
 * Under MIT License
 */

; (function ($, window, document, undefined) {

    var pluginName = 'progressBarTimer',
        dataPlugin = "plugin_" + pluginName,
        defaults = {
            timeLimit: 60, //total number of seconds
            warningThreshold: 5, //seconds remaining triggering switch to warning color
            autoStart: true, // start the countdown automatically
            onFinish: function() {}, //invoked once the timer expires
            baseStyle: '', //bootstrap progress bar style at the beginning of the timer
            warningStyle: 'bg-danger', //bootstrap progress bar style in the warning phase
            smooth: false, // should the timer be smooth or stepping
            completeStyle: 'bg-success' //bootstrap progress bar style at completion of timer
        };

    function Plugin(element, options) {
		this.element = element;
		this._name = pluginName;
		this.settings = $.extend({}, defaults, options);		
		this._defaults = defaults;
		this._name = pluginName;		
		this.init();
	}

	$.extend(Plugin.prototype, {
	    init: function () {
	        $(this).empty();
	        var barContainer = $("<div>").addClass("progress active progress-striped");
	        var bar = $("<div>").addClass("progress-bar").addClass(this.settings.baseStyle)
                .attr("role", "progressbar")
                .attr("aria-valuenow", "0")
                .attr("aria-valuemin", "0")
                .attr("aria-valuemax", this.settings.timeLimit);
	        bar.appendTo(barContainer);
            barContainer.appendTo(this.element);
	       
	        
            if (this.settings.smooth) {
                this.timerInterval = 20;
                this.ticks = this.settings.timeLimit * 50;
            } else {
                this.timerInterval = 1000;
                this.ticks = this.settings.timeLimit;
            }
	        this.remainingTicks = this.ticks;

	        if (this.settings.autoStart) this.start();
            
			this.bindEvents();
		},
		destroy: function () {
		    this.unbindEvents();
			this.element.removeData();
		},
		bindEvents: function () {
			var plugin = this;
		},
		unbindEvents: function () {
			this.element.off('.' + this._name);
		},
		start: function () {
            this.interval = setInterval(jQuery.proxy(this._draw, this), this.timerInterval);
        },
        stop: function (callBack) {
            clearInterval(this.interval);
		    if (callBack) { callBack(); }
		},
        getElapsedTime: function () {
            return (this.ticks - this.remainingTicks) * this.timerInterval;
        },
        getTimeRemaining: function() {
            return this.remainingTicks * this.timerInterval;
        },
        addSeconds: function (seconds) {
            var added = this.setings.smooth ? seconds * 20 : seconds;
            this.ticks += added;
            this.remainingTicks += added;
        },
        _draw: function () {
            var bar = $(this.element).find('.progress-bar');
            var elapsedTicks = this.ticks - this.remainingTicks;
            bar.width(((elapsedTicks / this.ticks) * 100) + "%");

            if (this.remainingTicks-- === 0) {
                this.stop();

                bar.removeClass(this.settings.baseStyle)
                    .removeClass(this.settings.warningStyle)
                    .addClass(this.settings.completeStyle);

                this.settings.onFinish();
            }
        }
	});

	$.fn.progressBarTimer = function (options) {
	    var plugin;
	    this.each(function () {
	        plugin = $.data(this, "plugin_" + pluginName);
	        if (!plugin) {
	            plugin = new Plugin(this, options);		        

				$.data( this, "plugin_" + pluginName, plugin );
			}
	    });
	    return plugin;
	};


})(jQuery, window, document);