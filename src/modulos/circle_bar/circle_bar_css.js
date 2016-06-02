var csjs = require('csjs');
module.exports = function (progress_color) {
  return csjs`
.porcentajex {
  font-size: 40px;
  color: ${progress_color};
}
`;
}