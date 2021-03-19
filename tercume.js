if (!(sessionStorage.getItem("suankidil"))) {
    sessionStorage.setItem("suankidil", "tr");
}


function kugusdigiliginegeCegevigir(dizge) {
    if (dizge) {
        // go'ları kendim de ekleyebilirdim de o zaman anahtarları "" yapmam gerekirdi.
        // bir de set es6'dan sonra gelmiş ve hashtable de değilmiş zaten neyse
        // değersiz hashtable yok galiba js'de
        const SESLI_HARFLER = {
            "a":"aga", "e":"ege", "ı":"ıgı", "i":"igi",
            "o":"ogo", "ö":"ögö", "u":"ugu", "ü":"ügü",
            "A":"Aga", "E":"Ege", "I":"Igı", "İ":"İgi",
            "O":"Ogo", "Ö":"Ögö", "U":"Ugu", "Ü":"Ügü"
        }
        // kelimelere ayırıyoruz ki XOX Oyunu -> XOGOX Oyugunugu diye çevrilsin, XOgoX Oyugunugu diye değil.
        let kelimeler = dizge.split(" ");

        let nihaiDizge = "";
        for (let k = 0; k < kelimeler.length; ++k) {
            let buyukHarflidir = kelimeler[k].toUpperCase() === kelimeler[k];
            let i = 0;
            while (i < kelimeler[k].length) {
                if (kelimeler[k][i] in SESLI_HARFLER) {
                    kelimeler[k] = kelimeler[k].slice(0, i) +
                        (buyukHarflidir ? SESLI_HARFLER[kelimeler[k][i]].toUpperCase() : SESLI_HARFLER[kelimeler[k][i]]) +
                        ((i+1 < kelimeler[k].length) ? kelimeler[k].slice(i+1) : "");
                    i += 2;
                }
                i++;
            }
            if (kelimeler[k] === "") {
                nihaiDizge += " ";
            } else {
                nihaiDizge += kelimeler[k];
            }
            if (kelimeler.length > k+1) {
                nihaiDizge += " ";
            }
        }

        return nihaiDizge;
    } else {
        return "";
    }
}

function sozlugeBak(anahtar, dil) {
    if (sozluk[anahtar[dil]] === "") {
        return "";
    }
    if (dil !== "kd") {
        return sozluk[anahtar][dil] || "N/A";
    } else {
        return kugusdigiliginegeCegevigir(sozluk[anahtar]["tr"]) || "N/A";
    }
}

function tercumeEt(dil) {
    document.getElementById("dil-resmi-bir").src = dil + ".png";
    document.getElementById("dil-resmi-iki").src = dil + ".png";
    $("[data-tercume]").each(function () {
        var anahtar = $(this).data('tercume');
        if (sozluk[anahtar][dil] === "") {
            $(this).html(sozluk[anahtar][dil]);
        } else {
            $(this).html(sozlugeBak(anahtar, dil));
        }
    });
    if (dil === "kd") {
        $('html').css({"font-family": "'Truculenta', sans-serif"});
        $('body').css({"font-family": "'Truculenta', sans-serif"});
        if (document.getElementById("giris-baslik-nam")) {
            document.getElementById("giris-baslik-nam").className = "stroke-yok";
            document.getElementById("giris-baslik-isim").className = "stroke-yok";
        }

    } else {
        $('html').css({"font-family": "'Poppins', sans-serif"});
        $('body').css({"font-family": "'Poppins', sans-serif"});
        if (document.getElementById("giris-baslik-nam")) {
            document.getElementById("giris-baslik-nam").className = "";
            document.getElementById("giris-baslik-isim").className = "";
        }

    }

    $("html").attr("lang", dil);
    sessionStorage.setItem("suankidil", dil);

}
function giristeDilAyarla() {
    if (sessionStorage.getItem("suankidil") && sessionStorage.getItem("suankidil") !== "tr") {
        tercumeEt(sessionStorage.getItem("suankidil"));
    }
}

