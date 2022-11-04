const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
});
$(document).ready(function () {
    $('.add-to-cart-form').click(function (event) {
        event.preventDefault();
        const id = this[0].value;
        $.ajax({
            type: "POST",
            url: "/add-to-cart",
            data: { id: id },
            dataType: "json",
            success: function (res) {
                if (res.status == 200) {
                    const quantity = document.getElementById('total-quantity');
                    quantity.textContent = res.totalQuantity;
                }
            }
        });
    });
})

$('.offer-item').click(function () {
    const id = $(this).data('id');
    $.ajax({
        type: "POST",
        url: "/item-details",
        dataType: "json",
        data: { id: id },
        success: function (res) {
            $('.detail-item-img img').attr('src', `/upload/${res.data[0].image}`);

            $('.detail-item-description h4').text(`${res.data[0].description}`);

            $('#food-detail-modal .detail-item-container .detail-item-content .block-title').text(`${res.data[0].name}`);

            $('#food-detail-modal .detail-item-container .detail-item-content .detail-item-description ul li span').text(`${res.data[0].details}`);

            $('#food-detail-modal .detail-item-container .detail-item-content .detail-item-description ul li:last-child span').text(`Còn lại: ${res.data[0].quantity} phần`);

            $('#food-detail-modal .detail-item-container .detail-item-content .detail-item-price span').text(`${formatter.format(res.data[0].price)}`);

            $('#food-detail-modal').addClass('modal-open');
        },

    });
});
// $(document).ready(function() {
//     function itemDetail(_id) {
//         var id = _id;
//         $(document).ready(function() {
//             $.ajax({
//                 type: "GET",
//                 url: "/item-details?id="+id,
//                 success: function(res) {
//                     console.log(res);
//                     $('#food-detail-modal').addClass('modal-open');
//                 },

//             });
//         });
//     }
// });

function closeModal() {
    $('#food-detail-modal').removeClass('modal-open');
}