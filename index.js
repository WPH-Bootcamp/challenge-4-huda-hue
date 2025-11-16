const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  let timestamp = Date.now().toString();
  let randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  // 4. Tambahkan objek to-do ini ke array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  let text = prompt("Enter your To-do: ");
  if (!text || text.trim() === "") {
    console.log("To-do cannot be empty.");
    return;
  }
  const todo = {
    id: generateUniqueId(),
    text: text.trim(),
    isCompleted: false,
  };
  todos.push(todo);
  console.log(`[ACTIVE] | ${text.trim()}.`);
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  // 6. Tangani kasus jika to-do sudah selesai
  listTodos();
  if (todos.length === 0) return;
  const input = prompt("Enter the number of the to-do to mark as completed: ");
  const numb = Number(input);
  if (
    isNaN(numb) ||
    !Number.isInteger(numb) ||
    numb < 1 ||
    numb > todos.length
  ) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }
  const todo = todos[numb - 1];
  if (todo.isCompleted) {
    console.log(`to-do "${todo.text}" is already completed.`);
    return;
  }
  todo.isCompleted = true;
  console.log(`to-do "${todo.text}" marked as completed.`);
}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  // 4. Hapus to-do yang dipilih dari array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus
  listTodos();
  if (todos.length === 0) return;
  const input = prompt("Enter the number of the to-do to deleted: ");
  const numb = Number(input);
  if (
    isNaN(numb) ||
    !Number.isInteger(numb) ||
    numb < 1 ||
    numb > todos.length
  ) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }
  const removed = todos.splice(numb - 1, 1)[0];
  console.log(`to-do "${removed.text}" is removed.`);
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  }
  console.log("--- YOUR TO-DO LIST ---");
  todos.forEach((todo, idx) => {
    const status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${idx + 1}. ${status} | ${todo.text}`);
  });
  console.log("---------------------------------------------");
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  // console.log("---> TO-DO LIST PROGRAM <---");
  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid
    const menu = ["add", "complete", "delete", "list", "exit"];
    console.log("\nPerintah:");
    for (let i = 0; i < menu.length; i++) {
      console.log(`${i + 1}. ${menu[i]}`);
    }
    let command = prompt("Enter a command: ").trim().toLowerCase();
    switch (command) {
      case "add":
      case "1":
        addTodo();
        break;
      case "complete":
      case "2":
        markTodoCompleted();
        break;
      case "delete":
      case "3":
        deleteTodo();
        break;
      case "list":
      case "4":
        listTodos();
        break;
      case "exit":
      case "5":
        running = false;
        console.log("Exiting app...");
        break;
      default:
        console.log("start wrong");
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
