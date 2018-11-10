try { if (self != top) { top.location = self.location; } } catch (e) { }
window.dialog = {
  fucCheckLength: function (strTemp) {
    return strTemp.replace(/[\s\S]/g, function (a) {
      return /[\u4E00-\u9FA5]/.test(a) ? '11' : '1';
    }).length;
  },
  alert: function (msg, type, fn) {
    if (typeof type === 'function') {
      fn = type
      type = '确定'
    }
    var btn = type || '确定';
    var dialog = document.getElementById('dialog');
    if (!dialog) {
      var html = document.createElement('div');
      html.setAttribute("id", "dialog");
      html.setAttribute("class", "xq_poupe")
      document.body.appendChild(html)
      html.innerHTML = '<div class="mask_alert" ></div>\
                    <article class="xq_poupe">\
                            <div>\
                            <p>' + msg + '</p>\
                            <span>' + btn + '</span>\
                        </div>\
                    </article>'

      document.querySelector('#dialog span').onclick = function () {
        document.body.removeChild(document.querySelector('#dialog'))
        typeof fn === 'function' && fn();
      }
    }
  }
}
window.alert = function (msg) {
  if (document.querySelectorAll('.alertBox').length) {
    clearTimeout(window.alert.time);
    document.querySelector('.alertBox').remove();
  }
  if (dialog.fucCheckLength(msg) > 40) return dialog.alert(msg);
  var obj = document.createElement('div')
  obj.setAttribute('class', 'alertBox');
  obj.innerHTML = msg;
  document.body.appendChild(obj);
  window.alert.time = setTimeout(function () {
    document.body.removeChild(document.querySelector('.alertBox'))
  }, 1500);
}

String.prototype.getParam = function (name) {
  var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.href.match(reg);
  if (r != null) return decodeURIComponent(r[2]); return null;
}

function speak(message) {
  var msg = new SpeechSynthesisUtterance(message);
  // msg.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(msg);
}
function bindEvent() {
  $('.btn').click(function () {
    var text = $('#text').val();
    speak(text);
  });
}
function init() {
  bindEvent();
}
init();