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
	var ttf = function(css, timeout, timeout_callback)
	{
		if (!timeout_callback) timeout_callback = function(){ $this.addClass(css);	}
		var t;
		return function(e){
			var $this = $(this);
			switch (e.type)
			{
				case "touchstart":
					if (timeout) t = window.setTimeout(timeout_callback,timeout);
					else $this.addClass(css);
					e.preventDefault();
					e.stopPropagation();
					break;
				case "touchend":
					if (timeout) window.clearTimeout(t);
					$this.removeClass(css);
					if (!iScroll.__is_moved) $this.click();
					iScroll.__is_moved = false;
					break;
				case "touchmove":
					if (timeout) window.clearTimeout(t);
					$this.removeClass(css);
					break;
			}
		};
	}
	// LIST ITEMS default behavior
	$('.j-list-simple').live(ts, ttf('j-list-simple-pressed', 500));
	$('.j-list-arrow').live(ts, ttf('j-list-arrow-pressed', 500));
	$('.j-list-details').live(ts, ttf('j-list-details-pressed', 500));
	// SCROLLING SCREEN default behavior
	$(function(){
		$('#j-screen-scroller').each(function(){
			document.addEventListener('touchmove', function(e){ e.preventDefault(); });
			MyScroll = new iScroll(this);
		})
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
	// SEARCH default behavior
	$('.j-search input.input').live('focus',function(){
		$(this).removeClass('hint');
		if (this.value == this.title) this.value='';
	}).live('blur',function(){
		if (this.value == '')
		{
			$(this).addClass('hint');
			this.value=this.title;
		}
	})
	$(function(){ 
		$('.j-search input.input').each(function(){ 
			if (this.value == '') 
			{
				$(this).addClass('hint');
				this.value=this.title;
			}
		})
	})
	// BUTTON default behavior
	$('.j-button').live(ts, tf);
	// longtap toolkit
	$.juice = {
		longtap : function(query, callback) 
		{
			$(query).live(ts, ttf('', 1500, callback));
		}
	}
	
})(jQuery);