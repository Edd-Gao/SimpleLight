(function($) {
	$.fn.scailing = function () {
		$this=$(this);
		$windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		$windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		$widget = $this.parent();
		console.log(window.innerWidth,window.innerHeight,$widget);
		$widget.css({'width': $windowWidth-30, 'height':$windowHeight-42});
		$widget.find('.jQWCP-wWheel').css({'width': $widget.height() - 10, 'height':$widget.height() - 10,'margin':'auto 0'});
		$barHeight = $widget.height() - 10;
		//$barWidth = ($windowWidth - $windowHeight -30) * 0.35;
		//$barMargin = ($windowWidth - $windowHeight -30) * 0.15;
		$barWidth = 40;
		$barMargin = 15;
		$visSlider =$widget.find('.jQWCP-slider-wrapper').not($('.hidden'));
		$visSlider.css({'height':$barHeight,'width':$barWidth,'margin':'auto '+ $barMargin + 'px'});
		$visSlider.find('.jQWCP-slider').css({'height':$barHeight,'width':$barWidth});
		$widget.find('.jQWCP-wPreviewBox').css({'height':$barHeight,'width':$barWidth});
		$widget.find('.jQWCP-wPreview').css({'height':$barHeight,'width':$barWidth,'margin':'auto '+ $barMargin + 'px'});
		$visSlider.find('.jQWCP-scursor').css({'width' : $barWidth,'margin-left':'0px'});
		//$visSlider.find('.jQWCP-scursor').append("<img src='css/images/slider.png' class='jQWCP-scursor-img' />");
	}
}) (jQuery);