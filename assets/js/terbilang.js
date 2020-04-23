/* BISMILLAH, Semua Hasil Karya Tidak Akan Dapat Selesai Tanpa Rahmat Dari Allah Subhanahuata'ala.
 * Semoga Code ini bermanfaat, dan Allah mengampuni dosa-dosa Creator Code ini. Aamiin.
 * 
 * Creator : Achmad Syifa
 * Donasi : https://paypal.me/itusajja/ <----- Jazakummullahu khoiron.
 *
 * Copyright (c) 2020 Achmad Zyiva (https://github.com/itusajja/id_terbilang)
 * Licensed Under MIT (http://opensource.org/licenses/MIT)
 *
 * Version 0.0.1 
 *
 * Inspired By: https://github.com/BosNaufal/terbilang-js
 */

window.id_terbilang = (masukan) => {

    masukan = String(masukan);

    let pemisah = ".";
    let angka_baik = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let angka_nama = [pemisah + "nol", "se" + pemisah + "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
    let posisi_tetap = ["", "ribu", "juta", "milyar", "triliyun", "kuadriliun", "kuintiliun", "sekstiliun", "septiliun", "oktoliun", "noniliun", "desiliun"];
    let posisi_berpindah = ["", "puluh" + pemisah + "belas", "ratus"];

    /*
    * Memberikan kepastian apa yang di masukan.
    *
    */
    let per_digit = masukan.split("")
    if (per_digit.length === 0) { return ""; }
    for (i in per_digit) {
        if ((angka_baik).indexOf(parseFloat(per_digit[i])) == -1) {
            return "Angka yang anda masukkan tercampur dengan kode selain angka yang yang dibolehkan. <br /> Angka yang dibolehkan :" + angka_baik.join(",")
        }
    };

    /*
     * :: STEP 1 ::
     * Membagi masukan bilangan menjadi potongan setiap 3 kelompok_1digit kemudian dibalik
     *
     * Contoh Masukan       : 12340000
     * Akan menghasilkan    :  ["000", "340", "12"]
     *
     */

    let kelompok_3digit = masukan.match(/\d{1,3}(?=(\d{3})*$)/g).reverse();
    let teks = (kelompok_3digit).map((v, i) => {

    /*
     * :: STEP 2 ::
     * Membagi masukan bilangan 3 kelompok_1digit potongan setiap 1 kelompok_1digit kemudian dibalik
     *
     * Contoh Masukan       : 340
     * Akan menghasilkan    :  ["0", "4", "3"]
     *
     */
        let kelompok_1digit = v.match(/\d{1,1}(?=(\d{1})*$)/g);
        let nama_posisi_tetap = posisi_tetap[i];
        let baca_in = (digit_3in1) => {

            let jumlah_karakter_kelompok_1digit = digit_3in1.length
            let pembalik_kelompok_1digit = digit_3in1.reverse()
            let teks_kelompok_1digit = []

            for (i in pembalik_kelompok_1digit) {

                let v = pembalik_kelompok_1digit[i]
                /*
                * Memberikan nilai awal agar dapat diubah setelahnya.
                * selector = .
                * Karena menggunakan mode "sa.satu" / ".nol" / "puluh.belas"
                * Sehingga ditentukan awal menggunakan properti 0
                */
                let cari_nama_angka = (u, p) => { return angka_nama[u].split(pemisah)[p] }
                let cari_nama_posisi_berpindah = (u, p) => { return posisi_berpindah[u].split(pemisah)[p] }
                let satu_angka = cari_nama_angka(v, 0);
                let nama_satu_angka = (satu_angka == "se") ? satu_angka : satu_angka + " ";
                let nama_posisi_berpindah = cari_nama_posisi_berpindah(i, 0);


                /*
                * ATURAN ANGKA 11
                * Mengubah digit ke 2 (karena di reverse) menjadi "" (blank)
                */
                if (jumlah_karakter_kelompok_1digit > 1 && i == 0) {
                    if (digit_3in1[1] == 1) {
                        nama_satu_angka = "";
                    }
                }

                /*
                * ATURAN ANGKA BELASAN 11-19 + Pengambilan "se" / menghilangkan "satu" dalam 12-19
                * penambahan spasi jika 12-19 dan hapus spasi jika  "sebelas"
                */
                if (jumlah_karakter_kelompok_1digit > 1 && i == 1) {
                    if (digit_3in1[1] == 1 && digit_3in1[0] != 0) {
                        let satu_angka = cari_nama_angka(digit_3in1[0], 0);
                        nama_satu_angka = (satu_angka == "se") ? satu_angka : satu_angka + " ";
                        nama_posisi_berpindah = cari_nama_posisi_berpindah(i, 1)
                    }
                }

                /*
                * ATURAN ANGKA PULUHAN + Pengambilan "satu" bukan "se"
                * 
                */
                if (jumlah_karakter_kelompok_1digit > 1 && i == 0) {
                    if (digit_3in1[1] != 1 && digit_3in1[0] == 1) {
                        nama_satu_angka = cari_nama_angka(digit_3in1[0], 1);
                    }
                }

                /*
                * ATURAN ANGKA 0 tidak akan dianggap
                * 
                */
                if (v == 0) {
                    nama_satu_angka = "";
                    nama_posisi_berpindah = "";
                }

                /*
                * ATURAN ANGKA Pengambilan "satu" bukan "se" jika hanya 1
                * 
                */
                if (jumlah_karakter_kelompok_1digit == 1 && i == 0 && v == 1) {
                    nama_satu_angka = cari_nama_angka(v, 1) + " ";
                }

                /*
                * Pembuatan data output agar dapat menjalankan Pengubahan/Pembalik posisi
                * untuk yang 3 digit
                */
                teks_kelompok_1digit.push(nama_satu_angka + nama_posisi_berpindah)
            }
            /*
            * Posisi dibalik, agar bacanya bener :D
            * 
            */
            return teks_kelompok_1digit.reverse().join(" ")
        }

        /*
        * Pembuatan data output agar dapat menjalankan Pengubahan/Pembalik posisi
        * untuk yang semua angka
        */
        return baca_in(kelompok_1digit) + nama_posisi_tetap
    }).reverse().join(" ") + " rupiah";

    /*
    * ATURAN ANGKA 0 : Jika inputan hanya 0
    * akan muncul "nol"
    */
    if (masukan === "0") { teks = angka_nama[masukan].split(".")[1] }

    /*
    * ATURAN masukan jika melebihi batas.
    * ditentukan dari banyaknya posisi x 3
    */

    if ((posisi_tetap.length * 3) < masukan.length) {
        teks = "Angka terlalu tinggi dari tingkat teratas ( " 
        + posisi_tetap[posisi_tetap.length - 1] 
        + " ) dengan kapasitas 10<sup>" 
        + (posisi_tetap.length * 3) 
        + "</sup>. Cobalah untuk menurunkan angka masukan anda."
    }

    return teks
}