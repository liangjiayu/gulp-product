/// <reference path="../../../typings/index.d.ts" />

/**
 * 简单tabs切换
 *
 * @param {jq string} tab切换的选择器
 * @param {jq string} tab切换主体
 */
var tabs_simply = function(tabHd, tabBd) {
  var tabHd = $(tabHd);
  var tabBd = $(tabBd);
  tabBd
    .hide()
    .eq(0)
    .show();
  tabHd.on('click', function() {
    var index = $(this).index();
    $(this)
      .addClass('on')
      .siblings()
      .removeClass('on');
    tabBd
      .eq(index)
      .fadeIn(200)
      .siblings()
      .hide();
  });
};

/**
 * 返回对象是一个今天和明天时间差 时间对象
 * @returns obj
 */
function CountDown() {
  let nowDate = new Date();
  let Year = nowDate.getFullYear();
  let Month = nowDate.getMonth() + 1;
  let Day = nowDate.getDate();
  let toDate = new Date([Year, Month, Day + 1].join('-'));
  let diffTime = toDate.getTime() - nowDate.getTime();

  // 一天的总毫秒为 60*60*24 86400
  // 天数 => 总秒 去除 一天总秒
  // 小时 => 总秒 取余 一天总秒 为 总秒减去天数 剩余秒数
  // 分钟 => 总秒 取余 一小时秒数 为 总秒减去总小时 剩余秒数
  // 秒   => 总秒 取余 一分钟秒数 为 总秒减去总分钟 剩余秒数
  let fromat = function() {
    let days = Math.floor(diffTime / 86400000);
    let hours = Math.floor((diffTime % 86400000) / 3600000);
    let minutes = Math.floor((diffTime % 3600000) / 60000);
    let seconds = Math.floor((diffTime % 60000) / 1000);

    days = days > 9 ? days : '0' + days;
    hours = hours > 9 ? hours : '0' + hours;
    minutes = minutes > 9 ? minutes : '0' + minutes;
    seconds = seconds > 9 ? seconds : '0' + seconds;

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };
  let countObj = fromat();
  return countObj;
}
