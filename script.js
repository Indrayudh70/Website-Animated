const scroll = new LocomotiveScroll({
  el: document.querySelector(`#main`),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,
    duration: 1.2,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      delay: -1,
      duration: 1.5,
      stagger: 0.2, //to create a delay between each of the elements
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      delay: -1,
      duration: 1.5,
      ease: Expo.easeInOut,
    });
}

var timeout;

function circleChaptaKaro() {
  //define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    //This is basically done to calculate the distance between the current position and the previous position where the mouse was
    // var xdiff = dets.clientX - xprev; //(Here the dets.clientX is the new location along x-axis where the mouse moves to - the previous location where we saved the mouse location as, and this value is stored in var xdiff)
    // var ydiff = dets.clientY - yprev; //(Here the dets.clientY is the new location along y-axis where the mouse moves to - the previous location where we saved the mouse location as, and this value is stored in var ydiff)

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev); //This is the final scalling of x
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev); //This is the final scalling of y

    yprev = dets.clientY; //(current position saved in yprev)
    xprev = dets.clientX; //(current position saved in xprev)

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleMouseFollower();
firstPageAnim();
circleChaptaKaro();

// 3te element select koro, tar por 3te tei mousemove lagao, jkhn mouse move hoche to find koro mouse kothaye ache,
// tar mane khoj koro ki mouse er X and Y position kothaye, ebar mouse er X and Y position er bodole oi image take,
// show koro and oi image take move koro, move korar time e rotate koro, joto fast mouse ta move korche toto tai
// fast jeno rotation tao hoe.

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,

      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });
});
