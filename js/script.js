(function() {

  let $container;
  let $body;
  let index = 0;

  // contains the users
  const data = [];

  // opens a modal dialog with user info
  function modal(user) {

    const dob = new Date(user.dob.date);

    const $modal = $(`
        <div class="modal">
          <div class="modal-wrapper">
            <div class="content">
              <div class="next"></div>
              <div class="prev"></div>
              <div class="close"></div>
              <div class="thumbnail">
                <img src="${user.picture.large}">
              </div>
              <div class="info">
                <h2 class="name">${user.name.first} ${user.name.last}</h2>
                <div class="email">${user.email}</div>
                <div class="city">${user.location.city}</div>
              </div>
              <div class="more">
                <div class="phone">${user.cell}</div>
                <div class="address">${user.location.street}, ${user.location.state} ${user.location.postcode}</div>
                <div class="birthday">Birthday: ${dob.getMonth() + 1}/${dob.getDate()}/${String(dob.getUTCFullYear()).substr(2,4)}</div>
              </div>

            </div>
          </div>
        </div>
    `);

    // handles click when next button is clicked
    $modal.on('click', 'div.next', () => {
      $modal.remove();
      if(index < data.length - 1)
        modal(data[++index]);
    });

    // handles click when prev button is clicked
    $modal.on('click', 'div.prev', () => {
      $modal.remove();
      if(index > 0)
        modal(data[--index]);
    });

    $('.search-field').hide();

    // handles click when close button is clicked
    $modal.on('click', 'div.close', () => {
      $('.search-field').show();
      $modal.remove();
    });

    // append the modal to the body
    $body.append($modal);
  }

  // appends a user to the page
  function append(user) {

    const $user = $(`
      <div class="employee">
        <div class="thumbnail">
          <img src="${user.picture.large}">
        </div>
        <div class="info">
          <h2 class="name">${user.name.first} ${user.name.last}</h2>
          <div class="email">${user.email}</div>
          <div class="city">${user.location.city}</div>
        </div>
      </div>
    `);

    // set the data-index attribute to the index in the data array
    $user.attr('data-index', data.push(user) - 1);

    // appends the user to the container div
    $container.append($user);

  }

  // event handles to open a modal window after a user has been clicked
  function show() {

    const $self = $(this);
    index = parseInt($self.attr('data-index'));
    const user = data[index];

    modal(user);
  }

  // loads the data and calls append to add the users to the page
  function load() {

    $container = $('.container');
    $body = $('body');

    $container.on('click', 'div.employee', show);

    fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(response => $.each(response.results, (i, user) => append(user)))
    .then(() => search.new('.container'))
    .catch(error => alert(error.message));

    search.init('header', 'search-field', 'Search for employee');

  }


  $(document).ready(load);

}());
