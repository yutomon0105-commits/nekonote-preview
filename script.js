const searchInput = document.querySelector('#searchInput');
const genreSelect = document.querySelector('#genreSelect');
const cards = [...document.querySelectorAll('.book-card')];
const resultCount = document.querySelector('#resultCount');
const noResults = document.querySelector('#noResults');
const dialog = document.querySelector('#bookDialog');
const dialogTitle = document.querySelector('#dialogTitle');
const dialogDescription = document.querySelector('#dialogDescription');

// Search across the title, author/publisher, and condition shown on each card.
function filterBooks() {
  const keyword = searchInput.value.trim().toLocaleLowerCase('ja');
  const genre = genreSelect.value;
  let visible = 0;

  cards.forEach((card) => {
    const searchableText = `${card.dataset.title} ${card.textContent}`.toLocaleLowerCase('ja');
    const matchesKeyword = searchableText.includes(keyword);
    const matchesGenre = genre === 'all' || card.dataset.genre === genre;
    const show = matchesKeyword && matchesGenre;
    card.hidden = !show;
    if (show) visible += 1;
  });

  resultCount.textContent = `${visible}冊を表示`;
  noResults.hidden = visible !== 0;
}

searchInput.addEventListener('input', filterBooks);
genreSelect.addEventListener('change', filterBooks);

for (const button of document.querySelectorAll('.details-button')) {
  button.addEventListener('click', () => {
    const card = button.closest('.book-card');
    dialogTitle.textContent = button.dataset.book;
    dialogDescription.textContent = `${card.querySelector('.author').textContent}／${card.querySelector('.condition').textContent}／価格：${card.querySelector('.price').childNodes[0].textContent.trim()}`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
  });
}

document.querySelector('#closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
