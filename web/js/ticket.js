/**
 *
 */
function chooseTicket() {
    let seats = document.querySelectorAll(".seat-wrapper .seat");
    let ticketNum = 0;
    for (let seat of seats) {
        if (!hasClass(seat, "sold")) {
            seat.onclick = function () {
                let row = this.parentElement.getAttribute("data-row-id");
                let col = this.getAttribute("data-col-id");
                if (hasClass(this, "selected")) {
                    removeClass(this, "selected");
                    addOrRemoveTicket(-1, row, col);
                    insOrDesPrice(-1);
                    --ticketNum;
                } else {
                    if (ticketNum < 4) {
                        addClass(this, "selected");
                        addOrRemoveTicket(1, row, col);
                        insOrDesPrice(1);
                        ++ticketNum;
                    } else {
                        alert("每次只能买四张电影票！");
                    }
                }
            };
        }
    }
}

/**
 * 添加或移除已选择的电影票
 * @param op[type:Number] 1为添加；-1为移除
 * @param row 行号
 * @param col 列号
 */
function addOrRemoveTicket(op, row, col) {
    var ticketContainer = document.querySelector(".seat-selected .ticket-container");

    if (op === 1) {
        var span = document.createElement("span");
        span.setAttribute("class", "ticket");
        span.setAttribute("data-row-col", row + "-" + col);
        span.innerHTML = row + "排" + col + "座";
        ticketContainer.appendChild(span);
    } else if (op === -1) {
        let selector = "span[" + "data-row-col='" + row + "-" + col + "']";
        let s = ticketContainer.querySelector(selector);
        ticketContainer.removeChild(s);
    }
}

/**
 * 选票价格加减
 * @param op op[type:Number] 1为加；-1为减
 */
function insOrDesPrice(op) {
    let t_price = document.querySelector(".ticket-total-price .price");
    let p_price = document.querySelector(".info-item .ticket-price span").innerHTML;
    if (op === 1) {
        t_price.innerHTML = (parseInt(t_price.innerHTML.trim()) + parseInt(p_price.trim())).toString();
    } else if (op === -1) {
        t_price.innerHTML = (parseInt(t_price.innerHTML.trim()) - parseInt(p_price.trim())).toString();
    }
}