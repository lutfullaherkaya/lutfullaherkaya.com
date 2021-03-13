let oyuncuIsareti = "o"
let oyuncuIlkBasliyor = false;
let sesAcik = true;
let muzikAcik = true;
let oyuncuEskiHamleler = [];
let userInteractYapti = false;
let suankiGrafik = {
    "x": "klasikx",
    "o": "klasiko"
}

let xoxMatrisi = [
    ["bos", "bos", "bos"],
    ["bos", "bos", "bos"],
    ["bos", "bos", "bos"]
]

let xResmiSrc = "resimler/x.png"
let oResmiSrc = "resimler/o.png"
let bosSrc = "resimler/bos.png"
let bot = new Bot();

const equals = (a, b) =>
    a.length === b.length &&
    a.every((v, i) => v === b[i]);

let grafikler = {
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
    "biyiklikedi" : "resimler/biyiklikedi.jpg"
}

function miyavSesiSrc() {
    return "sesler/miyav"+(Math.floor(Math.random() * 4)+1).toString()+".mp3";
}

let sesEfektleri = {
    "klasikx" : "sesler/xses.mp3",
    "klasiko" : "sesler/oses.mp3",
    "diskokedi" : miyavSesiSrc,
    "epilepsikopek" : "sesler/hav.mp3",
    "danscibebek" : "sesler/bebek.mp3",
    "mahzunkermit" : "sesler/huzunlu.mp3",
    "polatalemdar" : "sesler/disk.mp3",
    "aynalikedi" : miyavSesiSrc,
    "istebu" : "sesler/istebu.mp3",
    "halaykedi" : miyavSesiSrc,
    "biyiklikedi": miyavSesiSrc
}

// zorluk kaydirgac
var zorlukDuzeyiSlider = document.getElementById("zorlukDuzeyiRange");
var output = document.getElementById("zorlukDuzeyiYazi");
output.innerHTML = "Vasat bot"; // Display the default slider value



// Update the current slider value (each time you drag the slider handle)
zorlukDuzeyiSlider.oninput = function() {
    let zorluk = this.value;
    if (zorluk == 0) {
        output.innerHTML = "Tüm tuşlara basan bot";
    } else if (zorluk < 20) {
        output.innerHTML = "Akıl dağıtılırken şemsiye tutmuş bot";
    } else if (zorluk < 40) {
        output.innerHTML = "Çocuk oyuncağı bot";
    } else if (zorluk <= 55) {
        output.innerHTML = "Vasat bot";
    } else if (zorluk < 70) {
        output.innerHTML = "Yürek yemiş bot";
    } else if (zorluk < 80) {
        output.innerHTML = "Kulağını oynatabilen bot";
    } else if (zorluk < 100) {
        output.innerHTML = "8 yıl tekvando 13 yıl muay thai yapmış bot";
    } else {
        output.innerHTML = "Kendini aşmış, zinhar yenilmez bot";
        sesCal("sesler/enzormod.mp3", async=true);
    }
}

botBaslasinOyunaYiyosa();

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


function yenidenBasla(isrt) {
    if (suAnCalinanSes) {
        suAnCalinanSes.pause();
    }
    if (isrt == "x") {
        oyuncuIsareti = "x";
        oyuncuIlkBasliyor = true;
    } else {
        oyuncuIsareti = "o";
        oyuncuIlkBasliyor = false;
    }
    oyuncuEskiHamleler = [];
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            hucreSet(i.toString()+j.toString(), "bos");
        }
    }
    bot = new Bot();
    botBaslasinOyunaYiyosa();
    // winning messagedeki show muydu onu siler gorunmez yapar
    document.getElementById("winningMessage").className = "winning-message";
    document.getElementById("oyun-bitme-mesaji").className = "";

}


let suAnCalinanSes;
function sesCal(url, async=false) {
    if (sesAcik) {
        if (async) {
            new Audio(url).play();
        } else {
            if (suAnCalinanSes) {
                suAnCalinanSes.pause();
            }
            suAnCalinanSes = new Audio(url);
            suAnCalinanSes.play();
        }
    }
}

function hamleSesiCal(isrt) {
    let tiklamaSesiSrc = sesEfektleri[suankiGrafik[isrt]];
    if (typeof tiklamaSesiSrc === 'function') {
        tiklamaSesiSrc = tiklamaSesiSrc();
    }
    sesCal(tiklamaSesiSrc, async="true");
}


function muzikCal(url){
    if (muzikAcik) {
        new Audio(url).play();
    }
}


function botBaslasinOyunaYiyosa() {
    if (!oyuncuIlkBasliyor) {
        // yiyormus
        bot.hamleYap();
        kazanan = oyunBittiyseKimKazandiSoylerMisin();
        if (kazanan) {
            kazanildi(kazanan);
        }
    }
}

function oyuncuResimSrc() {
    return (oyuncuIsareti == "x") ? xResmiSrc : oResmiSrc;
}

function botResimSrc() {
    return (oyuncuIsareti == "o") ? xResmiSrc : oResmiSrc;
}

function tabloResimGuncelle() {
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            hucreSet(i.toString() + j.toString(), xoxMatrisi[i][j], resimGrafikGuncelle=true);
        }
    }
}

function xResimSrcDegistir(xSrcStr) {
    xResmiSrc = xSrcStr;
    document.getElementById("tekrarXButon").src = xSrcStr;
    document.getElementById("oyunBitisXButon").src = xSrcStr;
    tabloResimGuncelle();
}

function oResimSrcDegistir(oSrcStr) {
    oResmiSrc = oSrcStr;
    document.getElementById("tekrarOButon").src = oSrcStr;
    document.getElementById("oyunBitisOButon").src = oSrcStr;
    tabloResimGuncelle();
}


function grafikDegistir(isrt) {
    let grafik = document.getElementById("grafikler"+isrt).value;
    suankiGrafik[isrt] = grafik;
    if (isrt == "x") {
        xResimSrcDegistir(grafikler[grafik]);
    } else {
        oResimSrcDegistir(grafikler[grafik])
    }
    let digerIsrt = (isrt == "x") ? "o" : "x";
    let grafikDropDownSatirlar = document.getElementsByClassName(digerIsrt+"GrafikDegistir");
    for (let i = 0; i < grafikDropDownSatirlar.length; ++i) {
        grafikDropDownSatirlar[i].className = digerIsrt+"GrafikDegistir";
        if (grafikDropDownSatirlar[i].value == grafik) {
            grafikDropDownSatirlar[i].className = digerIsrt+"GrafikDegistir gizli";
        }
    }
    
    switch (grafik) {
        case "klasik":
            xOResimSrcDegistir("resimler/x.png", "resimler/o.png");
            break;
        case "bebek":
            xOResimSrcDegistir("img/Baby-giphy-3.gif", "resimler/tenor.gif");
            break;
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function hover(element, id) {
    if (xoxMatrisi[parseInt(id[0])][parseInt(id[1])] == "bos") {
        let siniflar = document.getElementById(id).className.split(" ");
        document.getElementById(id).src = oyuncuResimSrc();
        document.getElementById(id).className = siniflar[0] + " " + siniflar[1] + " inaktif " + siniflar[3];
    }
}
  
function unhover(element, id) {
    let siniflar = document.getElementById(id).className.split(" ");
    document.getElementById(id).className = siniflar[0] + " " + siniflar[1] + " aktif " + siniflar[3];
    if (xoxMatrisi[parseInt(id[0])][parseInt(id[1])] == "bos") {
        document.getElementById(id).src = bosSrc;
    }
}

function hucreSet(id, isaret, resimGrafikGuncelle=false) {
    xoxMatrisi[parseInt(id[0])][parseInt(id[1])] = isaret;
    if (isaret == "o") {
        document.getElementById(id).src = oResmiSrc;
    } else if (isaret == "x") {
        document.getElementById(id).src = xResmiSrc;
    } else {
        document.getElementById(id).src = bosSrc;
    }
    let siniflar = document.getElementById(id).className.split(" ");
    document.getElementById(id).className = siniflar[0] + (isaret == "bos" ? " bos inaktif" : " dolu aktif") + " hucre-animasyon-yok";

    if (isaret == bot.isaret() && resimGrafikGuncelle == false) {
        bot.hamleSolmaEtkisi(id);
    };
}



function Bot(debugHamleler=false) {
    this.hamleYapiyor = false;
    this.eskiHamleSayisi = 0;
    this.eskiHamleler = [];

    this.zorluk = function() {
        return zorlukDuzeyiSlider.value;
    }

    this.isaret = function() {
        return oyuncuIsareti == "o" ? "x" : "o";
    }

    this.dusunmeNumarasiYap = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    this.hamleSolmaEtkisi = async function(id) {
        let siniflar = document.getElementById(id).className.split(" ");
        document.getElementById(id).className = siniflar[0] + " " + siniflar[1] + " " + siniflar[2] + " hucre-animasyon";
        await sleep(1000);
        document.getElementById(id).className = siniflar[0] + " " + siniflar[1] + " " + siniflar[2] + " hucre-animasyon-yok";
    
    }

    this.kazanmaBloklamaZorlugu = function() {
        let zorluk;
        if (bot.zorluk() == 0) {
            zorluk = 0;
        } else if (bot.zorluk() < 40) {
            zorluk = 50 + Math.floor(bot.zorluk() * 1.25);
        } else if (bot.zorluk() <= 55) {
            zorluk = 100;
        } else if (bot.zorluk() < 100) {
            zorluk = 100;
        } else {
            zorluk = 100;
        }
        return zorluk;
    }

    this.digerHamleZorlugu = function() {
        let zorluk;
        if (bot.zorluk() == 0) {
            zorluk = 0;
        } else if (bot.zorluk() < 40) {
            zorluk = 0;
        } else if (bot.zorluk() <= 55) {
            zorluk = 0;
        } else if (bot.zorluk() < 100) {
            zorluk = 20 + Math.floor((bot.zorluk() - 56) * 1.818);
        } else {
            zorluk = 100;
        }
        return zorluk;
    }

    this.hamleYap = async function() {
        this.hamleYapiyor = true;
        await this.dusunmeNumarasiYap(100);

        let hamleKordinatlari = [
            this.kazanmaKordinati(this.kazanmaBloklamaZorlugu()),
            this.rakibiBloklaKordinati(this.kazanmaBloklamaZorlugu()),
            this.digerHamleKordinati(this.digerHamleZorlugu()),
            this.rastgeleHamleKordinati()
        ];

        let hamleId;
        for (let i = 0; i < hamleKordinatlari.length; ++i) {
            if (hamleKordinatlari[i]) {
                this.eskiHamleler.push(hamleKordinatlari[i]);
                hamleId = hamleKordinatlari[i].join("");
                break;
            }
        }


        hucreSet(hamleId, this.isaret());
        this.eskiHamleSayisi++;
        await this.dusunmeNumarasiYap(300);
        if (userInteractYapti) {
            hamleSesiCal(bot.isaret());
        }
        let kazanan = oyunBittiyseKimKazandiSoylerMisin();
        if (kazanan) {
            await this.dusunmeNumarasiYap(100);
            kazanildi(kazanan);
        } else {
            if (bot.kazanmaKordinatYardimci(oyuncuIsareti)) {
                if (Math.floor(Math.random() * 2) == 1) {
                    sesCal("sesler/finishhim.mp3");
                } else {
                    sesCal("sesler/finishher.mp3");
                }
            }
        }
        await this.dusunmeNumarasiYap(300);

        this.hamleYapiyor = false;
    }

    this.rastgeleHamleKordinati = function() {
        let hamleler = [];
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                if (xoxMatrisi[i][j] == "bos") {
                    hamleler.push([i, j]);
                }
            }
        }
        return hamleler[Math.floor(Math.random() * hamleler.length)]
    }
    this.kazanmaKordinatYardimci = function(isrt) {
        let kazananSira = ["bos"+isrt+isrt, isrt+"bos"+isrt, isrt+isrt+"bos"];
        for (let i = 0; i < 3; ++i) {
            // satir
            let j = kazananSira.indexOf(xoxMatrisi[i].join(""));
            if (j != -1) {
                return [i, j];
            }
            // sutun
            j = kazananSira.indexOf(xoxMatrisi[0][i]+xoxMatrisi[1][i]+xoxMatrisi[2][i]);
            if (j != -1) {
                return [j, i];
            }
        }
        // capraz
        let j = kazananSira.indexOf(xoxMatrisi[0][0]+xoxMatrisi[1][1]+xoxMatrisi[2][2]);
        if (j != -1) {
            return [j, j];
        }
        j = kazananSira.indexOf(xoxMatrisi[0][2]+xoxMatrisi[1][1]+xoxMatrisi[2][0]);
        if (j != -1) {
            return [j, 2-j];
        }
        return false;
    }

    this.kazanmaKordinati = function(basariSansi=100) {
        if (Math.floor(Math.random() * 101) <= basariSansi) {
            return this.kazanmaKordinatYardimci(this.isaret());
        } else {
            return false;
        }
    }
    this.rakibiBloklaKordinati = function(basariSansi=100) {
        if (Math.floor(Math.random() * 101) <= basariSansi) {
            return this.kazanmaKordinatYardimci(oyuncuIsareti);
        } else {
            return false;
        }
    }

    this.digerHamleKordinati = function(basariSansi=100) {
        if (Math.floor(Math.random() * 101) <= basariSansi) {
            // kaynak: https://www.wikihow.com/Win-at-Tic-Tac-Toe
            if (oyuncuIlkBasliyor) {
                // oyuncu koseden basladiysa
                if (equals(oyuncuEskiHamleler[0], [0,0]) ||
                    equals(oyuncuEskiHamleler[0], [0,2]) ||
                    equals(oyuncuEskiHamleler[0], [2,0]) ||
                    equals(oyuncuEskiHamleler[0], [2,2])) {
                    if (this.eskiHamleSayisi == 0) {
                        return [1, 1];
                    } 
                    else if (this.eskiHamleSayisi == 1) {
                        // kenara koyacakmissin 2. hamlede wikihowa gore sjjdjsdj
                        let kenarlar = [[0,1], [1,0], [1,2], [2,1]]
                        for (let k = 0; k < kenarlar.length; ++k) {
                            if (xoxMatrisi[kenarlar[k][0]][kenarlar[k][1]] == "bos") {
                                return kenarlar[k];
                            }
                        }
                    }
                } // oyuncu ortadan baslarsa
                else if ((xoxMatrisi[1][1] == oyuncuIsareti) && this.eskiHamleSayisi == 0) {
                    return [0,0];
                } // oyuncu kenardan baslarsa
                else {
                    if (this.eskiHamleSayisi == 0) {
                        return [1,1];
                    } else if (this.eskiHamleSayisi == 1) {
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
                        let tehlikeliKose = htable[oyuncuEskiHamleler[0][0].toString()+oyuncuEskiHamleler[0][1].toString()+
                        oyuncuEskiHamleler[1][0].toString()+oyuncuEskiHamleler[1][1].toString()];
                        if (tehlikeliKose) {
                            let tehlikeliKoseKordinat = [parseInt(tehlikeliKose[0]),parseInt(tehlikeliKose[1])];
                            if (xoxMatrisi[tehlikeliKoseKordinat[0]][tehlikeliKoseKordinat[1]] == "bos") {
                                return tehlikeliKoseKordinat;
                            }
                        }
                        // burada siteden biraz saptim usendigim icin
                        let koseler = [[0,0], [0,2], [2,0], [2,2]];
                        for (let k = 0; k < koseler.length; ++k) {
                            if (xoxMatrisi[koseler[k][0]][koseler[k][1]] == "bos") {
                                return koseler[k];
                            }
                        }

                    }
                }
            }
            else {
                // koseyle basla
                if (this.eskiHamleSayisi == 0) {
                    return [0,0];
                }
                else {
                    // oyuncu ortaya koyarsa
                    if (equals(oyuncuEskiHamleler[0], [1,1])) {
                        if (this.eskiHamleSayisi == 1) {
                            return [2,2];
                        }
                        else if (this.eskiHamleSayisi == 2) {
                            let koseler = [[0,0], [0,2], [2,0], [2,2]];
                            for (let k = 0; k < koseler.length; ++k) {
                                if (xoxMatrisi[koseler[k][0]][koseler[k][1]] == "bos") {
                                    return koseler[k];
                                }
                            }
                        }
                    }
                    else { // oyuncu ortaya koymazsa
                        if (this.eskiHamleSayisi == 1) {
                            let koseler = [[0,2], [2,0], [2,2]];
                            for (let k = 0; k < koseler.length; ++k) {
                                if (xoxMatrisi[koseler[k][0]][koseler[k][1]] == "bos") {
                                    if (Number.isInteger(koseler[k][0]/2) && Number.isInteger(koseler[k][1]/2)) {
                                        if (xoxMatrisi[koseler[k][0]/2][koseler[k][1]/2] == "bos") {
                                            return koseler[k];
                                        }
                                    }
                                }
                            }
                        } else if (this.eskiHamleSayisi == 2) {
                            let koseler = [[0,2], [2,0], [2,2]];
                            for (let k = 0; k < koseler.length; ++k) {
                                if (xoxMatrisi[koseler[k][0]][koseler[k][1]] == "bos") {
                                    if (Number.isInteger(koseler[k][0]/2)
                                            && Number.isInteger(koseler[k][1]/2)
                                            && Number.isInteger(this.eskiHamleler[1][0]+koseler[k][0]/2)
                                            && Number.isInteger((this.eskiHamleler[1][1]+koseler[k][1])/2)) {

                                        if (xoxMatrisi[koseler[k][0]][koseler[k][1]] == "bos" &&
                                            xoxMatrisi[koseler[k][0]/2][koseler[k][1]/2] == "bos" &&
                                            xoxMatrisi[(this.eskiHamleler[1][0]+koseler[k][0])/2][(this.eskiHamleler[1][1]+koseler[k][1])/2] == "bos") {
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
    }

}



async function tiklama(id) {
    if (!userInteractYapti) {
        userInteractYapti = true;
    }
    if (!bot.hamleYapiyor) {
        bot.hamleYapiyor = true;
        let i = parseInt(id[0]);
        let j = parseInt(id[1]);
        if (xoxMatrisi[i][j] == "bos") {
            hamleSesiCal(oyuncuIsareti);
            hucreSet(id, oyuncuIsareti);
            oyuncuEskiHamleler.push([i,j]);
            let kazanan = oyunBittiyseKimKazandiSoylerMisin();
            if (kazanan) {
                kazanildi(kazanan);
            } else {
                if (bot.kazanmaKordinati()) {
                    bot.hamleYapiyor = true;
                    await sleep(600);
                    sesCal("sesler/akasyaduragisasirma.mp3", async=true);
                    await sleep(1100);
                }
                await sleep(400);

                bot.hamleYap();
                kazanan = oyunBittiyseKimKazandiSoylerMisin();
                if (kazanan) {
                    kazanildi(kazanan);
                }
            }
            
        }
    }

}

function oyunBittiyseKimKazandiSoylerMisin() {
    // duz
    for (let i = 0; i < 3; ++i) {
        if ((xoxMatrisi[i][0] != "bos") && (xoxMatrisi[i][0] == xoxMatrisi[i][1]) && (xoxMatrisi[i][1] == xoxMatrisi[i][2])) {
            return xoxMatrisi[i][0];
        }
        if ((xoxMatrisi[0][i] != "bos") && (xoxMatrisi[0][i] == xoxMatrisi[1][i]) && (xoxMatrisi[1][i] == xoxMatrisi[2][i])) {
            return xoxMatrisi[0][i];
        }
    }
    // capraz
    if ((xoxMatrisi[0][0] != "bos") && (xoxMatrisi[0][0] == xoxMatrisi[1][1]) && (xoxMatrisi[1][1] == xoxMatrisi[2][2])) {
        return xoxMatrisi[0][0];
    }
    if ((xoxMatrisi[0][2] != "bos") && (xoxMatrisi[0][2] == xoxMatrisi[1][1]) && (xoxMatrisi[1][1] == xoxMatrisi[2][0])) {
        return xoxMatrisi[0][2];
    }
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (xoxMatrisi[i][j] == "bos") {
                return false;
            }
        }
    }
    return "berabere";
}

function skorArttir(skor) {
    document.getElementById(skor).innerHTML = (parseInt(document.getElementById(skor).innerHTML)+1).toString();
}

async function kazanildi(kazanan) {
    bot.hamleYapiyor = true;
    await sleep(100);
    let mesaj;
    if (kazanan == oyuncuIsareti) {
        mesaj = "Kazandınız :)";
        skorArttir("skorGalibiyet");
        sesCal("sesler/kazandin.mp3")
    } else if (kazanan == bot.isaret()) {
        mesaj = "Öldün :'(";
        skorArttir("skorMaglubiyet");
        sesCal("sesler/oldun.mp3");
        document.getElementById("oyun-bitme-mesaji").className = "oldun";
    } else {
        mesaj = "Berabere :|";
        skorArttir("skorBeraberiyet");
        sesCal("sesler/berabere.mp3");
    }
    document.getElementById("winningMessage").className = "winning-message show";
    document.getElementById("oyun-bitme-mesaji").innerHTML = mesaj;
    
}

