/**********/


/**
 * 判断指定的元素是否存在给定类名
 * @param ele 元素对象
 * @param cls 类名
 * @returns {boolean}
 */
function hasClass(ele, cls) {
    cls = cls || '';
    //当cls没有参数时，返回false
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
}

/**
 * 给指定的元素添加类名
 * @param ele 元素对象
 * @param cls 类名
 */
function addClass(ele, cls) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
}

/**
 * 移除指定元素的类名
 * @param ele 元素对象
 * @param cls 类名
 */
function removeClass(ele, cls) {
    var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, '');
}

/**
 * 获得session
 * @param key session键
 * @returns {string}
 */
function getSession(key) {
    return sessionStorage.getItem(key);
}

/**
 * 设置session
 * @param key session键
 * @param value session值
 */
function setSession(key, value) {
    var key = key || 'key';
    sessionStorage.setItem(key, value);
}

/**
 * 移除session
 * @param key
 */
function removeSession(key) {
    sessionStorage.removeItem(key);
}

/**
 * 阻止事件向上传播
 * @param evt 事件
 */
function stopPropagation(evt) {
    evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
}

/**
 * 设置当前页面ulr session
 * session键：CurrentPage 当前页面，PreviousPage 上一页面
 * @param pageURL 当前页面url
 */
function setPage(pageURL) {
    //当前页面不等于上一个页面
    if (pageURL !== getSession("CurrentPage")) {
        setSession("PreviousPage", getSession("CurrentPage"));
        setSession("CurrentPage", pageURL);
    }
}

/**
 * 用户是否登录了
 * @returns {boolean}登陆了返回true；反之
 */
function isLogin() {
    return !!getSession("UserName");
}

/**
 * 初始化公共
 */
function initPublic() {
    //初始化搜索框
    initSearch();
    //初始化登录后的行为
    initSignInOutBehavior();
    //退出登录
    signOut();
}

/**
 * 初始化用户登录与未登录的行为
 */
function initSignInOutBehavior() {
    //已登录
    if (isLogin()) {
        document.querySelector(".user .userout").style.display = "none";
        document.querySelector(".user .userin").setAttribute("style", "display:flex;display:-webkit-flex;");
        document.querySelector(".user .userin .user-name").innerHTML = getSession("UserName");
    } else { //未登录
        let tag_a = document.querySelectorAll("a");
        for (let a of tag_a) {
            let flag = false;
            for (let h of ["index.html", "login.html", "register.html", "javascript:;"]) {
                let as = (a.href).slice((a.href).length - h.length, (a.href).length);
                if (as === h) {
                    flag = true;
                    break;
                }
            }
            // 阻止未登录访问 不允许访问的页面
            if (!flag) {
                a.addEventListener("click", function () {
                    if (confirm("登陆后可访问，您确定要登录吗？")) {
                        window.location.href = "login.html";
                    }
                    //阻止a标签的默认事件
                    event.preventDefault();
                }, false);
            }
        }
    }
}

/**
 * 退出登录
 */
function signOut() {
    document.querySelector(".dropdown-menu>li:nth-child(2)>a").onclick = function () {
        removeSession("UserName");
        window.location.reload();
    };
}


/**
 * 初始化搜索框动画
 */
function initSearch() {
    // begin: 点击搜索框以外，如果输入框是活动的，变为不活动
    document.addEventListener('click', function () {
        var si = document.getElementById('search-input');
        if (hasClass(si, 'active')) {
            si.value = '';
            removeClass(si, 'active')
        }
    }, false);
    // 阻止事件冒泡
    document.querySelector('.header .search').onclick = function (event) {
        stopPropagation(event);
    };
    // :end
}

/** 导航栏搜索按钮 */
function searchBtnClick(obj, evt) {
    var si = document.getElementById('search-input');
    if (hasClass(si, 'active')) {
        searchBtnSubmit();
        si.focus();
    } else {
        addClass(si, 'active');
        si.focus();
    }
}


function searchBtnSubmit() {
    alert('搜索功能还没写好！');
}

function initScrollToTop() {
    let tt = document.getElementById("toTop");
    let checkToTop = setInterval(function () {
        let st = document.body.scrollTop || document.documentElement.scrollTop;
        if (st > window.screen.height * 0.6) {
            tt.style.display = "block";
        } else {
            tt.style.display = "none";
        }
    }, 700);

    tt.onclick = function () {
        ScrollTop(0, 300);
    };
    const ScrollTop = (number = 0, time) => {
        if (!time) {
            document.body.scrollTop = document.documentElement.scrollTop = number;
            return number;
        }
        // 设置循环的间隔时间，值越小消耗性能越高
        const spacingTime = 10;
        // 计算循环的次数
        let spacingInex = time / spacingTime;
        // 获取当前滚动条位置
        let nowTop = document.body.scrollTop + document.documentElement.scrollTop;
        // 计算每次滑动的距离
        let everTop = (number - nowTop) / spacingInex;
        let scrollTimer = setInterval(() => {
            if (spacingInex > 0) {
                spacingInex--;
                ScrollTop(nowTop += everTop);
            } else {
                clearInterval(scrollTimer);
            }
        }, spacingTime);
    };
}
