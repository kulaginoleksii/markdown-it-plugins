// Import markdown-it and plugins
const MarkdownIt = require('markdown-it');
const emoji = require('markdown-it-emoji');
const container = require('markdown-it-container');
const footnote = require('markdown-it-footnote');
const abbr = require('markdown-it-abbr');
const sub = require('markdown-it-sub');
const sup = require('markdown-it-sup');

module.exports = function markdownItPlugins(options = {}) {
  // Initialize markdown-it
  const md = new MarkdownIt(options.md);

  // Use plugins
  md.use(emoji);
  md.use(container, 'warning');
  md.use(footnote);
  md.use(abbr);
  md.use(sub);
  md.use(sup);

  // Example: Add a custom container
  md.use(container, 'spoiler', {
    validate: function(params) {
      return params.trim().match(/^spoiler\s+(.*)$/);
    },
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';
      } else {
        // closing tag
        return '</details>\n';
      }
    }
  });

  return md;
};
