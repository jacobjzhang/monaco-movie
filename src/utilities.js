export function extend(obj, ...args) {
	args.forEach(a => {
		if (typeof a === 'object') {
			Object.keys(a).forEach(key => obj[key] = a[key]);
		}
	});
	return obj;
}

/**
 * Helper function that produces <code>{line, ch}</code> object from
 * passed argument
 * @param {Object} pos
 * @param {CodeMirror} editor
 * @returns {Object}
 */
export function makePos(pos, editor) {
	// if (pos === 'caret') {
	// 	return getPosition(editor);
	// }

	if (typeof pos === 'string') {
		if (~pos.indexOf(':')) {
			let parts = pos.split(':');
			return new monaco.Position(+parts[0], +parts[1]);
		}
		
		pos = +pos;
	}
	
	// if (typeof pos === 'number') {
	// 	return posObj(editor.posFromIndex(pos));
	// }
	
	return posObj(pos);
}

export function posObj(obj) {
	return new monaco.Position({
		lineNumber: obj.line,
		column: obj.ch
  });
}
