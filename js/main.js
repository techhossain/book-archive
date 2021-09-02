const loadBooks = () => {
  const searchField = document.getElementById('search-field');
  const searchFieldValue = searchField.value;

  const url = `https://openlibrary.org/search.json?q=${searchFieldValue}`;

  fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs, data.numFound));

  // Clear search field after search button click
  searchField.value = '';
}

// Alert Messages
const toggleAlert = (isVisiable) => {
  if (isVisiable) {
    document.getElementById('alert').classList.add('d-block');
    document.getElementById('alert').classList.remove('d-none');
  }
  else {
    document.getElementById('alert').classList.add('d-none');
    document.getElementById('alert').classList.remove('d-block');
  }
}


// Search Result display

const displaySearchResult = (results, resultCount) => {

  if (!results.length) {
    toggleAlert(true);
  }
  else {
    toggleAlert(false);
    // Result Count Value set
    document.getElementById('search-result-count').innerHTML = resultCount + ", Result's Found";

    const searchContainer = document.getElementById('search-container');

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

