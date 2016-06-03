var csjs = require('csjs');
module.exports = function (progress_color) {
  return csjs`
.porcentajex {
  font-size: 40px;
  color: ${progress_color};
    position: absolute;
  display: block;
  height: 160px;
  width: 160px;
  left: 34%;
  top: 45%;
}

.center {
  display: block;
  height: 200px;
  width: 200px;
  margin: 2em auto;
  border-radius: 100%;
  position: relative;
}
`;
}