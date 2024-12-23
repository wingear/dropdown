let data = [];
let placeholderTextDefault = "Сделайте свой выбор";
let placeholderTextSelected = "Нажмите сюда, чтобы изменить свой выбор";

$(function () {
    $(".dropdown__item")
        .each(function (i, el) {
            let type = $(this).data("type"),
                value = "";

            if (type === "text") {
                value = $(this).text();
            } else {
                value = $(this).data("value");
            }

            let elemData = {
                el: $(this),
                value: value
            };

            data.push(elemData);
        })
        .on("click", function () {
            $(".dropdown__selected")
                .html("")
                .append(
                    $(this)
                        .clone()
                        .addClass("dropdown__input")
                        .removeClass("dropdown__item")
                );
            closeDropList();
        });

    $(document).mouseup(function (e) {
        let div = $(".dropdown");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            closeDropList();
        }
    });

    $(".dropdown")
        .on("click", ".dropdown__input", function () {
            $(".dropdown__list").slideDown(300, function () {
                $(".dropdown__input").attr(
                    "placeholder",
                    "Введи в меня то, что ты ищешь..."
                );
            });
            $(".dropdown__value").removeClass("dropdown__value_closed");
        })
        .on("keyup", ".dropdown__input", function () {
            let text = $(this).val().trim(),
                found = false;

            if (text !== "") {
                let regexp = new RegExp(text, "i");

                data.forEach(function (item, i, arr) {
                    let res = item.value.search(regexp);
                    if (res === -1) {
                        $(item.el).hide();
                    } else {
                        found = true;
                        $(item.el).show();
                    }
                });
            } else {
                $(".dropdown__item").show();
                found = true;
            }

            if (!found) {
                $(".not-found").show();
            } else {
                $(".not-found").hide();
            }
        });
})

function closeDropList() {
	if (!$(".dropdown__value").hasClass("dropdown__value_closed")) {
		$(".dropdown__list").slideUp(200, function () {
			$(".dropdown__value").addClass("dropdown__value_closed");
			let text = placeholderTextDefault;
			if ($(".dropdown__selected").html()) {
				text = placeholderTextSelected;
			}
			$(".dropdown__input")
				.attr("placeholder", text)
				.val("");
			$(".dropdown__item").show();
		});
		$(".not-found").hide();
	}
}