// Provides Search function in search-results.html


// Search Feature
$(document).ready(function () {
    // Runs on search-results page

    if($('#search-results-container').length) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query');

        if (query) {

            // Set the search value with no whitespace or uppercase for match

            const cleanQuery = query.trim().toLowerCase();

            // Key phrase check

            if (cleanQuery === "switch") {
                $('#search-results-container').html(`
                    <p>Showing 1 result for "<strong>${query}</strong>":</p>
                    <h2>Switch Upgrade</h2>
                    <p>Category: Infrastructure | Allocated: $1000 | Status: Active </p>
                    <a href="detail.html" class="primary-btn" style="margin-top: 0.5rem; display: inline-block;">View Item</a>
                    </div>
                    `);
            }

            // If no item found
            else {

                $('#search-results-container').html(`
                    <div class="panel" style="margin-top: 1rem; border-left: 4px solid #cc0000;">
                        <h2>No Results Found</h2>
                        <p>Sorry, no budget items matched "<strong>${query}</strong>". Try searching for "Switch".</p>
                    </div>
                `);
            }
        } else {
            $('#search-results-container').html('<p>Please enter a search term above.</p>');
        }
    }
});

// Table Row Modifies text and appends dynamic badge and timestamp

$(document).on('click', '.quick-action-btn', function (e) {
    e.preventDefault();
    const $button =$(this);

    // Modify the button text and background

    $button.text('Checked')

        .css({
            'background-color': '#5f7385',
            'color': '#ffffff',
            'cursor': 'default'
        });

    // Remove old status badge

    $button.siblings('.status-popover').remove();


    // Add new timestamp badge

    const currentTime = new Date().toLocaleTimeString();
    const $statusBadge =$(`
    <div class="status-popover"
                style="margin-top: 0.5rem; font-size: 0.8rem; background: #e0efe3; padding: 4px 8px; border-radius: 4px; color: #2b4c38; border-left: 3px solid #7fb393;">
                Verified: ${currentTime}
    </div>
    `);

    // Insert the new badge onto the table
    $button.parent().append($statusBadge);
});



// Category selection highlight add-item page

$('#category').on('change', function () {
    const selectedValue = $(this).val();
    const $parentForm =$(this).closest('form');
    const $itemNameInput =$parentForm.find('#item-name');


    // Modify the current inputs border

    $itemNameInput.css('border', '2px solid #7fb393');

    // remove the banner if the category is changed

    $parentForm.find('.category-notice').remove();


    // Create dynamic contnet and put it on the approval notice element

    const $noticeBanner = $(`
            <div class="category-notice" 
                style="background-color: #f0f7f2; color: #2b4c38; padding: 10px 14px; border-left: 4px solid #7fb393; margin-top: 0.75rem; margin-bottom: 0.75rem; border-radius: 0 4px 4px 0; font-size: 0.9rem;">
                    Category set to <strong>${selectedValue}</strong>. Standard approval workflow applies.
            </div> 
            `);
    $(this).after($noticeBanner);

});