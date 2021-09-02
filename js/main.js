const loadBooks = () => {
  const searchField = document.getElementById('search-field');
  const searchFieldValue = searchField.value;

  toggleElement(true, 'spinner');

  const url = `https://openlibrary.org/search.json?q=${searchFieldValue}`;

  fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs, data.numFound));

  // Clear search field after search button click
  searchField.value = '';
}

const toggleElement = (isNeeded, id) => {
  const element = document.getElementById(id);
  if (isNeeded) {
    element.classList.add('d-block');
    element.classList.remove('d-none');
  } else {
    element.classList.add('d-none');
    element.classList.remove('d-block');
  }
}


// Search Result display
const displaySearchResult = (results, resultCount) => {
  const searchContainer = document.getElementById('search-container');
  const resultCountField = document.getElementById('search-result-count');

  toggleElement(false, 'spinner');

  if (!results.length) {
    toggleElement(true, 'alert');
    resultCountField.innerHTML = '';
    searchContainer.innerText = '';
  }
  else {
    toggleElement(false, 'spinner');
    // Result Count Value set
    resultCountField.innerHTML = resultCount + ", Result's Found";
    searchContainer.innerText = '';

    // Looping to show the books
    results.forEach(book => {
      console.log(book);

      const imgurl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
    <div class="card h-100">
      <img src="${imgurl}" class="card-img-top" alt="${book.title_suggest}">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text"><b>Author:</b> ${book.author_name}</p>
      </div>
      <div class="card-footer">
        <small class="text-muted"><b>Publisher:</b> ${book.publisher} <br> <b>First Published at:</b> ${book.first_publish_year}</small>
      </div>
    </div>
    `;

      searchContainer.appendChild(div);
    });
  }

}

