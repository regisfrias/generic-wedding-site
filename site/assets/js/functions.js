
// Browser detection for when you get desperate. A measure of last resort.

// http://rog.ie/post/9089341529/html5boilerplatejs
// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }

// Uncomment the below to use:
// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

var prevPage = ''
var canScroll = true

function initPage(){

    function slider() {
        if ($(window).scrollTop() > 100) $('#navigation .menu-logo').stop().fadeIn(300)
        else $('#navigation .menu-logo').stop().fadeOut(300)
    }

    $(window).scroll(function () {
        slider();
    });

    $(window).bind('mousewheel DOMMouseScroll', function(event){
        canScroll = false;
    });

    $( window ).resize(function() {
        if (!$('#navigation').is(':visible')) {
            if (!$('.is-mobile').is(':visible')) {
                $("#toggle-menu").css({backgroundPosition: '50% 0%'});
                $('#navigation').fadeIn();
            } else {
                $("#toggle-menu").css({backgroundPosition: '50% 0%'});
                $('#navigation').fadeOut();
            }
        }
    });

    url()

    function load(url, hash){
        var splitUrl = url.split('#')

        $.ajax({
            url: splitUrl[0] + '.html',
            cache: false,
            success: function(result){;
                $("#content").html(result);
                $("#content").fadeIn()

                if (splitUrl[0] === 'location' || splitUrl[0] === 'tourism') {
                    $('.map-container').fadeIn()
                }
            },
            error: function(err){
                console.log('ajax error', err);
            }
        }).done(function( msg ) {
            // console.log('done', msg);
            var anchor = $('#'+hash)
            var top

            if (splitUrl[0] === 'location' || splitUrl[0] === 'tourism') {
                initMap()
            }

            setTimeout(function(){
                if (anchor.offset()) top = anchor.offset().top - 80
                else top = 0
                if (canScroll) $('html, body').stop().animate({scrollTop: top}, 500);
            },500)


        });
    }

    function loadContent(page, url){
        var thisPage = page.split('#')[0]

        $('body').removeClass().addClass(thisPage)

        history.replaceState(null, null, url);

        // smaller header for inner pages
        if (thisPage !== 'home' && !$('.is-mobile').is(':visible')) {
            $( "#header" ).animate({
                height: 200,
                fontSize: 10,
                // paddingTop: 80
            }, 1000, function() {
                // Animation complete.
            });
            $( "#header h1" ).animate({marginTop: 80}, 1000);
        } else {
            if (!$('.is-mobile').is(':visible')) {
                $( "#header" ).animate({
                    height: 500,
                    fontSize: 15,
                    // paddingTop: 170
                }, 1000, function() {
                    // Animation complete.
                });
                $( "#header h1" ).animate({marginTop: 170}, 1000);
            } else {
                $( "#header h1" ).animate({marginTop: 70}, 1000);
            }

        }

        var ajaxUrl = url.split('?');
        var splitUrl = ajaxUrl[1].split('#')

        // if navigating subpages
        // don't load new content
        if (prevPage !== thisPage) {
            $("#content").fadeOut( 600, function(){
                load(page, splitUrl[1])
            });
        } else {
            var anchor = $('#'+splitUrl[1])
            var top

            if (anchor.offset()) top = anchor.offset().top - 80
            else top = 0

            $('html, body').animate({scrollTop: top}, 1000);
        }

        prevPage = page.split('#')[0]
    }

    function url(){
        var url
        var page

        var location = window.location.href;
        var loc = location.split('?')[1]

        if (loc) page = loc.split('/')[1]
        else page = 'home'

        url = '?/' + page

        loadContent(page, url)
    }

    $("#navigation a, #header a").click(function(e){
        if ($('#toggle-menu').is(':visible')) {
            if ($('#navigation').is(':visible')) {
                $('#toggle-menu').css({backgroundPosition: 'top center'})
                $('#navigation').fadeOut()
            } else {
                $('#toggle-menu').css({backgroundPosition: 'center bottom'})
                $('#navigation').fadeIn();
            }
        }

        if ($(this).attr('class') !== 'lang' && $(this).attr('class') !== 'open-close-menu') {

            // if ($('#navigation').is(':visible')) {
            //     $("#toggle-menu").css({backgroundPosition: '50% 0%'})
            //     $('#navigation').fadeOut()
            // }

            e.preventDefault()
            canScroll = true;

            var url
            var page

            var location = window.location.href;

            page = $(this).attr('href')
            url = '?/' + page

            loadContent(page, url)
        }
    });
};
