// SPアコーディオン
$(function () {
  $(".ac-parent").on("click", function () {
    // すべてのアコーディオンを閉じる
    $(".ac-child").not($(this).next(".ac-child")).slideUp();
    $(".ac-parent").not($(this)).removeClass("open");

    // クリックしたアコーディオンをトグルする
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

//地方選択モーダル
$(document).ready(function () {
  // クリックでモーダルを開く
  $(".text-wrapper > div").on("click", function (e) {
    e.stopPropagation();
    $(".location-selection-modal").fadeIn("slow");
  });

  // ドキュメント全体をクリックした場合、モーダルを閉じる
  $(document).on("click", function () {
    $(".location-selection-modal").fadeOut("slow");
  });

  // モーダル内のリスト項目をクリックした場合の処理
  $(".map .location-selection-modal ul li").on("click", function () {
    $(".results-area").fadeIn();
  });
  // モーダル内のリスト項目をクリックした場合の処理
  $("#serch-location-btn").on("click", function () {
    $(".results-area").fadeIn();
  });

  // #serch-btnをクリックした場合の処理
  $("#serch-btn").on("click", function (e) {
    e.preventDefault();

    // プルダウンの選択値を取得
    const selectedPrefecture = $(".pulldown-wrapper select").val();

    // プルダウンで「選択してください」が選択されている場合は何もせず、
    // 都道府県が選択されている場合のみresults-areaを表示
    if (selectedPrefecture !== "選択してください") {
      $(".results-area").fadeIn();
      $("#message").text("");
    } else {
      $("#message").text("都道府県を選択してください。");
    }
  });

  // SP
  $(".ac-child ul li ").on("click", function () {
    $(".results-area").fadeIn();
  });
});

// Mapまでスクロール
$(document).ready(function () {
  $('span:contains("マップ検索")')
    .css("cursor", "pointer")
    .click(function () {
      var target = $(".map-area");
      var position = target.offset().top;

      $("html, body").animate({ scrollTop: position }, "slow");
    });
});

//バリデーションメッセージ
$(document).ready(function () {
  $("#serch-btn").on("click", function (e) {
    e.preventDefault();
    if ($("select").val() === "選択してください") {
      $("#message").text("※都道府県を選択してください").show();
    } else {
      $("#message").hide();
    }
  });
});

// 文字制御
$(document).ready(function () {
  function checkWindowSize() {
    if ($(window).width() <= 768) {
      $(".results-area .contents .cards .card > div > p span").text(
        "エリア検索"
      );
    } else {
      $(".results-area .contents .cards .card > div > p span").text(
        "マップ検索"
      );
    }
  }
  checkWindowSize();
  $(window).resize(checkWindowSize);
});

// 該当店舗なし、位置情報未取得モーダル制御
$(document).ready(function () {
  $(".close-button").on("click", function () {
    $(".no-store-modal , .location-info-modal, .modal-bg").fadeOut();
  });
});

// ボタンアイコン制御
$(document).ready(function () {
  $(".no-store-modal .contents > .flex > div > a").hover(
    function () {
      const img = $(this).find("img");
      $(img).data("original-src", $(img).attr("src"));
      const newSrc = $(this).data("hover-image");
      $(img).attr("src", newSrc);
    },
    function () {
      const img = $(this).find("img");
      $(img).attr("src", $(img).data("original-src"));
    }
  );
});
$(document).ready(function () {
  $(".cta-area .flex > div > a").hover(
    function () {
      const img = $(this).find("img");
      $(img).data("original-src", $(img).attr("src"));
      const newSrc = $(this).data("hover-image");
      $(img).attr("src", newSrc);
    },
    function () {
      const img = $(this).find("img");
      $(img).attr("src", $(img).data("original-src"));
    }
  );
});
// resultまでスクロール
$(document).ready(function () {
  $("html, body").animate(
    {
      scrollTop: $(".results-area").offset().top,
    },
    1000
  );
});
