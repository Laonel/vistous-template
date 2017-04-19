// Counter
(function($) {

	var ThemeCounter = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemeCounter.prototype = {

		defaults: {
			accX: 0,
			accY: 0,
			speed: 2000,
			refreshInterval: 50,
			decimals: 0,
			onUpdate: null,
			onComplete: null
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);
			this.build();

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.countTo)) || !($.isFunction($.fn.appear))) 
				return this;

			var self = this,
				$el = this.$elem,
				counter = $el.children(".co-number");

			this.$elem.appear(function() {
				counter.countTo(self.config);
			}, {
				accX: self.config.accX,
				accY: self.config.accY
			});

			return this;
		}

	};

	ThemeCounter.defaults = ThemeCounter.prototype.defaults;

	$.fn.themeCounter = function(options) {
		return this.each(function() {
			new ThemeCounter(this, options).init();
		});
	}

	window.ThemeCounter = ThemeCounter;

})(jQuery);

// Pie Chart
(function($) {

	var ThemePieChart = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemePieChart.prototype = {

		defaults: {
			accX: 0,
			accY: 0,
			barColor: "#aaaaaa",
			trackColor: "#f9f9f9",
			scaleColor: false,
			lineCap: "square",
			lineWidth: "2",
			size: "175",
			animate: ({
				duration: "2000",
				enabled: true
			}),
			displayPercent: true
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);
			this.build();

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.easyPieChart)) || !($.isFunction($.fn.appear))) 
				return this;

			var self = this,
				$el = this.$elem,
				$percentEl = $el.children(".pc-percent");

			if (!$percentEl.length && this.config.displayPercent) {
				$percentEl = $('<span class="pc-percent"></span>');
				$el.append($percentEl);
			}

			if (this.config.displayPercent) {
				$.extend(true, self.config, {
					onStep: function(from, to, currentValue) {
						$percentEl.html(parseInt(currentValue));
					}
				});
			}

			$el.appear(function() {
				$el.easyPieChart(self.config);
			}, {
				accX: self.config.accX,
				accY: self.config.accY
			});

			return this;
		}

	}

	ThemePieChart.defaults = ThemePieChart.prototype.defaults;

	// expose jquery plugin
	$.fn.themePieChart = function(options) {
		return this.each(function() {
			new ThemePieChart(this, options).init();
		});
	};

	window.ThemePieChart = ThemePieChart;

})(jQuery);

// Countdown
(function($) {

	var ThemeCountdown = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemeCountdown.prototype = {

		defaults: {

		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);
			this.build();

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.countdown))) 
				return this;

			var self = this,
				$el = this.$elem,
				finalDate = $el.data("countdown-date");

			$el.countdown(finalDate, function(event) {
				$el.html(event.strftime('' +
					'<div><span>%w</span>weeks</div>' +
					'<div><span>%d</span>days</div>' +
					'<div><span>%H</span>hours</div>' +
					'<div><span>%M</span>minutes</div>' +
					'<div><span>%S</span>seconds</div>'));
			});	

			return this;
		}

	};

	ThemeCountdown.defaults = ThemeCountdown.prototype.defaults;

	// expose jquery plugin
	$.fn.themeCountdown = function(options) {
		return this.each(function() {
			new ThemeCountdown(this, options).init();
		});
	};

	window.ThemeCountdown = ThemeCountdown;

})(jQuery);

// Lightbox
(function($) {

	var ThemeLightbox = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemeLightbox.prototype = {

		defaults: {
			midClick: true,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="icon_close"></i></button>',
			tClose: 'Close (Esc)',
			tLoading: 'Loading image #%curr%...',
			callbacks: {
				open: function() {
				},
				close: function() {
				}
			},
			gallery: {
				navigateByImgClick: true,
				preload: [0, 1],
				tPrev: 'Previous (Left arrow key)',
				tNext: 'Next (Right arrow key)',
				tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
			},
			ajax: {
				tError: '<a href="%url%">Content #%curr%</a> could not be loaded.'
			}
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.build();

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.magnificPopup))) 
				return this;

			this.$elem.magnificPopup(this.config);

			return this;
		}

	};

	ThemeLightbox.defaults = ThemeLightbox.prototype.defaults;

	// expose jquery plugin
	$.fn.themeLightbox = function(options) {
		return this.each(function() {
			new ThemeLightbox(this, options).init();
		});
	};

	window.ThemeLightbox = ThemeLightbox;

})(jQuery);

// Sticky Header
(function($) {

	var ThemeStickyHeader = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemeStickyHeader.prototype = {

		defaults: {
			classesAdd: "",
			classesRemove: "",
			alwaysStickOnMobile: true
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.build();

			return this;
		},

		build: function() {
			var self = this,
				$el = this.$elem;

			$(window).resize(function() {
				if (self.config.alwaysStickOnMobile && $(window).width() < 992)
					self.stick();
				else
					self.unstick();
			});

			if ($('.header-overlay').length) {
				$('.wrapper').css('margin-top', '0');
			}

			$(window).scroll(function() {
				if (self.config.alwaysStickOnMobile && $(window).width() < 992)
					return;

				if ($(window).scrollTop() > 0 && ($(document).height() - $el.height()) > $(window).height())
					self.stick();
				else
					self.unstick();
			});			

			return this;
		},

		toggleStick: function() {
			var self = this,
				$el = this.$elem,
				$body = $('body');

			if ($body.hasClass("header-stick")) {
				$el.removeClass("is_stick")
				   .removeClass(self.config.classesAdd)
				   .addClass(self.config.classesRemove);

				$body.removeClass("header-stick");
			} else {
				$el.addClass("is_stick")
				   .addClass(self.config.classesAdd)
				   .removeClass(self.config.classesRemove);

				$body.addClass("header-stick");
			}

			return this;
		},

		stick: function() {
			var self = this,
				$el = this.$elem,
				$body = $('body');

			if (!$body.hasClass("header-stick")) {
				$el.addClass("is_stick")
				   .addClass(self.config.classesAdd)
				   .removeClass(self.config.classesRemove);

				$body.addClass("header-stick");
			}

			return this;
		},

		unstick: function() {
			var self = this,
				$el = this.$elem,
				$body = $('body');

			if ($body.hasClass("header-stick")) {
				$el.removeClass("is_stick")
				   .removeClass(self.config.classesAdd)
				   .addClass(self.config.classesRemove);

				$body.removeClass("header-stick");
			}

			return this;
		}

	};

	ThemeStickyHeader.defaults = ThemeStickyHeader.prototype.defaults;

	// expose jquery plugin
	$.fn.themeStickyHeader = function(options) {
		return this.each(function() {
			new ThemeStickyHeader(this, options).init();
		});
	};

	window.ThemeStickyHeader = ThemeStickyHeader;

})(jQuery);

// Main Navigation
(function($) {

	var ThemeMainNav = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	}

	ThemeMainNav.prototype = {

		defaults: {
			mobileNavWidth: 991, // Max width at which mobile navigation will be activated
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.$header = $(".main-header");
			this.$mainNav = this.$elem.find(".main-nav");
			this.$mobileNav = this.$elem.find(".mobile-nav");

			this.build();

			return this;
		},

		build: function() {
			var self = this,
				$el = this.$elem;

			this.$mobileNav.on("click", function() {

				if (self.$mainNav.hasClass("js-opened")) {
					self.$mainNav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
				} else {
					self.$mainNav.slideDown("slow", "easeOutQuart").addClass("js-opened");
				}

			});

			if (!$(".main-nav").hasClass("nav"))
				$(".main-nav").addClass("nav");

			$(".main-nav.sf-menu").superfish({
				delay: 550,
				animation: {
					opacity: 'show',
					top: 'show'
				},
				speed: 'fast'
			});

			$(".main-nav").slicknav({
				prependTo: ".nav-wrapper",
				label: ""
			});

			$(window).resize(function() {
				$(".slicknav_nav").css("max-height", ($(window).height() - self.$header.height()) + "px");
			});

			$(window).resize(function() {

				if ($(window).width() < 968) {
					$el.addClass("mobile-on");
				} else if ($el.hasClass("mobile-on")) {
					$el.removeClass("mobile-on");
				}
				
				if ($el.hasClass("mobile-on")) {
					
				}

			});
			
			$el.find(".dropdown-search, .dropdown-cart").on("click", function(event) {
				event.preventDefault();
			})

			return this;
		}

	}

	ThemeMainNav.defaults = ThemeMainNav.prototype.defaults;

	// expose jquery plugin
	$.fn.themeMainNav = function(options) {
		return this.each(function() {
			new ThemeMainNav(this, options).init();
		});
	};

	window.ThemeMainNav = ThemeMainNav;

})(jQuery);

// Progress bar
(function($) {

	var ThemeProgressBar = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemeProgressBar.prototype = {

		defaults: {
			valueMin: 0,
			valueMax: 100,
			speed: 0.7,
			accX: 0,
			accY: 0
		},

		init: function() {
			this.config = $.extend({}, this.defaults, this.options, this.metadata);

			this.build();

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.appear))) 
				return this;

			var self = this,
				$el = this.$elem,
				$parent = $el.parent(),
				value = $el.attr("aria-value"),
				percent = (value / (this.config.valueMax - this.config.valueMin)),
				barWidth = ($parent.width() * percent),
				animLength = (1000 / this.config.speed);

			$el.append("<span></span>");
			var $percentEl = $el.children("span");

			$el.appear(function() {
				$el.animate({
					width: barWidth
				}, {
					duration: animLength,
					step: function(n, t) {
						$percentEl.html(parseInt(((n / barWidth) * value)) + "%");
					},
					complete: function() {
						$percentEl.html(value + "%");
					}
				});
			}, {
				accX: this.config.accX,
				accY: this.config.accY
			});

			return this;
		}

	};

	ThemeProgressBar.defaults = ThemeProgressBar.prototype.defaults;

	// expose jquery plugin
	$.fn.themeProgressBar = function(options) {
		return this.each(function() {
			new ThemeProgressBar(this, options).init();
		});
	};

	window.ThemeProgressBar = ThemeProgressBar;

})(jQuery);

// Accordion
(function($) {

	var ThemeAccordion = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemeAccordion.prototype = {

		defaults: {
			singleActive: false,
			speed: 350
		},

		init: function() {
			this.config = $.extend({}, this.defaults, this.options, this.metadata);

			this.build();

			return this;
		},

		build: function() {
			var self = this,
				$el = self.$elem;
				$panes = $el.children("li");
				$paneTitles = $panes.children(".title");

			$el.addClass("accordion");

			if (self.config.singleActive) {

				$paneTitles.on("click", function() {

					var $pane = $(this).parent();

					if ($pane.hasClass("active"))
						return;
					else {

						self.hideAll();
						$pane.addClass("active");

					}

				});

			} else {

				$paneTitles.on("click", function() {
					$(this).parent().toggleClass("active");
				});

			}

			return this;
		},

		show: function($el) {
			$el.addClass("active");

			return this;
		},

		hide: function($el) {
			$el.removeClass("active");

			return this;
		},

		hideAll: function() {
			this.$elem.children("li").removeClass("active");

			return this;
		}

	};

	ThemeAccordion.defaults = ThemeAccordion.prototype.defaults;

	// expose jquery plugin
	$.fn.themeAccordion = function(options) {
		return this.each(function() {
			new ThemeAccordion(this, options).init();
		});
	};

	window.ThemeAccordion = ThemeAccordion;

})(jQuery);

// Page Loader
(function($) {

	var ThemePageLoader = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemePageLoader.prototype = {

		defaults: {
			animation: "speeding-wheel",
			listenOn: document,
			visibleClass: "page-loader-visible"
		},

		init: function() {
			this.config = $.extend({}, this.defaults, this.options, this.metadata);

			this.build()
				.events();

			return this;
		},

		build: function() {
			var self = this,
				$el = this.$elem;

			var elTemplate = $('<div class="loader">' +
									'<div class="loader-anim">' +
									'</div>' +
								'</div>');

			var $loaderEl = $el.append(elTemplate).children(".loader"),
				$animEl = $loaderEl.children(".loader-anim");

			$animEl.addClass(this.config.animation);

			$(window).load(function() {
				self.hide();
			});

			return this;
		},

		events: function() {
			var self = this;

			$(self.config.listenOn)
				.on("page-loader:show", function(event) {
					event.stopPropagation();
					self.show();
				})
				.on("page-loader:hide", function(event) {
					event.stopPropagation();
					self.hide();
				});

			return this;
		},

		show: function() {
			var $el = this.$elem;

			$el.addClass(this.config.visibleClass);

			return this;
		},

		hide: function() {
			var $el = this.$elem;

			$el.removeClass(this.config.visibleClass);

			return this;
		}

	};

	ThemePageLoader.defaults = ThemePageLoader.prototype.defaults;

	// expose jquery plugin
	$.fn.themePageLoader = function(options) {
		return this.each(function() {
			new ThemePageLoader(this, options).init();
		});
	};

	window.ThemePageLoader = ThemePageLoader;

})(jQuery);

// Portfolio
(function($) {

	var ThemePortfolio = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemePortfolio.prototype = {

		defaults: {
			listenOn: document,
			layoutMode: 'masonry',
			itemContainer: '.portfolio-container',
			masonry: {
				responsive: true
			},
			popup: {
				enabled: false,
				selector: '.popup-toggle',
				template:
					'<div class="portfolio-popup">' +
						'<div class="popup-header">' +
							'<div class="container relative">' +
								'<nav>' +
									'<ul class="popup-nav">' +
										'<li class="popup-nav-previous"><a href="#"><i class="arrow_carrot-left"></i></a></li>' +
										'<li class="popup-nav-close"><a href="#"><i class="icon_close"></i></a></li>' +
										'<li class="popup-nav-next"><a href="#"><i class="arrow_carrot-right"></i></a></li>' +
									'</ul>' +
								'</nav>' +
							'</div>' +
						'</div>' +
						'<div class="popup-loader">' +
						'</div>' +
						'<div class="popup-body">' +
						'</div>' +
					'</div>',
				ajaxError: "Couldn't load content",
				onLoad: null,
				onSuccess: null,
				onError: null
			},
			filtering: {
				enabled: true,
				container: '.filters',
				selector: '.filter'
			}
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.popupInitialized = false;
			this.filteringInitialized = false;
			this.gridInitialized = false;

			this.build()
				.events();

			return this;
		},

		build: function() {
			var self = this,
				$el = this.$elem;

			this.initGrid();

			if (this.config.popup.enabled)
				this.initPopup();

			if (this.config.filtering.enabled)
				this.initFiltering();

			return this;
		},

		events: function() {
			var self = this;

			$(self.config.popup.listenOn)
				.on("portfolio-popup:toggle", function(event) {
					event.stopPropagation();
					self.togglePopup();
				})
				.on("portfolio-popup:show", function(event) {
					event.stopPropagation();
					self.openPopup();
				})
				.on("portfolio-popup:hide", function(event) {
					event.stopPropagation();
					self.closePopup();
				})
				.on("portfolio-popup:load", function(event) {
					event.stopPropagation();
					self.popupAjaxLoad();
				})
				.on("portfolio-popup:prev", function(event) {
					event.stopPropagation();
					self.popupPrev();
				})
				.on("portfolio-popup:next", function(event) {
					event.stopPropagation();
					self.popupNext();
				})
				.on("portfolio-popup:clear", function(event) {
					event.stopPropagation();
					self.popupClear();
				});

		},

		initGrid: function() {
			if (!($.isFunction($.fn.masonry)))
				return this;

			var self = this,
				$el = this.$elem,
				$container;

			if ($el.is(self.config.itemContainer))
				$container = $el;
			else
				$container = $el.find(self.config.itemContainer);

			if (self.config.layoutMode === 'masonry') {

				if (!$container.hasClass("portfolio-masonry"))
					$container.addClass("portfolio-masonry");

				var $item = $container.find(".portfolio-item"),
					itemWidth = $item.first().outerWidth();

				this.config = $.extend(true, this.config, {
					masonry: {
						columnWidth: '.portfolio-item',
						percentPostion: true,
						itemSelector: '.portfolio-item'
					}
				});

				console.log(self.config.masonry)

				$container.imagesLoaded().progress(function() {
					$container.masonry(self.config.masonry);
				});

			}

			if (self.config.layoutMode === "grid") {

			}

			this.$gridContainer = $container;
			this.gridInitialized = true;

			return this;
		},

		updateGrid: function() {
			var self = this,
				$el = this.$elem,
				$container;

			if ($el.is(self.config.itemContainer))
				$container = $el;
			else
				$container = $el.find(self.config.itemContainer);

			if (self.config.layoutMode === "masonry") {
				$container.masonry("layout");
			}
		},

		initFiltering: function() {
			var self = this,
			$el = this.$elem,
			$filterCon = $el.find(self.config.filtering.container),
			$filters = $filterCon.find(self.config.filtering.selector);

			$filters.on("click", function(event) {
				var $clicked = $(this);

				if (!self.gridInitialized)
					return false;

				var selector = $clicked.data('filter');

				if (selector === "all")
					selector = "";

				self.filter(selector);

				$filters.removeClass("active");
				$clicked.addClass("active");

				event.preventDefault();
			});

			this.filteringInitialized = true;

			return this;
		},

		filter: function(selector) {
			var self = this,
				$items = self.$elem.find(".portfolio-item");

			if (selector == "") {
				$items.each(function() {
					$(this).css("display", "");
				});

			} else {
				$items.each(function() {
					if ($(this).is(selector))
						$(this).css("display", "");
					else
						$(this).css("display", "none");
				});
			}

			self.updateGrid();

			return this;
		},

		initPopup: function() {
			var self = this,
				$body = $("body"),
				$el = this.$elem;

			// Popup's variables
			this.popup = {
				$popupEl: $(self.config.popup.template)
			};

			this.popup = $.extend(true, this.popup, {
				$items: $el.find(".portfolio-item " + self.config.popup.selector),
				$popupHeader: self.popup.$popupEl.find(".popup-header"),
				$popupLoader: self.popup.$popupEl.find(".popup-loader"),
				$popupBody: self.popup.$popupEl.find(".popup-body"),
				$popupNavPrev: self.popup.$popupEl.find(".popup-nav-previous"),
				$popupNavNext: self.popup.$popupEl.find(".popup-nav-next"),
				$popupNavClose: self.popup.$popupEl.find(".popup-nav-close"),
				currentId: -1,
				currentSrc: ""
			});

			// Loop through all items with popup to create an unique id for each of them
			for (var i = 0, len = self.popup.$items.length; i < len; i++) {
				self.popup.$items.eq(i).attr("data-popup-item-id", i);
			}

			// prepend popup's html markup to body tag
			self.popup.$popupEl.prependTo($body);

			// make popup header the width of the window
			if (self.popup.$popupEl.hasScrollBar()) {
				self.popup.$popupHeader.css("width", $(window).width() + "px");
			} else {
				self.popup.$popupHeader.css("width", ($(window).width() + 15) + "px");
			}

			// instantiate page loader plugin for portfolio loader
			self.popup.$popupLoader.themePageLoader({
				listenOn: ".portfolio-popup",
				visibleClass: "popup-loader-visible"
			})

			// registering events
			self.popup.$items.on("click", function(event) {
				var $target = $(this);
				self.popup.currentSrc = $target.attr("href");
				self.popup.currentId = $target.data("popup-item-id");

				self.openPopup(event);
				self.popupAjaxLoad();
			});
			this.popup.$popupNavClose.on("click", function(event) {
				event.preventDefault();
				
				self.popup.$popupEl.trigger("page-loader:hide");

				setTimeout(function() {
					self.closePopup(event);
					self.popupClear();
				}, 350);
			});
			this.popup.$popupNavPrev.on("click", function(event) {
				self.popupPrev();

				event.preventDefault();
			});
			this.popup.$popupNavNext.on("click", function(event) {
				self.popupNext();

				event.preventDefault();
			});

			this.popupInitialized = true;

			return this;
		},

		togglePopup: function() {
			var self = this,
				$body = $("body");

			if ($body.hasClass("fullscreen-popup-open")) {
				self.closePopup();
			} else {
				self.openPopup();
			}

			return this;
		},

		openPopup: function(event) {
			$("body").addClass("fullscreen-popup-open");
			$("html").css("overflow", "hidden");//.css("margin-right", "15px");

			event.preventDefault();

			return this;
		},

		closePopup: function(event) {
			$("html").css("overflow", "").css("margin-right", "");
			$("body").removeClass("fullscreen-popup-open");

			event.preventDefault();

			return this;
		},

		popupPrev: function() {
			var self = this;

			if (self.popup.currentId === 0)
				return this;

			var curId = self.popup.currentId -= 1;
			self.popup.currentSrc = self.popup.$items[curId].getAttribute("href");

			self.popupAjaxLoad();

			return this;
		},

		popupNext: function() {
			var self = this;

			if (self.popup.currentId === self.popup.$items.length - 1)
				return this;

			var curId = self.popup.currentId += 1;
			self.popup.currentSrc = self.popup.$items[curId].getAttribute("href");

			self.popupAjaxLoad();

			return this;
		},

		popupAjaxLoad: function() {
			var self = this,
				$content = this.popup.$popupEl.find(".popup-body");

			self.popup.$popupEl.trigger("page-loader:show");

			setTimeout(function() {
				self.popup.$popupBody.empty();

				self.popup.$popupNavPrev.removeClass("disabled");
				self.popup.$popupNavNext.removeClass("disabled");

				if (self.popup.currentId === 0) {
					self.popup.$popupNavPrev.addClass("disabled");
				} else if (self.popup.currentId === self.popup.$items.length - 1) {
					self.popup.$popupNavNext.addClass("disabled");
				}

				self.popup.$popupBody.load(self.popup.currentSrc, function(response, status, xhr) {
					if (status === "error") {
						self.popup.$popupBody.append(
							$('<div class="popup-error">' +
								'<p class="align-center">' +
								self.config.popup.ajaxError +
								'</p>' +
							  '</div>')
						);
						self.popup.$popupEl.trigger("page-loader:hide");
					} else if (status === "success") {

						var responseEl = self.popup.$popupBody.children();

						if (self.config.popup.onSuccess != null)
							self.config.popup.onSuccess(responseEl);

						// Hide loader
						self.popup.$popupEl.trigger("page-loader:hide");
					}

				});
			}, 350);
			

			return this;
		},

		popupClear: function() {
			var $content = this.popup.$popupEl.find(".popup-body");

			$content.empty();

			return this;
		}

	};

	ThemePortfolio.defaults = ThemePortfolio.prototype.defaults;

	// expose jquery plugin
	$.fn.themePortfolio = function(options) {
		return this.each(function() {
			new ThemePortfolio(this, options).init();
		});
	};

	window.ThemePortfolio = ThemePortfolio;

})(jQuery);

// Slider
(function($) {

	var ThemeSlider = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemeSlider.prototype = {

		defaults: {
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.build();

			return this;
		},

		build: function() {

			var self = this,
				$el = this.$elem;

			$el.owlCarousel(self.config);

			return this;
		}

	};

	ThemeSlider.defaults = ThemeSlider.prototype.defaults;

	// expose jquery plugin
	$.fn.themeSlider = function(options) {
		return this.each(function() {
			new ThemeSlider(this, options).init();
		});
	};

	window.ThemeSlider = ThemeSlider;

})(jQuery);

// Newsletter Signup
(function($) {

	var ThemeNewsletter = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemeNewsletter.prototype = {

		defaults: {

		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.formData = this.$elem.serialize();
			this.formUrl = this.$elem.attr("action");
			this.formMethod = this.$elem.attr("method");

			this.build();

			return this;
		},

		build: function() {

			var self = this,
				$el = this.$elem,
				$responseEl = $(".form-response").fadeOut(300);

			$el.submit(function() {

				if ($(this).data("formstatus") === "submitting")
					return false;

				this.formData = $el.serialize();

				$el.data("formstatus", "submitting");

				$.ajax({
					url: self.formUrl,
					type: self.formMethod,
					data: self.formData,
					success: function(data) {
						var responseData = $.parseJSON(data),
						classToAdd = '';

						switch (responseData.status) {
							case 'error':
								classToAdd = 'response-error alert-danger';
								break;

							case 'success':
								classToAdd = 'response-success alert-success';
								break;
						}

						$responseEl.fadeOut(300, function() {

							$(this).addClass(classToAdd)
								   .text(responseData.message)
								   .fadeIn(300, function() {

								   		/*setTimeout(function() {
								   			$responseEl.fadeOut(300, function() {
								   				$(this).removeClass(classToAdd);
								   				$el.data("formstatus", "idle");
								   			});
								   		}, 3000);*/

								   });

						});
					}
				});

				return false;
			});

			return this;
		}

	};

	ThemeNewsletter.defaults = ThemeNewsletter.prototype.defaults;

	// expose jquery plugin
	$.fn.themeNewsletter = function(options) {
		return this.each(function() {
			new ThemeNewsletter(this, options).init();
		});
	};

	window.ThemeNewsletter = ThemeNewsletter;

})(jQuery);

// Instagram
(function($) {

	var ThemeInstagram = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemeInstagram.prototype = {

		defaults: {
			get: 'popular',
			limit: 6,
			sortBy: 'most-recent',
			links: true,
			resolution: 'thumbnail'
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.build();

			return this;
		},

		build: function() {

			var self = this,
				$el = this.$elem,
				targetEl = $el.get(0);

			$.extend(true, this.config, {
				target: targetEl
			});

			this.instafeed = new Instafeed(self.config);

			this.instafeed.run();

			return this;
		}

	};

	ThemeInstagram.defaults = ThemeInstagram.prototype.defaults;

	// expose jquery plugin
	$.fn.themeInstagram = function(options) {
		return this.each(function() {
			new ThemeInstagram(this, options).init();
		});
	};

	window.ThemeInstagram = ThemeInstagram;

})(jQuery);

// Flickr Feed
(function($) {

	var ThemeFlickr = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	}

	ThemeFlickr.prototype = {

		defaults: {
			limit: 8,
			itemTemplate:
			'<li>' +
				'<a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}"></a>' +
			'</li>'
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.build();

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.jflickrfeed))) 
				return this;

			var self = this,
				$el = this.$elem;

			$el.jflickrfeed(self.config);

			return this;
		}

	};

	ThemeFlickr.defaults = ThemeFlickr.prototype.defaults;

	// expose jquery plugin
	$.fn.themeFlickr = function(options) {
		return this.each(function() {
			new ThemeFlickr(this, options).init();
		});
	};

	window.ThemeFlickr = ThemeFlickr;

})(jQuery);

// Twitter
(function($) {

	var ThemeTwitter = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	};

	ThemeTwitter.prototype = {

		defaults: {
			count: 5,
			apiPath: 'php/tweet.php',
			dateFormat: '%Y-%m-%d',
			timestamp: true,
			template: 
				'<div class="twitter-icon">' +
					'<i class="social_twitter"></i>' +
				'</div>' +
				'<span class="tweet-body">{{tweet}}</span>' +
				'<time class="tweet-date" datetime="{{timestamp}}">{{date}}</time>'
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.build();

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.twittie))) 
				return this;

			var self = this,
				$el = this.$elem;

			$el.twittie(self.config, function() {
				if (self.config.timestamp) {
					$(".tweet-date").timeago();
				}
			});

			return this;
		}

	};

	ThemeTwitter.defaults = ThemeTwitter.prototype.defaults;

	// expose jquery plugin
	$.fn.themeTwitter = function(options) {
		return this.each(function() {
			new ThemeTwitter(this, options).init();
		});
	};

	window.ThemeTwitter = ThemeTwitter;

})(jQuery);

// Background Slideshow
(function($) {

	var ThemeBgSlideshow = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	}

	ThemeBgSlideshow.prototype = {

		defaults: {
			timer: true,
			shuffle: false,
			delay: 7000,
			cover: true,
			align: 'center',
			valign: 'center',
			transition: 'fade',
			transitionDuration: 1500,
			animation: ''
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.build();

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.vegas)))
				return this;

			var self = this,
				$el = this.$elem;


			if ($el.attr("data-slides")) {
				var slides = $el.data("slides");
				self.config.slides = slides;
			}
			
			$el.vegas(self.config);

			return this;
		}

	}

	ThemeBgSlideshow.defaults = ThemeBgSlideshow.prototype.defaults;

	// expose jquery plugin
	$.fn.themeBgSlideshow = function(options) {
		return this.each(function() {
			new ThemeBgSlideshow(this, options).init();
		});
	};

	window.ThemeBgSlideshow = ThemeBgSlideshow;

})(jQuery);

// Google Maps
(function($) {

	var ThemeGoogleMap = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	}

	ThemeGoogleMap.prototype = {

		defaults: {
			marker: {
			},
			map: {
				options: {
					zoom: 14,
					backgroundColor: '#f9f9f9',
					scrollwheel: false,
					disableDoubleClickZoom: false,
					draggable: true,
					maxZoom: 20,
					zoomControl: true,
					rotateControl: false,
					scaleControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					zoomControlOptions: {
                           position: google.maps.ControlPosition.LEFT_TOP
					},
					styles:
						[{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
				}
			}
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.build();

			return this;
		},

		build: function() {
			var self = this,
				$el = this.$elem,
				$map = $el.find(".google-map");

			if (!$map.length)
				return this;

			$map.gmap3(self.config);

			return this;
		}

	}

	ThemeGoogleMap.defaults = ThemeGoogleMap.prototype.defaults;

	// expose jquery plugin
	$.fn.themeGoogleMap = function(options) {
		return this.each(function() {
			new ThemeGoogleMap(this, options).init();
		});
	};

	window.ThemeGoogleMap = ThemeGoogleMap;

})(jQuery);

// Side Panel
(function($) {

	var ThemeSidePanel = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	}

	ThemeSidePanel.prototype = {

		defaults: {
			type: 'overlay',
			side: 'left',
			closeOnBgClick: true,
			allowScroll: false
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);
			this.isOpen = false;

			this.build();

			return this;
		},

		build: function() {
			var self = this,
				$el = this.$elem,
				$elId = $el.attr("id"),
				$body = $('body'),
				$spWrap = $el.find(".sp-wrapper");

			if (self.config.side === "right")
				$body.addClass("sp-right");
			else
				$body.addClass("sp-left");

			if (self.config.type === "push")
				$body.addClass("sp-push");
			else if (self.config.type === "reveal")
				$body.addClass("sp-reveal");
			else
				$body.addClass("sp-overlay");


			var openTrig = $('.sp-open-trigger[href="#' + $elId + '"]'),
				closeTrig = $('.sp-close-trigger[href="#' + $elId + '"]'),
				toggleTrig = $('.sp-toggle-trigger[href="#' + $elId + '"]');

			openTrig.on("click", function(event) {
				self.open();
				event.preventDefault();
				event.stopPropagation();
			});

			closeTrig.on("click", function(event) {
				self.close();
				event.preventDefault();
				event.stopPropagation();
			});

			toggleTrig.on("click", function(event) {
				self.toggle();
				event.preventDefault();
				event.stopPropagation();
			});

			if (self.config.closeOnBgClick) {
				$(document).click(function(event) {
					if (!$(event.target).closest($el).length && !$(event.target).is($el)) {
						if (self.isOpen)
							self.close();
					}
				});
			}

			if (self.config.allowScroll) {
				$spWrap.css("overflow-y", "auto");
			}
			
			return this;
		},

		open: function() {
			var self = this,
				$el = this.$elem,
				$body = $('body');

			if ($body.hasClass("sp-open"))
				return this;

			$body.addClass("sp-open");
			self.isOpen = true;

			return this;
		},

		close: function() {
			var self = this,
				$el = this.$elem,
				$body = $('body');

			if (!$body.hasClass("sp-open"))
				return this;

			$body.removeClass("sp-open");
			self.isOpen = false;

			return this;
		},

		toggle: function() {
			var self = this,
			$body = $('body');

			if ($body.hasClass("sp-open"))
				self.close();
			else
				self.open();

			return this;
		}

	}

	ThemeSidePanel.defaults = ThemeSidePanel.prototype.defaults;

	// expose jquery plugin
	$.fn.themeSidePanel = function(options) {
		return this.each(function() {
			new ThemeSidePanel(this, options).init();
		});
	};

	window.ThemeSidePanel = ThemeSidePanel;

})(jQuery);

// Particles
(function($) {

	var ThemeParticles = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("plugin-options");
	}

	ThemeParticles.prototype = {

		defaults: {
			minSpeedX: 0.1,
			maxSpeedX: 0.7,
			minSpeedY: 0.1,
			maxSpeedY: 0.7,
			directionX: 'center',
			directionY: 'center',
			density: 10000,
			dotColor: '#666666',
			lineColor: '#666666',
			particleRadius: 7,
			lineWidth: 1,
			curvedLines: false,
			proximity: 100,
			parallax: true,
			parallaxMultiplier: 5,
			onInit: function() {},
			onDestroy: function() {}
		},

		init: function() {
			this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

			this.build();

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.particleground)))
				return this;

			var self = this,
				$el = this.$elem;

			$el.particleground(self.config);

			return this;
		}

	}

	ThemeParticles.defaults = ThemeParticles.prototype.defaults;

	// expose jquery plugin
	$.fn.themeParticles = function(options) {
		return this.each(function() {
			new ThemeParticles(this, options).init();
		});
	};

	window.ThemeParticles = ThemeParticles;

})(jQuery);
