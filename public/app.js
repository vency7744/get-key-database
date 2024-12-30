document.getElementById('generate-key').addEventListener('click', async () => {
    try {
        // Panggil API untuk mendapatkan key
        const response = await fetch('/api/get-key');
        if (!response.ok) throw new Error('Gagal mengambil key');

        const data = await response.json();
        const key = data.key;

        // Tampilkan key di layar
        const keyDisplay = document.getElementById('key-display');
        keyDisplay.innerText = `Key Anda: ${key}`;

        // Salin key ke clipboard
        await navigator.clipboard.writeText(key);
        alert(`Key berhasil disalin: ${key}`);
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat mengambil key.');
    }
});