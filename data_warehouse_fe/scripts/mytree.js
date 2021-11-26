/**
 * @method buttonsTree
 * @description Update UI for show options when hover ellipsis
 * @param {object} e Event information
 */

const buttonsTree = (() => {
  let toggler = document.getElementsByClassName("caret");
  let i;

  for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function () {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }
  document.querySelectorAll('.ellipsis').forEach((button) => button.addEventListener('mouseenter', showOptions));
  

});

/**
 * @method showOptions
 * @description Update UI for show options when hover ellipsis
 * @param {object} e Event information
 */
function showOptions(e) {
    e.currentTarget.parentElement.querySelector('.ellipsis').classList.toggle('d-none');
    e.currentTarget.parentElement.querySelector('.edit').classList.toggle('d-none');
    e.currentTarget.parentElement.querySelector('.delete').classList.toggle('d-none');
    e.currentTarget.parentElement.querySelector('.new').classList.toggle('d-none');
};



buttonsTree();