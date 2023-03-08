let song = document.querySelector("#audio");
song.loop = true;
song.volume = 0.4;
let song2 = document.querySelector("#audio2");
let enemy_body = document.querySelector(".enemy");
let las = document.querySelector(".laser");
let play = document.querySelector(".play_pause");
let audio;
let jumpSound;
let solder_pos = 200;
let left_interval;
let right_interval;
let bullet_interval = null;
let score = 0;
let enemy_posx;
let enemy_posy;
let enemy1_pos_x;
let enemy1_pos_y;
let enemy2_pos_x;
let enemy2_pos_y;
let bullet_x_pos;
let bullet_y_pos;
let ply = true;
let interval;
//enemy position 

let list1 = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380];
let list2 = [0, 20, 40, 60, 80, 100];


laser();

//soldire position

let solder = document.querySelector(".solder");
solder.style.left = 200 + "px";



//enemy motion
play.addEventListener("click", play_pause);
function play_pause() {
    if (ply) {
        song.play();
        play.innerHTML = "pause";
        enemy_body.style.display = "inline";
        interval = setInterval(enemy_move, 1500);
        ply = false;
    } else if (!ply) {
        play.innerHTML = "play";
        clearInterval(interval);
        enemy_body.style.display = "none";
        song.pause();
        ply = true;
    }
}
function enemy_move() {

    laser();

    enemy_posx = list1[Math.floor(Math.random() * 20)];
    enemy_posy = list2[Math.floor(Math.random() * 6)];
    // enemy_posx = 200;
    // enemy_posy = 200;
    enemy_body.style.left = enemy_posx + "px";
    enemy_body.style.top = enemy_posy + "px";

}




function moveLeft() {

    if (solder_pos == 0) {
        solder_pos = 400;
    } else {

        solder_pos -= 20;
        solder.style.left = solder_pos + "px";
        laser();
    }
}

function moveRight() {

    if (solder_pos >= 380) {
        solder_pos = -20;
    } else {

        solder_pos += 20;
        solder.style.left = solder_pos + "px";
        laser();
    }
}

function startLeftInterval() {
    left_interval = setInterval(moveLeft, 30);
}

function startRightInterval() {
    right_interval = setInterval(moveRight, 30);
}

function stopInterval() {
    clearInterval(left_interval);
    clearInterval(right_interval);
}



//bullet motion

function shoot_fun() {


    jumpSund();



    let progress = document.querySelector(".progress");
    if (score <= 10) {
        progress.innerHTML = "poor";

    } else if (score > 10 && score <= 20) {
        progress.innerHTML = "good";

    } else if (score > 20 && score <= 50) {
        progress.innerHTML = "excellant";

    } else if (score > 50) {
        progress.innerHTML = "outstanding";

    }


    if (bullet_interval === null) {
        let bullet = document.querySelector(".bullet");
        bullet_x_pos = solder_pos;
        bullet_y_pos = 400;
        bullet.style.left = bullet_x_pos + "px";
        bullet.style.top = bullet_y_pos + "px";
        bullet_interval = setInterval(bullet_move, 20);
        function bullet_move() {
            if ((bullet_x_pos == enemy_posx) && (enemy_posy == bullet_y_pos)) {
                score++;
                playsong();
                color_change();
                enemy1_fall();
                enemy2_fall();
                document.querySelector(".number").innerHTML = score;
                clearInterval(bullet_interval);
                bullet_interval = null;
                return;
            } else if (bullet_y_pos <= 0) {
                clearInterval(bullet_interval);
                document.querySelector(".bullet").style.visibility = "hidden";
                bullet_interval = null;
                return;
            } else {
                document.querySelector(".bullet").style.visibility = "visible";
                bullet_y_pos -= 20;
                bullet.style.top = bullet_y_pos + "px";
            }


        }
    }

    //soldire design 
    let i = 0;
    let solder_swag = setInterval(funs, 20);
    function funs() {

        if (i == 8) {
            clearInterval(solder_swag);
            document.querySelector(".solder").style.height = "60px";
            document.querySelector(".solder").style.marginTop = "400px";
        } else {
            document.querySelector(".solder").style.height = "20px";
            document.querySelector(".solder").style.marginTop = "340px";
            i++;
        }

    }
}
function color_change() {
    let i = 0;
    let color_change_interval = setInterval(func, 10);
    function func() {

        if (i == 5) {
            clearInterval(color_change_interval);
            document.querySelector("#game_container").style.backgroundColor = "white";
        } else {
            document.querySelector("#game_container").style.backgroundColor = "black";
            i++;
        }

    }
}


document.addEventListener('keydown', event => {
    if (event.code === 'ArrowLeft') {

        moveLeft();
    } else if (event.code === 'ArrowRight') {
        moveRight();
    }
    if (event.code === 'Space') {
        shoot_fun();
    }
});


document.querySelector(".left").addEventListener("click", moveLeft);
//document.querySelector(".left").addEventListener("mousedown", startLeftInterval);
//document.querySelector(".left").addEventListener("mouseup", stopInterval);
document.querySelector(".left").addEventListener("touchstart", startLeftInterval);
document.querySelector(".left").addEventListener("touchend", stopInterval);



document.querySelector(".right").addEventListener("click", moveRight);
//document.querySelector(".right").addEventListener("mousedown", startRightInterval);
//document.querySelector(".right").addEventListener("mouseup", stopInterval);
document.querySelector(".right").addEventListener("touchstart", startRightInterval);
document.querySelector(".right").addEventListener("touchend", stopInterval);


//audio functions 

function playsong() {
    audio = new Audio(src = "carcrash.mp3");
    audio.play();
}
function jumpSund() {
    jumpSound = new Audio(src = "jump.mp3");
    jumpSound.play();
}

function enemy1_fall() {
    let enemy1 = document.querySelector(".enemy1");
    enemy1.style.visibility = "visible";
    enemy1_pos_x = enemy_posx;
    enemy1_pos_y = enemy_posy;
    let enemy1_falling = setInterval(enemy1_move, 1);
    function enemy1_move() {
        if (enemy1_pos_x == -40) {
            clearInterval(enemy1_falling);
            enemy1.style.visibility = "hidden";

        } else {

            enemy1.style.left = enemy1_pos_x + "px";
            enemy1.style.top = enemy1_pos_y + "px";

            enemy1_pos_x -= 4;
            enemy1_pos_y += 4;
            console.log(enemy1_pos_x);
            console.log(enemy1_pos_y);
        }
    }

}
function enemy2_fall() {
    let enemy2 = document.querySelector(".enemy2");
    enemy2.style.visibility = "visible";
    enemy2_pos_x = enemy_posx;
    enemy2_pos_y = enemy_posy;
    let enemy2_falling = setInterval(enemy2_move, 1);
    function enemy2_move() {
        if (enemy2_pos_x == 440) {
            enemy2.style.visibility = "hidden";
            clearInterval(enemy2_falling);
        } else {

            enemy2.style.left = enemy2_pos_x + "px";
            enemy2.style.top = enemy2_pos_y + "px";

            enemy2_pos_x += 4;
            enemy2_pos_y += 4;

        }
    }

}


function laser() {
    let las_intr = setInterval(intr_las, 10);

    function intr_las() {
        las.style.left = solder_pos + "px";
        if (solder_pos == enemy_posx) {
            las.style.height = 400 - (enemy_posy) + "px";
            las.style.top = enemy_posy + "px";
            clearInterval(las_intr);
        } else {
            las.style.top = 0 + "px";
            las.style.height = "420px";
            clearInterval(las_intr);
        }
        console.log(solder_pos);
    }
}