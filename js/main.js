const loadBooks = () => {
  const searchField = document.getElementById('search-field');
  const searchFieldValue = searchField.value;

  toggleElement(true, 'spinner');
  toggleElement(false, 'alert');

  const url = `https://openlibrary.org/search.json?q=${searchFieldValue}`;

  fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs, data.numFound, searchFieldValue));

  // Clear search field after search button click
  searchField.value = '';
}

// Function for both alert and spinner
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
const displaySearchResult = (results, resultCount, searchFieldValue) => {
  const searchContainer = document.getElementById('search-container');
  const resultCountField = document.getElementById('search-result-count');

  toggleElement(false, 'spinner');

  if (!results.length) {
    toggleElement(true, 'alert');
    resultCountField.innerHTML = '';
    searchContainer.innerText = '';
  }
  else {
    toggleElement(false, 'alert');
    // Result Count Value set
    resultCountField.innerHTML = `
    <h3>${resultCount}, Result's Found for the Keyword: <b>${searchFieldValue}</b></h3>`;
    searchContainer.innerText = '';

    // Looping to show the books
    results.forEach(book => {
      const imgurl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
    <div class="card h-100">
      <img src="${imgurl}" class="card-img-top" alt="${book.title_suggest}">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text"><b>Author:</b> 
        ${(book?.author_name?.[0]) ? book?.author_name?.[0] : ''}
        </p>
      </div>
      <div class="card-footer">
        <small class="text-muted"><b>Publisher:</b> 
        ${(book?.publisher?.[0]) ? book?.publisher?.[0] : ''} 
        <br> <b>First Published at:</b> ${(book.first_publish_year) ? book.first_publish_year : ''}</small>
      </div>
    </div>
    `;

      searchContainer.appendChild(div);
    });
  }

}

