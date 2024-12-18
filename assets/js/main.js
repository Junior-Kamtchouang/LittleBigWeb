

    (function () {
      "use strict";

      /**
       * Apply .scrolled class to the body as the page is scrolled down
       */
      function toggleScrolled() {
        const selectBody = document.querySelector('body');
        const selectHeader = document.querySelector('#header');
        if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
        window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
      }

      document.addEventListener('scroll', toggleScrolled);
      window.addEventListener('load', toggleScrolled);

      /**
       * Mobile nav toggle
       */
      const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

      function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      }

      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

      /**
       * Hide mobile nav on same-page/hash links
       */
      document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
          if (document.querySelector('.mobile-nav-active')) {
            mobileNavToogle();
          }
        });

      });

      /**
       * Toggle mobile nav dropdowns
       */
      document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function (e) {
          e.preventDefault();
          this.parentNode.classList.toggle('active');
          this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
          e.stopImmediatePropagation();
        });
      });

      /**
       * Preloader
       */
      const preloader = document.querySelector('#preloader');
      if (preloader) {
        window.addEventListener('load', () => {
          preloader.remove();
        });
      }

      /**
       * Scroll top button
       */
      let scrollTop = document.querySelector('.scroll-top');

      function toggleScrollTop() {
        if (scrollTop) {
          window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
      }

      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      window.addEventListener('load', toggleScrollTop);
      document.addEventListener('scroll', toggleScrollTop);

      /**
       * Animation on scroll function and init
       */
      function aosInit() {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }

      window.addEventListener('load', aosInit);

      /**
       * Auto generate the carousel indicators
       */
      document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
        carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
          if (index === 0) {
            carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
          } else {
            carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
          }
        });
      });

      /**
       * Initiate Pure Counter
       */
      new PureCounter();

      /**
       * Initiate glightbox
       */
      const glightbox = GLightbox({
        selector: '.glightbox'
      });

      /**
       * Init isotope layout and filters
       */
      document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
        let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
        let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
        let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

        let initIsotope;
        imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
          initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort
          });
        });

        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
          filters.addEventListener('click', function () {
            isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
            this.classList.add('filter-active');
            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
            if (typeof aosInit === 'function') {
              aosInit();
            }
          }, false);
        });

      });

      /**
       * Init swiper sliders
       */
      function initSwiper() {
        document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
          let config = JSON.parse(
              swiperElement.querySelector(".swiper-config").innerHTML.trim()
          );

          if (swiperElement.classList.contains("swiper-tab")) {
            initSwiperWithCustomPagination(swiperElement, config);
          } else {
            new Swiper(swiperElement, config);
          }
        });
      }

      window.addEventListener("load", initSwiper);

      /**
       * Frequently Asked Questions Toggle
       */
      document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
        faqItem.addEventListener('click', () => {
          faqItem.parentNode.classList.toggle('faq-active');
        });
      });

      /**
       * Correct scrolling position upon page load for URLs containing hash links.
       */
      window.addEventListener('load', function (e) {
        if (window.location.hash) {
          if (document.querySelector(window.location.hash)) {
            setTimeout(() => {
              let section = document.querySelector(window.location.hash);
              let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
              window.scrollTo({
                top: section.offsetTop - parseInt(scrollMarginTop),
                behavior: 'smooth'
              });
            }, 100);
          }
        }
      });

      /**
       * Navmenu Scrollspy
       */
      let navmenulinks = document.querySelectorAll('.navmenu a');

      function navmenuScrollspy() {
        navmenulinks.forEach(navmenulink => {
          if (!navmenulink.hash) return;
          let section = document.querySelector(navmenulink.hash);
          if (!section) return;
          let position = window.scrollY + 200;
          if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
            navmenulink.classList.add('active');
          } else {
            navmenulink.classList.remove('active');
          }
        })
      }

      window.addEventListener('load', navmenuScrollspy);
      document.addEventListener('scroll', navmenuScrollspy);



    })();


    /**
     * Changing sercices-content
     */
    document.addEventListener('DOMContentLoaded', function() {
      // Alle Links und Inhalte sammeln
      const serviceLinks = document.querySelectorAll('.services-list a');
      const serviceContents = document.querySelectorAll('.service-content');

      // Funktion, um alle Inhalte zu verstecken
      function hideAllContents() {
        serviceContents.forEach(function(content) {
          content.style.display = 'none';
        });
      }

      // Event-Listener für jeden Link hinzufügen
      serviceLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();

          // Aktiven Link markieren und andere Links zurücksetzen
          serviceLinks.forEach(function(l) {
            l.classList.remove('active');
          });
          this.classList.add('active');

          // Alle Inhalte verstecken
          hideAllContents();

          // Den entsprechenden Inhalt basierend auf dem angeklickten Link anzeigen
          const targetId = this.textContent.trim().toLowerCase().replace(/\s+/g, '-') + '-content';
          const targetContent = document.getElementById(targetId);

          if (targetContent) {
            targetContent.style.display = 'block';
          }
        });
      });
      function setActiveLink(link) {
        serviceLinks.forEach(function(l) {
          l.classList.remove('active');
        });
        link.classList.add('active');
      }
      // Funktion, um den richtigen Inhalt anzuzeigen
      function showContent(targetId) {
        hideAllContents();
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.style.display = 'block';
        }
      }



      // Funktion, um Hash zu überprüfen und den entsprechenden Inhalt zu laden
      function handleHashChange() {
        const hash = window.location.hash.substring(1); // Entfernt das '#' vom Hash
        if (hash) {
          const targetLink = Array.from(serviceLinks).find(link => link.getAttribute('href').substring(1) === hash);
          if (targetLink) {
            setActiveLink(targetLink);
            showContent(hash);
          }
        } else {
          // Wenn kein Hash vorhanden ist, Standardinhalt anzeigen
          if (serviceLinks.length > 0) {
            serviceLinks[0].click();
          }
        }
      }

      // Optional: Standardmäßig den ersten Inhalt anzeigen
      if (serviceLinks.length > 0) {
        serviceLinks[0].click();  // Simuliere den Klick auf den ersten Link
      }

      // Event-Listener für jeden Link hinzufügen
      serviceLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1); // Hash ohne '#'
          setActiveLink(this);
          showContent(targetId );
        });
      });


      // Beim Laden der Seite den Hash prüfen und den Inhalt anzeigen
      handleHashChange();

      // Hinzufügen eines Event-Listeners, um Änderungen des Hash-Wertes zu überwachen
      window.addEventListener('hashchange', handleHashChange);
    });

    /**
     * Changing portfolio-content
     */


    document.addEventListener('DOMContentLoaded', function() {
      // Alle Links und Inhalte sammeln
      const portfolioLinks = document.querySelectorAll('.portfolio-list a');
      const portfolioContents = document.querySelectorAll('.portfolio-content');

      // Funktion, um alle Inhalte zu verstecken
      function hideAllPortfolioContents() {
        portfolioContents.forEach(function(content) {
          content.style.display = 'none';
        });
      }

      // Event-Listener für jeden Link hinzufügen
      portfolioLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          // Aktiven Link markieren und andere Links zurücksetzen
          portfolioLinks.forEach(function(l) {
            l.classList.remove('active');
          });
          this.classList.add('active');
          // Alle Inhalte verstecken
          hideAllPortfolioContents();
          // Den entsprechenden Inhalt basierend auf dem angeklickten Link anzeigen
          const targetId = this.textContent.trim().toLowerCase().replace(/\s+/g, '-') + '-content';
          const targetContent = document.getElementById(targetId);
          if (targetContent) {
            targetContent.style.display = 'block';
          }
        });
      });

      function setActivePortfolioLink(link) {
        portfolioLinks.forEach(function(l) {
          l.classList.remove('active');
        });
        link.classList.add('active');
      }

      // Funktion, um den richtigen Inhalt anzuzeigen
      function showPortfolioContent(targetId) {
        hideAllPortfolioContents();
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.style.display = 'block';
        }
      }

      // Funktion, um Hash zu überprüfen und den entsprechenden Inhalt zu laden
      function handlePortfolioHashChange() {
        const hash = window.location.hash.substring(1); // Entfernt das '#' vom Hash
        if (hash) {
          const targetLink = Array.from(portfolioLinks).find(link => link.getAttribute('href').substring(1) === hash);
          if (targetLink) {
            setActivePortfolioLink(targetLink);
            showPortfolioContent(hash);
          }
        } else {
          // Wenn kein Hash vorhanden ist, Standardinhalt anzeigen
          if (portfolioLinks.length > 0) {
            portfolioLinks[0].click();
          }
        }
      }

      // Optional: Standardmäßig den ersten Inhalt anzeigen
      if (portfolioLinks.length > 0) {
        portfolioLinks[0].click(); // Simuliere den Klick auf den ersten Link
      }

      // Event-Listener für jeden Link hinzufügen
      portfolioLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1); // Hash ohne '#'
          setActivePortfolioLink(this);
          showPortfolioContent(targetId);
        });
      });

      // Beim Laden der Seite den Hash prüfen und den Inhalt anzeigen
      handlePortfolioHashChange();

      // Hinzufügen eines Event-Listeners, um Änderungen des Hash-Wertes zu überwachen
      window.addEventListener('hashchange', handlePortfolioHashChange);
    });


    // Modal öffnen
    document.addEventListener("DOMContentLoaded", function() {
      let modal = document.getElementById("myModal");
      let openBtns = document.querySelectorAll(".btn-get-started, #openModalButton");
      let closeBtn = document.querySelector(".close");

      openBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
          modal.style.display = "block";
        });
      });

      closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
      });

      window.addEventListener("click", function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
    });

