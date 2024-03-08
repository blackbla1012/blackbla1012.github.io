$(document).ready(function () {
    //新建了一个<audio>element, 但并没有被append到任何地方
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', $('.active-song').attr('data-src'));

    var tl = new TimelineMax();
    tl.to('.player__albumImg', 3, {
        rotation: '360deg',
        repeat: -1,
        ease: Power0.easeNone
    }, '-=0.2');
    tl.pause();

    $('.player .player__play').click(function () {

        if ($('.player').hasClass('play')) {
            $('.player').removeClass('play');
            audioElement.pause();
            TweenMax.to('.player__albumImg', 0.2, {
                scale: 1,
                ease: Power0.easeNone
            })
            tl.pause();
        } else {
            $('.player').addClass('play');
            audioElement.play();
            TweenMax.to('.player__albumImg', 0.2, {
                scale: 1.1,
                ease: Power0.easeNone
            })
            tl.resume();
        }

    });

    //进度条加载
    var playhead = document.getElementById("playhead");
    audioElement.addEventListener("timeupdate", function () {
        var duration = this.duration;
        var currentTime = this.currentTime;
        var percentage = (currentTime / duration) * 100;
        playhead.style.width = percentage *2 + 'px';
    });

    //update author and song name info
    function updateInfo() {
        $('.player__author').text($('.player__author').parents(".player").children(".player__bar").children(".player__album").children(".active-song:eq(0)").attr("data-author"));
      //  
        // $('.player__song').text( $(this).parents(".player")[0].attr("datat"));
        console.log( $('.player__author').parents(".player").children(".player__bar").children(".player__album").children(".active-song:eq(0)").attr('data-author'));
    }
    updateInfo();

    //click next function
    $('.player__next').click(function () {
        if ($('.player .player__albumImg.active-song').is(':last-child')) {
            $('.player__albumImg.active-song').removeClass('active-song');
            $('.player .player__albumImg:first-child').addClass('active-song');
            audioElement.addEventListener("timeupdate", function () {
                var duration = this.duration;
                var currentTime = this.currentTime;
                var percentage = (currentTime / duration) * 100;
                playhead.style.width = percentage *2 + 'px';
            });
        } else {
            $('.player__albumImg.active-song').removeClass('active-song').next().addClass('active-song');
            audioElement.addEventListener("timeupdate", function () {
                var duration = this.duration;
                var currentTime = this.currentTime;
                var percentage = (currentTime / duration) * 100;
                playhead.style.width = percentage + '%';
            });
        }
        updateInfo();
        audioElement.setAttribute('src', $('.active-song').attr('data-src'));
        audioElement.play();
    });

    //click prev function
    $('.player__prev').click(function () {
        if ($('.player .player__albumImg.active-song').is(':first-child')) {
            $('.player__albumImg.active-song').removeClass('active-song');
            $('.player .player__albumImg:last-child').addClass('active-song');
            audioElement.addEventListener("timeupdate", function () {
                var duration = this.duration;
                var currentTime = this.currentTime;
                var percentage = (currentTime / duration) * 100;
                playhead.style.width = percentage *2 + 'px';
            });
        } else {
            $('.player__albumImg.active-song').removeClass('active-song').prev().addClass('active-song');
            audioElement.addEventListener("timeupdate", function () {
                var duration = this.duration;
                var currentTime = this.currentTime;
                var percentage = (currentTime / duration) * 100;
                playhead.style.width = percentage + 'px';
            });
        }
        updateInfo();
        audioElement.setAttribute('src', $('.active-song').attr('data-src'));
        audioElement.play();
    });

});