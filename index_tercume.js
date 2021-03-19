var sozluk = {
    'ana_sayfa': {
        'tr': 'Ana Sayfa',
        'en': 'Home',
    },
    'anasayfatitle': {
        'tr': 'Lütfullah Erkaya | Resmi Site',
        'en': 'Lütfullah Erkaya | Official Website',
    },

    "xox_oyunu": {
        'tr': 'XOX Oyunu',
        'en': 'Tic-Tac-Toe',
    },
    "bil_muh": {
        'tr': 'Bilgisayar Mühendisi',
        'en': 'Computer Engineer'
    },
    "hosgeldiniz": {
        'tr': 'Hoş Geldiniz',
        'en': 'Welcome'
    },
    "hosgeldiniz_p1": {
        'tr': 'Sizleri burada görebilmek gerçekten büyük bir onur. Şu an ziyadesiyle bahtiyar ve kıvanç doluyum.',
        'en': 'bb'
    },
    "hosgeldiniz_p2": {
        'tr': 'Ayakta kalmayın, hemen yukarıdaki gezinme çubuğundan sizler için hazırladığım, komik grafik seçenekli XOX oyunumun tadına bakabilirsiniz. Aşağıda ise yaptıklarıma ve yapacaklarıma ulaşabileceğiniz linkler var.',
        'en': 'bb'
    },
    "hosgeldiniz_p3": {
        'tr': 'Sarılmaya ihtiyacınız varsa eğer hemen ',
        'en': 'bb '
    },
    "hosgeldiniz_p3_asagi": {
        'tr': 'aşağıdayım.',
        'en': ' down.'
    },
    "hosgeldiniz_p3_sag": {
        'tr': 'sağdayım.',
        'en': 'right.'
    },
    "sarilbuton": {
        'tr': 'Sarıl',
        'en': 'Hug'
    },
    "yeterbuton": {
        'tr': 'Yeter',
        'en': 'Enough'
    },
    "sarilmasayisi": {
        'tr': 'Sarılma sayısı: ',
        'en': 'Amount of hugs: '
    },
    "benibulun": {
        'tr': 'Beni Bulun',
        'en': 'Enough'
    },
    "medium": {
        'tr': 'Burada yazılarım var.',
        'en': 'Enough'
    },
    "githublink": {
        'tr': 'Bu sitenin kaynak kodu',
        'en': 'Enough'
    },
    "github": {
        'tr': ' dahil küçük projelerim burada.',
        'en': 'Enough'
    },
    "linkedin": {
        'tr': 'Bana buradan ulaşabilirsiniz.',
        'en': 'Enough'
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
