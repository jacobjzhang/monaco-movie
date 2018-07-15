import {extend, makePos, getCursor} from './utilities';

var actions = {
	/**
	 * Type-in passed text into current editor char-by-char
	 * @param {Object} options Current options
	 * @param {CodeMirror} editor Editor instance where action should be 
	 * performed
	 * @param {Function} next Function to call when action performance
	 * is completed
	 * @param {Function} timer Function that creates timer for delayed 
	 * execution. This timer will automatically delay execution when
	 * scenario is paused and revert when played again 
	 */
	type: function(options, editor, next, timer) {
		options = extend({
			text: '',  // text to type
			delay: 60, // delay between character typing
			pos: null  // initial position where to start typing
		}, wrap('text', options));
		
		if (!options.text) {
			throw new Error('No text provided for "type" action');
		}
		
		if (options.pos !== null) {
			editor.setPosition(makePos(options.pos, editor));
		}
		
		var chars = options.text.split('');
		
		timer(function perform() {
			var ch = chars.shift();
			editor.trigger('keyboard', 'type', {text: ch});
			if (chars.length) {
				timer(perform, options.delay);
			} else {
				next();
			}
		}, options.delay);
  },

	/**
	 * Creates selection for specified position
	 * @param {Object} options
	 * @param {CodeMirror} editor
	 * @param {Function} next
	 * @param {Function} timer
	 */
	select: function(options, editor, next, timer) {
		// options = extend({
		// 	from: editor.getPosition()
		// }, wrap('to', options));
		
		// var from = makePos(options.from, editor);
    // var to = makePos(options.to, editor);
    const range = new monaco.Range(1,1,1,29);
    setTimeout(() => {
      editor.setSelection(range);
    }, 9000)
		// editor.setSelection(from, to);
		next();
  },

  /**
	 * Wait for a specified timeout
	 * @param options
	 * @param editor
	 * @param next
	 * @param timer
	 */
	wait: function(options, editor, next, timer) {
		options = extend({
			timeout: 100
		}, wrap('timeout', options));
		
		timer(next, parseInt(options.timeout, 10));
	}
}

function wrap(key, value) {
	return typeof value === 'object' ? value : {[key]: value};
}

export default actions;