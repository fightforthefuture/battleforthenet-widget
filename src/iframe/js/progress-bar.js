'use strict';

function ProgressBar(params) {
  this.target = params.target;

  this.DOMNode = document.querySelector(this.target);
  this.barCount = 51;

  if (this.DOMNode) {
    this.interval = null;
    this.requestAnimationFrame = this.requestAnimationFrame.bind(this);
    this.tick = this.tick.bind(this);
    this.currentIndex = 0;

    var innerHTML = '<div class="progress-bar">';

    for (var i = 0; i < this.barCount; i++) {
      innerHTML += '<div class="bar"></div>';
    }

    innerHTML += '</div>';

    this.DOMNode.innerHTML = innerHTML;
    this.DOMNode.classList.remove('hidden');

    var self = this;
    setTimeout(function(){ 
      self.start();
    }, 1000);
  }
}

ProgressBar.prototype.destroy = function() {
  this.stop();

  delete this.tick;
};

ProgressBar.prototype.requestAnimationFrame = function() {
  var request = window.requestAnimationFrame || setTimeout;
  request(this.tick);
};

ProgressBar.prototype.start = function() {
  this.stop();
  this.requestAnimationFrame();
  this.interval = setInterval(this.requestAnimationFrame, 25);
};

ProgressBar.prototype.stop = function() {
  clearInterval(this.interval);
};

ProgressBar.prototype.tick = function() {
  if (this.currentIndex < this.barCount) {
    this.currentIndex++;

    var bars = document.querySelectorAll('.progress-bar .bar:nth-child(-n+' + this.currentIndex + ')');
    
    for (var i = 0; i < bars.length; i++) {
      var bar = bars[i];
      bar.classList.add('active');
    }
  }
  else {
    this.DOMNode.classList.add('done');
    this.stop();
  }
};
