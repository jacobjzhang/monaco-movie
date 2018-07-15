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
  }
}

function wrap(key, value) {
	return typeof value === 'object' ? value : {[key]: value};
}

export default actions;