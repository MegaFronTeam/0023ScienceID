'use strict';

const JSCCommon = {
  modalCall() {
    const link = '[data-fancybox="modal"], .link-modal-js';

    Fancybox.bind(link, {
      arrows: false,
      // infobar: false,
      touch: false,
      trapFocus: false,
      placeFocusBack: false,
      infinite: false,
      dragToClose: false,
      type: 'inline',
      autoFocus: false,
      groupAll: false,
      groupAttr: false,
      // showClass: "fancybox-throwOutUp",
      // hideClass: "fancybox-throwOutDown",
      l10n: {
        Escape: 'Закрыть',
        NEXT: 'Вперед',
        PREV: 'Назад',
      },
    });
    document.querySelectorAll('.modal-close-js').forEach((el) => {
      el.addEventListener('click', () => {
        Fancybox.close();
      });
    });
    Fancybox.bind('[data-fancybox]', {
      placeFocusBack: false,
    });
    document.addEventListener('click', (event) => {
      let element = event.target.closest(link);
      if (!element) return;
      let modal = document.querySelector('#' + element.dataset.src);
      const data = element.dataset;

      function setValue(val, elem) {
        if (elem && val) {
          const el = modal.querySelector(elem);
          el.tagName == 'INPUT' ? (el.value = val) : (el.innerHTML = val);
          // console.log(modal.querySelector(elem).tagName)
        }
      }
      setValue(data.title, '.ttu');
      setValue(data.text, '.after-headline');
      setValue(data.btn, '.btn');
      setValue(data.order, '.order');
    });
  },
  // /modalCall
  toggleMenu() {
    document.addEventListener(
      'click',
      function (event) {
        const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
        const menu = document.querySelector('.menu-mobile--js');
        const toggleEv = event.target.closest('.toggle-menu-mobile--js');
        if (!toggleEv) return;
        toggle.forEach((el) => el.classList.toggle('on'));
        menu.classList.toggle('active');
        [document.body, document.querySelector('html')].forEach((el) =>
          el.classList.toggle('fixed'),
        );
      },
      { passive: true },
    );
  },
  closeMenu() {
    const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
    const menu = document.querySelector('.menu-mobile--js');
    if (!menu) return;
    if (menu.classList.contains('active')) {
      toggle.forEach((element) => element.classList.remove('on'));
      menu.classList.remove('active');
      [document.body, document.querySelector('html')].forEach((el) => el.classList.remove('fixed'));
    }
  },
  mobileMenu() {
    const menu = document.querySelector('.menu-mobile--js');
    if (!menu) return;
    this.toggleMenu();
    document.addEventListener(
      'mouseup',
      (event) => {
        let container = event.target.closest('.menu-mobile--js.active'); // (1)
        let link = event.target.closest('.menu-mobile .menu a'); // (1)
        let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
        if (!container && !toggle) this.closeMenu();
      },
      { passive: true },
    );

    window.addEventListener(
      'resize',
      () => {
        if (window.matchMedia('(min-width: 992px)').matches) this.closeMenu();
      },
      { passive: true },
    );
  },

  // tabs  .
  tabscostume(tab) {
    // const tabs = document.querySelectorAll(tab);
    // const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
    // tabs.forEach(element => {
    // 	let tabs = element;
    // 	const tabsCaption = tabs.querySelector(".tabs__caption");
    // 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
    // 	const tabsWrap = tabs.querySelector(".tabs__wrap");
    // 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
    // 	const random = Math.trunc(Math.random() * 1000);
    // 	tabsBtn.forEach((el, index) => {
    // 		const data = `tab-content-${random}-${index}`;
    // 		el.dataset.tabBtn = data;
    // 		const content = tabsContent[index];
    // 		content.dataset.tabContent = data;
    // 		if (!content.dataset.tabContent == data) return;

    // 		const active = content.classList.contains('active') ? 'active' : '';
    // 		// console.log(el.innerHTML);
    // 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
    // 	})

    // 	tabs.addEventListener('click', function (element) {
    // 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
    // 		if (!btn) return;
    // 		const data = btn.dataset.tabBtn;
    // 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
    // 		const content = this.querySelectorAll(`[data-tab-content]`);
    // 		tabsAllBtn.forEach(element => {
    // 			element.dataset.tabBtn == data
    // 				? element.classList.add('active')
    // 				: element.classList.remove('active')
    // 		});
    // 		content.forEach(element => {
    // 			element.dataset.tabContent == data
    // 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
    // 				: element.classList.remove('active')
    // 		});
    // 	})
    // })

    $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')
        .closest('.' + tab)
        .find('.' + tab + '__content')
        .hide()
        .removeClass('active')
        .eq($(this).index())
        .fadeIn()
        .addClass('active');
    });
  },
  // /tabs

  inputMask() {
    // mask for input
    let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
    InputTel.forEach((element) =>
      element.setAttribute('pattern', '[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}'),
    );
    Inputmask({ mask: '+9(999)999-99-99', showMaskOnHover: false }).mask(InputTel);
  },
  // /inputMask
  ifie() {
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    if (isIE11) {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>',
      );
    }
  },
  sendForm() {
    var gets = (function () {
      var a = window.location.search;
      var b = new Object();
      var c;
      a = a.substring(1).split('&');
      for (var i = 0; i < a.length; i++) {
        c = a[i].split('=');
        b[c[0]] = c[1];
      }
      return b;
    })();
    // form
    $(document).on('submit', 'form', function (e) {
      e.preventDefault();
      const th = $(this);
      var data = th.serialize();
      th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
      th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
      th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
      th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
      $.ajax({
        url: 'action.php',
        type: 'POST',
        data: data,
      })
        .done(function (data) {
          Fancybox.close();
          Fancybox.show([{ src: '#modal-thanks', type: 'inline' }]);
          // window.location.replace("/thanks.html");
          setTimeout(function () {
            // Done Functions
            th.trigger('reset');
            // $.magnificPopup.close();
            // ym(53383120, 'reachGoal', 'zakaz');
            // yaCounter55828534.reachGoal('zakaz');
          }, 4000);
        })
        .fail(function () {});
    });
  },
  heightwindow() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener(
      'resize',
      () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      },
      { passive: true },
    );
  },
  animateScroll() {
    $(document).on('click', ' .menu li a, .scroll-link', function () {
      const elementClick = $(this).attr('href');
      if (!document.querySelector(elementClick)) {
        $(this).attr('href', '/' + elementClick);
      } else {
        let destination = $(elementClick).offset().top;
        $('html, body').animate({ scrollTop: destination - 80 }, 0);
        return false;
      }
    });
  },
  getCurrentYear(el) {
    let now = new Date();
    let currentYear = document.querySelector(el);
    if (currentYear) currentYear.innerText = now.getFullYear();
  },
  toggleShow(toggle, drop) {
    let catalogDrop = drop;
    let catalogToggle = toggle;

    $(document).on('click', catalogToggle, function () {
      $(this)
        .toggleClass('active')
        .next()
        .fadeToggle('fast', function () {
          $(this).toggleClass('active');
        });
    });

    document.addEventListener(
      'mouseup',
      (event) => {
        let container = event.target.closest(catalogDrop + '.active'); // (1)
        let link = event.target.closest(catalogToggle); // (1)
        if (!container || !catalogToggle) {
          $(catalogDrop).removeClass('active').fadeOut();
          $(catalogToggle).removeClass('active');
        }
      },
      { passive: true },
    );
  },
  makeDDGroup() {
    let parents = document.querySelectorAll('.dd-group-js');
    for (let parent of parents) {
      if (parent) {
        // childHeads, kind of funny))
        let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
        $(ChildHeads).click(function () {
          let clickedHead = this;

          $(ChildHeads).each(function () {
            if (this === clickedHead) {
              //parent element gain toggle class, style head change via parent
              $(this.parentElement).toggleClass('active');
              $(this.parentElement)
                .children('.dd-content-js')
                .slideToggle(function () {
                  $(this).toggleClass('active');
                });
            }
            // else {
            // 	$(this.parentElement).removeClass('active');
            // 	$(this.parentElement).find('.dd-content-js').slideUp(function () {
            // 		$(this).removeClass('active');
            // 	});
            // }
          });
        });
      }
    }
  },
  imgToSVG() {
    const convertImages = (query, callback) => {
      const images = document.querySelectorAll(query);

      images.forEach((image) => {
        fetch(image.src)
          .then((res) => res.text())
          .then((data) => {
            const parser = new DOMParser();
            const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

            if (image.id) svg.id = image.id;
            if (image.className) svg.classList = image.classList;

            image.parentNode.replaceChild(svg, image);
          })
          .then(callback)
          .catch((error) => console.error(error));
      });
    };

    convertImages('.img-svg-js');
  },
};
const $ = jQuery;

function eventHandler() {
  // JSCCommon.ifie();
  JSCCommon.modalCall();
  JSCCommon.tabscostume('tabs');
  JSCCommon.mobileMenu();
  JSCCommon.inputMask();
  // JSCCommon.sendForm();
  JSCCommon.getCurrentYear('.footer__text span');
  JSCCommon.heightwindow();
  JSCCommon.makeDDGroup();
  // JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
  // JSCCommon.animateScroll();

  // JSCCommon.CustomInputFile();
  var x = window.location.host;
  let screenName;
  screenName = 'screen/' + document.body.dataset.bg;
  if (screenName && x.includes('localhost:30')) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="pixel-perfect" style="background-image: url(${screenName});"></div>`,
    );
  }

  function setFixedNav() {
    let topNav = document.querySelector('.top-nav  ');
    if (!topNav) return;
    window.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
  }

  function whenResize() {
    setFixedNav();
  }

  window.addEventListener(
    'scroll',
    () => {
      setFixedNav();
    },
    { passive: true },
  );
  window.addEventListener(
    'resize',
    () => {
      whenResize();
    },
    { passive: true },
  );

  whenResize();

  let defaultSl = {
    spaceBetween: 0,
    lazy: {
      loadPrevNext: true,
    },
    watchOverflow: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: ' .swiper-pagination',
      type: 'bullets',
      clickable: true,
      // renderBullet: function (index, className) {
      // 	return '<span class="' + className + '">' + (index + 1) + '</span>';
      // }
    },
  };

  const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
    slidesPerView: 'auto',
    freeMode: true,
    watchOverflow: true,
  });

  const headerBlockSwiper = new Swiper('.headerBlock__slider--js', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: ' .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  const writeUsBannerSwiper = new Swiper('.writeUsBanner__slider--js', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: ' .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  const defaultSwiper = new Swiper('.sDefaultSlider__slider--js', {
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  let banner = document.querySelector('.headerBlock__banner-col');
  if (banner) {
    banner.querySelector('.headerBlock__close').addEventListener('click', function () {
      $(banner).hide();
    });
  }

  // let labSlides = document.querySelectorAll('.labSlide');
  // if(labSlides) {
  // 	for (let labSlide of labSlides) {
  // 		let labSlideDots = labSlide.querySelector('.dots'),
  // 				labSlideDetailed = labSlide.querySelector('.detailed'),
  // 				labSlideMoreText = labSlide.querySelector('.moreText');
  // 		if(labSlideDetailed) {
  // 			labSlideDetailed.addEventListener('click', function() {
  // 				labSlideMoreText.classList.add('active');
  // 				$(labSlideDots).hide();
  // 				$(labSlideDetailed).hide();
  // 			});
  // 		}

  // 		let tagBtns = labSlide.querySelectorAll('.labSlide__show-more');
  // 		for (let tagBtn of tagBtns) {
  // 			tagBtn.addEventListener('click', function () {
  // 				this.classList.add('hide');
  // 				let tagCols = this.closest('.labSlide__tags').querySelectorAll(`.labSlide__tag-col`);
  // 				$(tagCols).slideDown();
  // 			});
  // 		}
  // 	}
  // };

  $(document).on('click', '.detailed', function () {
    const self = $(this);
    self.hide();
    self.parent().find('.dots').hide();
    self.parent().find('.moreText').addClass('active');
  });

  // let productItems = document.querySelectorAll('.product-item');
  // if(productItems) {
  // 	for (let productItem of productItems) {
  // 		let productItemDots = productItem.querySelector('.dots'),
  // 				productItemDetailed = productItem.querySelector('.detailed'),
  // 				productItemMoreText = productItem.querySelector('.moreText');
  // 		if(productItemDetailed) {
  // 			productItemDetailed.addEventListener('click', function() {
  // 				productItemMoreText.classList.add('active');
  // 				$(productItemDots).hide();
  // 				$(productItemDetailed).hide();
  // 			});
  // 		}

  // 		let tagBtns = productItem.querySelectorAll('.product-item__show-more');
  // 		for (let tagBtn of tagBtns) {
  // 			tagBtn.addEventListener('click', function () {
  // 				this.classList.add('hide');
  // 				let tagCols = this.closest('.product-item__tags').querySelectorAll(`.product-item__tag-col`);
  // 				$(tagCols).slideDown();
  // 			});
  // 		}
  // 	}
  // };

  $('.section-title__filter-btn').on('click', function () {
    $('.section-title__filter-wrap').slideToggle();
  });

  $('.menu-item-has-children span').on('click', function () {
    $('.menu-item-has-children').toggleClass('active');
    $('.menu-item-has-children .sub-menu').slideToggle();
  });

  let filter = document.querySelector('.filter');
  if (filter) {
    const head = filter.querySelector('.filter__head');
    const fitlerBody = filter.querySelector('.filter__body');
    const cross = filter.querySelector('.filter__cross');

    if (head) {
      head.addEventListener('click', function () {
        fitlerBody.classList.add('active');
        document.body.classList.add('fixedFilter');
      });
    }

    if (cross) {
      filter.querySelector('.filter__cross').addEventListener('click', function () {
        fitlerBody.classList.remove('active');
        document.body.classList.remove('fixedFilter');
      });
    }

    if (!fitlerBody) return;
    window.addEventListener(
      'resize',
      () => {
        if (window.matchMedia('(min-width: 992px)').matches) {
          fitlerBody.classList.remove('active');
          document.body.classList.remove('fixedFilter');
        }
      },
      { passive: true },
    );
  }

  let searchBlocks = document.querySelectorAll('.search-block');
  if (searchBlocks) {
    for (let searchBlock of searchBlocks) {
      let del = searchBlock.querySelector('.search-block__delete-text');
      let input = searchBlock.querySelector('input');
      if (input) {
        searchBlock.querySelector('input').addEventListener('input', function () {
          if (this.value.split('').length > 0) {
            del.classList.add('active');
          } else {
            del.classList.remove('active');
          }
        });
      }
      if (del) {
        del.addEventListener('click', function () {
          searchBlock.querySelector('input').value = '';
          this.classList.remove('active');
        });
      }
    }
  }

  function inputFile() {
    if (document.querySelector('.upload-field')) {
      let uploadField = document.querySelectorAll('.upload-field');
      for (let i = 0; i < uploadField.length; i++) {
        let inputFile = uploadField[i].querySelector('.input-upload');
        inputFile.addEventListener(
          'change',
          () =>
            (uploadField[i].querySelector('.upload-field__file-name').innerHTML =
              inputFile.files[0].name),
        );
      }
    }
  }
  inputFile();

  const sCabinetSwiper = new Swiper('.sCabinet__slider--js', {
    slidesPerView: 'auto',
    observer: true,
  });

  let panzoomClass = document.querySelector('.panzoom');
  if (panzoomClass) {
    const myPanzoom = new Panzoom(document.querySelector('.panzoom'), {
      wheel: false,
      // baseScale: 0,
      click: false,
      zoomInCentered: false,
    });
  }

  var popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  for (const popoverTriggerEl of popoverTriggerList) {
    let popoverContent = {
      title: popoverTriggerEl.dataset.bsContent,
      smu: popoverTriggerEl.dataset.smu,
      sno: popoverTriggerEl.dataset.sno,
      mu: popoverTriggerEl.dataset.mu,
      link: popoverTriggerEl.dataset.link,
    };
    let users = `<div class="col-auto pr-0 users-col"> </div>`;

    let user = `<div class="col-auto pr-0    user-col" > </div>`;
    let popoverInner = `
			<div class="sMap__popover">
				<div class="sMap__title">${popoverContent.title}</div>
				<ul>
					<li class="row gx-2">
						${users}
						<div class="col">Активных СМУ <div class="small">Федеральных</div></div> 
						<div class="col-auto text-primary">${popoverContent.smu}</div>
					</li>
					<li class="row gx-2">
						${users}
						<div class="col">Активных СНО<div class="small">Региональных</div></div>
						<div class="col-auto text-primary">${popoverContent.sno}</div>
					</li>
					<li class="row gx-2"> 
						${user}
						<div class="col">Молодых  ученых</div> 
						<div class="col-auto text-primary">${popoverContent.mu}</div>
					</li>
					<li class="row gx-2 d-lg-none">
						<a href="${popoverContent.link}">Подробнее</a>
					</li>
				</ul>
			</div>
		`;
    const popover = new bootstrap.Popover(popoverTriggerEl, {
      template: `
					<div class="popover" role="tooltip">
						<div class="popover-arrow"></div> 
						<h1 class="popover-header"></h1>
						${popoverInner}
					</div>`,
      trigger: 'hover',
      placement: 'auto',
      delay: { show: 100, hide: 100 },
    });
  }

  const tabs = document.querySelector('.sModel');
  if (tabs) {
    tabs.addEventListener('click', function (element) {
      const btn = element.target.closest(`.diagram-tab-js:not(.active)`);
      if (!btn) return;
      const data = btn.dataset.tab;
      const content = this.querySelectorAll(`.toggle-content`);
      const tabsAllBtn = document.querySelectorAll('.diagram-tab-js');
      tabsAllBtn.forEach((element) => {
        element.dataset.tab == data
          ? element.classList.add('active')
          : element.classList.remove('active');
      });
      content.forEach((element) => {
        // console.log(element.id);
        element.id == data ? element.classList.add('active') : element.classList.remove('active');
      });
    });
  }
  const tab = 'tabs';

  const swiperDiagramTabs = new Swiper('.sCompetenciesBlock__swiper--js', {
    slidesPerView: 'auto',
    freeMode: true,
    watchOverflow: true,
  });

  let calendars = document.querySelectorAll('.calendar-js');
  if (calendars) {
    for (let calendar of calendars) {
      new AirDatepicker(calendar);
    }
  }
  $('.settings__menu').on('click', function () {
    $('.settings__content').addClass('active');
    $('body').addClass('fixedSettings');
  });
  document.addEventListener('mouseup', (event) => {
    let container = event.target.closest('.settings__content.active'); // (1)
    let toggle = event.target.closest('.settings__cross'); // (1)
    let btn = event.target.closest('.settings__menu'); // (1)
    if (!container && !toggle && !btn) {
      $('.settings__content').removeClass('active');
      $('body').removeClass('fixedSettings');
    }
    if (toggle) {
      $('.settings__content').removeClass('active');
      $('body').removeClass('fixedSettings');
    }
  });

  document.addEventListener('mouseup', (event) => {
    let btn = event.target.closest('.top-nav__cabinet-btn'); // (1)\
    let activeBtn = event.target.closest('.top-nav__cabinet-btn.active'); // (1)\
    let container = event.target.closest('.top-nav__cabinet-dropdown'); // (1)
    // if ($('.top-nav__cabinet-btn').hasClass('active')) {
    // }
    if (container || btn) {
      $('.top-nav__cabinet-btn').addClass('active');
    } else {
      $('.top-nav__cabinet-btn').removeClass('active');
    }
    if (!container && activeBtn) {
      $('.top-nav__cabinet-btn').removeClass('active');
      console.log(123);
    }
  });

  if (typeof $('.select-js').select2 === 'function') {
    $('.select-js')
      .select2({
        placeholder: 'Text',
        // multiple: true,
        width: '100%',
        // allowClear: true,
      })
      .on('change', function (e) {
        const wrap = document.querySelector('.custom-multi-select-wrap');
        const values = $(this).val();
        const parent = this.closest('.custom-multi-select-wrap');
        if (wrap) {
          if (values.some((el) => el === 'All')) {
            console.log(values);

            $(this).val(null).trigger('change');
            parent.style.setProperty('--count', `'0'`);
          } else {
            parent.style.setProperty('--count', `'${values.length}'`);
          }
        }
        // Your change event handler code here
        console.log('Select2 value changed:', $(this).val());
      });
  }
}
if (document.readyState !== 'loading') {
  eventHandler();
} else {
  document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
