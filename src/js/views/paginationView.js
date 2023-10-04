import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View { 
  _parentElement = document.querySelector('.pagination');
 
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  };

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const page = this._data.page;

    if (page === 1 && numPages > 1) {
      return this._nextPage(page);
    }

    if (page === numPages && numPages > 1) {
      return this._previousPage(page);
    }
  
    if (page < numPages) {
      return this._previousPage(page).concat(this._nextPage(page));
    }
  
    return '';
  };

  _previousPage(page) {
    return `
      <button data-goto="${ page - 1}"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${ icons }#icon-arrow-left"></use>
        </svg>
        <span>Page ${ page - 1}</span>
      </button>
    `;
  };

    _nextPage(page) {
    return `
      <button data-goto="${ page + 1 }" class="btn--inline pagination__btn--next">
        <span>Page ${ page + 1 }</span>
        <svg class="search__icon">
          <use href="${ icons }#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  };
}

export default new PaginationView();