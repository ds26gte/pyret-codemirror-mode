// Auto-indenting functions adapted from:
// https://github.com/codemirror/CodeMirror/issues/2120

function reindentRegion(cm, from, to) {
  cm.operation(function() {
    for (var line = from; line <= to; ++line) {
      cm.indentLine(line, "smart");
    }
  });
}

function reindentAll(cm) {
  reindentRegion(cm, cm.firstLine(), cm.lastLine());
}

// Registers "reindent on paste" behavior
function registerReindentOnPaste(cm) {
  cm.on("change", function(cm, change) {
    if (change.origin == "paste" && change.text.length >= 2) {
      reindentRegion(cm, change.from.line, CodeMirror.changeEnd(change).line);
    }
  });
}
