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
            <div><img id="image" src="jp/${i}.png"></div>`;
      } else {
        mangaItem = `
            <div><img id="image" src="jp/${i}.png"></div>
          </li>`;
      }
    } else {
      // 左ページ始まり
      if (i % 2 == 0) {
        mangaItem = `
          <li id="${Math.ceil(i / 2) + 1}" class="viewer-spread ${pageClass}">
            <div><img id="image" src="jp/${i}.png"></div>`
      } else {
        mangaItem = `
            <div><img id="image" src="jp/${i}.png"></div>
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
          <div><img id="image" src="jp/${i}.png"></div>
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