(function($){
	// Speeding up clicks/touches
	var ts = 'touchstart touchend touchmove';
	var tf = function(e){
		switch (e.type)
		{
			case "touchstart":
				if ($(this).hasClass('back'))
					$(this).addClass('back-pressed');
				else
					$(this).addClass('j-button-pressed');
				e.preventDefault();
				e.stopPropagation();
				break;
			case "touchend":
				$(this).removeClass('j-button-pressed back-pressed').click();
				break;
			case "touchmove":
				$(this).removeClass('j-button-pressed back-pressed');
				break;
		}
	};
	var ttf = function(css, timeout)
	{
		var t;
		return function(e){
			var $this = $(this);
			switch (e.type)
			{
				case "touchstart":
					if (timeout) t = window.setTimeout(function(){ $this.addClass(css);	},timeout);
					else $this.addClass(css);
					e.preventDefault();
					e.stopPropagation();
					break;
				case "touchend":
					if (timeout) window.clearTimeout(t);
					$this.removeClass(css);
					$this.click();
					break;
				case "touchmove":
					if (timeout) window.clearTimeout(t);
					$this.removeClass(css);
					break;
			}
		};
	}
	// LIST ITEMS default behavior
	$('.j-list-arrow').live(ts, ttf('j-list-arrow-pressed', 500));
	$('.j-list-details').live(ts, ttf('j-list-details-pressed', 500));
	// SCROLLING SCREEN default behavior
	$(function(){
		document.addEventListener('touchmove', function(e){ e.preventDefault(); });
		myScroll = new iScroll('j-screen-scroller');
	})
	// TAB BAR default behavior
	$('.j-tabbar .item').live('click', function(e){
		$('.j-tabbar .item-selected').removeClass('item-selected').find('img').each(function(){
			this.src = this.src.replace(/.*juice/, 'juice').replace('-.', '.');
		});
		$(this).addClass('item-selected').find('img').each(function(){
			this.src = this.src.replace(/.*juice/, 'juice').replace('.', '-.');
		});
	}).live('touchend', function(e){ $(this).click(); });
	
	// BUTTON default behavior
	$('.j-button').live(ts, tf);
	
})(jQuery);