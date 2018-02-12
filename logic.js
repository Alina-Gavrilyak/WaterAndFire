window.onload = function () {

    var water = document.getElementsByClassName("div2")[0];
    var space = document.getElementsByClassName("space")[0];
    var spaceStyle = getComputedStyle(space);
    var waterStyle = getComputedStyle(water);
    var arrow = document.getElementsByClassName('arrow')[0];

    var lf = water.offsetLeft;
    var tp = water.offsetTop;
    var speed = 20;
    var shugX = 0;
    var shugY = 0;

    var locker = true;

    document.body.onclick = function () {
        if (locker) {
            if (shugY >= 0)
                return;

            var _shugX = shugX;
            var _shugY = shugY;
            setInterval(function () {
                // вычислить сколько времени прошло с начала анимации
                lf += _shugX * speed;
                tp += _shugY * speed;
                // console.log(lf + " - " + tp);
                // console.log(shugX + " - " + shugY);
                if (boom(lf, tp)) {
                    if (lf >= parseInt(spaceStyle.width)-parseInt(waterStyle.width) || lf <= 0) {
                        _shugX = -1 * _shugX;
                    }
                    if (tp >= parseInt(spaceStyle.height)-parseInt(waterStyle.height) || tp <= 0) {
                        _shugY = -1 * _shugY;
                    }
                }
                // if (lf >= 800) {
                //     clearInterval(GoRight); // конец через 2 секунды
                //     return;
                // }
                // рисует состояние анимации, соответствующее времени timePassed
                draw(lf, tp);
            }, 1000/60);
        }
        locker = false;
        arrow.style.display="none";
    }


// в то время как timePassed идёт от 0 до 2000
// left принимает значения от 0 до 400px
    function draw(lf, tp) {
        water.style.left = lf + 'px'; //по х
        water.style.top = tp + 'px'; //по у
    }

    function boom(lf, tp) {
        if (lf >= (parseInt(spaceStyle.width)-parseInt(waterStyle.width)) || tp >= parseInt(spaceStyle.height)-parseInt(waterStyle.height) || lf <= 0 || tp <= 0) {
            return true;
        }
        else {
            return false;
        }
    }

    document.body.onmousemove = mouseShowHandler;

    function mouseShowHandler(e) {
        e = e || window.event;

        if (e.pageX == null && e.clientX != null) {
            e.pageX = e.clientX;
            e.pageY = e.clientY;
        }
        var myDeg = Math.atan((e.pageX - water.getBoundingClientRect().left + parseInt(getComputedStyle(water).width) / 2) / (water.offsetTop - e.pageY)) * 180 / Math.PI;
        console.log(myDeg);
        arrow.style.setProperty("transform", "rotate(" + myDeg + "deg)");
        //preparing
        shugX = e.pageX - water.getBoundingClientRect().left + parseInt(getComputedStyle(water).width) / 2;
        shugY = water.offsetTop - e.pageY + parseInt(getComputedStyle(water).width) / 2;

        var reservX = shugX / (Math.abs(shugX) + Math.abs(shugY));
        var reservY = -shugY / (Math.abs(shugY) + Math.abs(shugX));
        shugX = reservX;
        shugY = reservY;

        if(shugY >= 0.01 || !locker)
            arrow.style.display="none";
        else{
            arrow.style.display="flex";
        }

    }


}
