// 방명록 화면에서 필요한 요소를 찾는다.
const form = document.querySelector('#guestbook-form');
const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');
const notice = document.querySelector('#notice');
const list = document.querySelector('#list');
const empty = document.querySelector('#empty');
const count = document.querySelector('#count');

// 방명록 글을 저장할 배열
let items = [];

// 안내 문구를 비운다.
function clearNotice() {
  notice.textContent = '';
}

// 배열의 내용을 기준으로 목록을 다시 그린다.
function showList() {
  // 기존 목록을 비운다.
  list.innerHTML = '';

  // 배열을 처음부터 끝까지 순회하면서 각 항목을 li로 만든다.
  for (let i = 0; i < items.length; i++) {
    const li = document.createElement('li');
    li.textContent = items[i];

    // 삭제 버튼을 만들어서 해당 항목을 배열에서 제거한다.
    const removeButton = document.createElement('button');
    removeButton.textContent = '삭제';
    removeButton.addEventListener('click', function () {
      items.splice(i, 1);
      showList();
    });

    li.append(removeButton);
    list.append(li);
  }

  // 총 개수를 화면에 표시한다.
  count.textContent = `${items.length}개`;

  // 비어 있을 때와 있을 때의 안내 문구를 다르게 표시한다.
  if (items.length === 0) {
    empty.textContent = '아직 남긴 글이 없습니다.';
  } else {
    empty.textContent = '';
  }
}

// 폼이 제출되면 이름과 메시지를 검사하고 저장한다.
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  // 이름이 비어 있으면 경고를 띄우고 입력창에 포커스를 준다.
  if (name === '') {
    notice.textContent = '이름을 입력하세요.';
    nameInput.focus();
    return;
  }

  // 메시지가 비어 있으면 경고를 띄우고 입력창에 포커스를 준다.
  if (message === '') {
    notice.textContent = '메시지를 입력하세요.';
    messageInput.focus();
    return;
  }

  // 입력이 정상적이면 경고를 지우고 글을 저장한다.
  clearNotice();
  items.push(`${name}: ${message}`);
  showList();

  // 폼 초기화 후 이름 입력창에 다시 포커스를 준다.
  form.reset();
  nameInput.focus();
});

// 입력창에 글을 쓰면 경고 문구를 지운다.
nameInput.addEventListener('input', clearNotice);
messageInput.addEventListener('input', clearNotice);

// 처음 화면을 열었을 때 목록을 그린다.
showList();