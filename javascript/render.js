
const attackAttrs = PLAYER_ATTRS.attrs.attack;
const defendAttrs = PLAYER_ATTRS.attrs.defend;
const hiddenAttrs = PLAYER_ATTRS.attrs.hidden;
const theme = THEMES[PLAYER_ATTRS.theme];
const starIcon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' class='w-6 h-6'> <path fill-rule='evenodd' d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z' clip-rule='evenodd' /> </svg>"
function _generateAttr(attr) {
  return `<span><div class='player-feature-value'>${attr.point}</div><div class='player-feature-title'>${attr.name}</div></span>`;
}

function _playerAttrs(attrs) {
  let text = "";
  for (let attr of attrs) {
    text += _generateAttr(attr);
  }
  return text;
}

function _calculateAverage(arr) {
  if (arr.length === 0) {
    return 0;
  }
  function _sumReducer(sum, item) {
    return sum + item.point;
  }
  return arr.reduce(_sumReducer, 0) / arr.length;
}

function _insertAttackAttrs() {
  document.getElementById("attack-attrs").innerHTML = _playerAttrs(attackAttrs);
}

function _insertDefendAttrs() {
  document.getElementById("defend-attrs").innerHTML = _playerAttrs(defendAttrs);
}

function _insertHiddenAttrs() {
  document.getElementById("hidden-attrs").innerHTML = _playerAttrs(hiddenAttrs);
}

function _insertAverageAttr(){
  const averageRating = (_calculateAverage(attackAttrs) + _calculateAverage(defendAttrs)) / 2;
  document.getElementById("player-rating").innerHTML = `<span>${parseInt(averageRating)}</span>`
}

function _initTheme() {
  const color = theme.color;
  document.getElementById("logo").src = theme.logo;
  document.getElementById("card-top").style.color = color;
  document.getElementById("player-name").style.color = color;
  document.getElementById("player-info").style.color = color;
  document.getElementById("hidden-attrs").style.color = theme.extra;
  document.getElementById("attack-attrs").style.borderRight = `1px solid ${color}`;
  const imageURL = `images/card_bg/${theme.background}`;
  document.getElementById("player-card").style.backgroundImage = `url(${imageURL})`;
}

function _initPlayer() {
  document.getElementById("player-position").innerHTML = PLAYER_ATTRS.position;
  document.getElementById("player-name").innerHTML = PLAYER_ATTRS.name;
}

function _initPlayerImage() {
  document.getElementById("avatar").src = PLAYER_ATTRS.avatar;
}

function _toCanvasImage() {
  html2canvas(document.querySelector("#player-card"),{allowTaint: true, backgroundColor: null, scale: 4}).then(canvas => {
    document.getElementById("preview").appendChild(canvas);
    document.getElementById("player-card").style.display = "none";
  });
};


function init() {
  _initPlayerImage();
  _initTheme();
  _initPlayer();
  _insertAttackAttrs();
  _insertDefendAttrs();
  _insertHiddenAttrs();
  _insertAverageAttr();
  _toCanvasImage();
}