import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _prevMarkup(page) {
    return `
    <button data-goto="${page}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
         <use href="${icons}.svg#icon-arrow-left"></use>
      </svg>
      <span>Page ${page}</span>
    </button>
`;
  }

  _nextPage(page) {
    return `
        <button data-goto="${page}" class="btn--inline pagination__btn--next">
          <span>Page ${page}</span>
          <svg class="search__icon">
            <use href="${icons}.svg#icon-arrow-right"></use>
          </svg>
        </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);
    //Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) return this._nextPage(curPage + 1);

    //last page
    if (curPage === numPages && numPages > 1)
      return this._prevMarkup(curPage - 1);

    //other page
    if (curPage < numPages)
      return [this._prevMarkup(curPage - 1), this._nextPage(curPage + 1)];

    //Page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
