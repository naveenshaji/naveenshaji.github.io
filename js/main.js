
(function(a,b){"use strict";!function(){for(var b=0,c=["ms","moz","webkit","o"],d=0;d<c.length&&!a.requestAnimationFrame;++d)a.requestAnimationFrame=a[c[d]+"RequestAnimationFrame"],a.cancelAnimationFrame=a[c[d]+"CancelAnimationFrame"]||a[c[d]+"CancelRequestAnimationFrame"];a.requestAnimationFrame||(a.requestAnimationFrame=function(c){var d=(new Date).getTime(),e=Math.max(0,16-(d-b)),f=a.setTimeout(function(){c(d+e)},e);return b=d+e,f}),a.cancelAnimationFrame||(a.cancelAnimationFrame=function(a){clearTimeout(a)})}();var c,d,e,f,g,h=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c},i={autoRun:!0,barThickness:3,barColors:{0:"rgba(26,  188, 156, .9)",".25":"rgba(52,  152, 219, .9)",".50":"rgba(241, 196, 15,  .9)",".75":"rgba(230, 126, 34,  .9)","1.0":"rgba(211, 84,  0,   .9)"},shadowBlur:10,shadowColor:"rgba(0,   0,   0,   .6)"},j=function(){c.width=a.innerWidth,c.height=5*i.barThickness;var b=c.getContext("2d");b.shadowBlur=i.shadowBlur,b.shadowColor=i.shadowColor;var d=b.createLinearGradient(0,0,c.width,0);for(var e in i.barColors)d.addColorStop(e,i.barColors[e]);b.lineWidth=i.barThickness,b.beginPath(),b.moveTo(0,i.barThickness/2),b.lineTo(Math.ceil(f*c.width),i.barThickness/2),b.strokeStyle=d,b.stroke()},k=function(){c=b.createElement("canvas");var d=c.style;d.position="fixed",d.top=d.left=d.right=d.margin=d.padding=0,d.zIndex=100001,d.display="none",b.body.appendChild(c),h(a,"resize",j)},l={config:function(a){for(var b in a)i.hasOwnProperty(b)&&(i[b]=a[b])},show:function(){g||(g=!0,null!==e&&a.cancelAnimationFrame(e),c||k(),c.style.opacity=1,c.style.display="block",l.progress(0),i.autoRun&&!function b(){d=a.requestAnimationFrame(b),l.progress("+"+.05*Math.pow(1-Math.sqrt(f),2))}())},progress:function(a){return"undefined"==typeof a?f:("string"==typeof a&&(a=(a.indexOf("+")>=0||a.indexOf("-")>=0?f:0)+parseFloat(a)),f=a>1?1:a,j(),f)},hide:function(){g&&(g=!1,null!=d&&(a.cancelAnimationFrame(d),d=null),function b(){return l.progress("+.1")>=1&&(c.style.opacity-=.05,c.style.opacity<=.05)?(c.style.display="none",void(e=null)):void(e=a.requestAnimationFrame(b))}())}};"object"==typeof module&&"object"==typeof module.exports?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):this.topbar=l}).call(this,window,document);


var pjax = new Pjax({
    selectors: [
        "title",
        "meta",
        ".content"
    ],
    cacheBust: false
})

topbar.config({ 
    barThickness : 2,
    barColors    : {
      '0'        : 'rgba(95,  170, 239, 1)',
      '1.0'      : 'rgba(203, 227,  249,  1)'
    },
    shadowBlur   : 5,
    shadowColor  : 'rgba(0, 0, 0, 0)'
  })

document.addEventListener('pjax:send', function(){
    document.querySelector('.loader').classList.add('hide')
    topbar.show()
});
document.addEventListener('pjax:success', function(){
    document.querySelector('.loader').classList.remove('hide')
    topbar.hide()
});



// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.sticky-nav').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight || st<$(window).height()){
        // Scroll Down
        $('.sticky-nav').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height() && st>$(window).height()) {
            $('.sticky-nav').removeClass('nav-up');
        }
    }
    
    lastScrollTop = st;
}
