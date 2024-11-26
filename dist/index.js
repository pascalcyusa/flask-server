"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function Dashboard() {
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    speed = _useState2[0],
    setSpeed = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    direction = _useState4[0],
    setDirection = _useState4[1];
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    boost = _useState6[0],
    setBoost = _useState6[1];
  var _useState7 = useState('00:00'),
    _useState8 = _slicedToArray(_useState7, 2),
    time = _useState8[0],
    setTime = _useState8[1];
  useEffect(function () {
    var timer = setInterval(function () {
      var now = new Date();
      setTime("".concat(String(now.getHours()).padStart(2, '0'), ":").concat(String(now.getMinutes()).padStart(2, '0')));
    }, 1000);
    return function () {
      return clearInterval(timer);
    };
  }, []);
  var handleCommand = function handleCommand(command) {
    switch (command) {
      case 'moveup':
        setDirection('up');
        break;
      case 'movedown':
        setDirection('down');
        break;
      case 'moveleft':
        setDirection('left');
        break;
      case 'moveright':
        setDirection('right');
        break;
      case 'stop':
        setDirection(null);
        setSpeed(0);
        break;
      default:
        break;
    }
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Robot Car Dashboard"), /*#__PURE__*/React.createElement("p", null, "Current Time: ", time), /*#__PURE__*/React.createElement("p", null, "Speed: ", speed), /*#__PURE__*/React.createElement("p", null, "Direction: ", direction), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return handleCommand('moveup');
    }
  }, "Move Up"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return handleCommand('movedown');
    }
  }, "Move Down"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return handleCommand('moveleft');
    }
  }, "Move Left"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return handleCommand('moveright');
    }
  }, "Move Right"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return handleCommand('stop');
    }
  }, "Stop"));
}
ReactDOM.render(/*#__PURE__*/React.createElement(Dashboard, null), document.getElementById('root'));