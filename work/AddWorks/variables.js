const manga = 'manga';
const illust = 'illust';

// アドレスバーを除いたvhを取得
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('load', setVh);
window.addEventListener('resize', setVh);