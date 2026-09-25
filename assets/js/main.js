/***************************************************
==================== JS INDEX ======================
****************************************************

01. PreLoader Js
02. Sticky Js
03. Menu Controls JS
04. offcanvas Menu JS
05. offcanvas two Menu JS
06. Sidebar Js
07. AOS Js
08. Backtotop Js
09. Magnific Popup Js
10. Counter Js
11. Feature Widget Animation Js
12. Service Two Images Hover Animation Js
13. Bg Image For Attribute  Js
14. Mouse active Js





****************************************************/

(function ($) {
  "use strict";

  ////////////////////////////////////////////////////
  // 01. PreLoader Js
  // High-performance preloader is managed via the isolated hardware-accelerated script.
  function dismissPreloader() {
    const preloader = document.getElementById("preloader") || document.querySelector(".preloader");
    if (preloader && preloader.style.display !== "none") {
      preloader.classList.add("slide-up");
      document.body.classList.remove("preloader-active");
      document.body.style.overflow = "";
      setTimeout(() => {
        preloader.style.display = "none";
        if (preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 750);
    }
  }

  // Backup fallback ensures the preloader never blocks the user
  setTimeout(dismissPreloader, 3500);

  ////////////////////////////////////////////////////
  // Skills scroll reveal
  const skillRevealItems = document.querySelectorAll(".skills-reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canObserve = "IntersectionObserver" in window;

  if (skillRevealItems.length && (reducedMotion || !canObserve)) {
    skillRevealItems.forEach((item) => item.classList.add("is-visible"));
  } else if (skillRevealItems.length) {
    const skillRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    skillRevealItems.forEach((item) => skillRevealObserver.observe(item));
  }

  const portfolioRevealItems = document.querySelectorAll(
    ".home-professional-works .portfolio-three-item",
  );
  if (portfolioRevealItems.length && (reducedMotion || !canObserve)) {
    portfolioRevealItems.forEach((item) => item.classList.add("is-visible"));
  } else if (portfolioRevealItems.length) {
    const portfolioRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    portfolioRevealItems.forEach((item) => portfolioRevealObserver.observe(item));
  }

  const githubRevealItems = document.querySelectorAll(
    ".home-open-source-section .github-project-card",
  );
  if (githubRevealItems.length && (reducedMotion || !canObserve)) {
    githubRevealItems.forEach((item) => item.classList.add("is-visible"));
  } else if (githubRevealItems.length) {
    const githubRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    githubRevealItems.forEach((item) => githubRevealObserver.observe(item));
  }

  ////////////////////////////////////////////////////
  // 02. Sticky Js
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 260) {
      $(".header").addClass("fixed-header");
    } else {
      $(".header").removeClass("fixed-header");
    }
  });

  ////////////////////////////////////////////////////
  // 03. Menu Controls JS
  $(".tw-hamburger-toggle").on("click", function () {
    $(".tw-header-side-menu").slideToggle("tw-header-side-menu");
  });
  if ($(".tw-main-menu-content").length && $(".tw-main-menu-mobile").length) {
    let navContent = document.querySelector(".tw-main-menu-content").outerHTML;
    let mobileNavContainer = document.querySelector(".tw-main-menu-mobile");
    mobileNavContainer.innerHTML = navContent;
    let arrow = $(".tw-main-menu-mobile .has-dropdown > a");
    arrow.each(function () {
      let self = $(this);
      let arrowBtn = document.createElement("BUTTON");
      arrowBtn.classList.add("dropdown-toggle-btn");
      arrowBtn.innerHTML = "<i class='ph ph-caret-right'></i>";
      self.append(function () {
        return arrowBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("dropdown-opened");
        self.parent().toggleClass("expanded");
        self
          .parent()
          .parent()
          .addClass("dropdown-opened")
          .siblings()
          .removeClass("dropdown-opened");
        self.parent().parent().children(".tw-submenu").slideToggle();
      });
    });
  }

  ////////////////////////////////////////////////////
  // 04. offcanvas Menu JS
  function openOffcanvasMenu() {
    $(".tw-offcanvas-2-area").addClass("opened").attr("aria-hidden", "false");
    $(".tw-offcanvas-open-btn").attr("aria-expanded", "true");
    $(".side-overlay, .overlay, .body-overlay").addClass("show opened apply");
    $("body").addClass("tw-offcanvas-opened");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    setTimeout(() => {
      $(".tw-text-hover-effect-word").addClass("animated-text");
      const closeBtn = document.querySelector(".tw-offcanvas-2-close-btn");
      if (closeBtn) closeBtn.focus();
    }, 300);
  }

  function closeOffcanvasMenu() {
    setTimeout(() => {
      $(".tw-text-hover-effect-word").removeClass("animated-text");
    }, 1200);

    $(".tw-offcanvas-2-area").removeClass("opened").attr("aria-hidden", "true");
    $(".tw-offcanvas-open-btn").attr("aria-expanded", "false");
    $(".side-overlay, .overlay, .body-overlay").removeClass("show opened apply");
    $("body").removeClass("tw-offcanvas-opened");
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    const openBtn = document.querySelector(".tw-offcanvas-open-btn");
    if (openBtn) openBtn.focus();
  }

  $(".tw-offcanvas-open-btn").on("click", function () {
    openOffcanvasMenu();
  });

  ////////////////////////////////////////////////////
  // 05. offcanvas two Menu JS
  $(".tw-offcanvas-2-close-btn").on("click", function () {
    closeOffcanvasMenu();
  });

  // Close mobile navigation when backdrop overlay is clicked
  $(".side-overlay, .overlay, .body-overlay").on("click", function () {
    closeOffcanvasMenu();
    $(".twoffcanvas").removeClass("opened");
  });

  // Close mobile navigation when any menu link is tapped
  $(document).on("click", ".tw-main-menu-mobile a, .mobile-nav-link", function () {
    closeOffcanvasMenu();
  });

  // Close mobile menu on Escape key
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $(".tw-offcanvas-2-area").hasClass("opened")) {
      closeOffcanvasMenu();
    }
  });

  ////////////////////////////////////////////////////
  // 06. Sidebar Js
  $(".tw-menu-bar").on("click", function () {
    $(".twoffcanvas").addClass("opened");
    $(".body-overlay, .side-overlay").addClass("apply show");
  });
  $(".close-btn").on("click", function () {
    $(".twoffcanvas").removeClass("opened");
    $(".body-overlay, .side-overlay").removeClass("apply show");
  });

  ////////////////////////////////////////////////////
  // 07. AOS Js
  AOS.init({
    once: false, // animation will happen every time you scroll
    offset: 0, // start animation when element enters the viewport
    anchorPlacement: "top-bottom", // when the bottom of the element hits the bottom of the screen
  });

  // 08. Backtotop Js
  function back_to_top() {
    var btn = $("#back_to_top");
    var btn_wrapper = $(".back-to-top-wrapper");
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        btn_wrapper.addClass("back-to-top-btn-show");
      } else {
        btn_wrapper.removeClass("back-to-top-btn-show");
      }
    });

    btn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 300);
    });
  }
  back_to_top();

  ////////////////////////////////////////////////////
  // 09. Magnific Popup Js
  $(".open-popup").magnificPopup({
    type: "iframe",
    removalDelay: 300,
    mainClass: "mfp-fade",
  });

  ////////////////////////////////////////////////////
  // 10. Counter Js
  new PureCounter();
  new PureCounter({
    filesizing: true,
    selector: ".filesizecount",
    pulse: 2,
  });

  ////////////////////////////////////////////////////
  // 11. Feature Widget Animation Js
  function service_animation() {
    var active_bg = $(".feature-widget .active-bg");
    var element = $(".feature-widget .current");
    $(".feature-widget .feature-2-item").on("mouseenter", function () {
      var e = $(this);
      activeService(active_bg, e);
    });
    $(".feature-widget").on("mouseleave", function () {
      element = $(".feature-widget .current");
      activeService(active_bg, element);
      element.closest(".feature-2-item").siblings().removeClass("mleave");
    });
    activeService(active_bg, element);
  }
  service_animation();
  function activeService(active_bg, e) {
    if (!e.length) {
      return false;
    }
    var topOff = e.offset().top;
    var height = e.outerHeight();
    var menuTop = $(".feature-widget").offset().top;
    e.closest(".feature-2-item").removeClass("mleave");
    e.closest(".feature-2-item").siblings().addClass("mleave");
    active_bg.css({ top: topOff - menuTop + "px", height: height + "px" });
  }
  $(".feature-widget .feature-2-item").on("click", function () {
    $(".feature-widget .feature-2-item").removeClass("current");
    $(this).addClass("current");
  });

  ////////////////////////////////////////////////////
  // 12. Service Two Images Hover Animation Js
  $(".service-two-list-wrap .service-two-list-item").on(
    "mouseenter",
    function () {
      $("#service-two-thumb").removeClass().addClass($(this).attr("rel"));
      $(this).addClass("active").siblings().removeClass("active");
    },
  );

  ////////////////////////////////////////////////////
  // 13. Bg Image For Attribute  Js
  $(".bg-img").each(function () {
    var img = $(this).data("background-image");
    if (img) {
      $(this).css("background-image", "url('" + img + "')");
    }
  });

  ////////////////////////////////////////////////////
  // 14. Mouse active Js
  $(document).ready(function () {
    $(".service-ip-wrapper").on("mouseenter", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });

    $(".service-ip-wrapper").on("mouseenter", function () {
      $(this).addClass("active");
      $(this)
        .parent()
        .siblings()
        .find(".service-ip-wrapper")
        .removeClass("active");
    });
  });

  $(document).ready(function () {
    function initRipples() {
      $(".ripple-image").each(function () {
        var $container = $(this);
        var $img = $container.find("img").first();

        if ($img.length === 0) return;

        var img = new Image();
        img.src = $img.attr("src");

        img.onload = function () {
          var imgURL = img.src;

          $container.css({
            "background-image": "url(" + imgURL + ")",
            "background-size": "cover",
            "background-position": "center center",
          });

          // init ripples plugin
          if (typeof $container.ripples === "function") {
            $container.ripples({
              resolution: 400,
              perturbance: 0.03,
              imageUrl: imgURL,
            });
          }

          $img.hide();
        };
      });
    }

    initRipples();
  });

  ////////////////////////////////////////////////////
  // 15. Contact Form AJAX & Accessible Validation
  document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    const statusBox = document.getElementById("contact-status");
    const submitBtn = document.getElementById("contact-submit-btn");

    function setFieldValidity(field, isValid) {
      if (!field) return;
      field.classList.toggle("is-invalid", !isValid);
      field.setAttribute("aria-invalid", isValid ? "false" : "true");
    }

    // Clear validation error when user begins typing
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener("input", () => {
        if (input.classList.contains("is-invalid")) {
          setFieldValidity(input, true);
        }
      });
    });

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      let hasError = false;
      let firstErrorField = null;

      const nameVal = nameInput ? nameInput.value.trim() : "";
      const emailVal = emailInput ? emailInput.value.trim() : "";
      const messageVal = messageInput ? messageInput.value.trim() : "";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nameVal || nameVal.length < 2) {
        setFieldValidity(nameInput, false);
        hasError = true;
        if (!firstErrorField) firstErrorField = nameInput;
      } else {
        setFieldValidity(nameInput, true);
      }

      if (!emailVal || !emailRegex.test(emailVal)) {
        setFieldValidity(emailInput, false);
        hasError = true;
        if (!firstErrorField) firstErrorField = emailInput;
      } else {
        setFieldValidity(emailInput, true);
      }

      if (!messageVal || messageVal.length < 10) {
        setFieldValidity(messageInput, false);
        hasError = true;
        if (!firstErrorField) firstErrorField = messageInput;
      } else {
        setFieldValidity(messageInput, true);
      }

      if (hasError) {
        if (firstErrorField) firstErrorField.focus();
        if (statusBox) {
          statusBox.className = "status-error";
          statusBox.textContent = "Please complete all required fields correctly before submitting.";
        }
        return;
      }

      // Submit state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border-sm" aria-hidden="true"></span> Sending...';
      }
      if (statusBox) {
        statusBox.className = "";
        statusBox.textContent = "";
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          if (statusBox) {
            statusBox.className = "status-success";
            statusBox.textContent = "Thank you! Your message has been sent successfully. Frank will get back to you shortly.";
          }
          contactForm.reset();
        } else {
          throw new Error("Form submission response not ok");
        }
      } catch (err) {
        // Safe fallback to direct mailto
        const mailtoUrl =
          "mailto:frankpatel33@gmail.com?subject=Portfolio%20Inquiry%20from%20" +
          encodeURIComponent(nameVal) +
          "&body=" +
          encodeURIComponent(messageVal + "\n\nFrom: " + nameVal + " (" + emailVal + ")");

        if (statusBox) {
          statusBox.className = "status-error";
          statusBox.innerHTML =
            'Direct submission encountered a temporary issue. You can <a href="' +
            mailtoUrl +
            '" style="text-decoration:underline;color:#ffffff;font-weight:600;">click here to email Frank directly</a> with your message.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span class="btn-text">Submit Message</span>';
        }
      }
    });
  });
})(jQuery);
