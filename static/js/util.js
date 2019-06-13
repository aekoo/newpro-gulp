document.body.addEventListener('touchstart', function () { });
var CY = (function () {
  var o = {
    alert: function (msg) {
      if (document.querySelectorAll('.alertBox').length) {
        clearTimeout(window.alert.time);
        document.querySelector('.alertBox').remove();
      }
      var obj = document.createElement('div')
      obj.setAttribute('class', 'alertBox');
      obj.innerHTML = msg;
      document.body.appendChild(obj);
      window.alert.time = setTimeout(function () {
        document.body.removeChild(document.querySelector('.alertBox'))
      }, 1500);
    },
    /**
     * 获取url后面的参数
     * return {func} 返回一个函数
     * example:
     * var gup = CY.getUrlParam();
     * var version = gup('version') || '';
     */
    getUrlParam: function (name) {
      var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.href.match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    }
  }
  return o;
})();

window.loading = {
  show: () => {
    $(".loading").show();
  },
  hide: () => {
    $(".loading").hide();
  },
  init: () => {
    var maskLoad = $(`<div class="loading">
      <div class="dots">
        <div class="dot white"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>`);
    $("body").append(maskLoad);
  }
}

window.loading.init();