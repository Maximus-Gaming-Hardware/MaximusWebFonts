String.prototype.toTitleCase=function(){"use strict";var e=/^(a|un|una|unos|unas|y|como|el|ella|ellos|ellas|pero|por|en|si|ni|de|o|la|lo|los|las|v.?|vs.?|via)$/i,o=/([A-Za-z0-9\u00C0-\u00FF])/;return this.split(/([ :–—-])/).map((function(s,t,n){return s.search(e)>-1&&0!==t&&t!==n.length-1&&":"!==n[t-3]&&":"!==n[t+1]&&("-"!==n[t+1]||"-"===n[t-1]&&"-"===n[t+1])?s.toLowerCase():s.substr(1).search(/[A-Z]|\../)>-1||":"===n[t+1]&&""!==n[t+2]?s:s.replace(o,(function(e){return e.toUpperCase()}))})).join("")};