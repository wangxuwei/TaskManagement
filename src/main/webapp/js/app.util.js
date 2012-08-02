var app = app || {};
(function($) {
	
	app.util = {};
	
	 /**
     * Convenient method to sequentialy resolve each item of an array. If the itemResolver method returns a deferred, it will wait until resolved before processing the next element. 
     * If the itemResolver returns the direct value, it will to the next item;
     * @param {array || TreeNodeIterator} items is the array or the TreeNodeIterator to iterate threw
     * @param {function} itemResolver(item) function that will resolve the item. Can return the value or a deferred that will resolve with the value
     * @return {Deferred} Deferred that will resolve with the array of values returned by the item resolver 
     */
	app.util.serialResolve = function(items,itemResolver){
    	var dfd = $.Deferred();
    	var results = [];
    	var i = 0;
    	
    	resolveAndNext();
    	function resolveAndNext(){
    		if (i < items.length){
    			var item = items[i];
    			var itemResolverResult = itemResolver(item,i);

    			// if it is a promise (but not a jquery object, which is also a promise), then, pipe it
    			if (typeof itemResolverResult !== "undefined" && itemResolverResult !== null && $.isFunction(itemResolverResult.promise) && !itemResolverResult.jquery){
    				itemResolverResult.done(function(result){
    					results.push(result);
	    				i += 1;
	    				resolveAndNext();
    				});		
    			}
    			// if it is a normal object or a jqueryObject, then, just push the value and move to the next
    			else{
    				results.push(itemResolverResult);
    				i += 1;
    				resolveAndNext();
    			}
    		}
    		// once we run out
    		else{
    			dfd.resolve(results);
    		}
    	} 
    	
    	return dfd.promise();    		
	}
	
	 /**
     * absolute align center by the base $element 
     * @param {jquery object} the base $element
     */
	app.util.alignCenter = function($e){
		var pWidth = $e.parent().width();
		var pHeight = $e.parent().height();
		$e.css("left",(pWidth - $e.width())/2 + "px").css("top",(pHeight - $e.height())/2 + "px");
	}
	

})(jQuery);




