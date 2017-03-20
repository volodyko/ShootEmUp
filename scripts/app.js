(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _boot = require("./states/boot.js");

var _boot2 = _interopRequireDefault(_boot);

var _preload = require("./states/preload.js");

var _preload2 = _interopRequireDefault(_preload);

var _game = require("./states/game.js");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game;

window.onload = function () {
	game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
	game.state.add('boot', new _boot2.default());
	game.state.add('preload', new _preload2.default());
	game.state.add('game', new _game2.default());
	game.state.start('boot');
};

},{"./states/boot.js":2,"./states/game.js":3,"./states/preload.js":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boot = function () {
	function Boot() {
		_classCallCheck(this, Boot);
	}

	_createClass(Boot, [{
		key: 'preload',
		value: function preload() {
			this.load.image('preloader', 'assets/images/loading_bar.png');
		}
	}, {
		key: 'create',
		value: function create() {
			this.game.state.start('preload');
		}
	}]);

	return Boot;
}();

exports.default = Boot;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game() {
		_classCallCheck(this, Game);

		this.clouds;
		this.txtScore;
		this.score;
	}

	_createClass(Game, [{
		key: "create",
		value: function create() {
			this.add.sprite(0, 0, "game_bg");
			this.clouds = this.add.group();

			this.score = 0;

			var style = { font: "24px Arial", fill: "#FFFFFF" };
			this.txtScore = this.add.text(10, 10, this.score.toString(), style);
		}
	}, {
		key: "update",
		value: function update() {
			if (Math.random() < 0.98) {
				var cloud = this.clouds.getFirstDead();
				if (cloud) {
					cloud.x = Math.random() * this.game.width;
					cloud.y = Math.random() * this.game.height;

					cloud.revive();
				}
			} else {
				var cloud = this.clouds.create(Math.random() * this.game.width, Math.random() * this.game.height, "cloud");
				cloud.inputEnabled = true;
				cloud.events.onInputDown.add(this.onClickCloud, this);
				cloud.alpha = 0;
				this.add.tween(cloud).to({ y: "-50", alpha: 1 }, 800, Phaser.Easing.Cubic.Out, true);
			}
		}
	}, {
		key: "onClickCloud",
		value: function onClickCloud(cloud) {
			cloud.kill();
			this.score++;
			this.txtScore.setText(this.score.toString());
		}
	}]);

	return Game;
}();

exports.default = Game;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Preload = function () {
	function Preload() {
		_classCallCheck(this, Preload);

		this.preloadAsset = null;
		this.ready = false;
	}

	_createClass(Preload, [{
		key: 'preload',
		value: function preload() {
			this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
		}
	}, {
		key: 'create',
		value: function create() {
			this.add.sprite(0, 0, "loading_bg");
			this.preloadAsset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
			this.preloadAsset.anchor.setTo(0.5, 0.5);
			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.preloadAsset);
			//load here

			this.load.image('enemy', 'assets/images/enemy.png');
			this.load.image('explosion', 'assets/images/explosion.png');

			this.load.spritesheet('player', 'assets/images/gunbot.png', 214, 269); //width and height of sprite
			this.load.image('hexagon', 'assets/images/hexagon_particle.png');
			this.load.image('bullet', 'assets/images/bullet.png');
			this.load.image('enemyBullet', 'assets/images/enemyBullet.png');
			this.load.image('bg', 'assets/images/bg.jpg');

			this.load.image('health_bar', 'assets/images/health_bar.png');
			this.load.image('health_holder', 'assets/images/health_holder.png');
			this.load.image('circle', 'assets/images/circle.png');

			this.load.start();
		}
	}, {
		key: 'update',
		value: function update() {
			if (this.ready) {
				this.game.state.start('game');
			}
		}
	}, {
		key: 'onLoadComplete',
		value: function onLoadComplete() {
			this.ready = true;
		}
	}]);

	return Preload;
}();

exports.default = Preload;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL3N0YXRlcy9ib290LmpzIiwic3JjL3N0YXRlcy9nYW1lLmpzIiwic3JjL3N0YXRlcy9wcmVsb2FkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUpBLElBQUksSUFBSjs7QUFNQSxPQUFPLE1BQVAsR0FBZ0IsWUFBWTtBQUMzQixRQUFPLElBQUksT0FBTyxJQUFYLENBQWdCLEdBQWhCLEVBQW9CLEdBQXBCLEVBQXlCLE9BQU8sSUFBaEMsRUFBc0MsTUFBdEMsQ0FBUDtBQUNBLE1BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxNQUFmLEVBQXVCLG9CQUF2QjtBQUNBLE1BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxTQUFmLEVBQTBCLHVCQUExQjtBQUNBLE1BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxNQUFmLEVBQXVCLG9CQUF2QjtBQUNBLE1BQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsTUFBakI7QUFDQSxDQU5EOzs7Ozs7Ozs7Ozs7O0lDTnFCLEk7Ozs7Ozs7NEJBRVY7QUFDVCxRQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLFdBQWhCLEVBQTZCLCtCQUE3QjtBQUNBOzs7MkJBRVE7QUFDUixRQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEtBQWhCLENBQXNCLFNBQXRCO0FBQ0E7Ozs7OztrQkFSbUIsSTs7Ozs7Ozs7Ozs7OztJQ0FBLEk7QUFFcEIsaUJBQWE7QUFBQTs7QUFDWixPQUFLLE1BQUw7QUFDQSxPQUFLLFFBQUw7QUFDQSxPQUFLLEtBQUw7QUFDQTs7OzsyQkFFTztBQUNQLFFBQUssR0FBTCxDQUFTLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0IsU0FBcEI7QUFDQSxRQUFLLE1BQUwsR0FBYyxLQUFLLEdBQUwsQ0FBUyxLQUFULEVBQWQ7O0FBRUEsUUFBSyxLQUFMLEdB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MUI7QUFDQSxRQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLGFBQWhCLEVBQStCLCtCQUEvQjtBQUNBLFFBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsSUFBaEIsRUFBc0Isc0JBQXRCOztBQUVBLFFBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsWUFBaEIsRUFBOEIsOEJBQTlCO0FBQ0EsUUFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixlQUFoQixFQUFpQyxpQ0FBakM7QUFDQSxRQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLFFBQWhCLEVBQTBCLDBCQUExQjs7QUFHSCxRQUFLLElBQUwsQ0FBVSxLQUFWO0FBQ0E7OzsyQkFFTztBQUNQLE9BQUcsS0FBSyxLQUFSLEVBQWM7QUFDYixTQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEtBQWhCLENBQXNCLE1BQXRCO0FBQ0E7QUFDRDs7O21DQUdlO0FBQ2YsUUFBSyxLQUFMLEdBQWEsSUFBYjtBQUNBOzs7Ozs7a0JBN0NtQixPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBnYW1lO1xuXG5pbXBvcnQgQm9vdCBmcm9tIFwiLi9zdGF0ZXMvYm9vdC5qc1wiO1xuaW1wb3J0IFByZWxvYWQgZnJvbSBcIi4vc3RhdGVzL3ByZWxvYWQuanNcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuL3N0YXRlcy9nYW1lLmpzXCI7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoODAwLDYwMCwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XG5cdGdhbWUuc3RhdGUuYWRkKCdib290JywgbmV3IEJvb3QoKSk7XG5cdGdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgbmV3IFByZWxvYWQoKSk7XG5cdGdhbWUuc3RhdGUuYWRkKCdnYW1lJywgbmV3IEdhbWUoKSk7XG5cdGdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCb290IHtcblxuXHRwcmVsb2FkKCkge1xuXHRcdHRoaXMubG9hZC5pbWFnZSgncHJlbG9hZGVyJywgJ2Fzc2V0cy9pbWFnZXMvbG9hZGluZ19iYXIucG5nJyk7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcblx0XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy5jbG91ZHM7XG5cdFx0dGhpcy50eHRTY29yZTtcblx0XHR0aGlzLnNjb3JlO1xuXHR9XG5cblx0Y3JlYXRlKCl7XG5cdFx0dGhpcy5hZGQuc3ByaXRlKDAsMCxcImdhbWVfYmdcIik7XG5cdFx0dGhpcy5jbG91ZHMgPSB0aGlzLmFkZC5ncm91cCgpO1xuXG5cdFx0dGhpcy5zY29yZSA9IDA7XG5cblx0ICBcdHZhciBzdHlsZSA9IHsgZm9udDogXCIyNHB4IEFyaWFsXCIsIGZpbGw6IFwiI0ZGRkZGRlwiIH07XG5cdFx0dGhpcy50eHRTY29yZSA9IHRoaXMuYWRkLnRleHQoMTAsMTAsdGhpcy5zY29yZS50b1N0cmluZygpLHN0eWxlKTtcblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdGlmKE1hdGgucmFuZG9tKCkgPCAwLjk4KXtcblx0XHRcdHZhciBjbG91ZCA9IHRoaXMuY2xvdWRzLmdldEZpcnN0RGVhZCgpO1xuXHRcdFx0aWYoY2xvdWQpe1xuXHRcdFx0XHRjbG91ZC54ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuZ2FtZS53aWR0aDtcblx0XHRcdFx0Y2xvdWQueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUuaGVpZ2h0O1xuXG5cdFx0XHRcdGNsb3VkLnJldml2ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dmFyIGNsb3VkID0gdGhpcy5jbG91ZHMuY3JlYXRlKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUud2lkdGgsXG5cdFx0XHQgXHRcdFx0XHRcdFx0XHRcdE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUuaGVpZ2h0LCBcImNsb3VkXCIpO1xuXHRcdFx0Y2xvdWQuaW5wdXRFbmFibGVkID0gdHJ1ZTtcblx0XHRcdGNsb3VkLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy5vbkNsaWNrQ2xvdWQsdGhpcyk7XHRcdFx0XG5cdFx0XHRjbG91ZC5hbHBoYSA9IDA7XG5cdFx0XHR0aGlzLmFkZC50d2VlbihjbG91ZCkudG8oeyB5OiBcIi01MFwiLCBhbHBoYTogMSB9LCA4MDAsIFBoYXNlci5FYXNpbmcuQ3ViaWMuT3V0LCB0cnVlKTtcblx0XHR9XG5cdH1cblx0XHRcblxuXHRvbkNsaWNrQ2xvdWQoY2xvdWQpe1xuXHRcdGNsb3VkLmtpbGwoKTtcblx0XHR0aGlzLnNjb3JlICsrO1xuXHRcdHRoaXMudHh0U2NvcmUuc2V0VGV4dCh0aGlzLnNjb3JlLnRvU3RyaW5nKCkpO1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZCB7XG5cblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLnByZWxvYWRBc3NldCA9IG51bGw7XG5cdFx0dGhpcy5yZWFkeSA9IGZhbHNlO1xuXHR9XG5cblx0cHJlbG9hZCgpe1xuXHRcdHRoaXMubG9hZC5pbWFnZSgnbG9hZGluZ19iZycsJ2Fzc2V0cy9pbWFnZXMvbG9hZGluZ19iZy5qcGcnKTtcblx0fVxuXG5cdGNyZWF0ZSgpe1xuXHRcdHRoaXMuYWRkLnNwcml0ZSgwLDAsIFwibG9hZGluZ19iZ1wiKTtcblx0XHR0aGlzLnByZWxvYWRBc3NldCA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLmdhbWUud2lkdGgvMiwgdGhpcy5nYW1lLmhlaWdodC8yLCAncHJlbG9hZGVyJyk7XG5cdFx0dGhpcy5wcmVsb2FkQXNzZXQuYW5jaG9yLnNldFRvKDAuNSwwLjUpO1xuXHRcdHRoaXMubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGRPbmNlKHRoaXMub25Mb2FkQ29tcGxldGUsIHRoaXMpO1xuXHRcdHRoaXMubG9hZC5zZXRQcmVsb2FkU3ByaXRlKHRoaXMucHJlbG9hZEFzc2V0KTtcblx0XHQvL2xvYWQgaGVyZVxuXHQgIFx0XG5cdCAgXHR0aGlzLmxvYWQuaW1hZ2UoJ2VuZW15JywgJ2Fzc2V0cy9pbWFnZXMvZW5lbXkucG5nJyk7XG5cdCAgICB0aGlzLmxvYWQuaW1hZ2UoJ2V4cGxvc2lvbicsICdhc3NldHMvaW1hZ2VzL2V4cGxvc2lvbi5wbmcnKTtcblxuXHQgICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCAnYXNzZXRzL2ltYWdlcy9ndW5ib3QucG5nJywgMjE0LCAyNjkpOyAvL3dpZHRoIGFuZCBoZWlnaHQgb2Ygc3ByaXRlXG5cdCAgICB0aGlzLmxvYWQuaW1hZ2UoJ2hleGFnb24nLCAnYXNzZXRzL2ltYWdlcy9oZXhhZ29uX3BhcnRpY2xlLnBuZycpO1xuXHQgICAgdGhpcy5sb2FkLmltYWdlKCdidWxsZXQnLCAnYXNzZXRzL2ltYWdlcy9idWxsZXQucG5nJyk7XG5cdCAgICB0aGlzLmxvYWQuaW1hZ2UoJ2VuZW15QnVsbGV0JywgJ2Fzc2V0cy9pbWFnZXMvZW5lbXlCdWxsZXQucG5nJyk7XG5cdCAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JnJywgJ2Fzc2V0cy9pbWFnZXMvYmcuanBnJyk7XG5cblx0ICAgIHRoaXMubG9hZC5pbWFnZSgnaGVhbHRoX2JhcicsICdhc3NldHMvaW1hZ2VzL2hlYWx0aF9iYXIucG5nJyk7XG5cdCAgICB0aGlzLmxvYWQuaW1hZ2UoJ2hlYWx0aF9ob2xkZXInLCAnYXNzZXRzL2ltYWdlcy9oZWFsdGhfaG9sZGVyLnBuZycpO1xuXHQgICAgdGhpcy5sb2FkLmltYWdlKCdjaXJjbGUnLCAnYXNzZXRzL2ltYWdlcy9jaXJjbGUucG5nJyk7XG5cblxuXHRcdHRoaXMubG9hZC5zdGFydCgpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0aWYodGhpcy5yZWFkeSl7XG5cdFx0XHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2dhbWUnKTtcblx0XHR9XG5cdH1cblxuXG5cdG9uTG9hZENvbXBsZXRlKCl7XG5cdFx0dGhpcy5yZWFkeSA9IHRydWU7XG5cdH1cblxufSJdfQ==
