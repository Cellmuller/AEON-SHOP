// SPアコーディオン
$(function () {
  $(".ac-parent").on("click", function () {
    $(this).next(".ac-child").slideToggle();
    $(this).toggleClass("open");
  });
});

// 位置情報取得
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        console.log("緯度: " + latitude + ", 経度: " + longitude);
      },
      function (error) {
        console.error("Error occurred. Code: " + error.code);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

document
  .getElementById("serch-location-btn")
  .addEventListener("click", getLocation);
document
  .getElementById("serch-location-sp-btn")
  .addEventListener("click", getLocation);

// 地方選択モーダル
$(document).ready(function () {
  $(".text-wrapper > div").on("click", function () {
    $(".location-selection-modal").fadeIn("slow");
  });

  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".location-selection-modal").length &&
      !$(event.target).closest(".text-wrapper > div").length
    ) {
      $(".location-selection-modal").fadeOut("slow");
    }
  });
});

// TOPスクロール
$(document).ready(function () {
  $('span:contains("マップ検索")')
    .css("cursor", "pointer")
    .click(function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
