//


/**
 * 进度条，宽度、时间可控，可中断
 * @param element 元素对象，可改变宽度的
 * @param width 进度条宽度，单位px，默认从0 - width)
 * @param duration 持续时间，单位s
 * @constructor
 */
// function ProgressBar(element, width, duration) {
//     // current width 当前进度条宽度
//     var cw = 0;
//     // setInterval函数对象
//     var interval = null;
//
//     //
//     let timeSpace = 5;
//
//     this.startProgress = function () {
//         clearInterval(interval);
//         cw = 0;
//         let step = width / (duration * 1000 / timeSpace);
//         interval = setInterval(function () {
//             if ((cw += step) < width) {
//                 element.style.width = cw + "px";
//             } else {
//                 clearInterval(interval);
//             }
//         }, timeSpace);
//     };
//
//     this.stopProgress = function () {
//         clearInterval(interval);
//         let step = cw / 400 * timeSpace;
//         interval = setInterval(function () {
//             if ((cw -= step) > 0) {
//                 element.style.width = cw + "px";
//             } else {
//                 element.style.width = 0;
//                 clearInterval(interval);
//             }
//         }, timeSpace);
//     };
// }


function initSlidey() {
    var slideyProgress = document.querySelector(".slidey-progress");

    var slideyContent = document.querySelectorAll("#slidey-content>li");
    var slideyList = document.querySelectorAll(".slidey-list li");

    var slideyIndex = 0;
    var interval = null;

    for (let i = 0; i < slideyList.length; i++) {
        // 取页面中【div#slidey-content】的电影信息
        var src = slideyContent[i].querySelector("img").src;
        var title = slideyContent[i].querySelector(".title").innerHTML;
        var description = slideyContent[i].querySelector(".description").innerHTML;

        slideyList[i].querySelector(".slidey-list-img>div").style.backgroundImage = "url(" + src + ")";
        slideyList[i].querySelector(".slidey-list-title").innerHTML = title;
        slideyList[i].querySelector(".slidey-list-description").innerHTML = description;

        // 为幻灯片列表添加点击事件
        slideyList[i].addEventListener("click", function (event) {
            slideyIndex = i;
            loopSlidey();
            //更改
            document.querySelector(".slidey-main").style.backgroundImage =
                this.querySelector(".slidey-list-img>div").style.backgroundImage;
            document.querySelector(".slidey-overlay-title").innerHTML =
                this.querySelector(".slidey-list-title").innerHTML;
            document.querySelector(".slidey-overlay-description").innerHTML =
                this.querySelector(".slidey-list-description").innerHTML;

            //对点击的li加类active，原有类active的移除
            if (!hasClass(this, "active")) {
                addClass(this, "active");
                for (let sl of slideyList) {
                    if (this === sl) {
                        continue;
                    }
                    if (hasClass(sl, 'active')) {
                        removeClass(sl, 'active');
                        break;
                    }
                }
            }
            stopPropagation(event);
        }, false);
    }

    // 点击幻灯片前一个的点击事件
    document.querySelector(".slidey-ctrls-pre").addEventListener("click", function () {
        if (slideyIndex <= 0) {
            slideyIndex = slideyList.length;
        }
        slideyList[--slideyIndex].click();
    }, false);
    // 点击幻灯片后一个的点击事件
    document.querySelector(".slidey-ctrls-next").addEventListener("click", function () {
        if (slideyIndex >= slideyList.length - 1) {
            slideyIndex = -1;
        }
        slideyList[++slideyIndex].click();
    }, false);


    //幻灯片循环播放
    function loopSlidey() {
        clearInterval(interval);

        // 进度条当前的宽度
        let cw = 0;
        // 进度条宽度
        let progressBarWidth = 910;
        // 进度条持续时间，单位ms
        let progressActiveTime = 5000;
        // setInterval的timeout参数,循环间隔时间
        let timeSpace = 5;


        // step = width / (second * 250), 250为interval的timeout为1时的值。
        let step = progressBarWidth / (progressActiveTime / timeSpace);
        interval = setInterval(function () {
            if ((cw += step) < progressBarWidth) {
                slideyProgress.style.width = cw + "px";
            } else {
                if (slideyIndex >= slideyList.length - 1) {
                    slideyIndex = -1;
                }
                slideyList[++slideyIndex].click();
            }
        }, timeSpace);
    }

    // 点击第一个初始化
    slideyList[0].click();
}







