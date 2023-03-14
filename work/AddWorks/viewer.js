// head contents
document.getElementById('meta-content').insertAdjacentHTML('afterbegin', headContent);

// site title
const siteTitleContent = `<title>${siteTitle}</title>`;
document.getElementById('site-title').insertAdjacentHTML('afterbegin', siteTitleContent);

// header
function defaultHeader() {
  let headerContent = `
    <nav>
      <ul class="header-nav-list">`;
  let headerItem;
  for (let i = 0; i < headerLinks.length; i++) {
  headerItem = `<li><a href="${headerLinks[i]['url']}">${headerLinks[i]['name']}</a></li>`;
  headerContent = headerContent + headerItem;
  }
  headerContent = `${headerContent}</ul></nav>`
  return headerContent;
}
const headerPosition = document.getElementById('header');
if (useDefaultHeader == true) {
  headerPosition.insertAdjacentHTML('afterbegin', defaultHeader());
} else {
  headerPosition.insertAdjacentHTML('afterbegin', customHeader);
}

// viewer
const currentFile = parseInt(window.location.pathname.slice(6, 12));
let currentWorkID;
for (let i = 0; i < workInfoList.length; i++) {
  if (currentFile == workInfoList[i]['date']) {
    currentWorkID = i;
  }
}
function mangaViewer() {
  let mangaContent = `<ul class="viewer-page-list">`;
  if (workInfoList[currentWorkID]['rightPageStart'] == false) {
    mangaContent = `${mangaContent}<li id="1" class="viewer-spread current-page">`;
  }
  let mangaItem;
  let pageClass;
  for (let i = 1; i <= workInfoList[currentWorkID]['pages']; i++) {
    if (i == 1) {
      pageClass = `current-page`;
    } else if (i < 4) {
      pageClass = `next-page`;
    } else {
      pageClass = `future-page`
    }
    if (workInfoList[currentWorkID]['rightPageStart'] == true) {
      // 右ページ始まり
      if (i % 2 == 1) {
        mangaItem = `
          <li id="${Math.ceil(i / 2)}" class="viewer-spread ${pageClass}">
            <div><img id="image" src="img/${i}.${workInfoList[currentWorkID]['extension']}"></div>`;
      } else {
        mangaItem = `
            <div><img id="image" src="img/${i}.${workInfoList[currentWorkID]['extension']}"></div>
          </li>`;
      }
    } else {
      // 左ページ始まり
      if (i % 2 == 0) {
        mangaItem = `
          <li id="${Math.ceil(i / 2) + 1}" class="viewer-spread ${pageClass}">
            <div><img id="image" src="img/${i}.${workInfoList[currentWorkID]['extension']}"></div>`
      } else {
        mangaItem = `
            <div><img id="image" src="img/${i}.${workInfoList[currentWorkID]['extension']}"></div>
          </li>`;
      }
    }
    mangaContent = mangaContent + mangaItem;
  }
  mangaContent = `${mangaContent}</li></ul>`;
  return mangaContent;
};
function illustViewer() {
  let illustContent = `<ul class="viewer-page-list">`;
  let illustItem;
  let pageClass;
  for (let i = 1; i <= workInfoList[currentWorkID]['pages']; i++) {
    if (i == 1) {
      pageClass = `current-page`; 
    } else if (i == 2) {
      pageClass = `next-page`;
    } else {
      pageClass = `future-page`;
    }
    illustItem = `
        <li id="${i}" class="viewer-spread ${pageClass}">
          <div><img id="image" src="img/${i}.${workInfoList[currentWorkID]['extension']}"></div>
        </li>`;
    illustContent = illustContent + illustItem;
  }
  illustContent = `${illustContent}</ul>`;
  return illustContent;
}
const workType = workInfoList[currentWorkID]['type'];
const viewerPosition = document.getElementById('viewer');
if (workType == 'manga') {
  viewerPosition.insertAdjacentHTML('afterbegin', mangaViewer());
} else {
  viewerPosition.insertAdjacentHTML('afterbegin', illustViewer());
}

// check if there is prev/next page
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
function hasPrevPage() {
  let prevPage = document.querySelector('.prev-page');
  if (prevPage == null) {
    prevBtn.classList.add('inactive');
  } else {
    prevBtn.classList.remove('inactive');
  }
}
function hasNextPage() {
  let nextPage = document.querySelector('.next-page');
  if (nextPage == null) {
    nextBtn.classList.add('inactive');
  } else {
    nextBtn.classList.remove('inactive');
  }
}
hasPrevPage();
hasNextPage();

// paging
function prevPage() {
  let currentPage = document.querySelector('.current-page');
  let currentPageID = parseInt(currentPage.getAttribute('id'));
  // 2ページ前のpast-pageがあればprev-pageに
  const pastPage = document.getElementById(`${currentPageID - 2}`);
  if (pastPage != null) {
    pastPage.classList.remove('past-page');
    pastPage.classList.add('prev-page');
  }
  // prev-pageをcurrent-pageに
  const prevPage = document.getElementById(`${currentPageID - 1}`);
  if (prevPage != null) {
  prevPage.classList.remove('prev-page');
  prevPage.classList.add('current-page');
  }
  // current-pageをnext-pageに
  currentPage.classList.remove('current-page');
  currentPage.classList.add('next-page');
  // next-pageをfuture-pageに
  const nextPage = document.getElementById(`${currentPageID + 1}`);
  if (nextPage != null) {
  nextPage.classList.remove('next-page');
  nextPage.classList.add('future-page');
  }
}
function nextPage() {
  let currentPage = document.querySelector('.current-page');
  let currentPageID = parseInt(currentPage.getAttribute('id'));
  // prev-pageをpast-pageに
  const prevPage = document.getElementById(`${currentPageID - 1}`);
  if (prevPage != null) {
  prevPage.classList.remove('prev-page');
  prevPage.classList.add('past-page');
  }
  // current-pageをprev-pageに
  currentPage.classList.remove('current-page');
  currentPage.classList.add('prev-page');
  // next-pageをcurrent-pageに
  const nextPage = document.getElementById(`${currentPageID + 1}`);
  if (nextPage != null) {
  nextPage.classList.remove('next-page');
  nextPage.classList.add('current-page');
  }
  // 2ページ後のfuture-pageがあればnext-pageに
  const futurePage = document.getElementById(`${currentPageID + 2}`);
  if (futurePage != null) {
    futurePage.classList.remove('future-page');
    futurePage.classList.add('next-page');
  }
}
prevBtn.addEventListener('click', function() {
  prevPage();
  hasPrevPage();
  hasNextPage();
});
nextBtn.addEventListener('click', function() {
  nextPage();
  hasPrevPage();
  hasNextPage();
});

// full screen
function viewFullScreen() {
  document.getElementById('viewer').classList.toggle('full-screen');
  document.getElementById('viewer-info').classList.toggle('full-screen');
  document.querySelector('.header').classList.toggle('full-screen');
  document.querySelector('.footer').classList.toggle('full-screen');

  const fullScreenBtn = document.getElementById('full-screen');
  const fullScreenIcon = document.getElementById('full-screen-icon');
  if (fullScreenIcon.getAttribute('xlink:href') === '/work/AddWorks/img/expand-solid.svg#expand') {
    fullScreenIcon.setAttribute('xlink:href', '/work/AddWorks/img/compress-solid.svg#compress');
  } else {
    fullScreenIcon.setAttribute('xlink:href', '/work/AddWorks/img/expand-solid.svg#expand');
  }
}
document.getElementById('full-screen').onclick = viewFullScreen;

// work info

function viewerInfo() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const workDate = [
    parseInt(String(currentFile).slice(0, 2)),
    months[parseInt(String(currentFile).slice(2, 4)) - 1],
    parseInt(String(currentFile).slice(4, 6))
  ];
  const viewerInfoContent = `
    <h2 class="viewer-info-title">${workInfoList[currentWorkID]['title']}</h2>
    <div class="viewer-info-category">
      <svg>
        <use xlink:href="/work/AddWorks/img/folder-solid.svg#folder"></use>
      </svg>
      ${workInfoList[currentWorkID]['category']}
    </div>
    <div class="viewer-info-caption">
      <div class="viewer-caption-title">
        <h2>Caption</h2>
        <aside>作品説明</aside>
      </div>
      ${workInfoList[currentWorkID]['caption']}
    </div>
    <div class="viewer-info-date">
      <div class="date">${workDate[1]} ${workDate[2]}, 20${workDate[0]}</div>
    </div>`;
    const viewerInfoPosition = document.getElementById('viewer-info');
    viewerInfoPosition.insertAdjacentHTML('afterbegin', viewerInfoContent);
}
viewerInfo();

// footer
function defaultFooter() {
  let footerContent = `
    <nav>
      <ul class="footer-nav-list">`;
  let footerItem;
  for (let i = 0; i < footerLinks.length; i++) {
  footerItem = `<li><a href="${footerLinks[i]['url']}">${footerLinks[i]['name']}</a></li>`;
  footerContent = footerContent + footerItem;
  }
  footerContent = `${footerContent}</ul></nav><div class="copyright">designed by <a href="https://github.com/moliyuzuha">moli</a></div>`
  return footerContent;
}
const footerPosition = document.getElementById('footer');
if (useDefaultFooter == true) {
  footerPosition.insertAdjacentHTML('afterbegin', defaultFooter());
} else {
  footerPosition.insertAdjacentHTML('afterbegin', customFooter);
}