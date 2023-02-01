# **Belajar Membuat Front-End Web untuk Pemula**

## Kriteria Bookshelf Apps: 
Buatlah aplikasi web yang dapat memasukan data buku ke dalam rak, memindahkan data buku antar rak, dan menghapus data buku dari rak. 

Untuk lebih jelasnya, terdapat 5 kriteria utama pada Bookshelf Apps yang harus Anda buat.

<b>1. Kriteria 1: Mampu Menambahkan Data Buku</b></br>
   Syarat: 
   <ul>
      <li>Bookshelf Apps harus mampu menambahkan data buku baru.</li>
      <li>Data buku yang disimpan merupakan objek JavaScript dengan struktur berikut </li>
   </ul></br>
   
  ```javascript
      {
        id: string | number,
        title: string,
        author: string,
        year: number,
        isComplete: boolean,
      }
  ```
  
      Berikut contoh data riilnya:
  ```javascript
      {
        id: 3657848524,
        title: 'Harry Potter and the Philosopher\'s Stone',
        author: 'J.K Rowling',
        year: 1997,
        isComplete: false,
      }
  ```
  
    Catatan:
    Untuk id buku pada tiap buku yang disimpan haruslah unik. Tips dalam menetapkan nilai untuk adalah Anda bisa memanfaatkan nilai timestamp. Untuk mendapatkan nilai timestamp di JavaScript cukup mudah, cukup dengan menuliskan expressions +new Date().

<b>2. Kriteria 2: Memiliki Dua Rak Buku</b></br>
    Syarat:
    <ul>
      <li>Bookshelf Apps harus memiliki 2 Rak buku. Yakni, “Belum selesai dibaca” dan “Selesai dibaca”.</li>
      <li>Rak buku "Belum selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai false.</li>
      <li>Rak buku "Selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai true.</li>
    </ul>
  </br>
  
<b>3. Kriteria 3: Dapat Memindahkan Buku antar Rak</b></br>
    Syarat:
    <ul>
      <li>Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dipindahkan di antara keduanya.</li>
    </ul>
  </br>
  
<b>4. Kriteria 4: Dapat Menghapus Data Buku</b></br>
    Syarat:
    <ul>
      <li>Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dihapus.</li>
    </ul>
  </br>
  
<b>5. Kriteria 5: Manfaatkan localStorage dalam Menyimpan Data Buku</b></br>
    Syarat:
    <ul>
      <li>Data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat bertahan walaupun halaman web ditutup.</li>
      <li>Dengan begitu, Anda harus menyimpan data buku pada localStorage.</li>
    </ul>
  </br>


</ol>
</br>
