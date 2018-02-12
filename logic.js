window.onload = function () {

    var water = document.getElementsByClassName("div2")[0];
    var space = document.getElementsByClassName("space")[0];
    var spaceStyle = getComputedStyle(space);


    var lf = water.getBoundingClientRect().left;
    var tp = water.getBoundingClientRect().top;
    var shugX = 5;
    var shugY = 5;

    var GoRight = function() {
        setInterval(function () {
            // вычислить сколько времени прошло с начала анимации
            lf += shugX;
            tp += shugY;
            // console.log(lf + " - " + tp);
            // console.log(shugX + " - " + shugY);
            if (boom(lf, tp)) {
                if (lf >= parseInt(spaceStyle.width) || lf <= 0) {
                    shugX = -1 * shugX;
                }
                if (tp >= parseInt(spaceStyle.height) || tp <= 0) {
                    shugY = -1 * shugY;
                }
            }
            // if (lf >= 800) {
            //     clearInterval(GoRight); // конец через 2 секунды
            //     return;
            // }
            // рисует состояние анимации, соответствующее времени timePassed
            draw(lf, tp);
        }, 20)
    };

// в то время как timePassed идёт от 0 до 2000
// left принимает значения от 0 до 400px
    function draw(lf, tp) {

        water.style.left = lf + 'px'; //по х
        water.style.top = tp + 'px'; //по у
    }


    function boom(lf, tp) {
        if (lf >= parseInt(spaceStyle.width) || tp >= parseInt(spaceStyle.height) || lf <= 0 || tp <= 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
