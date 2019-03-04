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
            autoStart: false, // start the countdown automatically
            onFinish: function() {}, //invoked once the timer expires
            baseStyle: '', //bootstrap progress bar style at the beginning of the timer
            warningStyle: 'bg-warning', //bootstrap progress bar style in the warning phase
            smooth: false, // should the timer be smooth or stepping
            completeStyle: 'bg-danger', //bootstrap progress bar style at completion of timer
            striped: false, //allow bootstrap striped progress bar 
            animated: false, //allow bootstrap animated progress bar (striped should also be on)
            height: 0, //height of progress bar in pixels (0 is the default height)
            label : {
                show: false, //show label inside progress bar
                type: 'percent' //type of label. Allowable types: 'percent' => 30% , 'seconds' => 23/60
            }
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
            if(this.settings.animated) {
                bar.addClass('progress-bar-striped');
                bar.addClass('progress-bar-animated');
            } else if(this.settings.striped) bar.addClass('progress-bar-striped');
            if(this.settings.height) barContainer.height(this.settings.height);
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

	        if (this.settings.autoStart===true) this.start();
            
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
        reset: function() {
            clearInterval(this.interval);
            this.remainingTicks = this.ticks;
            this._draw();
        },
        stop: function (callBack) {
            clearInterval(this.interval);
		    if (callBack) { callBack(); }
		},
        getElapsedTime: function () {
            return this._getSecondsFromTicks(this.ticks - this.remainingTicks);
        },
        getRemainingTime: function() {
            return this._getSecondsFromTicks(this.remainingTicks);
        },
        addSeconds: function (seconds) {
            var added = _getTicksFromSeconds(seconds);
            this.ticks += added;
            this.remainingTicks += added;
        },
        _getTicksFromSeconds : function(secs) {
            return this.settings.smooth ? secs * 50 : secs;
        },
        _getSecondsFromTicks: function(ticks) {
            return this.settings.smooth ? ticks / 50 : ticks;
        },
        _draw: function () {
            var bar = $(this.element).find('.progress-bar');            
            var elapsedTicks = this.ticks - this.remainingTicks;
            var percent = ((elapsedTicks / this.ticks) * 100);
            bar.width(percent + "%");
            if(this.settings.label && this.settings.label.show===true) {
                if(this.settings.label.type=='percent') {
                    bar.html(Math.round(percent) + "%");
                } else {
                    if(this.settings.smooth===true) {
                        bar.html(Math.round(elapsedTicks/50) + "/" + Math.round(this.ticks/50) );
                    } else {
                        bar.html(elapsedTicks + "/" + this.ticks );
                    }
                }
            }
            --this.remainingTicks;
            if(this._getSecondsFromTicks(this.remainingTicks)<=this.settings.warningThreshold && !bar.hasClass(this.settings.warningStyle)) {                
                bar.removeClass(this.settings.baseStyle).addClass(this.settings.warningStyle);
            }
            if (this.remainingTicks === 0) {
                this.stop();

                bar.removeClass(this.settings.baseStyle)
                    .removeClass(this.settings.warningStyle)
                    .addClass(this.settings.completeStyle);
                bar.width("100%");
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