function grafikCssAyari(e) {
    let grafikKutucuklari = document.getElementsByClassName("form-control");
    for (let i = 0; i < grafikKutucuklari.length; ++i) {
        if (e.matches) {
            grafikKutucuklari[i].className = "form-control";
        } else {
            grafikKutucuklari[i].className = "form-control form-control-lg";
        }
    }
}

const mediaQuery = window.matchMedia("(max-width: 992px)");
mediaQuery.addEventListener("change", grafikCssAyari);
grafikCssAyari(mediaQuery);

function Oyun() {
    let buOyun = this;
    // değişken isimlerinin kringliği bu kodları yazarken ne kadar kafayı yediğimi bir nebze gösteriyor.
    this.herSeyiHazirEtVeOyunuMarsYapBirZahmetCanimsin = function() {
        // sesleri calarken inmesini beklememek icin, grafik degistirince hakeza
        let preload = async function() {
            let tumGrafikler = [
                'resimler/aynalikedi.webp',
                'resimler/biyiklikedi.jpg',
                'resimler/bos.png',
                'resimler/danscibebek.webp',
                'resimler/diskokedi.gif',
                'resimler/epilepsikopek.webp',
                'resimler/halaykedi.webp',
                'resimler/istebu.webp',
                'resimler/mahzunkermit.webp',
                'resimler/o.png',
                'resimler/polatalemdar.webp',
                'resimler/x.png'
            ];
            let tumSesler = [
                'sesler/akasyaduragisasirma.mp3',
                'sesler/bebek.mp3',
                'sesler/berabere.mp3',
                'sesler/disk.mp3',
                'sesler/enzormod.mp3',
                'sesler/finishher.mp3',
                'sesler/finishhim.mp3',
                'sesler/hav.mp3',
                'sesler/huzunlu.mp3',
                'sesler/istebu.mp3',
                'sesler/kazandin.mp3',
                'sesler/kazandinzafersarkisi.mp3',
                'sesler/miyav1.mp3',
                'sesler/miyav2.mp3',
                'sesler/miyav3.mp3',
                'sesler/miyav4.mp3',
                'sesler/oldun.mp3',
                'sesler/oses.mp3',
                'sesler/xses.mp3',
                'sesler/yenidenbasla.mp3',
                'sesler/uzgunmiyav.mp3'
            ];
            for (let i = 0; i < tumSesler.length; ++i) {
                var audio = new Audio(tumSesler[i]);
            }
            for (let i = 0; i < tumGrafikler.length; ++i) {
                var grafik = new Image();
                grafik.src = tumGrafikler[i];
            }
        };
        preload();

        navigator.mediaSession.setActionHandler('play', function() {});
        navigator.mediaSession.setActionHandler('pause', function() {});

        // resmi suruklemeyi engelleme
        for (let u = 0; u < 3; ++u) {
            for (let o = 0; o < 3; ++o) {
                document.getElementById(u.toString()+o.toString()).ondragstart = function() { return false; };
            }
        }
        let butonResimleri = document.getElementsByClassName("btn-img-hucre");
        for (let i = 0; i < butonResimleri.length; ++i) {
            butonResimleri[i].ondragstart = function() { return false; };
        }
        document.getElementById("azses").ondragstart = function() { return false; };
        document.getElementById("cokses").ondragstart = function() { return false; };

        if (!buOyun.oyuncu.ilkBaslar) {
            buOyun.bot.hamleYap(buOyun.bot.dogumTarihim);
        }

    };
    this.sallaAbiSalla = async function(eleman, ms=2000) {
        eleman.classList.add("salla");
        await uyuUyuTekYaptiginUyumakZaten(ms);
        eleman.classList.remove("salla");
    }

    const dizilerEsittir = (a, b) =>
        a.length === b.length &&
        a.every((v, i) => v === b[i]);

    function uyuUyuTekYaptiginUyumakZaten(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    this.grafikler = {
        "klasikx" : "resimler/x.png",
        "klasiko" : "resimler/o.png",
        "diskokedi" : "resimler/diskokedi.gif",
        "epilepsikopek" : "resimler/epilepsikopek.webp",
        "danscibebek" : "resimler/danscibebek.webp",
        "mahzunkermit" : "resimler/mahzunkermit.webp",
        "polatalemdar" : "resimler/polatalemdar.webp",
        "aynalikedi" : "resimler/aynalikedi.webp",
        "istebu" : "resimler/istebu.webp",
        "halaykedi" : "resimler/halaykedi.webp",
        "biyiklikedi" : "resimler/biyiklikedi.jpg",
        "bos" : "resimler/bos.png"
    };
    this.miyavSesiSrc = function() {
        return "sesler/miyav"+(Math.floor(Math.random() * 4)+1).toString()+".mp3";
    }
    this.tiklamaSesEfektleri = {
        "klasikx" : "sesler/xses.mp3",
        "klasiko" : "sesler/oses.mp3",
        "diskokedi" : buOyun.miyavSesiSrc,
        "epilepsikopek" : "sesler/hav.mp3",
        "danscibebek" : "sesler/bebek.mp3",
        "mahzunkermit" : "sesler/huzunlu.mp3",
        "polatalemdar" : "sesler/disk.mp3",
        "aynalikedi" : "sesler/uzgunmiyav.mp3",
        "istebu" : "sesler/istebu.mp3",
        "halaykedi" : buOyun.miyavSesiSrc,
        "biyiklikedi": buOyun.miyavSesiSrc
    };

    this.grafik = {
        x: "klasikx",
        o: "klasiko",
        bos: "bos"
    };
    this.matris = [
        ["bos", "bos", "bos"],
        ["bos", "bos", "bos"],
        ["bos", "bos", "bos"]
    ]

    this.skorlar = {
        skorGalibiyet: 0,
        skorMaglubiyet: 0,
        skorBeraberiyet: 0
    };
    this.isaretinSahibi = function(isaret) {
        return (this.oyuncu.isaret === isaret) ? this.oyuncu : this.bot;
    };

    this.hucreSet = function(id, isaret, resimGrafikGuncelle=false) {
        this.matris[parseInt(id[0])][parseInt(id[1])] = isaret;
        document.getElementById(id).src = buOyun.grafikler[this.grafik[isaret]];

        let siniflar = document.getElementById(id).className.split(" ");
        document.getElementById(id).className = siniflar[0] + (isaret === "bos" ? " bos" : " dolu") + " hucre-animasyon-yok";

        if (isaret === this.bot.isaret() && resimGrafikGuncelle === false) {
            this.bot.hamleSolmaEtkisi(id);
        }
    }

    this.agaOyunBittiMiKontrolEtEgerBittiyseBitmeMesajiFalanGosterDarkSoulsEfektliMefektliEyvallah = function() {
        let bitis = false;
        let isaretler = ["x", "o"];
        for (let isrt = 0; isrt < 2; ++isrt) {
            let kazananSira = isaretler[isrt]+isaretler[isrt]+isaretler[isrt];
            // normalde kazanma durumunu belirledigi anda break yapacaktim
            // ama ve lakin zaten yapacagi topu topu 8 tane islem, O(1) yani havalı terimlerle ifade etmek gerekirse :P
            for (let i = 0; i < 3; ++i) {
                // satir
                if (buOyun.matris[i].join("") === kazananSira) {
                    bitis = buOyun.isaretinSahibi(isaretler[isrt]).benimAdim;
                }
                // sutun
                if (buOyun.matris[0][i]+buOyun.matris[1][i]+buOyun.matris[2][i] === kazananSira) {
                    bitis = buOyun.isaretinSahibi(isaretler[isrt]).benimAdim;
                }
            }
            // capraz
            if ((buOyun.matris[0][0]+buOyun.matris[1][1]+buOyun.matris[2][2]) === kazananSira) {
                bitis = buOyun.isaretinSahibi(isaretler[isrt]).benimAdim;
            }
            if ((buOyun.matris[0][2]+buOyun.matris[1][1]+buOyun.matris[2][0]) === kazananSira) {
                bitis = buOyun.isaretinSahibi(isaretler[isrt]).benimAdim;
            }
        }
        if (bitis === false) {
            if (buOyun.oyuncu.eskiHamleler.length + buOyun.bot.eskiHamleler.length === 9) {
                bitis = "berabere";
            } else {
                return false;
            }
        }
        let bitisler = {
            oyuncu: {yazianahtari: "kazandin", skorTablosu:"skorGalibiyet", ses:"sesler/kazandinzafersarkisi.mp3"},
            bot: {yazianahtari: "kaybettin", skorTablosu:"skorMaglubiyet", ses:"sesler/oldun.mp3"},
            berabere: {yazianahtari: "berabere", skorTablosu:"skorBeraberiyet", ses:"sesler/berabere.mp3"}
        };
        document.getElementById(bitisler[bitis].skorTablosu).innerHTML = (++this.skorlar[bitisler[bitis].skorTablosu]).toString();
        document.getElementById(bitisler[bitis].skorTablosu+"Kucuk").innerHTML = (this.skorlar[bitisler[bitis].skorTablosu]).toString();
        buOyun.sesCal(bitisler[bitis].ses, true);
        if (bitis === "oyuncu") {
            buOyun.sesCal("sesler/kazandin.mp3");
        }
        if (bitis === "bot") {
            document.getElementById("oyun-bitme-mesaji").className = "oldun";
        }
        document.getElementById("oyun-bitme-mesaji").setAttribute("data-tercume", bitisler[bitis].yazianahtari);
        let simdikidil = sessionStorage.getItem("suankidil") ? sessionStorage.getItem("suankidil") : "tr";
        document.getElementById("oyun-bitme-mesaji").innerHTML = sozlugeBak(bitisler[bitis].yazianahtari, simdikidil);
        document.getElementById("winningMessage").className = "winning-message show";


        return true;


    };

    this.sesKaydirgac = document.getElementById("sesRange");
    this.sesKaydirgac.oninput = function() {
        buOyun.oyuncu.interactYapti = true;
        if (buOyun.bitisSesi) {
            buOyun.bitisSesi.volume = this.value;
        }
        for (let i in buOyun.calinanSesler) {
            // check if the property/key is defined in the object itself, not in parent
            if (buOyun.calinanSesler.hasOwnProperty(i)) {
                buOyun.calinanSesler[i].volume = this.value;
            }
        }
    };
    this.calinanSesler = [];
    this.bitisSesi = null;
    this.sesCal = function(url, bitisSesiCal=false) {
        if (!bitisSesiCal) {
            let sesId = ((new Date()).getTime()).toString();
            let ses = new Audio(url);
            ses.addEventListener("ended", function() {
                if (sesId in buOyun.calinanSesler) {
                    delete buOyun.calinanSesler[sesId];
                }
            });
            ses.volume = buOyun.sesKaydirgac.value;
            buOyun.calinanSesler[sesId] = ses;
            ses.play();
        } else {
            if (this.bitisSesi) {
                this.bitisSesi.pause();
            }
            this.bitisSesi = new Audio(url);
            this.bitisSesi.volume = buOyun.sesKaydirgac.value;
            this.bitisSesi.play();
        }

    };

    this.hamleSesiCal = function(isrt) {
        let tiklamaSesiSrc = buOyun.tiklamaSesEfektleri[buOyun.grafik[isrt]];
        if (typeof tiklamaSesiSrc === 'function') {
            tiklamaSesiSrc = tiklamaSesiSrc();
        }
        buOyun.sesCal(tiklamaSesiSrc);
    }

    this.oyuncu = {
        benimAdim: "oyuncu",
        isaret: "o",
        eskiHamleler: [],
        ilkBaslar: false,
        interactYapti: false,
        telefondanGiriyor: navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i),
        tiklama: async function (id) {
            this.interactYapti = true;
            if (!buOyun.bot.hamleYapiyor) {
                let i = parseInt(id[0]);
                let j = parseInt(id[1]);
                if (buOyun.matris[i][j] === "bos") {
                    buOyun.bot.hamleYapiyor = true;
                    buOyun.hamleSesiCal(this.isaret);
                    buOyun.hucreSet(id, this.isaret);
                    this.eskiHamleler.push([i,j]);

                    if (!buOyun.agaOyunBittiMiKontrolEtEgerBittiyseBitmeMesajiFalanGosterDarkSoulsEfektliMefektliEyvallah()) {
                        let dogumTarihi = buOyun.bot.dogumTarihim;
                        // direk buOyun.bot.dogumTarihim'i gönderince fonksiyona, ölecek olan botun doğum tarihini almıyor.
                        // bunun sebebine dair tahminim buOyun.bot.dogumTarihim gönderince pass by reference yapıyoruz,
                        // bundan dolayı daha geç değeri alınmış oluyor.
                        buOyun.bot.hamleYap(dogumTarihi);
                        buOyun.agaOyunBittiMiKontrolEtEgerBittiyseBitmeMesajiFalanGosterDarkSoulsEfektliMefektliEyvallah();
                    }

                }
            }

        },

        fareyiGezdirme: function hover(element, id) {
            if (!buOyun.oyuncu.telefondanGiriyor) {
                if (buOyun.matris[parseInt(id[0])][parseInt(id[1])] === "bos") {
                    let siniflar = document.getElementById(id).className.split(" ");
                    document.getElementById(id).src = buOyun.grafikler[buOyun.grafik[buOyun.oyuncu.isaret]];
                    document.getElementById(id).className = siniflar[0] + " bos " + siniflar[3];
                }
            }
        },

        fareyiCekme: function(element, id) {
            if (!buOyun.oyuncu.telefondanGiriyor) {
                if (buOyun.matris[parseInt(id[0])][parseInt(id[1])] === "bos") {
                    document.getElementById(id).src = buOyun.grafikler.bos;
                }
            }
        }
    };

    this.zorlukKaydirgac = document.getElementById("zorlukDuzeyiRange");
    this.zorlukKaydirgac.oninput = function() {
        buOyun.oyuncu.interactYapti = true;
        let zorlukYazi = document.getElementById("zorlukDuzeyiYazi");
        let zorluk = this.value;
        let simdikidil = sessionStorage.getItem("suankidil") ? sessionStorage.getItem("suankidil") : "tr";
        let zorlukSozlukAnahtari;
        if (zorluk === 0) {
            zorlukSozlukAnahtari = "zor0";
        } else if (zorluk < 20) {
            zorlukSozlukAnahtari = "zor0_20";
        } else if (zorluk < 40) {
            zorlukSozlukAnahtari = "zor20_40";
        } else if (zorluk <= 55) {
            zorlukSozlukAnahtari = "zor40_55";
        } else if (zorluk < 70) {
            zorlukSozlukAnahtari = "zor55_70";
        } else if (zorluk < 80) {
            zorlukSozlukAnahtari = "zor70_80";
        } else if (zorluk < 100) {
            zorlukSozlukAnahtari = "zor80_100";
        } else {
            zorlukSozlukAnahtari = "zor100";
            buOyun.sesCal("sesler/enzormod.mp3");
            buOyun.sallaAbiSalla(document.getElementById("xox-dashboard"))
            buOyun.sallaAbiSalla(document.getElementById("xox-baslik"))
            buOyun.sallaAbiSalla(document.getElementById("xox-tablosu"))
        }
        zorlukYazi.setAttribute("data-tercume", zorlukSozlukAnahtari);
        zorlukYazi.innerHTML = sozlugeBak(zorlukSozlukAnahtari, simdikidil);
    };

    this.bot = {
        benimAdim: "bot",
        dogumTarihim: (new Date()).getTime().toString(),
        hamleYapiyor: false,
        eskiHamleler: [],

        isaret: function() {
            return (buOyun.oyuncu.isaret === "o") ? "x" : "o";
        },

        hamleSolmaEtkisi: async function(id) {
            let siniflar = document.getElementById(id).className.split(" ");
            document.getElementById(id).className = siniflar[0] + " " + siniflar[1] + " hucre-animasyon";
            await uyuUyuTekYaptiginUyumakZaten(1000);
            document.getElementById(id).className = siniflar[0] + " " + siniflar[1] + " hucre-animasyon-yok";

        },
        kazanmaBloklamaZorlugu: function() {
            if (buOyun.zorlukKaydirgac.value === 0) {
                return 0;
            } else if (buOyun.zorlukKaydirgac.value < 40) {
                return 50 + Math.floor(buOyun.zorlukKaydirgac.value * 1.25);
            } else {
                return 100;
            }
        },
        digerHamleZorlugu: function() {
            if (buOyun.zorlukKaydirgac.value <= 55) {
                return 0;
            } else if (buOyun.zorlukKaydirgac.value < 100) {
                return 20 + Math.floor((buOyun.zorlukKaydirgac.value - 56) * 1.818);
            } else {
                return 100;
            }
        },

        kazanmaKordinatYardimci: function(isrt) {
            let kazananSira = ["bos"+isrt+isrt, isrt+"bos"+isrt, isrt+isrt+"bos"];
            for (let i = 0; i < 3; ++i) {
                // satir
                let j = kazananSira.indexOf(buOyun.matris[i].join(""));
                if (j !== -1) {
                    return [i, j];
                }
                // sutun
                j = kazananSira.indexOf(buOyun.matris[0][i]+buOyun.matris[1][i]+buOyun.matris[2][i]);
                if (j !== -1) {
                    return [j, i];
                }
            }
            // capraz
            let j = kazananSira.indexOf(buOyun.matris[0][0]+buOyun.matris[1][1]+buOyun.matris[2][2]);
            if (j !== -1) {
                return [j, j];
            }
            j = kazananSira.indexOf(buOyun.matris[0][2]+buOyun.matris[1][1]+buOyun.matris[2][0]);
            if (j !== -1) {
                return [j, 2-j];
            }
            return false;
        },
        hamleler: [
            // kazanma hamlesi
            function() {
                if (Math.floor(Math.random() * 101) <= buOyun.bot.kazanmaBloklamaZorlugu()) {
                    return buOyun.bot.kazanmaKordinatYardimci(buOyun.bot.isaret());
                } else {
                    return false;
                }
            },
            // rakibi bloklama hamlesi
            function() {
                if (Math.floor(Math.random() * 101) <= buOyun.bot.kazanmaBloklamaZorlugu()) {
                    return buOyun.bot.kazanmaKordinatYardimci(buOyun.oyuncu.isaret);
                } else {
                    return false;
                }
            },
            // 2000 iq hamle
            function() {
                if (Math.floor(Math.random() * 101) <= buOyun.bot.digerHamleZorlugu()) {
                    // kaynak: https://www.wikihow.com/Win-at-Tic-Tac-Toe
                    if (buOyun.oyuncu.ilkBaslar) {
                        // oyuncu koseden basladiysa
                        if (dizilerEsittir(buOyun.oyuncu.eskiHamleler[0], [0,0]) ||
                            dizilerEsittir(buOyun.oyuncu.eskiHamleler[0], [0,2]) ||
                            dizilerEsittir(buOyun.oyuncu.eskiHamleler[0], [2,0]) ||
                            dizilerEsittir(buOyun.oyuncu.eskiHamleler[0], [2,2])) {
                            if (buOyun.bot.eskiHamleler.length === 0) {
                                return [1, 1];
                            }
                            else if (buOyun.bot.eskiHamleler.length === 1) {
                                // kenara koyacakmissin 2. hamlede wikihowa gore sjjdjsdj
                                let kenarlar = [[0,1], [1,0], [1,2], [2,1]]
                                for (let k = 0; k < kenarlar.length; ++k) {
                                    if (buOyun.matris[kenarlar[k][0]][kenarlar[k][1]] === "bos") {
                                        return kenarlar[k];
                                    }
                                }
                            } else if (buOyun.bot.eskiHamleler.length === 2) {
                                // sapan hamlesine karsi onlem, yine kendim kesfettim. 3. yenisim botumu
                                // x _ _
                                // _ _ x
                                // _ x
                                let htable = {
                                    "1001":"00",
                                    "0110":"00",
                                    "0112":"02",
                                    "1201":"02",
                                    "1221":"22",
                                    "2112":"22",
                                    "1021":"20",
                                    "2110":"20"
                                };
                                let tehlikeliKose = htable[buOyun.oyuncu.eskiHamleler[1][0].toString()+buOyun.oyuncu.eskiHamleler[1][1].toString()+
                                buOyun.oyuncu.eskiHamleler[2][0].toString()+buOyun.oyuncu.eskiHamleler[2][1].toString()];
                                if (tehlikeliKose) {
                                    let tehlikeliKoseKordinat = [parseInt(tehlikeliKose[0]),parseInt(tehlikeliKose[1])];
                                    if (buOyun.matris[tehlikeliKoseKordinat[0]][tehlikeliKoseKordinat[1]] === "bos") {
                                        return tehlikeliKoseKordinat;
                                    }
                                }
                            }
                        } // oyuncu ortadan baslarsa
                        else if ((buOyun.matris[1][1] === buOyun.oyuncu.isaret) && buOyun.bot.eskiHamleler.length === 0) {
                            return [0,0];
                        } // oyuncu kenardan baslarsa
                        else {
                            if (buOyun.bot.eskiHamleler.length === 0) {
                                return [1,1];
                            } else if (buOyun.bot.eskiHamleler.length === 1) {

                                // wikihowda olmayan olasilik:
                                // _ x _ böyle yaparsan x olarak, kesin kazandın. bunu engelleme yöntemi sol uste koymak
                                // x _ _ aşağıda var çözüm.
                                // _ _ _
                                let htable = {
                                    "1001":"00",
                                    "0110":"00",
                                    "0112":"02",
                                    "1201":"02",
                                    "1221":"22",
                                    "2112":"22",
                                    "1021":"20",
                                    "2110":"20"
                                };
                                let tehlikeliKose = htable[buOyun.oyuncu.eskiHamleler[0][0].toString()+buOyun.oyuncu.eskiHamleler[0][1].toString()+
                                buOyun.oyuncu.eskiHamleler[1][0].toString()+buOyun.oyuncu.eskiHamleler[1][1].toString()];
                                if (tehlikeliKose) {
                                    let tehlikeliKoseKordinat = [parseInt(tehlikeliKose[0]),parseInt(tehlikeliKose[1])];
                                    if (buOyun.matris[tehlikeliKoseKordinat[0]][tehlikeliKoseKordinat[1]] === "bos") {
                                        return tehlikeliKoseKordinat;
                                    }
                                }

                                // yine wikihowda olmayan baska bir olasılık:
                                // 14 sayfalık tez buldum onda bile yok la bu durum sdfkjasdlfk
                                // _ _ _ böyle yaptıktan sonra sağ alta koyunca kazanıyorsun.
                                // _ _ x botuma karşı bu zaferi kazanmak beni çok üzdü.
                                // x _ _ botumun mükemmelliğinden şüphem yoktu çünkü eskiden.
                                // artık bir kez daha farkına vardım ki yalnız Allah mükemmeldir.
                                let koseler = [[0,0], [0,2], [2,0], [2,2]];
                                for (let k = 0; k < koseler.length; ++k) {

                                    if (buOyun.matris[koseler[k][0]][koseler[k][1]] === "bos") {
                                        // satırında ve sütununda rakip isaretten olması lazım
                                        if (buOyun.matris[koseler[k][0]].join("").length === 7) {

                                            // satir xbosbos olursa mesela 5 olur
                                            let sutun= "";
                                            for (let i = 0; i < 3; ++i) {
                                                sutun += buOyun.matris[i][koseler[k][1]];
                                            }
                                            if (sutun.length === 7) {
                                                return koseler[k];
                                            }
                                        }
                                    }
                                }


                                // wikihowda var
                                for (let k = 0; k < koseler.length; ++k) {
                                    if (buOyun.matris[koseler[k][0]][koseler[k][1]] === "bos") {
                                        return koseler[k];
                                    }
                                }

                            }
                        }
                    }
                    else {
                        // koseyle basla
                        if (buOyun.bot.eskiHamleler.length === 0) {
                            return [0,0];
                        }
                        else {
                            // oyuncu ortaya koyarsa
                            if (dizilerEsittir(buOyun.oyuncu.eskiHamleler[0], [1,1])) {
                                if (buOyun.bot.eskiHamleler.length === 1) {
                                    return [2,2];
                                }
                                else if (buOyun.bot.eskiHamleler.length === 2) {
                                    let koseler = [[0,0], [0,2], [2,0], [2,2]];
                                    for (let k = 0; k < koseler.length; ++k) {
                                        if (buOyun.matris[koseler[k][0]][koseler[k][1]] === "bos") {
                                            return koseler[k];
                                        }
                                    }
                                }
                            }
                            else { // oyuncu ortaya koymazsa
                                if (buOyun.bot.eskiHamleler.length === 1) {
                                    let koseler = [[0,2], [2,0], [2,2]];
                                    for (let k = 0; k < koseler.length; ++k) {
                                        if (buOyun.matris[koseler[k][0]][koseler[k][1]] === "bos") {
                                            if (Number.isInteger(koseler[k][0]/2) && Number.isInteger(koseler[k][1]/2)) {
                                                if (buOyun.matris[koseler[k][0]/2][koseler[k][1]/2] === "bos") {
                                                    return koseler[k];
                                                }
                                            }
                                        }
                                    }
                                } else if (buOyun.bot.eskiHamleler.length === 2) {
                                    let koseler = [[0,2], [2,0], [2,2]];
                                    for (let k = 0; k < koseler.length; ++k) {
                                        if (buOyun.matris[koseler[k][0]][koseler[k][1]] === "bos") {
                                            if (Number.isInteger(koseler[k][0]/2)
                                                && Number.isInteger(koseler[k][1]/2)
                                                && Number.isInteger(buOyun.bot.eskiHamleler[1][0]+koseler[k][0]/2)
                                                && Number.isInteger((buOyun.bot.eskiHamleler[1][1]+koseler[k][1])/2)) {

                                                if (buOyun.matris[koseler[k][0]][koseler[k][1]] === "bos" &&
                                                    buOyun.matris[koseler[k][0]/2][koseler[k][1]/2] === "bos" &&
                                                    buOyun.matris[(buOyun.bot.eskiHamleler[1][0]+koseler[k][0])/2][(buOyun.bot.eskiHamleler[1][1]+koseler[k][1])/2] === "bos") {
                                                    return koseler[k];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return false;
            },
            // rastgele hamle
            function() {
                let rastgeleHamleler = [];
                for (let i = 0; i < 3; ++i) {
                    for (let j = 0; j < 3; ++j) {
                        if (buOyun.matris[i][j] === "bos") {
                            rastgeleHamleler.push([i, j]);
                        }
                    }
                }
                return rastgeleHamleler[Math.floor(Math.random() * rastgeleHamleler.length)];
            }
        ],

        hamleYap: async function(dogumTarihi) {
            // doğum tarihi lazım çünkü bot hamle yaparken oyunu yeniden başlatınca hamlesini yeni oyunda tamamlıyor,
            // binaenaleyh sıkıntı çıkıyor. her bot kendi çöplüğünde ötmeli.
            this.hamleYapiyor = true;

            await uyuUyuTekYaptiginUyumakZaten(500);
            if (dogumTarihi !== this.dogumTarihim) {
                return; // bu bot öldü, yeni bot çok yaşa
            }

            let hamleId;
            for (let i = 0; i < this.hamleler.length; ++i) {
                let hamle = this.hamleler[i]();
                if (hamle) {
                    if (i === 0) {
                        await uyuUyuTekYaptiginUyumakZaten(200);
                        if (dogumTarihi !== this.dogumTarihim) {
                            return; // bu bot öldü, yeni bot çok yaşa
                        }
                        buOyun.sesCal("sesler/akasyaduragisasirma.mp3");
                        await uyuUyuTekYaptiginUyumakZaten(1100);
                        if (dogumTarihi !== this.dogumTarihim) {
                            return; // bu bot öldü, yeni bot çok yaşa
                        }
                    }
                    this.eskiHamleler.push(hamle);
                    hamleId = hamle.join("");
                    break;
                }
            }

            buOyun.hucreSet(hamleId, this.isaret());
            await uyuUyuTekYaptiginUyumakZaten(300);
            if (buOyun.oyuncu.interactYapti) {
                buOyun.hamleSesiCal(this.isaret());
            }
            if (!buOyun.agaOyunBittiMiKontrolEtEgerBittiyseBitmeMesajiFalanGosterDarkSoulsEfektliMefektliEyvallah()) {
                if (this.kazanmaKordinatYardimci(buOyun.oyuncu.isaret)) {
                    if (Math.floor(Math.random() * 2) === 1) {
                        buOyun.sesCal("sesler/finishhim.mp3");
                    } else {
                        buOyun.sesCal("sesler/finishher.mp3");
                    }
                }
            }
            await uyuUyuTekYaptiginUyumakZaten(300);
            if (dogumTarihi !== this.dogumTarihim) {
                return; // bu bot öldü, yeni bot çok yaşa
            }

            this.hamleYapiyor = false;
        },


    }

    this.grafikDegistir = function(isrt) {
        buOyun.oyuncu.interactYapti = true;

        let grafik = document.getElementById("grafikler"+isrt).value;
        buOyun.grafik[isrt] = grafik;
        document.getElementById("tekrar"+ isrt.toUpperCase() +"Buton").src = buOyun.grafikler[grafik];
        document.getElementById("oyunBitis"+isrt.toUpperCase()+"Buton").src = buOyun.grafikler[grafik];

        let eskiHamleler = buOyun.isaretinSahibi(isrt).eskiHamleler;
        for (let i = 0; i < eskiHamleler.length; ++i) {
            buOyun.hucreSet(eskiHamleler[i][0].toString() + eskiHamleler[i][1].toString(), oyun.matris[eskiHamleler[i][0]][eskiHamleler[i][1]], true);
        }

        let digerIsrt = (isrt === "x") ? "o" : "x";
        let grafikDropDownSatirlar = document.getElementsByClassName(digerIsrt+"GrafikDegistir");
        for (let i = 0; i < grafikDropDownSatirlar.length; ++i) {
            grafikDropDownSatirlar[i].className = digerIsrt+"GrafikDegistir";
            if (grafikDropDownSatirlar[i].value === grafik) {
                grafikDropDownSatirlar[i].className = digerIsrt+"GrafikDegistir gizli";
            }
        }
    }

    this.yenidenBaslat = function(isrt) {
        buOyun.oyuncu.interactYapti = true;
        for (let i in buOyun.calinanSesler) {
            if (buOyun.calinanSesler.hasOwnProperty(i)) {
                buOyun.calinanSesler[i].pause();
            }
        }
        if (buOyun.bitisSesi) {
            buOyun.bitisSesi.pause();
        }
        $('.flash')
            .show()  //show the hidden div
            .fadeOut(300)
            .css({'opacity': 1});
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                buOyun.hucreSet(i.toString()+j.toString(), "bos");
            }
        }
        this.sesCal("sesler/yenidenbasla.mp3");

        this.oyuncu.isaret = isrt;
        this.oyuncu.ilkBaslar = (isrt === "x");
        this.oyuncu.eskiHamleler = [];
        this.bot.eskiHamleler = [];
        this.bot.hamleYapiyor = false;
        this.bot.dogumTarihim = (new Date().getTime()).toString();
        this.calinanSesler = {};


        if (!this.oyuncu.ilkBaslar) {
            this.bot.hamleYap(this.bot.dogumTarihim);
        }
        // winning messagedeki show muydu onu siler gorunmez yapar
        document.getElementById("winningMessage").className = "winning-message";
        document.getElementById("oyun-bitme-mesaji").className = "";

    }
}

let oyun = new Oyun();
oyun.herSeyiHazirEtVeOyunuMarsYapBirZahmetCanimsin();

