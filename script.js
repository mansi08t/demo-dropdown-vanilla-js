$(document).ready(function () {
    const pageSize = 20;
    let currentPage = 1;
    let searchQuery = '';
    let selectedItems = [];
    let recentItems = [];
  
    const updateDropdownMenu = async () => {
      const data = await fetchMockedData(searchQuery, currentPage, pageSize);
      data.forEach(item => {
        $('#dropdown-menu').append(`
          <div class="dropdown-item" data-id="${item.id}">
            <img src="${item.imageURL}" alt="${item.name}" />
            <span>${item.name}</span>
          </div>
        `);
      });
    };
  
    const updateSelectedItems = () => {
      $('#selected-items').html('');
      selectedItems.forEach(item => {
        $('#selected-items').append(`
          <div class="selected-item">
            ${item.name}
            <button data-id="${item.id}">×</button>
          </div>
        `);
      });
    };
  
    const updateRecentItems = () => {
      $('#recent-items').html('');
      recentItems.slice(-5).forEach(item => {
        $('#recent-items').append(`
          <div class="recent-item" data-id="${item.id}">
            ${item.name}
          </div>
        `);
      });
    };
  
    $('#search-input').on('input', function () {
      searchQuery = $(this).val();
      currentPage = 1;
      $('#dropdown-menu').html('');
      updateDropdownMenu();
    });
  
    $('#dropdown-menu').on('scroll', function () {
      if (
        $(this).scrollTop() + $(this).innerHeight() >=
        this.scrollHeight
      ) {
        currentPage++;
        updateDropdownMenu();
      }
    });
  
    $(document).on('click', '.dropdown-item', function () {
      const id = $(this).data('id');
      const name = $(this).find('span').text();
  
      if (!selectedItems.some(item => item.id === id)) {
        selectedItems.push({ id, name });
        updateSelectedItems();
  
        if (!recentItems.some(item => item.id === id)) {
          recentItems.push({ id, name });
          updateRecentItems();
        }
      }
    });
  
    $(document).on('click', '.selected-item button', function () {
      const id = $(this).data('id');
      selectedItems = selectedItems.filter(item => item.id !== id);
      updateSelectedItems();
    });
  
    $(document).on('click', '.recent-item', function () {
      const id = $(this).data('id');
      const name = $(this).text();
  
      if (!selectedItems.some(item => item.id === id)) {
        selectedItems.push({ id, name });
        updateSelectedItems();
      }
    });
  });
  