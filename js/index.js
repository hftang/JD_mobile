window.onload = function (ev) {

    /*1、搜索*/
    seacher();

    /*2、轮播图*/
    banner();

    /*3、秒杀*/
    downTime();
}

var seacher = function () {

    var searchBox = document.querySelector(".jd_search_box");
    var banner = document.querySelector(".jd_banner");
    var height = banner.offsetHeight;

    var opacity = 0;

    window.onscroll = function () {

        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        console.log(scrollTop);

        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        }
        else {
            opacity = 0.85;
        }

        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';


    }


};

var banner = function () {

    var banner = document.querySelector(".jd_banner");
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector("ul:first-child");
    var pointBox = banner.querySelector("ul:last-child");
    var points = pointBox.querySelectorAll("li");

    var index = 1;

    var timer = setInterval(function () {

        index++;
        imgBox.style.transition = "all 0.2s";
        imgBox.style.webkitTransition = "all 0.2s";

        imgBox.style.transform = 'translateX(' + (-index * width) + 'px)';
        var num = index * width;
        imgBox.style.webkitTransform = 'translateX(' + (-num) + 'px)';


    }, 2000);

    imgBox.addEventListener("transitionend", function () {

        console.log("---->");

        if (index >= 9) {
            index = 1;
            imgBox.style.transition = "none";
            imgBox.style.transform = 'translateX(' + (-index * width) + 'px)';
        }
        else if (index <= 0) {
            index = 8;
            imgBox.style.transition = "none";
            imgBox.style.translate = 'translateX(' + (-index * width) + 'px)';
        }

        setPoint();

    });

    var setPoint = function () {

        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove("now");

        }

        points[index - 1].classList.add("now");

    };

    /*绑定事件*/
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imgBox.addEventListener("touchstart", function (e) {
        /*消除定时器*/
        clearInterval(timer);
        startX = e.targetTouches[0].clientX;

    });

    imgBox.addEventListener("touchmove", function (e) {
        var moveX = e.targetTouches[0].clientX;

        distanceX = moveX - startX;

        var translateX = (-index * width + distanceX);


        /*清除过渡*/
        imgBox.style.transition = 'none';
        imgBox.style.transform = 'translateX(' + translateX + 'px)';

        isMove = true;

    });
    imgBox.addEventListener("touchend", function (e) {

        if (isMove) {

            if (Math.abs(distanceX) < width / 3) {
                imgBox.style.transition = 'all 0.3s';
                imgBox.style.transform = 'translateX(' + (-index * width) + 'px)';
            }
            else {
                /*右滑动 是上一张*/

                if (distanceX > 0) {
                    index--;
                }
                else {
                    /*左滑动 是下一张*/
                    index++;

                }
                imgBox.style.transition = 'all 0.3s';

                imgBox.style.transform = 'translateX(' + (-index * width) + 'px)';
            }


        }

        startX = 0;
        distanceX = 0;
        isMove = false;
        /*先清除定时器 然后再加上定时器*/

        clearInterval(timer);

        timer = setInterval(function () {

            index++;
            imgBox.style.transition = "all 0.2s";
            imgBox.style.webkitTransition = "all 0.2s";

            imgBox.style.transform = 'translateX(' + (-index * width) + 'px)';
            var num = index * width;
            imgBox.style.webkitTransform = 'translateX(' + (-num) + 'px)';


        }, 2000);


    });


};

var downTime = function () {

    var timer = 60 * 60 * 2;

    var tm = setInterval(function () {

        timer--;

        var hour = Math.floor(timer / 3600);
        var min = Math.floor(timer % 3600 / 60);
        var sec = Math.floor(timer % 60);

        var spans = document.querySelector(".time").querySelectorAll("span");

        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);

        spans[3].innerHTML = Math.floor(min / 10);
        spans[4].innerHTML = Math.floor(min % 10);

        spans[6].innerHTML = Math.floor(sec / 10);
        spans[7].innerHTML = Math.floor(sec % 10);

        if (timer < 0) {
            clearInterval(tm);
        }

    }, 1000);


};