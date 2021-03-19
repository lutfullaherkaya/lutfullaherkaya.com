var sozluk = {
    'ana_sayfa': {
        'tr': 'Ana Sayfa',
        'en': 'Home',
    },
    "xox_oyunu": {
        'tr': 'XOX Oyunu',
        'en': 'Tic-Tac-Toe',
    },
    "zorluk_duzeyi": {
        'tr': 'Zorluk Düzeyi',
        'en': 'Tic-Tac-Toe',
    },

    "zor0": {
        'tr': 'Tüm tuşlara basan bot',
        'en': 'Tic-Tac-Toe',
    },
    "zor0_20": {
        'tr': 'Akıl dağıtılırken şemsiye tutmuş bot',
        'en': 'Tic-Tac-Toe',
    },
    "zor20_40": {
        'tr': 'Çocuk oyuncağı bot',
        'en': 'Tic-Tac-Toe',
    },
    "zor40_55": {
        'tr': 'Vasat bot',
        'en': 'Tic-Tac-Toe',
    },
    "zor55_70": {
        'tr': 'Yürek yemiş bot',
        'en': 'Tic-Tac-Toe',
    },
    "zor70_80": {
        'tr': 'Kulağını oynatabilen bot',
        'en': 'Tic-Tac-Toe',
    },
    "zor80_100": {
        'tr': '8 yıl tekvando 13 yıl muay thai yapmış bot',
        'en': 'Tic-Tac-Toe',
    },
    "zor100": {
        'tr': 'Kendini aşmış, zinhar yenilmez bot',
        'en': 'Tic-Tac-Toe',
    },

    "grafiksecimi": {
        'tr': 'Grafik Seçimi',
        'en': 'Tic-Tac-Toe',
    },
    "yenidenbasla": {
        'tr': 'Yeniden Başla',
        'en': 'Tic-Tac-Toe',
    },
    "galibiyet": {
        'tr': 'Galibiyet',
        'en': 'Tic-Tac-Toe',
    },
    "maglubiyet": {
        'tr': 'Mağlubiyet',
        'en': 'Tic-Tac-Toe',
    },
    "beraberiyet": {
        'tr': 'Beraberiyet',
        'en': 'Tic-Tac-Toe',
    },

    // grafik isimlerini tek tek yazmadim merak etmeyin dsfasdf script yazdim. tabii tum bu sozluk seysi tamamen issizlik, bunu da kabul etmek lazim. zaten tum bu site kulliyen issizlik. kimse bakmayacak zaten bunlara .d ama su soru insanin aklina geliyor, sanat toplum için midir, sanat sanat için midir?
    "klasikx": {
        'tr': 'Klasik X',
        'en': 'en',
    },
    "klasiko": {
        'tr': 'Klasik O',
        'en': 'en',
    },
    "diskokedi": {
        'tr': 'Diskocu Kedi',
        'en': 'en',
    },
    "halaykedi": {
        'tr': 'Halay Çeken Kedi',
        'en': 'en',
    },
    "biyiklikedi": {
        'tr': 'Bıyıklı Kedi',
        'en': 'en',
    },
    "aynalikedi": {
        'tr': 'Aynada Kedi',
        'en': 'en',
    },
    "epilepsikopek": {
        'tr': 'Epilepsi Köpek',
        'en': 'en',
    },
    "danscibebek": {
        'tr': 'Dansçı Bebek',
        'en': 'en',
    },
    "mahzunkermit": {
        'tr': 'Mahzun Kermit',
        'en': 'en',
    },
    "polatalemdar": {
        'tr': 'Polat Alemdar',
        'en': 'en',
    },
    "istebu": {
        'tr': 'İşte bu',
        'en': 'en',
    },
    
    "sunus": {
        'tr': 'XOX oyunumun nihai formunu sizlere iftiharla sunuyorum. Bu oyun nice alın terleriyle telif edilmiş ve önünüze konmuştur. Bu emeklere birinci elden tanık olmak ve şu icra ettiğim sanatın kodlarını incelemek isterseniz ',
        'en': 'Tic-Tac-Toe',
    },
    "bulinke": {
        'tr': 'bu linke',
        'en': 'Tic-Tac-Toe',
    },
    "tiklayabilirsiniz": {
        'tr': 'tıklayabilirsiniz.',
        'en': 'Tic-Tac-Toe',
    },
    "yillaronce": {
        'tr': 'XOX oyununun yıllar önce yazdığım ',
        'en': 'Tic-Tac-Toe',
    },
    "ilkelsurum": {
        'tr': 'ilkel sürümü',
        'en': 'Tic-Tac-Toe',
    },
    "ve": {
        'tr': ' ve ',
        'en': 'Tic-Tac-Toe',
    },
    "kaynakkodlari": {
        'tr': 'kaynak kodları',
        'en': 'Tic-Tac-Toe',
    },
    "icintiklayabilirsiniz": {
        'tr': ' için tıklayabilirsiniz.',
        'en': 'Tic-Tac-Toe',
    },
    "kazandin": {
        'tr': "Kazandınız :')",
        'en': 'Tic-Tac-Toe',
    },
    "kaybettin": {
        'tr': "Öldün :'(",
        'en': 'Tic-Tac-Toe',
    },
    "berabere": {
        'tr': 'Berabere :|',
        'en': 'Tic-Tac-Toe',
    },
    "iletisim": {
        'tr': 'İletişim',
        'en': 'Contact'
    },
    "telif": {
        'tr': ' 2021 - Tüm hakları saklıdır.',
        'en': ' 2021 - All rights reserved.'
    }
};


if (!(sessionStorage.getItem("suankidil"))) {
    sessionStorage.setItem("suankidil", "tr");
}
function tercumeEt(dil) {
    document.getElementById("dil-resmi-bir").src = dil + ".png";
    document.getElementById("dil-resmi-iki").src = dil + ".png";
    $("[data-tercume]").each(function () {
        var key = $(this).data('tercume');
        $(this).html(sozluk[key][dil] || "N/A");
    });
    $("html").attr("lang", dil);
    sessionStorage.setItem("suankidil", dil);
}

function giristeDilAyarla() {
    if (sessionStorage.getItem("suankidil") && sessionStorage.getItem("suankidil") !== "tr") {
        tercumeEt(sessionStorage.getItem("suankidil"));
    }
    
}
