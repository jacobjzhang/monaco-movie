import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import actions from './actions';

// or import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// if shipping only a subset of the features & languages is desired

const editor = monaco.editor.create(document.getElementById('container'), {
  value: 'console.log("Hello, world")',
  language: 'javascript'
});

var line = editor.getPosition();

// var range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1);
// var id = { major: 1, minor: 1 };             
// var text = "SMALL TEST";
// var op = {identifier: id, range: range, text: text, forceMoveMarkers: true};
// editor.executeEdits("my-source", [op]);

const options = {
  'text': "Let's try typing something real quick. Wow, this works!",
  'pos': '4:4'
}
const timer = (callback, delay) => { setTimeout(callback, delay) };
const next = () => { return; };
actions.type(options, editor, next, timer);
