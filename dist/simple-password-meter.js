(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
      define(factory);
  } else if (typeof exports === 'object') {
      module.exports = factory();
  } else {
      root.password = factory();
  }
}(this, function() {
  function PasswordMeter(selector) {
      this.el = selector;
      this.init();
  }

  PasswordMeter.prototype.init = function() {
      var shown = true;
      var $bar = document.createElement('div');
      $bar.classList.add('password-meter-bar');

      var $colorBar = document.createElement('div');
      $colorBar.classList.add('password-meter-color-bar');
      $bar.appendChild($colorBar);

      this.el.parentNode.appendChild($bar);

      var self = this
      this.el.addEventListener('keyup', function() {
          var score = _calculateScore.call(self, self.el.value);
          var percentage = score < 0 ? 0 : score;
          var hue = (percentage / 100 * 120).toString(10);
          $colorBar.style.backgroundColor = ["hsl(", hue, ",100%,40%)"].join("");
          $colorBar.style.width = percentage + '%'
      });
  };

  function _calculateScore(password) {
      var score = 0;
      var passwordLength = password.length;

      score += passwordLength * 4;
      score += _checkRepetition.call(this, 1, password).length - passwordLength;
      score += _checkRepetition.call(this, 2, password).length - passwordLength;
      score += _checkRepetition.call(this, 3, password).length - passwordLength;
      score += _checkRepetition.call(this, 4, password).length - passwordLength;

      if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
          score += 5;
      }

      var symbols = '.*[!,@,#,$,%,^,&,*,?,_,~]';
      symbols = new RegExp('(' + symbols + symbols + ')');
      if (password.match(symbols)) {
          score += 5;
      }

      if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
          score += 10;
      }

      if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
          score += 15;
      }

      if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)) {
          score += 15;
      }

      if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)) {
          score += 15;
      }

      if (password.match(/^\w+$/) || password.match(/^\d+$/)) {
          score -= 10;
      }

      if (score > 100) score = 100;
      if (score < 0) score = 0;

      return score;
  }

  function _checkRepetition(rLen, str) {
      var res = "",
          repeated = false,
          strLength = str.length;

      for (var i = 0; i < strLength; i++) {
          repeated = true;
          for (var j = 0; j < rLen && (j + i + rLen) < str.length; j++) {
              repeated = repeated && (str.charAt(j + i) === str.charAt(j + i + rLen));
          }
          if (j < rLen) repeated = false;
          if (repeated) {
              i += rLen - 1;
              repeated = false;
          } else res += str.charAt(i);
      }

      return res;
  }

  return {
      meter: PasswordMeter
  };
}));
