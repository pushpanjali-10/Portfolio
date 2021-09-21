$(document).ready(function() {
    // MODAL
    var modalText = {
        discover: {
            title: 'RockPaperScissor',
            tag: 'A Game.',
            detail: 'RockPaperScissor is a platform that lets a person to play game with computer.',
            link: 'https://pushpanjali-10.github.io/RockPaperScissorsGame/'
        },
        ordering: {
            title: 'Swachh Bharat Mission',
            tag: 'A Hackathon website',
            detail: 'A website made for Swachhta, which give information about a community of people who keep the environment clean',
            link: 'https://pushpanjali-10.github.io/Swachh-Bharat-Mission/'
        },
        newrelic: {
            title: 'Discord Bot',
            tag: 'A Greeting Bot.',
            detail: 'A Discord bot that includes Greeting messages, Reactions, characters,can do maths calculation, and a wish simulator!',
            link: 'https://github.com/pushpanjali-10/Discord-bot.git'
        },
        roambi: {
            title: 'TODO-LIST',
            tag: 'The checklist is designed as a simple to-do list',
            detail: 'A project to-do list helps in tracking the activities and processes that are needed to be done to assure that the project that an entity is doing will be finished in time.',
            link: 'https://pushpanjali-10.github.io/TODO-list/'
        },
        walker: {
            title: 'NainaNetwork',
            tag: 'A website',
            detail: 'A website made for networking using HTML, CSS.',
            link:'https://pushpanjali-10.github.io/NainaNetwork/'
        },
        // powur: {
        //     title: 'Powur.com',
        //     tag: 'CONSUMER POWERED MARKETING.',
        //     detail: 'Powur is a marketing platform for lead generation, recruitment, and team building. Built with Ruby on Rails and Angular-UI. Makes use of Angular-material for front-end visuals. Features complex user tree heiarchy and commission system.',
        //     link: 'http://www.powur.com/with/42'
        // },
        // mystand: {
        //     title: 'MyStand',
        //     tag: 'CROWD-FUNDED CHARITY.',
        //     detail: 'MyStand is a crowd-funding, media sharing website, that has you donating actions instead of money out of your pocket. Single page App built with Node.js on Sails and Angular 2.0. Features social media sharing and large scale crowd-funding.'
        // },
        // never: {
        //     title: '',
        //     tag: '',
        //     detail: ''
        // },
        // themall: {
        //     title: 'The Mall',
        //     tag: 'PEER GUIDED SHOPPING.',
        //     detail: 'The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.'
        // }
    };

    $('#gallery .button').on('click', function() {
        fillModal(this.id);
        $('.modal-wrap').addClass('visible');
    });

    $('.close').on('click', function() {
        $('.modal-wrap, #modal .button').removeClass('visible');
    });

    $('.mask').on('click', function() {
        $('.modal-wrap, #modal .button').removeClass('visible');
    });

    var carousel = $('#carousel'),
        slideWidth = 700,
        threshold = slideWidth / 3,
        dragStart,
        dragEnd;

    setDimensions();

    $('#next').click(function() {
        shiftSlide(-1);
    });
    $('#prev').click(function() {
        shiftSlide(1);
    });

    carousel.on('mousedown', function() {
        if (carousel.hasClass('transition')) return;
        dragStart = event.pageX;
        $(this).on('mousemove', function() {
            dragEnd = event.pageX;
            $(this).css('transform', 'translateX(' + dragPos() + 'px)');
        });
        $(document).on('mouseup', function() {
            if (dragPos() > threshold) {
                return shiftSlide(1);
            }
            if (dragPos() < -threshold) {
                return shiftSlide(-1);
            }
            shiftSlide(0);
        });
    });

    function setDimensions() {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            slideWidth = $(window).innerWidth();
        }
        $('.carousel-wrap, .slide').css('width', slideWidth);
        $('.modal').css('max-width', slideWidth);
        $('#carousel').css('left', slideWidth * -1);
    }

    function dragPos() {
        return dragEnd - dragStart;
    }

    function shiftSlide(direction) {
        if (carousel.hasClass('transition')) return;
        dragEnd = dragStart;
        $(document).off('mouseup');
        carousel
            .off('mousemove')
            .addClass('transition')
            .css('transform', 'translateX(' + direction * slideWidth + 'px)');
        setTimeout(function() {
            if (direction === 1) {
                $('.slide:first').before($('.slide:last'));
            } else if (direction === -1) {
                $('.slide:last').after($('.slide:first'));
            }
            carousel.removeClass('transition');
            carousel.css('transform', 'translateX(0px)');
        }, 700);
    }

    function fillModal(id) {
        $('#modal .title').text(modalText[id].title);
        $('#modal .detail').text(modalText[id].detail);
        $('#modal .tag').text(modalText[id].tag);
        if (modalText[id].link)
            $('#modal .button')
            .addClass('visible')
            .parent()
            .attr('href', modalText[id].link);

        $.each($('#modal li'), function(index, value) {
            $(this).text(modalText[id].bullets[index]);
        });
        $.each($('#modal .slide'), function(index, value) {
            $(this).css({
                background: "url('img/slides/" + id + '-' + index + ".png') center center/cover",
                backgroundSize: 'cover'
            });
        });
    }
});