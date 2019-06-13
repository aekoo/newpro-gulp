var FE = (function () {
  var loading = window.loading;
  var count, timer;
  var ua = navigator.userAgent;

  var bindEvent = {

    bindBtn: function () {
      $('.register input').blur(function () {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      })

      $('.btn').click(function () {
        var mobileNo = $('#phone').val();
        mobileNo = mobileNo.replace(/ /g, '');
        if (!method.verfiyPhone(mobileNo)) return CY.alert('请输入正确的手机号码');
        getAPI.register();
      })

    },
    init: function () {
      bindEvent.bindBtn();
    }
  }

  var method = {
    verfiyPhone: function (phone) {
      return /^1[3|4|5|6|7|8|9]\d{9}$/.test(phone);
    },
    wait: function () {
      $('.getyzm span').text(`已发送 ${count--}s`);
      timer = setInterval(() => {
        if (count < '0') {
          clearInterval(timer);
          $('.getyzm span').text('重新获取');
          return
        }
        $('.getyzm span').text(`已发送 ${count--}s`);
      }, 1000);
    },
    download: function () {

    },

    showMask: function () {
      method.hideMask();
      var mask = document.createElement("div");
      mask.setAttribute("id", "maskDiv");

      mask.addEventListener("touchend", method.hideMask);
      var img = document.createElement("img");
      img.setAttribute("id", "shareImg");
      img.src = "../img/safari.png";
      mask.appendChild(img);
      document.body.appendChild(mask);
    },

    hideMask: function () {
      var mask = method.docEle("maskDiv");
      if (mask) {
        document.body.removeChild(mask);
      }
    },

    docEle: function () {
      return document.getElementById(arguments[0]) || false;
    },
  }

  var getAPI = {
    //get
    register: function () {
      var mobileNo = $('#phone').val();
      var captcha = $('#yzm').val();
      mobileNo = mobileNo.replace(/ /g, '');

      loading.show();
      $.ajax({
        url: '/appapi/qqxb/info',
        type: 'GET',
        async: true,
        data: { mobileNo },
        success: function (res) {
          loading.hide();
          // res = JSON.parse(res);
          if (res.code !== 1) return CY.alert(res.desc);
          var url = res.results || '';
          location.href = url;
        },
        error: function (e) {
          loading.hide();
          CY.alert('请求网络失败,请重试~')
        }
      })
    },
  }
  var o = {
    init: function () {
      FastClick.attach(document.body);
      bindEvent.init();
    }
  };
  return o;
})()
FE.init();
var vConsole = new VConsole();